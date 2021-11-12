
export class Account {
    constructor(public num :number=0,
                public balance :number=0,
                public ownerId :number=0
              ){}
};

export class User {
    constructor(public userId :number=0,
                public firstName :string="?",
                public lastName :string="?"
              ){}
};

export interface CallBackWithStringValue{
    (val:string) : void;
}

export interface CallBackWithAccountValue{
    (val:Account) : void;
}

export interface CallBackWithUserValue{
    (val:User) : void;
}


export class MyAsyncSequence{

     private static getAccountByNum(num : number) :Account{
       //simulation (no database , no dataset):
       return new Account(num , 
                          Math.random() * 1000 /* balance/solde*/, 
                          Math.round(Math.random() * 100) /* owerId / userId */);
     }

     private static getUserById(id : number) :User{
          //simulation (no database , no dataset)
        return new  User(id, "firstName_"+id, "lastname"+id);
      }

     static getAccountByNumAfterDelayWithCb(num : number, delay : number,cbWithAccount : CallBackWithAccountValue,cbWithError : CallBackWithStringValue) : void{
        if(num>0)
           setTimeout (()=> { cbWithAccount(this.getAccountByNum(num))}, delay);
       else 
          setTimeout (()=> { cbWithError("invalid account number : " + num)}, delay);
  
      }

      static getUserByIdAfterDelayWithCb(id : number, delay : number , cbWithUser : CallBackWithUserValue,cbWithError : CallBackWithStringValue) : void{
          if(id>0)
            setTimeout (()=> { cbWithUser(this.getUserById(id))}, delay);
          else 
            setTimeout (()=> { cbWithError("invalid user id : " + id)}, delay);
      }


    static retreive_account_and_owner(accountNumber : number){
        let delay=5000; //ms
        //utilisation chaînée avec callbacks imbriquées:
        MyAsyncSequence.getAccountByNumAfterDelayWithCb(accountNumber,delay,
             (account) =>{
                console.log("account:" + JSON.stringify(account));
                MyAsyncSequence.getUserByIdAfterDelayWithCb(account.ownerId,delay, 
                    (user) =>{ console.log("user (owner of account):" + JSON.stringify(user));},
                    (errUser) => {console.log(errUser);});
             },
             (errAccount) => {console.log(errAccount);});
    }

}

//petit test:
MyAsyncSequence.retreive_account_and_owner(0);

MyAsyncSequence.retreive_account_and_owner(8);