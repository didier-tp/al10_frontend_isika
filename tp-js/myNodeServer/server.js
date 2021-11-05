var express = require('express');
var fileUpload  = require('express-fileupload');
var deviseApiRoutes = require('./devise-api-routes_v1_sans_mongo');
//var deviseApiRoutes = require('./devise-api-routes_v2_avec_mongo');
//var deviseApiRoutes = require('./devise-api-routes_v3_avec_sqlite');
//var deviseApiRoutes = require('./devise-api-routes_v4_avec_mongoose');
var produitApiRoutes = require('./produit-api-routes_memory');
//var produitApiRoutes = require('./produit-api-routes_sqlite');
//var produitApiRoutes = require('./produit-api-routes_mongoose');
var uploadApiRoutes = require('./upload-api-routes');
//var bodyParser = require('body-parser'); //in old express version
var app = express();

//support parsing of JSON post data
var jsonParser = express.json({  extended: true}); //bodyParser.json({  extended: true}) ;
app.use(jsonParser);

//support for fileUpload: {  debug: true,  limits: { fileSize: 5 * 1024 * 1024 },}
app.use(fileUpload({
  limits: { fileSize: 15 * 1024 * 1024 }
}));

// CORS enabled with express/node-js :

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //ou avec "www.xyz.com" à la place de "*" en production

    res.header("Access-Control-Allow-Methods",
               "POST, GET, PUT, DELETE, OPTIONS"); 
    //default: GET 

    res.header("Access-Control-Allow-Headers",
               "Origin, X-Requested-With, Content-Type, Accept");

    next();
});


//les routes en /html/... seront gérées par express par
//de simples renvois des fichiers statiques
//du répertoire "./html"
app.use('/html', express.static(__dirname+"/html"));
app.get('/', function(req , res ) {
  res.redirect('/html/index.html');
});

app.use(deviseApiRoutes.apiRouter);// delegate REST API routes
app.use(produitApiRoutes.apiRouter);// to apiRouter(s)
app.use(uploadApiRoutes.apiRouter);

app.listen(8282 , function () {
  console.log("http://localhost:8282");
});