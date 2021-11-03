let s1: string;
s1 = "abc";     // OK
s1 = null;      // OK or Not (if strictNullChecks)
s1 = undefined; // OK or Not (if strictNullChecks)

let a: number;
a = 2;         // OK
a = null;      // OK or Not (if strictNullChecks)
a = undefined; // OK or Not (if strictNullChecks)

let isOk: boolean;
isOk = true;      // OK
isOk = false;     // OK
isOk = null;      // OK or Not (if strictNullChecks)
isOk = undefined; // OK or Not (if strictNullChecks)


function getLengthv1(s: string | null) {
    return s.length;// OK or Error: Object is possibly 'null' (if strictNullChecks)
}