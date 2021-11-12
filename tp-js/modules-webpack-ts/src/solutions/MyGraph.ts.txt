import { Serie } from './Serie';
 
declare function Chart(...args:any):void;

const NB_DEFAULT_COLORS=6;

enum MyGraphType { bar , line , pie , doughnut , horizontalBar };

//tableau des N premières couleurs par défaut ("background"):
var myGraphDefaultBackgroundColors: Array<String> = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)'
]
//tableau des N premières couleurs par défaut ("border/foreground"):
var myGraphDefaultBorderColors : Array<String>= [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]

 export class MySimpleGraph {
    //chartsMap = Map beetwen idCanvas and chart
    //to destroy old chart before create new one:
    private static chartsMap = new Map();
    private chart : any;
    public chartType : MyGraphType = MyGraphType.pie; 
    constructor(public idCanvasElement:string,
                public dataSerie:Serie<number>,
                public labelSerie:Serie<string>){
               
    }

    public setTypeChartAsString(strTypeChart:string){
        this.chartType=MyGraphType[strTypeChart];
    }


    render():void{
        
        //agrandir si besoin la taille des tableaux des couleurs
        if(this.labelSerie){
            let n = this.labelSerie.values.length;
            if(n>NB_DEFAULT_COLORS){
                for(let i=NB_DEFAULT_COLORS;i<n;i++){
                    //a peaufiner via petite alteration sur couleurs recopiees
                    myGraphDefaultBackgroundColors[i]=myGraphDefaultBackgroundColors[i%NB_DEFAULT_COLORS];
                    myGraphDefaultBorderColors[i]=myGraphDefaultBorderColors[i%NB_DEFAULT_COLORS];
                }
            }
        }

        let canvasElement :  HTMLCanvasElement
          =<HTMLCanvasElement> document.getElementById(this.idCanvasElement);
        let ctx : /*CanvasRenderingContext2D*/ any = canvasElement.getContext('2d');
        if(MySimpleGraph.chartsMap.has(this.idCanvasElement)) 
                 MySimpleGraph.chartsMap.get(this.idCanvasElement).destroy(); 
        this.chart = new Chart(ctx, {
            type: MyGraphType[this.chartType],
            data: {
                labels: this.labelSerie?this.labelSerie.values:[],
                datasets: [{
                    /*label: this.labelSerie?this.labelSerie.label:null,*/
                    data: this.dataSerie?this.dataSerie.values:[],
                    backgroundColor: myGraphDefaultBackgroundColors,
                    borderColor: this.chartType==MyGraphType.line?'blue':myGraphDefaultBorderColors,
                    borderWidth: 1,
                    fill : this.chartType==MyGraphType.line?false:true
                }]
            },
        options: {
                responsive:false,
                legend : { display : (this.chartType==MyGraphType.pie || this.chartType==MyGraphType.doughnut)?true:false},
                title:{
                  display:true,
                  text : this.labelSerie?this.labelSerie.label:'chart'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        MySimpleGraph.chartsMap.set(this.idCanvasElement,this.chart);
    }//end of render()

}

//if responsive:false --> keep original size of canvas in html
//if responsive:true (default value) --> automatic resize of canvas/chart to width of page (or container ?).