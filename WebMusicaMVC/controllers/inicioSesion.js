$("#formLogin").submit(() => {
	if($("#formLogin").valid()){
		var datosInicioSesion = {};
		datosInicioSesion["email"] = $("#inputEmail").val();
		datosInicioSesion["password"] = $("#inputPassword").val();
		//datosInicioSesion["recuerdame"] = $("#inputRecuerdame")[0].checked;

		$.ajax({
			method: "POST",
			url: "../models/iniciarSesion.php",
			data: datosInicioSesion,
			success: function(result){
				if(!result.error){
					window.location.assign("inicio_controller.php");
				}else{
					$("#label-inicioIncorrecto").text("Email o Contraseña incorrectos");
					$("#label-inicioIncorrecto").show();
				}
			},
			dataType: "json"
		});
	}
	return false;
});