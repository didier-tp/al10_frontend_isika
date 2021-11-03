function calculer(operation){
	var valA = Number(jQuery('#inputA').val());
	var valB = Number($('#inputB').val());
	var res=0;
	switch(operation){
		case '+': res=valA + valB; break;
		case '*': res=valA * valB; break;
		case '-': res=valA - valB; break;
		case '/': res=valA / valB; break;
	  }
	  $('#spanRes').html(res).css("color",res>=0?'blue':'red');
	  ajouterDansHistorique(valA,valB,operation,res)
}

function ajouterDansHistorique(a,b,op,res){
	var calcul=""+a+" "+op+" "+b+" = "+res;
	$('#ulHistorique').append("<li>"+calcul+"</li>");
}

jQuery(function() {
   //code déclenché dès le chargement de la page html:
   //$("#spanRes").html("0+0=0");
   
   $('#btnAdd').on("click",function(){ calculer('+');  });
   $('#btnMoins').on("click",function(){ calculer('-');  });
   $('#btnMult').on("click",function(){ calculer('*');  });
   jQuery('#btnDiv').on("click",function(){ calculer('/');  });
 
   $('#cbHisto').on("change",function(evt){ 
       //var estcoche = evt.target.checked;
	   var estCoche = $("#cbHisto").prop("checked");
	   //var estCoche = ($("#cbHisto").get(0)).checked;
	   console.log("estCoche="+estCoche);
		//V1:
        //$("#ulHistorique").css("display",estCoche?"block":"none");
		/*
		//V2:
		if(estCoche)
			$("#ulHistorique").show();
		 else
		   $("#ulHistorique").hide();
	   */
		//V3 (avec effet ):
		if(estCoche)
			$("#ulHistorique").fadeIn(800);//400ms par defaut
		 else
		   $("#ulHistorique").fadeOut(800);
   });
});