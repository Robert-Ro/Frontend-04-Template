"use strict";
var findChars2 = function (target) {
    var foundA, foundB, foundC, foundD, foundE;
    for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
        var char = target_1[_i];
        if (char === 'a') {
            foundA = true;
        }
        else if (foundA && char === 'b') {
            foundB = true;
        }
        else if (foundB && char === 'c') {
            foundC = true;
        }
        else if (foundC && char === 'd') {
            foundD = true;
        }
        else if (foundD && char === 'e') {
            foundE = true;
        }
        else if (foundE && char === 'f') {
            return true;
        }
        else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
    return false;
};
console.log(findChars2('abcdefg'));
console.log(findChars2('abcdeg'));
