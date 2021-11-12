//NB:  process.stdin n'est reconnu ici par typescript 
//que si dépendance "@types/node": "^14.11.2" dans package.json
var stdin = process.stdin;
var stdout = process.stdout;

export class InteractiveComputer{
    x : number;
    y : number;
    z : number;

    constructor(){ 
        this.x=0; this.y=0; this.z=0;
    }

    static ask_(question : string) : Promise<string>{
        return new Promise ((resolve,reject)=> {
            stdin.resume();
            stdout.write(question + ": ");
            stdin.once('data', function(data : Buffer) {
                let dataAsString = data.toString().trim();
                if(dataAsString=="fin")
                    reject("end/reject");
                else
                resolve(dataAsString);
            });
        });
    }

   async ask_and_compute_x_plus_y() : Promise<number>{
        try {
            let valX = await InteractiveComputer.ask_("x");
            this.x=Number(valX); 
            let valY = await InteractiveComputer.ask_("y");
            this.y=Number(valY);
            let res=this.x+this.y ;
            console.log("(x+y)=" +res);
            return res;
        }catch(e) {
            console.log(e);
            throw new Error("xPlusY-error:"+e);
        }
    }

    async ask_and_compute_x_plus_y_fois_z(){
        try {
            let xPlusY = await this.ask_and_compute_x_plus_y();
            let valZ = await InteractiveComputer.ask_("z");
            this.z=Number(valZ); 
            let res=xPlusY*this.z ;
            console.log("(x+y)*z=" +res);
            process.exit();
        }
        catch(err) {
            console.log(err);
            process.exit();
        }
    }
} 

//petit test:
let interactiveComputer :InteractiveComputer = new InteractiveComputer();
interactiveComputer.ask_and_compute_x_plus_y_fois_z();