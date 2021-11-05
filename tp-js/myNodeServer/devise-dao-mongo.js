var myGenericMongoClient = require('./my_generic_mongo_client');

function replace_mongoId_byCode(devise){
	devise.code = devise._id;
	delete devise._id; 
	return devise;
}

//class DeviseDaoMongo {
    function findDeviseByCode(code) {
      return new Promise( (resolve,reject)=>{
            myGenericMongoClient.genericFindOne('devises',
                { '_id' : code },
                function(err,devise){
                    if(err || devise==null)
                      reject('not found');
                    else
                      resolve(replace_mongoId_byCode(devise));
                });
      });
    }
    
    //+plus autres méthodes CRUD
//}

module.exports.findDeviseByCode = findDeviseByCode;