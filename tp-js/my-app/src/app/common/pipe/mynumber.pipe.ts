import { Pipe, PipeTransform } from '@angular/core';

// {{ v | mynumber : 2}}

@Pipe({
  name: 'mynumber'
})
export class MynumberPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let val : number = <number> Number(value);
    let nbDigits  = (<number> args[0]) | 2; //valeur par defaut = 2
    console.log("nbDigits="+nbDigits)
    let sVal = val.toString(); //ex: "3.14159"
    let posPoint = sVal.indexOf(".");
    if(posPoint>0){
        let debut = sVal.substring(0,posPoint);
        let fin = sVal.substring(posPoint+1);
        console.log("debut="+debut + " fin="+fin)
        if(fin.length>nbDigits){
          fin = fin.substring(0,nbDigits); //améliorable .
        }
        sVal = debut + "." + fin
    }
    return sVal;
  }

}
