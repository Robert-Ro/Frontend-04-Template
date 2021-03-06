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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var container = document.getElementById('container');
for (var index = 0; index < 3; index++) {
    var element = document.createElement('div');
    element.classList.add('element');
    (_a = container) === null || _a === void 0 ? void 0 : _a.appendChild(element);
}
// @ts-ignore
var duration = function (timeout) { return (new Promise(function (resolve) { return setTimeout(resolve, timeout); })); };
var lightOff = function () {
    var _a, _b;
    for (var index = 0; index < ((_a = container) === null || _a === void 0 ? void 0 : _a.childElementCount); index++) {
        ((_b = container) === null || _b === void 0 ? void 0 : _b.children[index]).style.backgroundColor = 'grey';
    }
};
var lightOn = function (color, index) {
    var _a;
    lightOff();
    ((_a = container) === null || _a === void 0 ? void 0 : _a.children[index]).style.backgroundColor = color;
};
/**
 * async/await实现
 */
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 4];
                lightOn('red', 0);
                return [4 /*yield*/, duration(1000)];
            case 1:
                _a.sent();
                lightOn('yellow', 1);
                return [4 /*yield*/, duration(500)];
            case 2:
                _a.sent();
                lightOn('green', 2);
                return [4 /*yield*/, duration(300)];
            case 3:
                _a.sent();
                return [3 /*break*/, 0];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * 手动控制
 */
var go = function () { return __awaiter(void 0, void 0, void 0, function () {
    var btn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                btn = document.getElementById('button');
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 5];
                lightOn('red', 0);
                return [4 /*yield*/, new Promise(function (resolve) {
                        var _a;
                        (_a = btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', resolve, { passive: true });
                    })];
            case 2:
                _a.sent();
                lightOn('yellow', 1);
                return [4 /*yield*/, new Promise(function (resolve) {
                        var _a;
                        (_a = btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', resolve, { passive: true });
                    })];
            case 3:
                _a.sent();
                lightOn('green', 2);
                return [4 /*yield*/, new Promise(function (resolve) {
                        var _a;
                        (_a = btn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', resolve, { passive: true });
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
function useGenerator() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 4];
                lightOn('red', 0);
                return [4 /*yield*/, duration(1000)];
            case 1:
                _a.sent();
                lightOn('yellow', 1);
                return [4 /*yield*/, duration(500)];
            case 2:
                _a.sent();
                lightOn('green', 2);
                return [4 /*yield*/, duration(300)];
            case 3:
                _a.sent();
                return [3 /*break*/, 0];
            case 4: return [2 /*return*/];
        }
    });
}
var run = function (iterator) {
    var _a = iterator.next(), value = _a.value, done = _a.done;
    if (done) {
        return;
    }
    if (value instanceof Promise) {
        value.then(function () {
            run(iterator);
        });
    }
};
var co = function (generator) {
    return function () {
        run(generator());
    };
};
//@ts-ignore
useGenerator = co(useGenerator);
function counter() {
    return __asyncGenerator(this, arguments, function counter_1() {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(duration(1000))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, __await(i++)];
                case 3: return [4 /*yield*/, _a.sent()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, index, e_1_1;
    var e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, 6, 11]);
                _a = __asyncValues(counter());
                _d.label = 1;
            case 1: return [4 /*yield*/, _a.next()];
            case 2:
                if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 4];
                index = _b.value;
                console.log(index);
                _d.label = 3;
            case 3: return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 11];
            case 5:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 11];
            case 6:
                _d.trys.push([6, , 9, 10]);
                if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 8];
                return [4 /*yield*/, _c.call(_a)];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 10: return [7 /*endfinally*/];
            case 11: return [2 /*return*/];
        }
    });
}); })();
