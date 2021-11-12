export class SimpleAsync{
    getUppercaseDataAfterDelay(data :string, delay :number) : Promise<string>{
        return new Promise (
        (resolve) => {
          setTimeout (()=> { resolve(  data.toUpperCase());}, delay);
        });  
      }
}