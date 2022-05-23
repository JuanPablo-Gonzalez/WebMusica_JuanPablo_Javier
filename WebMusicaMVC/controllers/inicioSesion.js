$("#form-login").submit(() => {
	event.preventDefault();

	var datosInicioSesion = {};
	datosInicioSesion["email"] = $("#inputEmail").val();
	datosInicioSesion["password"] = $("#inputPassword").val();

	$.ajax({
		method: "POST",
		url: "../models/iniciarSesion.php",
		data: datosInicioSesion,
		success: function(result){
			if(!result.error){
				var idUsuario = result["idUsuario"];
				//Ir al perfil
			}else{
				//Error, email o contraseña incorrectos
			}
		},
		dataType: "text"
	});

	return false;
});