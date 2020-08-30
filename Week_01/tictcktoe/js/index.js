"use strict";
var WinFlag;
(function (WinFlag) {
    WinFlag[WinFlag["LOST"] = -1] = "LOST";
    WinFlag[WinFlag["DRAW"] = 0] = "DRAW";
    WinFlag[WinFlag["WIN"] = 1] = "WIN";
})(WinFlag || (WinFlag = {}));
window.onload = function () {
    var pattern = [
        [0, 0, 2],
        [0, 1, 0],
        [0, 0, 0],
    ];
    var color = 1;
    var board = document.getElementById('board');
    var move = function (x, y) {
        pattern[x][y] = color;
        if (check(pattern, color)) {
            alert(color === 2 ? '⭕ is winner!' : '❌ is winner!');
        }
        color = 3 - color; // TIPS  1,2 switch value
        show(pattern);
        if (willWin(pattern, color)) {
            alert(color === 2 ? '⭕ will winner!' : '❌ will winner!');
        }
    };
    var show = function (pattern) {
        board.innerHTML = '';
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var value = pattern[i][j];
                var cell = document.createElement('div');
                // div.setAttribute('class', 'cell')
                cell.classList.add('cell');
                cell.innerText = value === 0 ? ' ' : value === 1 ? '❌' : '⭕';
                cell.addEventListener('click', function (e) {
                    cell.innerText == '' && move(i, j);
                });
                board === null || board === void 0 ? void 0 : board.appendChild(cell);
            };
            for (var j = 0; j < pattern[i].length; j++) {
                _loop_2(j);
            }
            board === null || board === void 0 ? void 0 : board.appendChild(document.createElement('br'));
        };
        for (var i = 0; i < pattern.length; i++) {
            _loop_1(i);
        }
    };
    var check = function (pattern, color) {
        // horzontal direction
        // [0,0] = [0,1] = [0, 2]
        // [1,0] = [1,1] = [1, 2]
        // [2,0] = [2,1] = [2, 2]
        for (var i = 0; i < pattern.length; i++) {
            var win = true;
            for (var j = 0; j < pattern[i].length; j++) {
                if (pattern[i][j] !== color) {
                    win = false;
                }
            }
            if (win)
                return true;
        }
        // vertical direction
        // [0,0] = [1,0] = [2, 0]
        // [0,1] = [1,1] = [2, 1]
        // [0,2] = [1,2] = [2, 2]
        for (var i = 0; i < pattern.length; i++) {
            var win = true;
            for (var j = 0; j < pattern[i].length; j++) {
                if (pattern[j][i] !== color) {
                    win = false;
                }
            }
            if (win)
                return true;
        }
        // slash direction
        {
            var win = true;
            // 0,0 1,1 2,2
            for (var i = 0; i < pattern.length; i++) {
                if (pattern[i][i] !== color) {
                    win = false;
                }
            }
            if (win)
                return true;
        }
        {
            var win = true;
            // 0,2 1,1 2,0
            for (var i = 0; i < pattern.length; i++) {
                if (pattern[i][2 - i] !== color) {
                    win = false;
                }
            }
            if (win)
                return true;
        }
        return false;
    };
    /**
     * 遍历空节点，走下一步有没有哪一方将赢
     * @param pattern
     * @param color
     */
    var willWin = function (pattern, color) {
        for (var i = 0; i < pattern.length; i++) {
            for (var j = 0; j < pattern[i].length; j++) {
                var value = pattern[i][j];
                if (value) {
                    continue;
                }
                var patternNew = clone(pattern);
                patternNew[i][j] = color;
                if (check(patternNew, color)) {
                    return [i, j];
                }
            }
        }
        return null;
    };
    var clone = function (pattern) {
        return JSON.parse(JSON.stringify(pattern));
    };
    var bestChoice = function (pattern, color) {
        var p = null;
        if ((p = willWin(pattern, color))) {
            return {
                point: p,
                result: WinFlag.WIN,
            };
        }
        var result = -2;
        var point = null;
        for (var i = 0; i < pattern.length; i++) {
            for (var j = 0; j < pattern[i].length; j++) {
                if (pattern[i][j]) {
                    continue;
                }
                var temp = clone(pattern);
                temp[i][j] = color;
                var r = bestChoice(temp, 3 - color).result; // 对方的最佳，我方的最差
                if (-r > result) {
                    point = [i, j];
                    result = -r;
                }
            }
        }
        return {
            point: point ? point : [0, 0],
            result: point ? result : WinFlag.DRAW,
        };
    };
    show(pattern);
    console.log(bestChoice(pattern, color));
};
