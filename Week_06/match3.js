"use strict";
{
    var match = function (target) {
        var state = start_1;
        for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
            var c = target_1[_i];
            state = state(c);
        }
        return state === end_1;
    };
    var start_1 = function (char) {
        if (char === 'a') {
            return foundA_1;
        }
        else {
            return start_1;
        }
    };
    var end_1 = function (char) {
        return end_1;
    };
    var foundA_1 = function (char) {
        if (char === 'b') {
            return foundB_1;
        }
        else {
            return start_1(char);
        }
    };
    var foundB_1 = function (char) {
        if (char === 'c') {
            return foundC_1;
        }
        else {
            return start_1(char);
        }
    };
    var foundC_1 = function (char) {
        if (char === 'd') {
            return foundD_1;
        }
        else {
            return start_1(char);
        }
    };
    var foundD_1 = function (char) {
        if (char === 'e') {
            return foundE_1;
        }
        else {
            return start_1(char);
        }
    };
    var foundE_1 = function (char) {
        if (char === 'f') {
            return end_1;
        }
        else {
            return start_1(char);
        }
    };
    // console.log(match('abcdef'))
    console.log(match('abcedef'));
}
