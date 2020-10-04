"use strict";
var findChars1 = function (target) {
    var foundA = false;
    for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
        var c = target_1[_i];
        if (c === 'a') {
            foundA = true;
        }
        else if (foundA && c === 'b') {
            return true;
        }
        else {
            foundA = false;
        }
    }
    return false;
};
console.log(findChars1('abc'));
console.log(findChars1('acbc'));
console.log(findChars1('acab'));
//abcdef
