var mongoose = require('mongoose');

var mongoDbUrl = 'mongodb://127.0.0.1:27017/test'; //by default

var currentDb=null; //current MongoDB connection

var setMongoDbUrl = function(dbUrl){
	mongoDbUrl = dbUrl;
}


var closeCurrentMongoDBConnection = function(){
	currentDb.close();
	currentDb=null;
}

var deviseSchema;//mongoose Shcema (structure of mongo document)
var PersistentDevise; //mongoose Model (constructor of persistent PersistentDevise)

var executeWithinMongoose = function(callbackWithinMongoose) {
  if(currentDb==null){
    mongoose.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error' , function() { console.log("mongoDb connection error = " + " for dbUrl=" + mongoDbUrl )});
    db.once('open', function() {
      // we're connected!
      console.log("Connected correctly to mongodb database" );
      currentDb = db;
      deviseSchema = new mongoose.Schema({
        _id: { type : String , alias : "code" } ,
        nom: String,
        change : Number
      });
      deviseSchema.set('id',false); //no default virtual id alias for _id
      deviseSchema.set('toJSON', { virtuals: true , 
                                   versionKey:false,
                                   transform: function (doc, ret) {   delete ret._id  }
                                 });
      //console.log("mongoose deviseSchema : " + JSON.stringify(deviseSchema) );
      //"Devise" model name is "Devise" collection name in mongoDB test database
      PersistentDevise = mongoose.model('Devise', deviseSchema);
      
      //console.log("mongoose PersistentDevise model : " + PersistentDevise );
      callbackWithinMongoose();
    });
  }else{
    callbackWithinMongoose();  
  }
}

function init_devise_db(){
  executeWithinMongoose( function() {
    const deleteAllFilter = { }
    PersistentDevise.deleteMany( deleteAllFilter, function (err) {
      if(err) console.log(JSON.stringify(err));
      //insert elements after deleting olds
      (new PersistentDevise({ code : "EUR" , nom : "Euro" , change : 1.0})).save();
      (new PersistentDevise({ code : "USD" , nom : "Dollar" , change : 1.1})).save();
      (new PersistentDevise({ code : "GBP" , nom : "Livre" , change : 0.9})).save();
      (new PersistentDevise({ code : "JPY" , nom : "Yen" , change : 123.7})).save();
    })
  });
}

function insert_new_devise(devise , cb_with_err){
  executeWithinMongoose( function() {
    var persistentDevise = new PersistentDevise(devise)
    persistentDevise.save(function (err, savedDevise) {
      cb_with_err(err);
    });
  });
}

function update_devise(devise , cb_with_err){
  executeWithinMongoose( function() {
    const filter = { _id : devise.code }
    PersistentDevise.updateOne( filter , devise,function (err, savedDevise) {
      cb_with_err(err);
    });
  });
}

function get_devises_by_criteria(criteria , cb_with_err_or_res){
  executeWithinMongoose( function() {
    PersistentDevise.find( criteria, function (err, devises) {
      cb_with_err_or_res(err,devises);
    })
  });
}

function get_devise_by_code(code , cb_with_err_or_res){
   executeWithinMongoose( function() {
    PersistentDevise.findById( code, function (err, devise) {
      cb_with_err_or_res(err,devise);
    })
  });
}

function delete_devise_by_code(code , cb_with_err){
  executeWithinMongoose( function() {
    const filter = { _id : code }
    PersistentDevise.deleteOne( filter, function (err) {
      cb_with_err(err);
    })
  });
}


module.exports.init_devise_db = init_devise_db;
module.exports.get_devises_by_criteria = get_devises_by_criteria;
module.exports.get_devise_by_code = get_devise_by_code ;
module.exports.delete_devise_by_code = delete_devise_by_code ;
module.exports.insert_new_devise = insert_new_devise;
module.exports.update_devise = update_devise;