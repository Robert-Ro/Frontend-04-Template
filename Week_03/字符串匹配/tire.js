"use strict";
var $ = Symbol('$');
/**
 * 字典树
 */
var Tire = /** @class */ (function () {
    function Tire() {
        this.root = Object.create(null);
    }
    Tire.prototype.inert = function (word) {
        var node = this.root;
        for (var _i = 0, word_1 = word; _i < word_1.length; _i++) {
            var c = word_1[_i];
            if (!node[c]) {
                node[c] = Object.create(null);
            }
            node = node[c];
        }
        if (!($ in node)) {
            node[$] = 0;
        }
        node[$]++;
    };
    Tire.prototype.most = function () {
        var max = 0;
        var maxWord = null;
        var visit = function (node, word) {
            if (node[$] && node[$] > max) {
                max = node[$];
                maxWord = word;
            }
            for (var p in node) {
                visit(node[p], word + p);
            }
        };
        visit(this.root, '');
        return [max, maxWord];
    };
    return Tire;
}());
var tire = new Tire();
var random = function (count) {
    var s = '';
    for (var index = 0; index < count; index++) {
        s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0));
    }
    return s;
};
for (var index = 0; index < 100000; index++) {
    tire.inert(random(4));
}
var most = tire.most();
console.log(most);
