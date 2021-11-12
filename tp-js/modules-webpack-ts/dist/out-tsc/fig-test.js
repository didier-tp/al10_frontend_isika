import { CanvasVisitor } from "./canvas-fig-visitor";
import { ConsoleJsonVisitor } from "./console-fig-visitor";
import { Circle, Line, Rectangle } from "./fig";
export function my_ts_test() {
    var tabFig = new Array();
    tabFig.push(new Line(20, 20, 180, 200, "red"));
    tabFig.push(new Circle(100, 100, 50, "blue"));
    tabFig.push(new Circle(250, 200, 50, "black", 1, "blue"));
    tabFig.push(new Rectangle(200, 100, 50, 60, "green"));
    tabFig.push(new Rectangle(20, 100, 50, 60, "black", 1, "green"));
    var consoleVisitor = new ConsoleJsonVisitor();
    for (let f of tabFig) {
        f.performVisit(consoleVisitor);
    }
    var canvasVisitor = new CanvasVisitor("myCanvas");
    //for(let index in tabFig) { ... }
    for (let f of tabFig) {
        f.performVisit(canvasVisitor);
    }
}
//# sourceMappingURL=fig-test.js.map