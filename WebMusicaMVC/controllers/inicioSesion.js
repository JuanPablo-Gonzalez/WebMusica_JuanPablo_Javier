$("#form-login").submit(() => {
	event.preventDefault();

	var datosInicioSesion = {};
	datosInicioSesion["email"] = $("#usuario").val();
	datosInicioSesion["password"] = $("#contrasena").val();

	$.ajax({
		method: "POST",
		url: "../models/iniciarSesion.php",
		data: datosInicioSesion,
		success: function(result){
			console.log(result)
			//datosInicioSesion = {};
		},
		dataType: "text"
	});

	return false;
});