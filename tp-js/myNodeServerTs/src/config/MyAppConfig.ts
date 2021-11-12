export class MyAppConfig {
    private static noDB : boolean = null ;

    static initialize(){
        if(process.argv.includes("--noDB")){
            MyAppConfig.noDB = true;
          }else{
            MyAppConfig.noDB = false;
          }
    }

    public static isNoDB(){
        if(MyAppConfig.noDB==null){
            MyAppConfig.initialize();
        }
        return MyAppConfig.noDB;
    }
}