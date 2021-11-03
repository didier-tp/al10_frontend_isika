
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
} 
 
var app = {
    // Application Constructor
    initialize: function() {
       this.initPendu();
    },
    canvasElement : null,
	listeMots : [ "cordova" , "javascript" ,
              	"android" , "navigateur" , "internet" ],
	mot_a_deviner : null,
	mot_en_partie_devine : null,
	nb_lettres_a_trouver :0,
	lettreProposee : '?',
	nbEssais :0 ,
	maxNbEssais : 6,
	finPartie : false,
	
	dessinerPartiePendu: function (){
		var ctx = this.canvasElement.getContext("2d");
		ctx.beginPath();
		switch(this.nbEssais){
			case 1:	ctx.moveTo(10,140); ctx.lineTo(30,140); break;
			case 2:	ctx.moveTo(20,140); ctx.lineTo(20,10); break;
			case 3:	ctx.moveTo(20,10); ctx.lineTo(100,10); break;
			case 4:	ctx.moveTo(100,10); ctx.lineTo(100,30); break;
			case 5:	ctx.arc(100,50,20,0,2*Math.PI,false); break;
			case 6:	ctx.rect(70,70,60,60); break;
		}
		ctx.closePath();
		ctx.stroke();
	},
	
	initPendu: function() {
		this.canvasElement = document.getElementById("myCanvas");
		
		document.getElementById("btnJouer")
		  .addEventListener('click', this.onJouer.bind(this) , false);
		 
		document.getElementById("btnProposer")
		  .addEventListener('click', this.onProposerLettre.bind(this) , false);
		  
		this.onJouer();
    },
	

	onProposerLettre : function(){
		this.lettreProposee = document.getElementById("lettre").value;
		this.lettreProposee = this.lettreProposee.toLowerCase();
		console.log("lettreProposee=[" + this.lettreProposee + "]");
		if(this.lettreProposee != '' && this.lettreProposee != '?'
		      && this.mot_en_partie_devine.indexOf(this.lettreProposee)==-1){
			
			if(this.mot_a_deviner.indexOf(this.lettreProposee)>=0){
				document.getElementById("spanMsg").innerHTML="bonne lettre";
				for(i=0;i<this.mot_a_deviner.length;i++){
					if(this.mot_a_deviner.charAt(i)==this.lettreProposee){
					    this.mot_en_partie_devine = 
						   this.mot_en_partie_devine.replaceAt(i,this.lettreProposee);
						this.nb_lettres_a_trouver--;
					}
				}
				//console.log("nb_lettres_a_trouver="+this.nb_lettres_a_trouver);
				document.getElementById("spanMotMystere").innerHTML=this.mot_en_partie_devine;
				if(this.nb_lettres_a_trouver==0){
					document.getElementById("spanMsg").innerHTML="BRAVO !!!";
					this.finDePartie();
				}
			}
			else{
				document.getElementById("spanMsg").innerHTML="mauvaise lettre";
				this.nbEssais++;
			    var nbEssaisRestants = this.maxNbEssais - this.nbEssais;
				document.getElementById("spanNbEssaisRestants").innerHTML=nbEssaisRestants;
				this.dessinerPartiePendu();
				if(nbEssaisRestants==0){
					document.getElementById("spanMsg").innerHTML="PERDU , PENDU !!! "
					+ this.mot_a_deviner;
					this.finDePartie();
				}
			}
		}
	},
	
	finDePartie : function(){
		this.finPartie = true;
		document.getElementById("btnProposer").disabled = true;
		document.getElementById("btnJouer").disabled = false;
	},
	
	//jouer nouvelle partie :
	onJouer : function(){
		this.clear_canvas(); 
		this.nbEssais = 0; this.finPartie = false;
		var indiceAleatoire = Math.round(Math.random() * (this.listeMots.length -1) );
		console.log("indiceAleatoire=" + indiceAleatoire);
		this.mot_a_deviner = this.listeMots[indiceAleatoire].toLowerCase();
		//console.log("mot_a_deviner=" + this.mot_a_deviner);
		this.lettreProposee = '?';
		document.getElementById("lettre").value = this.lettreProposee;
		this.mot_en_partie_devine = "";
		this.nb_lettres_a_trouver = this.mot_a_deviner.length;
		//console.log("nb_lettres_a_trouver=" + this.nb_lettres_a_trouver);
		for(i=0;i<this.nb_lettres_a_trouver;i++){
			this.mot_en_partie_devine += ".";
		}
	    document.getElementById("spanMotMystere").innerHTML=this.mot_en_partie_devine;
		document.getElementById("spanMsg").innerHTML="le mot comporte " + this.nb_lettres_a_trouver + " lettres";
		document.getElementById("spanNbEssaisRestants").innerHTML=this.maxNbEssais;
		document.getElementById("btnProposer").disabled = false;
		document.getElementById("btnJouer").disabled = true;
	},
	
	clear_canvas : function(){
		var ctx = this.canvasElement.getContext("2d");
        ctx.clearRect ( 0 , 0 , this.canvasElement.width, this.canvasElement.height );
	},
	
    

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();