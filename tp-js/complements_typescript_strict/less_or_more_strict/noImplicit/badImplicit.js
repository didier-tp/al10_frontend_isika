function logWithImplicitAnyArg(x) {
    console.log("arg of implicitly any type : " + x);
}
logWithImplicitAnyArg(6);
logWithImplicitAnyArg("abc");
var StrangePerson = /** @class */ (function () {
    function StrangePerson(name) {
        this.name = name;
    }
    StrangePerson.prototype.badGoodbyeFunction = function () {
        //code bizarre avec sous fonction où this est mal interprété
        return function () {
            //this is inplicitly of any type here
            console.log("Goodbye " + this.name);
        };
    };
    return StrangePerson;
}());
var sp = new StrangePerson("toto");
sp.badGoodbyeFunction()(); //appel bizarre qui affichera Goodbye undefined
