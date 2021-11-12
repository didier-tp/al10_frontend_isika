export class Serie<T> {
    constructor(public label : string ="?",
                public values : Array<T>=[]){
                }
    push(val:T){this.values.push(val);}
}

