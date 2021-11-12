import { my_ts_test } from "./fig-test";
var lastXc = undefined;
var lastYc = undefined;
window.addEventListener("load", function () {
    document.querySelector('#btnClear').addEventListener('click', function () {
        console.log("clear");
        clear_canvas();
    });
    document.querySelector('#btnTest').addEventListener('click', function () {
        console.log("test");
        my_ts_test();
    });
    document.querySelector('#myCanvas').addEventListener('click', function (evt) {
        log_coords(evt);
    });
});
function clear_canvas() {
    var canvasElement = document.getElementById("myCanvas");
    var ctx = canvasElement.getContext("2d");
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    lastXc = null;
    lastYc = null; //reset last coord for next line
}
function log_coords(evt) {
    var canvasElement = document.getElementById("myCanvas");
    var xC = evt.pageX - canvasElement.offsetLeft; //xC = x relative to canvas
    var yC = evt.pageY - canvasElement.offsetTop; //yC = relative to canvas
    var msg = "click at x=" + xC + " y=" + yC;
    console.log(msg);
    document.querySelector("#spanMsg").innerHTML = msg;
    var ctx = canvasElement.getContext("2d");
    if (lastXc == null && lastYc == null) {
        lastXc = xC;
        lastYc = yC;
    }
    ctx.beginPath();
    ctx.moveTo(lastXc, lastYc); //from last x,y
    ctx.lineTo(xC, yC); //to new xC,yC
    //ctx.closePath();
    lastXc = xC;
    lastYc = yC; //store last coord for next line
    ctx.stroke();
}
;
//# sourceMappingURL=fig-canvas.js.map