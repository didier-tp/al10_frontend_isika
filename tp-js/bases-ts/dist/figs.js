"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/*export*/ var Fig2D = /** @class */ (function () {
    function Fig2D(typeFig, lineColor, lineWidth, fillColor) {
        if (typeFig === void 0) { typeFig = "?"; }
        if (lineColor === void 0) { lineColor = "black"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        if (fillColor === void 0) { fillColor = undefined; }
        this.typeFig = typeFig;
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.fillColor = fillColor;
    }
    return Fig2D;
}());
/*export*/ var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(x1, y1, x2, y2, lineColor, lineWidth) {
        if (x1 === void 0) { x1 = 0; }
        if (y1 === void 0) { y1 = 0; }
        if (x2 === void 0) { x2 = 0; }
        if (y2 === void 0) { y2 = 0; }
        if (lineColor === void 0) { lineColor = "black"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        var _this = _super.call(this, "line", lineColor, lineWidth) || this;
        _this.x1 = x1;
        _this.y1 = y1;
        _this.x2 = x2;
        _this.y2 = y2;
        return _this;
    }
    Line.prototype.performVisit = function (visitor) {
        visitor.doActionForLine(this);
    };
    return Line;
}(Fig2D));
/*export*/ var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(xC, yC, r, lineColor, lineWidth, fillColor) {
        if (xC === void 0) { xC = 0; }
        if (yC === void 0) { yC = 0; }
        if (r === void 0) { r = 0; }
        if (lineColor === void 0) { lineColor = "black"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        if (fillColor === void 0) { fillColor = undefined; }
        var _this = _super.call(this, "circle", lineColor, lineWidth, fillColor) || this;
        _this.xC = xC;
        _this.yC = yC;
        _this.r = r;
        return _this;
    }
    Circle.prototype.performVisit = function (visitor) {
        visitor.doActionForCircle(this);
    };
    return Circle;
}(Fig2D));
/*export*/ var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(x1, y1, width, height, lineColor, lineWidth, fillColor) {
        if (x1 === void 0) { x1 = 0; }
        if (y1 === void 0) { y1 = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (lineColor === void 0) { lineColor = "black"; }
        if (lineWidth === void 0) { lineWidth = 1; }
        if (fillColor === void 0) { fillColor = undefined; }
        var _this = _super.call(this, "rectangle", lineColor, lineWidth, fillColor) || this;
        _this.x1 = x1;
        _this.y1 = y1;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Rectangle.prototype.performVisit = function (visitor) {
        visitor.doActionForRectangle(this);
    };
    return Rectangle;
}(Fig2D));
/*export*/ var ConsoleJsonVisitor = /** @class */ (function () {
    function ConsoleJsonVisitor() {
        this._alreadyOne = false;
    }
    ConsoleJsonVisitor.prototype.generateFirstLine = function () {
        console.log("[");
    };
    ConsoleJsonVisitor.prototype.generateLastLine = function () {
        console.log("]");
    };
    ConsoleJsonVisitor.prototype._doActionForFig = function (f) {
        var separateur = this._alreadyOne ? "," : "";
        console.log(separateur + JSON.stringify(f));
        this._alreadyOne = true;
    };
    ConsoleJsonVisitor.prototype.doActionForCircle = function (c) {
        this._doActionForFig(c);
    };
    ConsoleJsonVisitor.prototype.doActionForLine = function (l) {
        this._doActionForFig(l);
    };
    ConsoleJsonVisitor.prototype.doActionForRectangle = function (r) {
        this._doActionForFig(r);
    };
    return ConsoleJsonVisitor;
}());
/*export*/ var ConsoleSvgVisitor = /** @class */ (function () {
    function ConsoleSvgVisitor() {
    }
    ConsoleSvgVisitor.prototype.generateFirstLine = function () {
        console.log("<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>");
    };
    ConsoleSvgVisitor.prototype.generateLastLine = function () {
        console.log("</svg>");
    };
    ConsoleSvgVisitor.prototype._svgStyle = function (f) {
        var sStyle = "";
        if (f.lineColor) {
            sStyle += "stroke:" + f.lineColor + ";";
        }
        if (f.lineWidth) {
            sStyle += "stroke-width:" + f.lineWidth + ";";
        }
        if (f.fillColor) {
            sStyle += "fill:" + f.fillColor;
        }
        else {
            sStyle += "fill:none";
        }
        return sStyle ? "style='" + sStyle + "'" : "";
    };
    ConsoleSvgVisitor.prototype.doActionForCircle = function (c) {
        //<circle cx='140' cy='200' r='50' style='fill:red' />
        console.log("<circle cx='" + c.xC + "' cy='" + c.yC + "' r='" + c.r + "' " + this._svgStyle(c) + " />");
    };
    ConsoleSvgVisitor.prototype.doActionForLine = function (l) {
        //<line x1='150' y1='50' x2='250' y2='230'  style='fill:blue;stroke: mediumblue;' />
        console.log("<line x1='" + l.x1 + "' y1='" + l.y1 + "' x2='" + l.x2 + "' y2='" + l.y2 + "'  " + this._svgStyle(l) + " />");
    };
    ConsoleSvgVisitor.prototype.doActionForRectangle = function (r) {
        //<rect x='50' y='50' width='80' height='80' style='fill:green' />
        console.log("<rect x='" + r.x1 + "' y='" + r.y1 + "' width='" + r.width + "' height='" + r.height + "' " + this._svgStyle(r) + " />");
    };
    return ConsoleSvgVisitor;
}());
//mode="json" ou "svg"
function my_ts_test(mode) {
    var e_1, _a;
    var tabFig = new Array();
    tabFig.push(new Line(20, 20, 180, 200, "red"));
    tabFig.push(new Circle(100, 100, 50, "blue"));
    tabFig.push(new Circle(250, 200, 50, "black", 2, "blue"));
    tabFig.push(new Rectangle(200, 100, 50, 60, "green"));
    tabFig.push(new Rectangle(20, 100, 50, 60, "black", 3, "green"));
    var visitor;
    switch (mode) {
        case "svg":
            visitor = new ConsoleSvgVisitor();
            break;
        case "json":
        default:
            visitor = new ConsoleJsonVisitor();
    }
    visitor.generateFirstLine();
    try {
        for (var tabFig_1 = __values(tabFig), tabFig_1_1 = tabFig_1.next(); !tabFig_1_1.done; tabFig_1_1 = tabFig_1.next()) {
            var f = tabFig_1_1.value;
            f.performVisit(visitor);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (tabFig_1_1 && !tabFig_1_1.done && (_a = tabFig_1.return)) _a.call(tabFig_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    visitor.generateLastLine();
}
//my_ts_test("json");
my_ts_test("svg");
//NB: lancer node dist/figs.js > figs.json
// ou bien   node dist/figs.js > figs.svg
// pour générer un fichier .
//# sourceMappingURL=figs.js.map