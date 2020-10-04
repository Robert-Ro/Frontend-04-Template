import http from 'http'

http.createServer((request, response) => {
    let data: any[] = []
    request
        .on('error', (err) => console.error(err))
        .on('data', (chunk) => data.push(chunk))
        .on('end', () => {
            const body = Buffer.concat(data).toString()
            console.log(body)
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end('hello world\n')
        })
        .on('close', () => {
            console.log('close')
        })
}).listen(10000)
console.log('server started')
