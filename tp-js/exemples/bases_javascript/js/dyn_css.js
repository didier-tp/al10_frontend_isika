 
function afferror(msg,url,line_number)
{
var txt="Erreur: "+msg + " at line number "+line_number;
//txt = txt + " ,url="+url;
window.status = txt;
return true;
}

window.onerror=afferror;


function fctApply()
{
var objDivA = document.getElementById("divA");

objDivA.style.background=document.getElementById("txtBackground").value;
document.getElementById("txtBackgroundValue").innerHTML=document.getElementById("txtBackground").value;
objDivA.style.color=document.getElementById("txtColor").value;
document.getElementById("txtColorValue").innerHTML=objDivA.style.color+" = "+document.getElementById("txtColor").value;
objDivA.style.fontWeight=document.getElementById("txtFontWeight").value;
objDivA.style.fontSize=document.getElementById("txtFontSize").value;
objDivA.style.fontFamily=document.getElementById("txtFontFamily").value;
objDivA.style.fontStyle=document.getElementById("txtFontStyle").value;
objDivA.style.margin=document.getElementById("txtMargin").value;
objDivA.style.padding=document.getElementById("txtPadding").value;
objDivA.style.borderColor=document.getElementById("txtBorderColor").value;
document.getElementById("txtBorderColorValue").innerHTML=objDivA.style.borderColor+" = "+document.getElementById("txtBorderColor").value;
objDivA.style.borderWidth=document.getElementById("txtBorderWidth").value;
objDivA.style.borderStyle=document.getElementById("txtBorderStyle").value;
objDivA.style.display=document.getElementById("txtDisplay").value;
objDivA.style.position=document.getElementById("txtPosition").value;
objDivA.style.top=document.getElementById("txtTop").value;
objDivA.style.left=document.getElementById("txtLeft").value;
objDivA.style.width=document.getElementById("txtWidth").value;
objDivA.style.height=document.getElementById("txtHeight").value;
objDivA.style.visibility=document.getElementById("txtVisibility").value;
objDivA.style.textAlign=document.getElementById("txtTextAlign").value;
objDivA.style.textDecoration=document.getElementById("txtTextDecoration").value;
objDivA.style.textTransform=document.getElementById("txtTextTransform").value;
}
