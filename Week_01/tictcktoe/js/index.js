"use strict";
var WinFlag;
(function (WinFlag) {
    WinFlag[WinFlag["LOST"] = -1] = "LOST";
    WinFlag[WinFlag["DRAW"] = 0] = "DRAW";
    WinFlag[WinFlag["WIN"] = 1] = "WIN";
})(WinFlag || (WinFlag = {}));
var dimension = 3;
window.onload = function () {
    var pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var color = 1;
    var board = document.getElementById('board');
    var userMove = function (x, y) {
        pattern[x * dimension + y] = color;
        if (check(pattern, color)) {
            alert(color === 2 ? '⭕ is winner!' : '❌ is winner!');
        }
        color = 3 - color; // TIPS  1,2 switch value
        show();
        computerMove();
    };
    var computerMove = function () {
        var choice = bestChoice(pattern, color);
        if (choice.point) {
            pattern[choice.point[0] * dimension + choice.point[1]] = color;
        }
        if (check(pattern, color)) {
            alert(color === 2 ? '⭕ is winner!' : '❌ is winner!');
        }
        color = 3 - color;
        show();
    };
    var show = function () {
        board.innerHTML = '';
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var value = pattern[i * dimension + j];
                var cell = document.createElement('div');
                // div.setAttribute('class', 'cell')
                cell.classList.add('cell');
                cell.innerText = value === 0 ? ' ' : value === 1 ? '❌' : '⭕';
                cell.addEventListener('click', function (e) {
                    cell.innerText == '' && userMove(i, j);
                });
                board === null || board === void 0 ? void 0 : board.appendChild(cell);
            };
            for (var j = 0; j < dimension; j++) {
                _loop_2(j);
            }
            board === null || board === void 0 ? void 0 : board.appendChild(document.createElement('br'));
        };
        for (var i = 0; i < dimension; i++) {
            _loop_1(i);
        }
    };
    var check = function (pattern, color) {
        // horzontal direction 012 dimension45 678
        for (var i = 0; i < dimension; i++) {
            var win = true;
            for (var j = 0; j < dimension; j++) {
                if (pattern[i * dimension + j] !== color) {
                    win = false;
                }
            }
            if (win)
                return true;
        }
        // vertical direction 0dimension6 147 258
        for (var i = 0; i < dimension; i++) {
            var win = true;
            for (var j = 0; j < dimension; j++) {
                if (pattern[j * dimension + i] !== color) {
                    win = false;
                }
            }
            if (win)
                return true;
        }
        // slash direction
        {
            var win = true;
            // 0,4,8
            for (var i = 0; i < dimension; i++) {
                if (pattern[i * dimension + i] !== color) {
                    win = false;
                }
            }
            if (win)
                return true;
        }
        {
            var win = true;
            // 2,4,6
            for (var i = 0; i < dimension; i++) {
                if (pattern[i * 2 + 2] !== color) {
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
        for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                var value = pattern[i * dimension + j];
                if (value) {
                    continue;
                }
                var patternNew = clone(pattern);
                patternNew[i * dimension + j] = color;
                if (check(patternNew, color)) {
                    return [i, j];
                }
            }
        }
        return null;
    };
    var clone = function (pattern) {
        return Object.create(pattern); // memory
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
        outer: for (var i = 0; i < dimension; i++) {
            for (var j = 0; j < dimension; j++) {
                if (pattern[i * dimension + j]) {
                    continue;
                }
                var temp = clone(pattern);
                temp[i * dimension + j] = color;
                var r = bestChoice(temp, dimension - color).result; // 对方的最佳，我方的最差
                if (-r > result) {
                    point = [i, j];
                    result = -r;
                }
                if (result === 1) {
                    break outer; // 胜负分枝
                }
            }
        }
        return {
            point: point ? point : [0, 0],
            result: point ? result : WinFlag.DRAW,
        };
    };
    show();
};
