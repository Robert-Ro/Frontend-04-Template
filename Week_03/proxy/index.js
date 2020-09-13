"use strict";
var _a, _b, _c;
var callbacks = new Map();
var reactivties = new Map();
var usedReactivties = [];
var reactive = function (obj) {
    if (reactivties.has(obj)) {
        return reactivties.get(obj);
    }
    var proxy = new Proxy(obj, {
        set: function (obj, pro, value) {
            obj[pro] = value;
            if (callbacks.get(obj)) {
                if (callbacks.get(obj).get(pro)) {
                    for (var _i = 0, _a = callbacks.get(obj).get(pro); _i < _a.length; _i++) {
                        var callback = _a[_i];
                        callback();
                    }
                }
            }
            return obj[pro];
        },
        get: function (obj, pro) {
            usedReactivties.push([obj, pro]);
            if (typeof obj[pro] === 'object') {
                return reactive(obj[pro]);
            }
            return obj[pro];
        },
    });
    reactivties.set(obj, proxy);
    return proxy;
};
var effect = function (cb) {
    usedReactivties = [];
    cb();
    for (var _i = 0, usedReactivties_1 = usedReactivties; _i < usedReactivties_1.length; _i++) {
        var reactive_1 = usedReactivties_1[_i];
        if (!callbacks.has(reactive_1[0])) {
            callbacks.set(reactive_1[0], new Map());
        }
        if (!callbacks.get(reactive_1[0]).has(reactive_1[1])) {
            callbacks.get(reactive_1[0]).set(reactive_1[1], []);
        }
        callbacks.get(reactive_1[0]).get(reactive_1[1]).push(cb);
    }
};
var obj = {
    r: 0,
    g: 0,
    b: 0,
};
var po = reactive(obj);
effect(function () {
    ;
    document.getElementById('r').value = po.r;
});
effect(function () {
    ;
    document.getElementById('g').value = po.g;
});
effect(function () {
    ;
    document.getElementById('b').value = po.b;
});
effect(function () {
    ;
    document.getElementById('color').style.backgroundColor = "rgb(" + po.r + "," + po.g + "," + po.b + ")";
});
(_a = document.getElementById('r')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function (e) {
    if (!e.target) {
        return;
    }
    po.r = e.target.value;
});
(_b = document.getElementById('g')) === null || _b === void 0 ? void 0 : _b.addEventListener('input', function (e) {
    if (!e.target) {
        return;
    }
    po.g = e.target.value;
});
(_c = document.getElementById('b')) === null || _c === void 0 ? void 0 : _c.addEventListener('input', function (e) {
    if (!e.target) {
        return;
    }
    po.b = e.target.value;
});
