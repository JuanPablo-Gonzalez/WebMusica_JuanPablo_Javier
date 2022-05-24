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
			success: function(result){
				if(!result.error){
					window.location.assign("../usuarios/" + result.tag)
				}else{
					if(result.errorInfo.errorCode == 23000 && result.errorInfo.code == 1062){
						switch(result.errorInfo.key){
							case "UK_email":
								$("#inputEmail-error").text("Ya existe una cuenta con ese email");
								$("#inputEmail-error").show();
							break;
							case "UK_tag":
								$("#inputTag-error").text("Ya existe una cuenta con ese Nombre de usuario");
								$("#inputTag-error").show();
							break;
						}
					}
				}
			},
			dataType: "json"
		});
	}
	return false;
});