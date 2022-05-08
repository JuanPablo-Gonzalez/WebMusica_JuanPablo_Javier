if(document.addEventListener)
	window.addEventListener("load",inicio);
else if (document.attachEvent)
	window.attachEvent("onload",inicio);

function inicio() {
	document.getElementById("usuario").addEventListener("change",mostrarValidacion);
}

function comprobarNomUsuario() {
	let correcto= true;
	let nomUsuario= document.getElementById("usuario").value;
	let regExpNomUsuario= /^[A-Z0-9\-_.]{8,15}$/i;

	if(regExpNomUsuario.test(nomUsuario)==false){
		correcto= false;
	}

	return correcto;
}

function mostrarValidacion() {
	if(comprobarNomUsuario()) {
		document.querySelector("#form-login img").style.display= "inline-block";
	} else {
		document.querySelector("#form-login img").style.display= "none"
	}
}

function validarLogin() {
	let correcto= true;

	if(!comprobarNomUsuario()) {
		correcto= false;
	} 

	//alert(correcto);
	return correcto;
}