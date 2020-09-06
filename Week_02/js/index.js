"use strict";
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
var regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g;
var dictionary = ['Number', 'Whitespace', 'LineTerminator', '+', '-', '*', '/'];
function tokenize(source) {
    var result, lastIndex, token, index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                result = null;
                lastIndex = 0;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                lastIndex = regexp.lastIndex;
                result = regexp.exec(source);
                if (!result) {
                    return [3 /*break*/, 3];
                }
                if (regexp.lastIndex - lastIndex > result[0].length) {
                    return [3 /*break*/, 3];
                }
                token = {
                    type: null,
                    value: null
                };
                for (index = 0; index <= dictionary.length; index++) {
                    if (result[index]) {
                        token.type = dictionary[index - 1];
                    }
                }
                token.value = result[0];
                return [4 /*yield*/, token];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [4 /*yield*/, {
                    type: "EOF"
                }];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
// @ts-ignore
for (var _i = 0, _a = tokenize("1024 + 10 * 25"); _i < _a.length; _i++) {
    var token = _a[_i];
    console.log(token);
}
