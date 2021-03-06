"use strict";
/**
 * letcode 28
 * @param source
 * @param pattern
 */
var kmp = function (source, pattern) {
    var table = new Array(pattern.length).fill('0').map(function (_) { return 0; });
    {
        var i = 1, j = 0;
        while (i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++i;
                ++j;
                table[i] = j;
            }
            else {
                if (j > 0) {
                    j = table[j];
                }
                else {
                    ++i;
                }
            }
        }
        console.log(table);
    }
    {
        var i = 0, j = 0;
        while (i < source.length) {
            if (pattern[j] === source[i]) {
                ++i, ++j;
            }
            else {
                if (j > 0) {
                    j = table[j];
                }
                else {
                    ++i;
                }
            }
            if (j === pattern.length) {
                return true;
            }
        }
        return false;
    }
};
console.log(kmp('hello', 'll'));
