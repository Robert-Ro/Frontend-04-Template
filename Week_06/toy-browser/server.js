"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
http_1.default.createServer(function (request, response) {
    var data = [];
    request
        .on('error', function (err) { return console.error(err); })
        .on('data', function (chunk) { return data.push(chunk); })
        .on('end', function () {
        var body = Buffer.concat(data).toString();
        console.log(body);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('hello world\n');
    })
        .on('close', function () {
        console.log('close');
    });
}).listen(10000);
console.log('server started');
