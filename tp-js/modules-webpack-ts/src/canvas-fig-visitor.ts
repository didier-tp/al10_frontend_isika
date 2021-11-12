import { Circle, FigVisitor, Line, Rectangle } from "./fig";

export class CanvasVisitor  implements FigVisitor{
    private _canvasElement : any = null;
    private _ctx : any = null; //2d  context in html5 canvas
    constructor(public canvasId : string){
      this._canvasElement = document.getElementById(canvasId);
      this._ctx = this._canvasElement.getContext("2d");
    }
    doActionForCircle( c : Circle) : void {
       this._ctx.beginPath();
       this._ctx.arc(c.xC, c.yC, c.r, 0, 2 * Math.PI, false);
       if(c.fillColor != null){
           this._ctx.fillStyle = c.fillColor;
          this._ctx.fill();
         }
       this._ctx.lineWidth = c.lineWidth;
       this._ctx.strokeStyle =  c.lineColor;//'#003300';
       this._ctx.stroke();
    }
    doActionForLine( l : Line) : void {
      this._ctx.beginPath();
      this._ctx.moveTo(l.x1,l.y1);
      this._ctx.lineTo(l.x2,l.y2);
      this._ctx.strokeStyle =  l.lineColor;
      this._ctx.lineWidth = l.lineWidth;
      this._ctx.stroke();
    }
  
    doActionForRectangle( r : Rectangle) : void {
      this._ctx.beginPath();
      this._ctx.rect(r.x1,r.y1,r.width,r.height);
      if(r.fillColor != null){
           this._ctx.fillStyle = r.fillColor;
           this._ctx.fill();
         }
      this._ctx.strokeStyle =  r.lineColor;
      this._ctx.lineWidth = r.lineWidth;
      this._ctx.stroke();
    }
  }