//variables globales:
var eltCanvas ;
var eltSpanMsg ;
var eltTBody ;

var tabX;
var tabY;
var nbPoints;


function reset(){
    nbPoints=0;
    tabX = [];
    tabY = [];
    eltSpanMsg.innerHTML="<i>cliquer &agrave; diff&eacute;rents endroits pour cr&eacute;er des points dans la zone ci-dessous</i>";
    eltTBody.innerHTML="";

    //effacer éventuel contenu dans "myCanvas":
    var ctx = eltCanvas.getContext("2d");
    ctx.clearRect (0,0,eltCanvas.width,eltCanvas.height);
}

function addPoint(x,y){
    //ajout des coordonnées du nouveau point dans les tableaux javascript:
    tabX.push(x);
    tabY.push(y);
    nbPoints++;

    //ajout des coordonnées du nouveau point dans le tableau HTML:
    var newRow = eltTBody.insertRow(-1) ; //new <tr> and .appendChild()
    var newCellX = newRow.insertCell(0);  //new <td> and .appendChild()
    newCellX.innerText = x;
    var newCellY = newRow.insertCell(1);  //new <td> and .appendChild()
    newCellY.innerText = y;

    //dessin du point dans la zone "myCanvas":
    var ctx = eltCanvas.getContext("2d");
    ctx.fillRect(x,eltCanvas.height - y,2,2);
}



function tracerDroiteAfoisXplusB(a,b){
    var x0=0;
    var y0= b;
    var y0=eltCanvas.height - y0;
    var x=eltCanvas.width;
    var y=a*x+b;
    var y=eltCanvas.height - y;
    var ctx = eltCanvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.moveTo(x0,y0);
    ctx.lineTo(x,y);
    ctx.stroke(); 
}

function initialisations(){
    
    eltCanvas = document.getElementById("myCanvas");
    eltTBody = document.getElementById("tBody");
    eltSpanMsg = document.getElementById("spanMsg");
    reset();
    var eltBtnReset = document.getElementById("btnReset");
    eltBtnReset.addEventListener("click",reset);

    var eltBtnCalculInterpolation = document.getElementById("btnCalculInterpolation");
    eltBtnCalculInterpolation.addEventListener("click",()=>{
        //interpolation polynomiale simplifiée : régression linéaire (droite des moindres carrés):
        var moyenneX = moyenne(tabX);
        var moyenneY = moyenne(tabY);
        
        var a = covariance(nbPoints,tabX,tabY,moyenneX,moyenneY) / variance(tabX,moyenneX);
        var b = moyenneY - a * moyenneX;
        var resInterpolation="y=a*x+b avec a="+a+" et b="+b;
        eltSpanMsg.innerHTML=resInterpolation;
        
        tracerDroiteAfoisXplusB(a,b);
    });

    eltCanvas.addEventListener("click", (evt)=>{
        console.log("evt.type="+evt.type);
        console.log("evt.target.id="+evt.target.id);
        console.log("evt.pageX="+evt.pageX);
        console.log("par rapport à la page, evt.pageY="+evt.pageY);
        console.log("par rapport à myCanvas, y="+(evt.pageY - eltCanvas.offsetTop));
        var x = evt.pageX  - eltCanvas.offsetLeft;
        var x = evt.pageX  - eltCanvas.offsetLeft;
        var y = evt.pageY - eltCanvas.offsetTop; //au sens informatique 
                                                 //(y croissant vers le bas)
        y = eltCanvas.height - y; //au sens mathématique (y croissant vers le haut)
        addPoint(x,y);
    });

}

window.onload= initialisations; //equivalent de onlad="initialisations()" sur body coté html

// *****Quelques fonctions mathématiques (moyenne, variance, covariance) ****

function moyenne(tableau){
    var n = tableau.length;
    var i;
    var somme =0;
    for(i in tableau){
      somme += tableau[i];
    }
    return somme/n;
}

function variance(tableau , moyenne){
    var n = tableau.length;
    var i;
    var somme =0;
    for(i in tableau){
      var val = tableau[i];
      somme += Math.pow(val-moyenne,2);
    }
    return somme/n;
}

function covariance(n,tableauX , tableauY , moyenneX,moyenneY){
    var i;
    var somme =0;
    for(i =0;i < n; i++){
      somme += (tableauX[i] - moyenneX) * (tableauY[i] - moyenneY)
    }
    return somme/n;
}



