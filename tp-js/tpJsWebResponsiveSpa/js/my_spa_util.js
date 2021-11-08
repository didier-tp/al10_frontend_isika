
function loadJsScript( src ,callback /*facultative*/ ) {
  var es = document.querySelector('script[src="'+src+'"]');
  if(es!=null){
	  //console.log("already loaded script with src="+src);
	  if(callback) {
		   callback(); //ex: chargement page + eval de startXy()
	  }
  }else{
	  var s = document.createElement('script');
	  s.setAttribute( 'src', src );
	  if(callback){
		  s.onload=callback;
	  }
	  document.head.appendChild( s );
  }
}

function loadSubPart(idSubPartOfMainPage,urlSubPage,postLoadingActionToEval){
	   var divSubPart = document.getElementById(idSubPartOfMainPage);
	   makeAjaxGetRequest(urlSubPage , function(htmlData) {
		   divSubPart.innerHTML=htmlData ; 
		   if(postLoadingActionToEval){
			   eval(postLoadingActionToEval);
		   }
	   });
}
/* exemple d'utilisation: 


function initMainPageAfterLoad(){
	var btnP1 = document.getElementById("idP1");
	btnP1.addEventListener('click', function(event) {
	    loadJsScript("js/euroToFranc.js", function () {
		   loadSubPart("idAlternativeSubPart","sp_euroToFranc.html","startEuroToFranc()")
		});
	});
	var btnP2 = document.getElementById("idP2");
	btnP2.addEventListener('click', function(event) {
	    loadJsScript("lib/chart.2.7.3.min.js");
		loadJsScript("js/graph.js", function () {
			loadSubPart("idAlternativeSubPart","sp_graph.html","startGraph()")
		});
	});
}
window.addEventListener('load', initMainPageAfterLoad);

...
<div id="idAlternativeSubPart">...</div>
*/