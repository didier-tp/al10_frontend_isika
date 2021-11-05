var mongoose = require('mongoose');
mongooseAutoIncrement = require('mongoose-auto-increment');

var mongoDbUrl = 'mongodb://127.0.0.1:27017/test'; //by default

var produitSchema;//mongoose Shcema (structure of mongo document)
var PersistentProduitModel; //mongoose Model (constructor of persistent PersistentProduitModel)

var initMongooseWithSchemaAndModel = function(callbackWithPersistentModel) {
    mongoose.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    mongooseAutoIncrement.initialize(db);

    db.on('error' , function() { console.log("mongoDb connection error = " + " for dbUrl=" + mongoDbUrl )});
    db.once('open', function() {
      // we're connected!
      console.log("Connected correctly to mongodb database" );
      produitSchema = new mongoose.Schema({
        /* default mongo _id: { type : String , alias : "id" } ,*/
        code : Number ,
        nom: String,
        prix : Number
      });
      //produitSchema.set('id',false); //no default virtual id alias for _id
      produitSchema.set('toJSON', { virtuals: false , 
                                   versionKey:false,
                                   transform: function (doc, ret) {   delete ret._id  }
                                 });
      produitSchema.plugin(mongooseAutoIncrement.plugin, {
                                  model: 'Produit',
                                  field: 'code' /* _id by default*/ ,
                                  startAt: 1,
                                  incrementBy: 1
                              });                          
      //console.log("mongoose produitSchema : " + JSON.stringify(produitSchema) );
      //"Devise" model name is "Devise" collection name in mongoDB test database
      PersistentProduitModel = mongoose.model('Produit', produitSchema);
      
      //console.log("mongoose PersistentProduitModel : " + PersistentProduitModel );
      if(callbackWithPersistentModel)
           callbackWithPersistentModel(PersistentProduitModel);
    });
}


function init_produit_db(){
  initMongooseWithSchemaAndModel(
    function(PersistentProduitModel) {
      const deleteAllFilter = { }
      PersistentProduitModel.deleteMany( deleteAllFilter, function (err) {
        if(err) console.log(JSON.stringify(err));
        //insert elements after deleting olds
        (new PersistentProduitModel({ code : 1 , nom : "Classeur" , prix : 4.0})).save();
        (new PersistentProduitModel({ code : 2 , nom : "Cahier" , prix : 2.1})).save();
        (new PersistentProduitModel({ code : 3 , nom : "Colle" , prix : 2.4})).save();
        (new PersistentProduitModel({ code : 4 , nom : "Stylo" , prix : 1.9})).save();
      })
  });
}

module.exports.initMongooseWithSchemaAndModel=initMongooseWithSchemaAndModel;
module.exports.init_produit_db = init_produit_db;
