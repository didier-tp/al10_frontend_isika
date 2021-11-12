import { Circle, FigVisitor, Line, Rectangle } from "./fig";

export class ConsoleJsonVisitor  implements FigVisitor{

    doActionForCircle(c: Circle): void {
      console.log("{circle: " + JSON.stringify(c) +"}");
    }  
    
    doActionForLine(l: Line): void {
      console.log("{line: " + JSON.stringify(l) +"}"); 
    }
    doActionForRectangle(r: Rectangle): void {
      console.log("{rectangle:" + JSON.stringify(r) +"}");
    }
  
  }