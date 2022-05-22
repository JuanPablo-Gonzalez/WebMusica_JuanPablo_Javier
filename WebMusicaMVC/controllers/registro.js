$("#formRegistrarse").submit(() => {
	if($("#formRegistrarse").valid()){
		var datosRegistrarse = {};
		datosRegistrarse["email"] = $("#inputEmail").val();
		datosRegistrarse["nombre"] = $("#inputNombre").val();
		datosRegistrarse["tag"] = $("#inputTag").val();
		datosRegistrarse["password"] = $("#inputPassword").val();
		datosRegistrarse["fechaNacimiento"] = $("#inputFechaNacimiento").val();

		$.ajax({
			method: "POST",
			url: "../models/registrarse.php",
			data: datosRegistrarse,
			success: function(resultado){
				console.log(resultado)
				if(!resultado.error){
					//Ir al perfil
				}else{
					//error
				}
			},
			dataType: "json"
		});
	}
	return false;
});

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


function comprobarNomUsuario() {
	let correcto= true;
	let nomUsuario= document.getElementById("usuario").value;
	let regExpNomUsuario= /^[A-Z0-9\-_.]{8,15}$/i;

	if(regExpNomUsuario.test(nomUsuario)==false){
		correcto= false;
	}

	return correcto;
}

function comprobarEmail() {
	let correcto= true;
	let email= document.getElementById("email").value;
	let regExpEmail= /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/i;

	if(regExpEmail.test(email)==false) {
		correcto= false;
	}

	return correcto;
}

function comprobarContrasena() {
	let correcto= true;
	let contrasena= document.getElementById("contrasena").value;
	let regExpContrasena= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,10}$/; //Una minúscula, una mayúscula y un número

	if(regExpContrasena.test(contrasena)==false) {
		correcto= false;
	}

	return correcto;
}

function validarLogin() {
	let correcto= true;
	let mensaje= "";
	let usuarioCorrecto= document.getElementById("usuarioCorrecto").value;

	if(!comprobarNomUsuario()) {
		correcto= false;
		mensaje+= "Formato del nombre de usuario incorrecto. \n";
	}
	if(!comprobarContrasena()) {
		correcto= false;
		mensaje+= "Formato de la contraseña incorrecto. \n";
	} 
	if(!comprobarEmail()) {
		correcto= false;
		mensaje+= "Formato del correo electrónico incorrecto. \n";
	} 
	if(usuarioCorrecto=='si') {
		correcto= false;
		mensaje+= "El nombre de usuario está en uso, elija otro.";
	}

	if(!correcto)
		alert(mensaje);
	
	return correcto;
}

//PARTE PARA AJAX
function iniciar() {
	let usuario= document.getElementById("usuario").value;

	let configuracion= {
		method: "POST",
		headers:{"Content-Type":"application/x-www-form-urlencoded"},
		body:"usuario="+usuario
	};

	fetch("../ajax/registroAjax.php", configuracion)
	.then(ejecutarPromesa)
	.catch(mostrarError);
}

function ejecutarPromesa(respuesta) {
	if(respuesta.ok)
		respuesta.text().then(validarNombreUsuario);
}

function validarNombreUsuario(resultado) {
	//alert(resultado);
	if(resultado=='si') {
		document.getElementById("usuarioCorrecto").value= resultado;
	} else {
		document.getElementById("usuarioCorrecto").value= resultado;
		/*document.getElementById("boton-validar").style.display= "inline-block";
		document.getElementById("codigo").style.display= "inline-block";
		document.getElementById("boton-iniciar").style.display= "none";*/
	}
}

function mostrarError() {
	alert("Ha habido un error en la conexión con el servidor");
}