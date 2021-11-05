var express = require('express');
var ObjectID = require('mongodb').ObjectID;
// in server.js : var fileUpload = require('express-fileupload'); and app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }}));
const apiRouter = express.Router();

var myGenericMongoClient = require('./my_generic_mongo_client');


// exemple URL: http://localhost:8282/publication-api/public/publication
apiRouter.route('/publication-api/public/publication')
.get( function(req , res , next ) {
    var mongoQuery =  { } ;
    myGenericMongoClient.genericFindList('publications',mongoQuery,function(err,publications){
        //NB: futur besoin de limiter la taille de la réponse !!!!
        res.send(publications);
 });
});

//exemple URL: http://localhost:8282/publication-api/public/image-of-publication/....
apiRouter.route('/publication-api/public/image-of-publication/:codePublication')
.get( function(req , res  , next ) {
	var codePublication = req.params.codePublication;
    console.log("fetch image-of-publication for codePublication="+codePublication);
	myGenericMongoClient.genericFindOne('publications',
										{ '_id' : new ObjectID(codePublication) },
									    function(err,publication){
											if(publication==null)
											   res.status(404).send({ err : 'not found'});
											else{
                          binaryImage = Buffer.from(publication.base64ImageData, 'base64').toString('binary');
										       res.contentType(publication.imageType);//'image/jpeg'
                          res.end(binaryImage,"binary");
                          }
									   });
	
});

// http://localhost:8282/publication-api/private/role-admin/publication en mode post
// avec { ..... }
apiRouter.route('/publication-api/private/role-admin/publication')
.post( function(req , res , next ) {
    //var requestContentType = req.headers['content-type'];
    //console.log("requestContentType :" +requestContentType); multipart/form-data; boundary=----WebKitFormBoundarytvC8ZxCR8xDbe2GK or ...
    var jsonDataPartName="publication";
    var jsonDataPart = req.body[jsonDataPartName];
    console.log("posting or reposting new publication :" +jsonDataPart);
    var publication = jsonDataPart?JSON.parse(jsonDataPart):null; //explicit JSON.parse() needed here because multipart / formData / upload
  
    //NB: req.files should be produced by app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 },})); in server.js
    if (!req.files){
        //console.log('No files were uploaded.');
    }
     else{
      // req.files.fileNameXyz (ici .imageFile et .detailsFile) 
      let imageFile = req.files.imageFile ;
      if(imageFile){
          if(publication && !imageFile.truncated){
          publication.imageName=imageFile.name;
          publication.imageSize=imageFile.size;
          publication.imageType=imageFile.mimetype;
          publication.base64ImageData = Buffer.from(imageFile.data, 'binary').toString('base64'); //NB: max size of mongo doc = 16M , For big image > 16Mo use gridFSBucket 
          }
          // Use the mv() method to place the file somewhere on your server
          // NB: ./html/posts/images directory should exists
          imageFile.mv('./html/posts/images/' + imageFile.name, function(err) {
            if (err)
              console.log(imageFile.name + " was not upload");
            else 
              console.log(imageFile.name + " was upload in ./html/posts/images");
          });
      }
     }  
    
    if(publication){// POST : SAVE or UPDATE
        myGenericMongoClient.genericInsertOne('publications',
        publication,
       function(err,eId){
           if(err==null && eId !=null){
              delete publication.base64ImageData; //delete it because to big in response
              res.send( publication );
            }
           else 
             res.status(500).send({err : "cannot insert in database" ,
                                   cause : err});
      });
    }				   
});



module.exports.apiRouter = apiRouter;