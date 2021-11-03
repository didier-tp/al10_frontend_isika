function logWithImplicitAnyArg(x) {
    console.log("arg of implicitly any type : " + x);
}

logWithImplicitAnyArg(6);
logWithImplicitAnyArg("abc");

class StrangePerson {
    constructor(private name: string) {}
  
    badGoodbyeFunction() {
      //code bizarre avec sous fonction où this est mal interprété
      return function() {
        //this is inplicitly of any type here
        console.log(`Goodbye ${this.name}`);
      };
    }
  }

  let sp = new StrangePerson("toto");
  sp.badGoodbyeFunction()();//appel bizarre qui affichera Goodbye undefined
