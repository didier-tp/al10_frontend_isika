
export abstract class Fig2D {
  constructor(public lineColor : string = "black",
              public lineWidth : number = 1,
              public fillColor : string|undefined = undefined){
  }
abstract  performVisit(visitor : FigVisitor) : void ;
}

export class Line  extends Fig2D{
  constructor(public x1:number = 0 ,  public y1:number = 0 ,
              public x2:number = 0 ,  public y2:number = 0,
              lineColor : string = "black",
              lineWidth : number = 1){
                 super(lineColor,lineWidth);
  }
  performVisit(visitor : FigVisitor) : void {
     visitor.doActionForLine(this);
   }
}

export class Circle  extends Fig2D{
  constructor(public xC:number = 0 ,
              public yC:number = 0  ,
              public r:number = 0,
              lineColor : string = "black",
              lineWidth : number = 1,
              fillColor : string|undefined = undefined){
                 super(lineColor,lineWidth,fillColor);
  }
  performVisit(visitor : FigVisitor) : void {
    visitor.doActionForCircle(this);
  }
}

export class Rectangle  extends Fig2D{
  constructor(public x1:number = 0 ,
              public y1:number = 0 ,
              public width:number = 0 ,
              public height:number = 0,
              lineColor : string = "black",
              lineWidth : number = 1,
              fillColor : string|undefined = undefined){
                 super(lineColor,lineWidth,fillColor);
  }
  performVisit(visitor : FigVisitor) : void {
    visitor.doActionForRectangle(this);
  }
}

export interface FigVisitor {
  doActionForCircle( c : Circle) : void;
  doActionForLine( l : Line) : void;
  doActionForRectangle(r : Rectangle) : void;
}





