
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

     public static getAccountByNumAfterDelay(num : number, delay : number) : Promise<Account>{
        return new Promise (
        (resolve, reject) => {
            if(num>0)
               setTimeout (()=> { resolve(this.getAccountByNum(num))}, delay);
            else 
               setTimeout (()=> { reject("invalid account number : " + num)}, delay);
        });  
      }

      public static getUserByIdAfterDelay(id : number, delay : number) : Promise<User>{
        return new Promise (
            (resolve, reject) => {
                if(id>0)
                   setTimeout (()=> { resolve(this.getUserById(id))}, delay);
                else 
                   setTimeout (()=> { reject("invalid user id : " + id)}, delay);
            });    
      }


    static async retreive_account_and_owner(accountNumber : number) {
       let delay=1500; //ms
        //avec enchainement de "async/await":
        try{
          const account = await MyAsyncSequence.getAccountByNumAfterDelay(accountNumber,delay)
          console.log("account:" + JSON.stringify(account));
          const user = await  MyAsyncSequence.getUserByIdAfterDelay(account.ownerId,delay);
          console.log("user (owner of account):" + JSON.stringify(user));
        }catch(err){
          console.log("apres try/catch: " + err);
        }
    }

}

//petit test:
MyAsyncSequence.retreive_account_and_owner(0);

MyAsyncSequence.retreive_account_and_owner(8);
console.log("suite immédiate sans attente...")