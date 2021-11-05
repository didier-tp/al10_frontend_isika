function errCallback(err){
	document.getElementById('spanMessage').innerText="error:" + err;
}

function callbackAfterUpload(data){
	document.getElementById('spanMessage').innerText="updated data after upload (server side):" + data;
	var publicationEnregistree = JSON.parse(data);
	document.getElementById('idImg').setAttribute("src","../publication-api/public/image-of-publication/"+publicationEnregistree._id)
}

function formDataFromInput(){
	var formData = new FormData(); //global data to send (encType="multipart/form-data")
	//file(s) part(s) to upload:
	var eltFileToUpload = document.getElementById('idImage');
	var imageFileToUpload = eltFileToUpload.files.item(0);
	//NB : imageFileToUpload (of type File) have .name , .size , .type , ...
	formData.append('imageFile' , imageFileToUpload); //may be null
	//js/json part to post:
	var publication = { titre : undefined ,
	                    imageName : undefined };
	publication.titre = document.getElementById('txtTitre').value;
	/*
	//informations sur image recopiées dans partie json : ici ou bien coté serveur
	if(eltFileToUpload){
		publication.imageName = imageFileToUpload.name;
	}*/
    formData.append('publication' , JSON.stringify(publication));

    return formData;
}



function onPostPublication(evt){
	var formData = formDataFromInput();
	var url = "../publication-api/private/role-admin/publication"
	makeAjaxPostMultipartRequest(url,formData,callbackAfterUpload,errCallback)
}



window.onload=function(){
	document.getElementById("btnSend").addEventListener("click",onPostPublication);
}