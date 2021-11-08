
var myCanvas; //canvasElement 
var myStatusMsg; //zone ou afficher xC,yC
var xC,yC; //new (x,y) relative to canvas
var x1,y1,x2,y2; //mousedown(x1,y1) , mouseup(x2,y2)
                // relative to canvas
var typeFigure="ligne"; //par defaut
var couleur="black"; //par defaut
 

function compute_xC_yC_relativeTocanvas(e,canvasElement){
		xC = e.pageX - canvasElement.offsetLeft;
		yC = e.pageY - canvasElement.offsetTop;
	}
	
function clear_canvas(){
	    //***********A FAIRE EN TP **********************
		//effacer le contenu du canvas , en
		//- récupérant un accès au context "2d" (variable locale "ctx")
        //- appelant la méthode ctx.clearRect (x1,y1,x2,y2 )
		//sachant qu'il existe myCanvas.width et myCanvas.height 
		//...
		//************************************************
		var ctx = myCanvas.getContext("2d");
		ctx.clearRect (0,0,myCanvas.width,myCanvas.height )
	}
	
function set_and_log_coords_xC_yC(event){
		compute_xC_yC_relativeTocanvas(event,myCanvas);
		var msg="x=" + xC + " y=" + yC;
		console.log(msg);
		myStatusMsg.innerHTML=msg;
	}

function setTypeFig(tf){
   typeFigure=tf;
   console.log("typeFigure="+typeFigure);
}	
	
function log_coords_and_setX1Y1(event){
		set_and_log_coords_xC_yC(event);
		x1=xC; y1=yC;
	}
	
function log_coords_and_drawFig(event){
		set_and_log_coords_xC_yC(event);
		x2=xC; y2=yC;
		var selectCouleur = document.getElementById("selCouleur");
		couleur = selectCouleur.value;
		console.log("couleur="+couleur);
		var empty = false; //par defaut
		var cbEmpty = document.getElementById("cbEmpty");
		empty=cbEmpty.checked;
		var ctx = myCanvas.getContext("2d");
		ctx.beginPath();
		ctx.strokeStyle=couleur;
		ctx.fillStyle=couleur;
		ctx.strokeWidth=1;
		switch(typeFigure){
		case "ligne":	
		   //***********A FAIRE EN TP **********************
		   //dessiner une line du point (x,y) vers le point (xC,yC)
		    //...via ctx.moveTo(,) et ctx.lineTo(,)
			//************************************************
			ctx.moveTo(x1,y1) 
		    ctx.lineTo(x2,y2)
			break;
		case "rect":	
		    //***********A FAIRE EN TP **********************
		    //dessiner un rectangle partant du point (x1,y1) 
			//et ayant comme largeur x2-x1  et comme hauteur y2-y1
		    //...via ctx.rect(x,y,l,h)
			//************************************************
			ctx.rect(x1,y1,x2-x1,y2-y1)
			if(!empty) ctx.fill();
			break;
		case "cercle":	
		    r=Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
			ctx.arc(x1, y1, r, 0 /*startAngle*/, 2 * Math.PI /*endAngle*/, false);
			if(!empty) ctx.fill();
			break;
		}
		ctx.closePath();
		ctx.stroke();
	}
	
function startDessin(){ 

	myCanvas = document.getElementById("myCanvas");
    myStatusMsg  = document.getElementById("my_status_msg");
	myCanvas.addEventListener("mousemove" , set_and_log_coords_xC_yC);
	myCanvas.addEventListener("mousedown" , log_coords_and_setX1Y1);
	myCanvas.addEventListener("mouseup" , log_coords_and_drawFig);

}