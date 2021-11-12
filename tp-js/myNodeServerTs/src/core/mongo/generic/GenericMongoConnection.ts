import { MongoClient, Db } from "mongodb";

export class MyMongoConnection {
  
    private  dbUrl : string = null;
    private  mongoClient : MongoClient = null;
    private  db : Db =null; 

    private initialized: boolean = false ;

    private host: string = null;  //"localhost" or ...
    private port: number =  null; //27017 ou ...
    private dbName: string = null; // "test" , "admin" , "db1" , ...
    private username: string = null;
    private password: string = null ;
	
	private static uniqueInstance : MyMongoConnection = null; 
	
	static getInstance(): MyMongoConnection{
		if(MyMongoConnection.uniqueInstance==null){
			MyMongoConnection.uniqueInstance=new MyMongoConnection();
		}
		return MyMongoConnection.uniqueInstance;
	}

    constructor(){
        this.host = "localhost";  this.port = 27017;
        this.dbName = "test";  
		this.username = null; 
		this.password = null;
        let optionalAuthUrlPart = "";
        if(this.username!=null && this.password != null){
            optionalAuthUrlPart = `${this.username}:${this.password}@`
        }
        this.dbUrl = `mongodb://${optionalAuthUrlPart}${this.host}:${this.port}/${this.dbName}`;       
        //openConnection(); should be called AFTER (Promise)
    }

    public openConnection() : Promise<string>{
        console.log("MyMongoConnection, trying openConnection with dbUrl="+this.dbUrl);
        return new Promise((resolve,reject) => {
            if(this.initialized)
               resolve("mongodb connection already initialized");
            else
              MongoClient.connect(this.dbUrl,{ useNewUrlParser: true ,  useUnifiedTopology: true  } ,(err,mongoCli)=>{
                if(err != null){
                    reject("mongodb connection fail");
                }else{
                    this.mongoClient = mongoCli;
                    this.db = this.mongoClient.db(this.dbName);
                    this.initialized=true;
                    resolve("mongodb connection succeed");
                }
            }); 
            
        });
    }
    public closeConnection() : Promise<void>{
       return  this.mongoClient.close();
    }
    public currentDb() : Db {
        return this.db;
    }

    public currentConnection(): object {
        return this.currentDb();
    }

    public isInitialized():boolean{ return this.initialized;}
}