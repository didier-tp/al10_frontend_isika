let s2: string;
s2 = "abc";     // OK
//s2 = null;    // Error
//s2 = undefined; // Error

let s3: string | null;
s3="abc";
s3=null; //OK
//s3=undefined; // Error

/*
function getLengthVa(s: string | null) {
    return s.length;// Error: Object is possibly 'null'.
}*/

function getLengthVb(s: string | null) {
    /*
    if (s === null) 
        return 0;
    else
        return s.length;
    */
    return s ? s.length : 0;
}

let a2: number;
a2 = 2;         // OK
//a2 = null;       // Error
//a2 = undefined;  // Error

let ok: boolean;
ok = true;      // OK
ok = false;     // OK
//ok = null;       // Error
//ok = undefined;  // Error

type UserV1 = {
    firstName: string;
    lastName: string | undefined;
};
  
let u1: UserV1 = { firstName: "jen", lastName: "Bon" };
let u2: UserV1 = { firstName: "jean", lastName: undefined };
//let ub2: UserV1 = { firstName: "jean", lastName: null }; //Error
//let u3: UserV1 = { firstName: "jean" }; //Error

type UserV2 = {
    firstName: string;
    lastName?: string;
};
  
let user1: UserV2 = { firstName: "jen", lastName: "Bon" };
let user2: UserV2 = { firstName: "jean", lastName: undefined };
//let user2b: UserV2 = { firstName: "jean", lastName: null }; //Error
let user3: UserV2 = { firstName: "jean" }; //OK
  
type UserV3 = {
    firstName: string;
    lastName?: string | null ; //ok but need to be checked
};
  
let uu: UserV3 = { firstName: "jean", lastName: null }; //ok

function getFullName(person: UserV3): string {
    if (! person.lastName) {
      return person.firstName;
    }
    return `${person.firstName} ${person.lastName}`;
}
