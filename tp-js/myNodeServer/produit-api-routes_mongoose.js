var express = require('express');
const apiRouter = express.Router();

var produit_dao_mongoose = require('./produit-dao-mongoose');
var PersistentProduitModel;
produit_dao_mongoose.initMongooseWithSchemaAndModel(
	function(InitializedPersistentProduitModel) {
		PersistentProduitModel=InitializedPersistentProduitModel
	}
);

//exemple URL: http://localhost:8282/produit-api/public/produit/1
apiRouter.route('/produit-api/public/produit/:code')
.get( function(req , res , next ) {
    var codeProduit = req.params.code;
    var query={ code : codeProduit };
    PersistentProduitModel.findOne( query ,
        function(err,produit){
            if(produit==null)
               res.status(404).send({ err : 'not found'});
            else
               res.send(produit);
       });
});

// exemple URL: http://localhost:8282/produit-api/public/produit
// returning all produits if no ?prixMini
// http://localhost:8282/produit-api/public/produit?prixMini=1.05
apiRouter.route('/produit-api/public/produit')
.get( function(req , res , next ) {
    var prixMini = req.query.prixMini;
    var criteria=prixMini?{ prix : { $gte: prixMini } }:{};
	PersistentProduitModel.find(criteria,function(err,produits){
		   if(err) {
			   console.log("err="+err);
	       }
		   res.send(produits);
	});//end of find()
});

// http://localhost:8282/produit-api/private/role-admin/produit en mode post
// avec { "code" : null , "nom" : "produitXy" , "prix" : 12.3 }
//ou bien { "nom" : "produitXy" , "prix" : 12.3 }dans req.body
apiRouter.route('/produit-api/private/role-admin/produit')
.post( function(req , res , next ) {
    var nouveauProduit = req.body;
    console.log("POST,nouveauProduit="+JSON.stringify(nouveauProduit));
    var persistentProduit = new PersistentProduitModel(nouveauProduit)
	persistentProduit.save ( function(err,savedProduit){
                                             if(err==null){
                                               nouveauProduit.code = savedProduit.code;
                                               //autoincr by mongoose-auto-increment (optional plugin )
                                               res.send(nouveauProduit);
                                             }
											 else 
											   res.status(500).send({err : "cannot insert in database" ,
											                         cause : err});
									    });
});

// http://localhost:8282/produit-api/private/role-admin/produit en mode PUT
// avec { "code" : 1 , "nom" : "produit_xy" , "prix" : 16.3 } dans req.body
apiRouter.route('/produit-api/private/role-admin/produit')
.put( function(req , res , next ) {
    var newValueOfProduitToUpdate = req.body;
    console.log("PUT,newValueOfProduitToUpdate="
            +JSON.stringify(newValueOfProduitToUpdate));
    const filter = { code : newValueOfProduitToUpdate.code }
    PersistentProduitModel.updateOne( filter , newValueOfProduitToUpdate,
             function(err,opResultObject){
                   //console.log(JSON.stringify(opResultObject))
                   if(err || opResultObject.n == 0)
                        res.status(404).json({ err : "no product to update with code=" + newValueOfProduitToUpdate.code });
                    else{
                            res.send(newValueOfProduitToUpdate);
                     }
            });	//end of updateOne()
});

// http://localhost:8282/produit-api/private/role-admin/produit/1 
// en mode DELETE
apiRouter.route('/produit-api/private/role-admin/produit/:code')
.delete( function(req , res , next ) {
    var codeProduit = req.params.code;
    console.log("DELETE,codeProduit="+codeProduit);
    const filter = { code : codeProduit }
	PersistentProduitModel.deleteOne( filter,
			function(err,opResultObject){
				if(err || opResultObject.n == 0)
					 res.status(404).send({ err : "not found , no delete" } );
				else
					res.send({ deletedProductCode : codeProduit } );
			});
});

module.exports.apiRouter = apiRouter;