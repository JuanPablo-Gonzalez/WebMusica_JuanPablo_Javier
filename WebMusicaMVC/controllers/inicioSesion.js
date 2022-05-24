$("#form-login").submit(() => {
	event.preventDefault();

	var datosInicioSesion = {};
	datosInicioSesion["email"] = $("#inputEmail").val();
	datosInicioSesion["password"] = $("#inputPassword").val();
	datosInicioSesion["recuerdame"] = $("#inputRecuerdame")[0].checked;

	$.ajax({
		method: "POST",
		url: "../models/iniciarSesion.php",
		data: datosInicioSesion,
		success: function(result){
			if(!result.error){
				var idUsuario = result["idUsuario"];
				window.location.assign("perfil_controller.php")
			}else{
				//Error, email o contraseña incorrectos
			}
		},
		dataType: "text"
	});

	return false;
});