export class ConsoleJsonVisitor {
    doActionForCircle(c) {
        console.log("{circle: " + JSON.stringify(c) + "}");
    }
    doActionForLine(l) {
        console.log("{line: " + JSON.stringify(l) + "}");
    }
    doActionForRectangle(r) {
        console.log("{rectangle:" + JSON.stringify(r) + "}");
    }
}
//# sourceMappingURL=console-fig-visitor.js.map