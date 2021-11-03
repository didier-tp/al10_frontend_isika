function logWithExplicitAnyArg(x) {
    console.log("arg of explicit any type : " + x);
}
//avec unknown depuis typescript 3.0:
function logWithExplicitUnknownArg(x) {
    console.log("arg of explicit unknown type : " + x);
}
logWithExplicitAnyArg(6);
logWithExplicitAnyArg("abc");
logWithExplicitUnknownArg(6);
logWithExplicitUnknownArg("abc");
//------------------------
var StrangePersonV2 = /** @class */ (function () {
    function StrangePersonV2(name) {
        this.name = name;
    }
    StrangePersonV2.prototype.badGoodbyeFunction = function () {
        //code bizarre avec sous fonction où this est mal interprété
        //code compilable avec l'option --noImplicitThis mais pas facilement déclenchable
        return function () {
            console.log("bad Goodbye " + this.name);
        };
    };
    StrangePersonV2.prototype.goodGoodbyeFunction = function () {
        var _this = this;
        //code bizarre avec sous fonction où lexical this est interprété dans arrow function (lambda)
        return function () {
            console.log("Goodbye " + _this.name);
        };
    };
    return StrangePersonV2;
}());
var sp2 = new StrangePersonV2("toto");
sp2.badGoodbyeFunction()(); //appel bizarre qui affichera Goodbye undefined
sp2.goodGoodbyeFunction()(); //appel bizarre qui affichera tout de meme Goodbye toto
