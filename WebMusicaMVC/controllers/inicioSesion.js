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

$("#form-login").validate({
	rules:{
		usuario:{
			required: true,
			email: true
		},
		contrasena:{
			required: true,
			minlength: 3
		}
	}
});