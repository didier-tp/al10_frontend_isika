var express = require('express');
const apiRouter = express.Router();

const axios = require('axios'); //pour appeler des WS REST avec des Promises

var deviseDao = require('./devise-dao-mongoose');
var PersistentdeviseModel = deviseDao.ThisPersistentModel; //to use only for specific extra request (not in dao)


function statusCodeFromEx(ex){
	let status = 500;
	error = ex?ex.error:null ; 
	switch(error){
		case "BAD_REQUEST" : status = 400; break;
		case "NOT_FOUND" : status = 404; break;
		//...
		case "CONFLICT" : status = 409; break;
		default: status = 500;
	}
	return status;
}

//exemple URL: http://localhost:8282/devise-api/private/role-admin/reinit
apiRouter.route('/devise-api/private/role-admin/reinit')
.get( async function(req , res  , next ) {
	try{
		let doneActionMessage = await deviseDao.reinit_db();
		res.send(doneActionMessage);
    } catch(ex){
	    res.status(statusCodeFromEx(ex)).send(ex);
    } 
});

//exemple URL: http://localhost:8282/devise-api/public/devise/EUR
apiRouter.route('/devise-api/public/devise/:id')
.get( async function(req , res  , next ) {
	var iddevise = req.params.id;
   /*
   //V1 (direct use of mogoose PersistentdeviseModel):
	PersistentdeviseModel.findById(iddevise ,	function(err,devise){
			if(err || devise==null)
			   res.status(404).send({err:'not found'});
			else
			  res.send(devise);
    */
	//V2: with ad hoc function of dao (returning Promise)
	try{
		let devise = await deviseDao.findById( iddevise);
		res.send(devise);
    } catch(ex){
	    res.status(statusCodeFromEx(ex)).send(ex);
    } 
});

//exemple URL: http://localhost:8282/devise-api/public/devise (returning all devise)
//             http://localhost:8282/devise-api/public/devise?changeMini=1.05
apiRouter.route('/devise-api/public/devise')
.get( async function(req , res  , next ) {
	var changeMini = Number(req.query.changeMini);
	var criteria=changeMini?{ change: { $gte: changeMini }  }:{};
	try{
		let devises = await deviseDao.findByCriteria(criteria);
		res.send(devises);
    } catch(ex){
	    res.status(statusCodeFromEx(ex)).send(ex);
    } 
});


// http://localhost:8282/devise-api/private/role-admin/devise en mode post
// avec { "code" : "mxy" , "nom" : "monnaieXy" , "change" : 123 }  dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
.post(async function(req , res  , next ) {
	var nouvelledevise = req.body;
	console.log("POST,nouvelledevise="+JSON.stringify(nouvelledevise));
	try{
		let saveddevise = await deviseDao.save(nouvelledevise);
		res.send(saveddevise);
    } catch(ex){
	    res.status(statusCodeFromEx(ex)).send(ex);
    }
});


// http://localhost:8282/devise-api/private/role-admin/devise en mode PUT
// avec { "code" : "USD" , "nom" : "Dollar" , "change" : 1.123 } dans req.body
apiRouter.route('/devise-api/private/role-admin/devise')
.put( async function(req , res  , next ) {
	var newValueOfdeviseToUpdate = req.body;
	console.log("PUT,newValueOfdeviseToUpdate="+JSON.stringify(newValueOfdeviseToUpdate));
	try{
		let updateddevise = await deviseDao.updateOne(newValueOfdeviseToUpdate);
		res.send(updateddevise);
    } catch(ex){
	    res.status(statusCodeFromEx(ex)).send(ex);
    }
});

//exemple URL: http://localhost:8282/devise-api/private/role-admin/devise/USD en mode DELETE
apiRouter.route('/devise-api/private/role-admin/devise/:id')
.delete( async function(req , res  , next ) {
	var iddevise = req.params.id;
	console.log("DELETE,iddevise="+iddevise);
	try{
		let deleteActionMessage = await deviseDao.deleteOne(iddevise);
		res.send(deleteActionMessage);
    } catch(ex){
	    res.status(statusCodeFromEx(ex)).send(ex);
    }
});

//http://localhost:8282/devise-api/public/convert?src=EUR&target=USD&amount=200
apiRouter.route('/devise-api/public/convert')
.get( async function(req , res  , next ) {
	var amount = Number(req.query.amount); //ex: 200
	var src = req.query.src; //ex: "EUR"
	var target = req.query.target; //ex: "USD"
	try{
		let [deviseSource, deviseTarget] = await Promise.all(
		          [ deviseDao.findById(src) , deviseDao.findById(target) ]);
		let montantConverti = amount * deviseTarget.change / deviseSource.change ;
		res.send(
			{
				amount : amount ,
				src : src ,
				target : target,
				result : montantConverti
			}
		);
    } catch(ex){
	    res.status(statusCodeFromEx(ex)).send(ex);
    } 
});

//***********************


//http://localhost:8282/devise-api/public/refresh
apiRouter.route('/devise-api/public/refresh')
	.get( async function(req , res  , next ) {
		//URL du web service a appeler:
		let url = "http://data.fixer.io/api/latest?access_key=26ca93ee7fc19cbe0a423aaa27cab235" //ici avec api-key de didier
		//type de réponse attendue:
		/*
		{"success":true,"timestamp":1635959583,"base":"EUR","date":"2021-11-03",
		"rates":{"AED":4.254663,"AFN":105.467869,..., "EUR":1 , ...}}
		*/

		try {
			const response = await axios.get(url);
			console.log(response);
			if(response.status==200){
				let respValue = response.data;
				if(respValue.success){
					//refresh database values:
					let newRates = respValue.rates;
					//console.log("newRates="+newRates);
					for(deviseKey in newRates){
						let deviseRate = newRates[deviseKey];
						//console.log(deviseKey + "-" + deviseRate);
						let devise = { code : deviseKey , change : deviseRate};
						switch(deviseKey){
							case "USD" : devise.nom = "Dollar"; break;
							case "JPY" : devise.nom = "Yen"; break;
							case "GBP" : devise.nom = "Livre"; break;
							default : devise = null;
						}
						if(devise!=null){
						   let updateddevise = await deviseDao.updateOne(devise);
					     }
					}
				}
				res.send(respValue);
			}else{
				res.status(500).send({ err : "error - "} );
			}
		  } catch (error) {
			console.error(error);
			res.status(500).send({ err : "error - " + error} );
		  }
		
		
	});

exports.apiRouter = apiRouter;