var mongoose = require('mongoose');
//var mongooseAutoIncrement = require('mongoose-auto-increment'); //in old v1

var mongoDbUrl = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017"; //by default


console.log("mongoDbUrl="+mongoDbUrl);
mongoose.connect(mongoDbUrl, {useNewUrlParser: true, 
	                              useUnifiedTopology: true , 
								  dbName : 'test'});
var thisDb  = mongoose.connection;
//mongooseAutoIncrement.initialize(thisDb);//in old v1

thisDb.on('error' , function() { 
      console.log("mongoDb connection error = " + " for dbUrl=" + mongoDbUrl )
    });

thisDb.once('open', function() {
      // we're connected!
      console.log("Connected correctly to mongodb database" );
    });

module.exports.thisDb = thisDb ;

