var s2;
s2 = "abc"; // OK
//s2 = null;    // Error
//s2 = undefined; // Error
var s3;
s3 = "abc";
s3 = null; //OK
//s3=undefined; // Error
/*
function getLengthVa(s: string | null) {
    return s.length;// Error: Object is possibly 'null'.
}*/
function getLengthVb(s) {
    /*
    if (s === null)
        return 0;
    else
        return s.length;
    */
    return s ? s.length : 0;
}
var a2;
a2 = 2; // OK
//a2 = null;       // Error
//a2 = undefined;  // Error
var ok;
ok = true; // OK
ok = false; // OK
var u1 = { firstName: "jen", lastName: "Bon" };
var u2 = { firstName: "jean", lastName: undefined };
var user1 = { firstName: "jen", lastName: "Bon" };
var user2 = { firstName: "jean", lastName: undefined };
//let user2b: UserV2 = { firstName: "jean", lastName: null }; //Error
var user3 = { firstName: "jean" }; //OK
var uu = { firstName: "jean", lastName: null }; //ok
function getFullName(person) {
    if (!person.lastName) {
        return person.firstName;
    }
    return person.firstName + " " + person.lastName;
}
