var a = 12; console.log("type de a="+typeof a);
var sB = "13"; console.log("type de sB="+typeof sB);
var b = Number(sB);
var c = a+b;
console.log("c=a+b="+c);
var d;
console.log("d="+d);
console.log("type de d="+typeof d);
if(c=="25") console.log("c vaut 25");
if(c==="25") 
    console.log("c vaut 25 et est de type string");
 else 
   console.log("c ne vaut pas 25 ou bien n'est pas de type string");