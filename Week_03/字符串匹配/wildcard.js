"use strict";
var find = function (source, pattern) {
    var startCount = 0;
    for (var index = 0; index < pattern.length; index++) {
        if (pattern[index] === '*') {
            startCount++;
        }
    }
    if (startCount === 0) {
        for (var index = 0; index < pattern.length; index++) {
            if (source[index] !== pattern[index] && pattern[index] !== '?') {
                return false;
            }
        }
        return true;
    }
    var i = 0;
    var lastIndex = 0;
    for (var index = 0; pattern[i] !== '*'; index++) {
        if (pattern[index] !== source[index] && pattern[index] !== '?') {
            return false;
        }
    }
    lastIndex = i;
    for (var p = 0; p < startCount - 1; p++) {
        i++;
        var subPattern = '';
        while (pattern[i] !== '*') {
            subPattern += pattern[i];
            i++;
        }
        var reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'), 'g');
        reg.lastIndex = lastIndex; // NOTE 重要属性
        console.log(reg.exec(source));
        if (!reg.exec(source)) {
            return false;
        }
        lastIndex = reg.lastIndex;
    }
    for (var j = 0; j <= source.length - lastIndex && pattern[pattern.length - j]; j++) {
        if (pattern[pattern.length - j] !== source[source.length - j] &&
            pattern[pattern.length - j] !== '?') {
            return false;
        }
    }
    return true;
};
console.log(find('abcabcabxaac', 'a*b*bx*c'));
