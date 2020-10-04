import { createConnection, Socket } from 'net'

interface Headers {
    [key: string]: string | number
}
interface IBody {
    [key: string]: string | number
}
interface RequestOption {
    method: 'POST' | 'GET'
    host: string
    port: number
    path: string
    headers: Headers
    body?: any
}
class Request {
    method = ''
    host = ''
    port = 0
    path = ''
    headers: Headers = {}
    body: IBody = {}
    bodyText = ''
    constructor(options: RequestOption) {
        this.method = options.method || 'GET'
        this.host = options.host
        this.port = options.port
        this.path = options.path || '/'
        this.body = options.body || {}
        this.headers = options.headers || {}
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body)
        } else if (
            this.headers['Content-Type'] === 'application/x-www-form-urlencoded'
        ) {
            this.bodyText = Object.keys(this.body)
                .map((key) => `${key}=${encodeURIComponent(this.body[key])}`)
                .join('&')
        }
        this.headers['Content-Length'] = this.bodyText.length
    }

    send(connection?: Socket) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser()
            let _connection: Socket
            if (!connection) {
                _connection = createConnection(
                    {
                        host: this.host,
                        port: this.port,
                    },
                    () => {
                        _connection.write(this.toString(), (err) => {
                            if (err) {
                                console.error(err)
                            }
                        })
                    }
                )
            } else {
                _connection = connection
                _connection.write(this.toString())
            }
            _connection.on('data', (data: Buffer) => {
                // console.log(data.toString())
                parser.receive(data.toString())
                if (parser.isFinished) {
                    resolve(parser.response)
                    _connection.end()
                }
            })
            _connection.on('connect', () => {
                // console.log('connection connect')
            })

            _connection.on('error', (err) => {
                console.error('connection error', err)
                reject(err)
                _connection.end()
            })
        })
    }
    toString(): string {
        const result = `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(
            this.headers
        )
            .map((key) => `${key}: ${this.headers[key]}`)
            .join('\r\n')}\r\n\r\n${this.bodyText}`
        return result
    }
}

class ResponseParser {
    WAITING_STATUS_LINE
    WAITING_STATUS_LINE_END
    WAITING_HEADER_NAME
    WAITING_HEADER_SPACE
    WAITING_HEADER_VALUE
    WAITING_HEADER_LINE_END
    WAITING_HEADER_BLOCK_END
    WAITING_BODY
    current: number = 0
    statusLine: string = ''
    headers: Headers = {}
    headerName: string = ''
    headerValue: string = ''
    bodyParser?: TrunkBodyParser
    constructor() {
        this.WAITING_STATUS_LINE = 0
        this.WAITING_STATUS_LINE_END = 1
        this.WAITING_HEADER_NAME = 2
        this.WAITING_HEADER_SPACE = 3
        this.WAITING_HEADER_VALUE = 4
        this.WAITING_HEADER_LINE_END = 5
        this.WAITING_HEADER_BLOCK_END = 6
        this.WAITING_BODY = 7

        this.current = this.WAITING_STATUS_LINE
        this.statusLine = ''
        this.headers = {}
        this.headerName = ''
        this.headerValue = ''
        this.bodyParser = void 0
    }
    receive(str: string) {
        for (let index = 0; index < str.length; index++) {
            this.receiveChar(str.charAt(index))
        }
    }
    receiveChar(char: string) {
        if (this.current === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END
            } else {
                this.statusLine += char
            }
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        } else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE
            } else if (char === '\r') {
                this.current = this.WAITING_HEADER_BLOCK_END
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    // TODO 展开
                    this.bodyParser = new TrunkBodyParser()
                }
            } else {
                this.headerName += char
            }
        } else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.current = this.WAITING_HEADER_VALUE
            }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END
                this.headers[this.headerName] = this.headerValue
                this.headerName = ''
                this.headerValue = ''
            } else {
                this.headerValue += char
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME
            }
        } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === '\n') {
                this.current = this.WAITING_BODY
            }
        } else if (this.current === this.WAITING_BODY) {
            this.bodyParser?.receiveChar(char)
        }
    }
    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished
    }

    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser && this.bodyParser.content.join(''),
        }
    }
}
class TrunkBodyParser {
    content: string[] = []
    length: number = 0
    isFinished: boolean = false
    current: number = 0
    WAITING_LENGTH = 0
    WAITING_LENGTH_LINE_END = 1
    READING_TRUNK = 2
    WAITING_NEW_LINE = 3
    WAITING_NEW_LINE_END = 4
    constructor() {}
    receiveChar(char: string) {
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true
                }
                this.current = this.WAITING_LENGTH_LINE_END
            } else {
                this.length *= 16
                this.length += parseInt(char, 16)
            }
        } else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK
            }
        } else if (this.current === this.READING_TRUNK) {
            this.content.push(char)
            this.length--
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE
            }
        } else if (this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current === this.WAITING_NEW_LINE_END
            }
        } else if (this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH
            }
        }
    }
}
;(async () => {
    let request = new Request({
        method: 'POST',
        host: '127.0.0.1',
        port: 10000,
        path: '/',
        headers: {
            // @ts-ignore
            'x-foo2': 'customed',
        },
        body: {
            // @ts-ignore
            name: 'robert',
        },
    })
    const response = await request.send()
    console.log(response)
})()
