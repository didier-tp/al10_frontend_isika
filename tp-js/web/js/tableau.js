window.onload = function(){
   /*
   var eltTr = document.createElement("tr");

   var eltTd1= document.createElement("td");
   eltTd1.innerText="USD";
   eltTr.appendChild(eltTd1);

   var eltTd2= document.createElement("td");
   eltTd2.innerText="Dollar";
   eltTr.appendChild(eltTd2);

   var eltTd3= document.createElement("td");
   eltTd3.innerText="1.1";
   eltTr.appendChild(eltTd3);

   var eltTbody = document.getElementById("bodyTableau");
   eltTbody.appendChild(eltTr);
   */
  var eltTbody = document.getElementById("bodyTableau");
  var newRow = eltTbody.insertRow(-1) ;
  var newCell1 = newRow.insertCell(0);  newCell1.innerText = "USD";
  newRow.insertCell(1).innerText = "Dollar";
  newRow.insertCell(2).innerText = "1.1";
}