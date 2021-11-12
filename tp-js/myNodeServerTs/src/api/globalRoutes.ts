//modules to load:
import { Request, Response ,NextFunction, Router} from 'express';
import *as path from "path"; 
export const globalRouter = Router();


var redirectDownloadToAngularIndexPage= 
  function(req :Request, res :Response , next: NextFunction ) {
    //send SPA index.html (or side *.js if base=".") 
    //instead of virtual relative angular routes "/ngr/*"
    let r = req.params.r;
    let relativeToDistApi__dirname_prefix="../../";
    let fileName ; 
    /* if(r.includes("."))
        fileName=r; //.js , .ico , .... (bundle or ... just aside index.html) , no necessary if base="/"
    else*/
       fileName="index.html";//main angular page    
    res.sendFile(path.join(__dirname, 
       relativeToDistApi__dirname_prefix  +'front-end/' + fileName));
   }

//NB all angular routes should begin with "ngr/" 
//in src/app/app.routing.module.ts (in angular app)

globalRouter.route('/ngr/:r') //simple angular relative route
.get(redirectDownloadToAngularIndexPage);

globalRouter.route('/ngr/*/:r') //complex angular relative route
.get(redirectDownloadToAngularIndexPage);


globalRouter.route('/')
.get(function(req, res , next) {
res.setHeader('Content-Type', 'text/html');
res.write("<html> <header>");
res.write('<meta http-equiv="refresh" content="0;URL=front-end/index.html">');
res.write("</header> <body>");
res.write("</body></html>");
res.end();
});

globalRouter.route('/test-ws')
.get(function(req, res , next) {
res.setHeader('Content-Type', 'text/html');
res.write("<html> <header>");
res.write("</header> <body>");
res.write('<p>test-ws for server.js (REST WS via nodeJs/express/mongoDB)</p>');
res.write("<br/>");
//res.write('<p><a href="login-api/private/role_admin/login"> liste des logins (pour admin seulement) </a></p>');
res.write("<br/>");
res.write('<a href="devise-api/public/devise/EUR">devise euro as Json string</a><br/>');
res.write('<a href="devise-api/public/convert?source=EUR&target=USD&amount=200">convertir 200 euros en dollars</a><br/>');
res.write('<a href="devise-api/public/devise">toutes les devises (Json)</a><br/>');
res.write('<a href="devise-api/public/devise?changeMini=1.1">devises avec change >= 1.1 (Json)</a><br/>');


res.write('<p>utiliser POSTMAN ou autre pour tester en mode POST,PUT,DELETE</p>');

res.write("</body></html>");
res.end();
});



