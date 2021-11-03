var s1;
s1 = "abc"; // OK
s1 = null; // OK or Not (if strictNullChecks)
s1 = undefined; // OK or Not (if strictNullChecks)
var a;
a = 2; // OK
a = null; // OK or Not (if strictNullChecks)
a = undefined; // OK or Not (if strictNullChecks)
var isOk;
isOk = true; // OK
isOk = false; // OK
isOk = null; // OK or Not (if strictNullChecks)
isOk = undefined; // OK or Not (if strictNullChecks)
function getLengthv1(s) {
    return s.length; // OK or Error: Object is possibly 'null' (if strictNullChecks)
}
