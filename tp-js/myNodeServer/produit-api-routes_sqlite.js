var express = require('express');
const apiRouter = express.Router();

var produit_dao_sqlite = require('./produit-dao-sqlite');

//exemple URL: http://localhost:8282/produit-api/public/produit/1
apiRouter.route('/produit-api/public/produit/:code')
.get( function(req , res , next ) {
    var codeProduit = req.params.code;
    produit_dao_sqlite.get_produit_by_code( codeProduit ,
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
    var prixMini = Number(req.query.prixMini);
    var whereClause=prixMini?"WHERE prix >= "+prixMini : "";
	//console.log("whereClause="+whereClause);
	produit_dao_sqlite.get_produits_by_WhereClause(whereClause,function(err,produits){
		   if(err) {
			   console.log("err="+err);
	       }
		   res.send(produits);
	});//end of get_produits_by_WhereClause()
});

// http://localhost:8282/produit-api/private/role-admin/produit en mode post
// avec { "code" : null , "nom" : "produitXy" , "prix" : 12.3 }
//ou bien { "nom" : "produitXy" , "prix" : 12.3 }dans req.body
apiRouter.route('/produit-api/private/role-admin/produit')
.post( function(req , res , next ) {
    var nouveauProduit = req.body;
    console.log("POST,nouveauProduit="+JSON.stringify(nouveauProduit));
    produit_dao_sqlite.insert_new_produit (nouveauProduit,
        function(err,lastID){
            if(err==null){
              nouveauProduit.code = lastID; 
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
    produit_dao_sqlite.update_produit (newValueOfProduitToUpdate ,
                function(err,nbChanges){
                        if(err || nbChanges ==0){
                            res.status(404).json({ err : "no produit to update with code=" + newValueOfProduitToUpdate.code });
                        }else{
                                res.send(newValueOfProduitToUpdate);
                         }
                });	//end of update_devise()
});

// http://localhost:8282/produit-api/private/role-admin/produit/1 
// en mode DELETE
apiRouter.route('/produit-api/private/role-admin/produit/:code')
.delete( function(req , res , next ) {
    var codeProduit = req.params.code;
    console.log("DELETE,codeProduit="+codeProduit);
    produit_dao_sqlite.delete_produit_by_code( codeProduit ,
        function(err,nbChanges){
            if(err || nbChanges ==0)
               res.status(404).send({ err : "not found , no delete" } );
            else
               res.send({ deletedProduitCode : codeProduit } );
       });
});

module.exports.apiRouter = apiRouter;