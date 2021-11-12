/*export*/ abstract class Fig2D {
    constructor(public typeFig : string = "?",
                public lineColor : string = "black",
                public lineWidth : number = 1,
                public fillColor : string|undefined = undefined){
    }
  abstract  performVisit(visitor : FigVisitor) : void ;
  }
  
  /*export*/ class Line  extends Fig2D{
    constructor(public x1:number = 0 ,  public y1:number = 0 ,
                public x2:number = 0 ,  public y2:number = 0,
                lineColor : string = "black",
                lineWidth : number = 1){
                   super("line",lineColor,lineWidth);
    }
    performVisit(visitor : FigVisitor) : void {
       visitor.doActionForLine(this);
     }
  }
  
  /*export*/ class Circle  extends Fig2D{
    constructor(public xC:number = 0 ,
                public yC:number = 0  ,
                public r:number = 0,
                lineColor : string = "black",
                lineWidth : number = 1,
                fillColor : string|undefined = undefined){
                   super("circle",lineColor,lineWidth,fillColor);
    }
    performVisit(visitor : FigVisitor) : void {
      visitor.doActionForCircle(this);
    }
  }
  
  /*export*/ class Rectangle  extends Fig2D{
    constructor(public x1:number = 0 ,
                public y1:number = 0 ,
                public width:number = 0 ,
                public height:number = 0,
                lineColor : string = "black",
                lineWidth : number = 1,
                fillColor : string|undefined = undefined){
                   super("rectangle",lineColor,lineWidth,fillColor);
    }
    performVisit(visitor : FigVisitor) : void {
      visitor.doActionForRectangle(this);
    }
  }
  
  /*export*/ interface FigVisitor {
    doActionForCircle( c : Circle) : void;
    doActionForLine( l : Line) : void;
    doActionForRectangle(r : Rectangle) : void;
    generateFirstLine() : void;
    generateLastLine() : void;
  }

  /*export*/ class ConsoleJsonVisitor  implements FigVisitor{
    private _alreadyOne  = false;

    generateFirstLine(): void {
        console.log("[");
    }
    generateLastLine(): void {
        console.log("]");
    }

    private _doActionForFig(f: Fig2D): void {
        let separateur = this._alreadyOne?",":"";
        console.log(separateur+JSON.stringify(f));
        this._alreadyOne =true;
      }

    doActionForCircle(c: Circle): void {
        this._doActionForFig(c);
    }  
    
    doActionForLine(l: Line): void {
        this._doActionForFig(l);
    }
    doActionForRectangle(r: Rectangle): void {
        this._doActionForFig(r);
    }
  }

  /*export*/ class ConsoleSvgVisitor  implements FigVisitor{

    generateFirstLine(): void {
        console.log("<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>");
    }
    generateLastLine(): void {
        console.log("</svg>");
    }

    private _svgStyle(f: Fig2D){
        let sStyle = "";
        if(f.lineColor) {
            sStyle += `stroke:${f.lineColor};`
         }
         if(f.lineWidth) {
            sStyle += `stroke-width:${f.lineWidth};`
         }
        if(f.fillColor) {
           sStyle += `fill:${f.fillColor}`
        } else{
            sStyle += `fill:none`
        }
        return sStyle?`style='${sStyle}'`:``;
    }

    doActionForCircle(c: Circle): void {
        //<circle cx='140' cy='200' r='50' style='fill:red' />
        console.log(`<circle cx='${c.xC}' cy='${c.yC}' r='${c.r}' ${this._svgStyle(c)} />`)
    }  
    
   
    doActionForLine(l: Line): void {
        //<line x1='150' y1='50' x2='250' y2='230'  style='fill:blue;stroke: mediumblue;' />
        console.log(`<line x1='${l.x1}' y1='${l.y1}' x2='${l.x2}' y2='${l.y2}'  ${this._svgStyle(l)} />`)
    }
    doActionForRectangle(r: Rectangle): void {
         //<rect x='50' y='50' width='80' height='80' style='fill:green' />
         console.log(`<rect x='${r.x1}' y='${r.y1}' width='${r.width}' height='${r.height}' ${this._svgStyle(r)} />`)
    }
  }

  //mode="json" ou "svg"
  function my_ts_test(mode : string){
    var tabFig : Fig2D[] = new Array<Fig2D>();
    tabFig.push(new Line(20,20,180,200,"red"));
    tabFig.push(new Circle(100,100,50,"blue"));
    tabFig.push(new Circle(250,200,50,"black",2,"blue"));
    tabFig.push(new Rectangle(200,100,50,60,"green"));
    tabFig.push(new Rectangle(20,100,50,60,"black",3,"green"));

    var visitor : FigVisitor;
    switch(mode){
        case "svg":
            visitor = new ConsoleSvgVisitor();
            break;
        case "json":
        default: 
             visitor = new ConsoleJsonVisitor();
    }
  
    visitor.generateFirstLine();
    for( let f  of tabFig){
      f.performVisit(visitor);
    }
    visitor.generateLastLine();

}

//my_ts_test("json");
my_ts_test("svg");

//NB: lancer node dist/figs.js > figs.json
// ou bien   node dist/figs.js > figs.svg
// pour générer un fichier .