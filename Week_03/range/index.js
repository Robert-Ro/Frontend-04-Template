"use strict";
var dragableEle = document.getElementById('dragable');
var baseX = 0, baseY = 0;
dragableEle.addEventListener('mousedown', function (e) {
    var startX = e.clientX, startY = e.clientY;
    var up = function (e1) {
        baseX = baseX + e1.clientX - startX;
        baseY = baseY + e1.clientY - startY;
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
    };
    var move = function (e2) {
        var clientX = e2.clientX, clientY = e2.clientY;
        var x = clientX - startX > 0 ? clientX - startX : 0;
        var y = clientY - startY > 0 ? clientY - startY : 0;
        // dragableEle!.style.transform = `translate(${x + baseX}px, ${
        //     y + baseY
        // }px)`
        var range = getNearest(clientX, clientY);
        range === null || range === void 0 ? void 0 : range.insertNode(dragableEle);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
});
var container = document.getElementById('container');
var ranges = [];
for (var i = 0; i < container.childNodes[0].textContent.length; i++) {
    var range = document.createRange();
    range.setStart(container.childNodes[0], i);
    range.setEnd(container.childNodes[0], i);
    console.log(range.getBoundingClientRect());
    ranges.push(range);
}
var getNearest = function (x, y) {
    var min = Infinity;
    var nearest = null;
    for (var _i = 0, ranges_1 = ranges; _i < ranges_1.length; _i++) {
        var range = ranges_1[_i];
        var rect = range.getBoundingClientRect();
        var distance = Math.pow((rect.x - x), 2) + Math.pow((rect.y - y), 2);
        if (distance < min) {
            nearest = range;
            min = distance;
        }
    }
    return nearest;
};
