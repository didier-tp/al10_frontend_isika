function logWithExplicitAnyArg(x:any) {
    console.log("arg of explicit any type : " + x);
}

//avec unknown depuis typescript 3.0:
function logWithExplicitUnknownArg(x :unknown) {
    console.log("arg of explicit unknown type : " + x);
}

logWithExplicitAnyArg(6);
logWithExplicitAnyArg("abc");

logWithExplicitUnknownArg(6);
logWithExplicitUnknownArg("abc");

//------------------------

class StrangePersonV2 {
    constructor(private name: string) {}
  
    badGoodbyeFunction() {
      //code bizarre avec sous fonction où this est mal interprété
      //code compilable avec l'option --noImplicitThis mais pas facilement déclenchable
      return function(this : StrangePersonV2) {
        console.log(`bad Goodbye ${this.name}`);
      };
    }


    goodGoodbyeFunction() {
        //code bizarre avec sous fonction où lexical this est interprété dans arrow function (lambda)
        return () => {
          console.log(`Goodbye ${this.name}`);
        };
      }

  }

  let sp2 = new StrangePersonV2("toto");
  (<any>sp2.badGoodbyeFunction())();//appel bizarre qui affichera Goodbye undefined
  sp2.goodGoodbyeFunction()();//appel bizarre qui affichera tout de meme Goodbye toto
