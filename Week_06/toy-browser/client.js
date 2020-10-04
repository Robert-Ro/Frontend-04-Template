"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var Request = /** @class */ (function () {
    function Request(options) {
        var _this = this;
        this.method = '';
        this.host = '';
        this.port = 0;
        this.path = '';
        this.headers = {};
        this.body = {};
        this.bodyText = '';
        this.method = options.method || 'GET';
        this.host = options.host;
        this.port = options.port;
        this.path = options.path || '/';
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        }
        else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body)
                .map(function (key) { return key + "=" + encodeURIComponent(_this.body[key]); })
                .join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }
    Request.prototype.send = function (connection) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var parser = new ResponseParser();
            var _connection;
            if (!connection) {
                _connection = net_1.createConnection({
                    host: _this.host,
                    port: _this.port,
                }, function () {
                    _connection.write(_this.toString(), function (err) {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            else {
                _connection = connection;
                _connection.write(_this.toString());
            }
            _connection.on('data', function (data) {
                // console.log(data.toString())
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(parser.response);
                    _connection.end();
                }
            });
            _connection.on('connect', function () {
                // console.log('connection connect')
            });
            _connection.on('error', function (err) {
                console.error('connection error', err);
                reject(err);
                _connection.end();
            });
        });
    };
    Request.prototype.toString = function () {
        var _this = this;
        var result = this.method + " " + this.path + " HTTP/1.1\r\n" + Object.keys(this.headers)
            .map(function (key) { return key + ": " + _this.headers[key]; })
            .join('\r\n') + "\r\n\r\n" + this.bodyText;
        return result;
    };
    return Request;
}());
var ResponseParser = /** @class */ (function () {
    function ResponseParser() {
        this.current = 0;
        this.statusLine = '';
        this.headers = {};
        this.headerName = '';
        this.headerValue = '';
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;
        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = '';
        this.headers = {};
        this.headerName = '';
        this.headerValue = '';
        this.bodyParser = void 0;
    }
    ResponseParser.prototype.receive = function (str) {
        for (var index = 0; index < str.length; index++) {
            this.receiveChar(str.charAt(index));
        }
    };
    ResponseParser.prototype.receiveChar = function (char) {
        var _a;
        if (this.current === this.WAITING_STATUS_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END;
            }
            else {
                this.statusLine += char;
            }
        }
        else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        }
        else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE;
            }
            else if (char === '\r') {
                this.current = this.WAITING_HEADER_BLOCK_END;
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    // TODO 展开
                    this.bodyParser = new TrunkBodyParser();
                }
            }
            else {
                this.headerName += char;
            }
        }
        else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.current = this.WAITING_HEADER_VALUE;
            }
        }
        else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerName = '';
                this.headerValue = '';
            }
            else {
                this.headerValue += char;
            }
        }
        else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        }
        else if (this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === '\n') {
                this.current = this.WAITING_BODY;
            }
        }
        else if (this.current === this.WAITING_BODY) {
            (_a = this.bodyParser) === null || _a === void 0 ? void 0 : _a.receiveChar(char);
        }
    };
    Object.defineProperty(ResponseParser.prototype, "isFinished", {
        get: function () {
            return this.bodyParser && this.bodyParser.isFinished;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResponseParser.prototype, "response", {
        get: function () {
            this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
            return {
                statusCode: RegExp.$1,
                statusText: RegExp.$2,
                headers: this.headers,
                body: this.bodyParser && this.bodyParser.content.join(''),
            };
        },
        enumerable: false,
        configurable: true
    });
    return ResponseParser;
}());
var TrunkBodyParser = /** @class */ (function () {
    function TrunkBodyParser() {
        this.content = [];
        this.length = 0;
        this.isFinished = false;
        this.current = 0;
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
    }
    TrunkBodyParser.prototype.receiveChar = function (char) {
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            }
            else {
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        }
        else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        }
        else if (this.current === this.READING_TRUNK) {
            this.content.push(char);
            this.length--;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        }
        else if (this.current === this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END;
            }
        }
        else if (this.current === this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        }
    };
    return TrunkBodyParser;
}());
;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var request, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                request = new Request({
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
                });
                return [4 /*yield*/, request.send()];
            case 1:
                response = _a.sent();
                console.log(response);
                return [2 /*return*/];
        }
    });
}); })();
