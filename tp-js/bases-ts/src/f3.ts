let tabVals = [ 1 , -2 , 3 , -4 , 5, -6 ];
console.log("tabVals="+tabVals);
let tabValsPositives : number[] = [];
tabVals.forEach( (v) => { if(v>=0) tabValsPositives.push(v); }  );
console.log("tabValsPositives="+tabValsPositives); 

let mapCarres = new Map<number,number>();
for(let i=0;i<=5;i++){
    mapCarres.set(i,i*i);
}
console.log("4 au carré vaut " + mapCarres.get(4));
for(let [k,v] of mapCarres.entries()){
    console.log("le carre de "+ k + " est " + v);
}