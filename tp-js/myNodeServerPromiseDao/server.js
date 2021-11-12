var express = require('express');
var deviseApiRoutes = require('./devise-api-routes');
var app = express();

//support parsing of JSON post data
var jsonParser = express.json({  extended: true}); 
app.use(jsonParser);

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

app.use(deviseApiRoutes.apiRouter);// delegate REST API routes to apiRouter(s)

let backendPort = process.env.PORT || 8282; 
app.listen(backendPort , function () {
  console.log("http://localhost:"+backendPort);
});