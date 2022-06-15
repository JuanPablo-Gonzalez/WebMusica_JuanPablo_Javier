$.ajax({
	method: "POST",
	url: "../models/obtenerEditarTuPerfil.php",
	data: {},
	success: function(infoUsuario){
		if(!infoUsuario.error){
			$(document).ready(() =>{
				if(infoUsuario.foto_fondo != null){
					$("body").css("background-image",'url("../usuarios/'+infoUsuario.tag+'/imagenes/'+infoUsuario.foto_fondo+'")');
				}
				if(infoUsuario.foto_perfil != null){
					$("#fotoPerfil").css("background-image",'url("../usuarios/'+infoUsuario.tag+'/imagenes/'+infoUsuario.foto_perfil+'")');
				}

				asignarValores(infoUsuario);

				$("#bttn-deshacerCambios").click(() =>{
					asignarValores(infoUsuario);
				});
			});
		}
	},
	dataType: "json"
});

function setCancion(cancion){
	var theme = "&utm_source=generator&theme=0";
	if(cancion == null || cancion == ""){
		cancion = "https://open.spotify.com/embed/track/57iDDD9N9tTWe75x6qhStw?" + theme;
	}else if(cancion.startsWith("https://open.spotify.com/track/")){
		cancion = cancion.replace("https://open.spotify.com/track/","https://open.spotify.com/embed/track/");
		cancion = cancion.split("?")[0];
		cancion = cancion + "?" + theme;
	}else if(!cancion.startsWith("https://open.spotify.com/embed/")){
		cancion = "https://open.spotify.com/embed/track/" + cancion + "?" + theme;
	}
	$("#iframe-cancion").attr("src", cancion);
}

function asignarValores(infoUsuario){
	setCancion(infoUsuario.cancion);
	$("#inputEmail").val(infoUsuario.email);
	$("#inputNombreUsuario").val(infoUsuario.	nombre_usuario);
	$("#inputTag").val(infoUsuario.tag);
	$("#inputDescripcion").val(infoUsuario.descripcion);
	$("#inputFechaNacimiento").val(infoUsuario.fecha_nacimiento);
	$("#inputCancion").val(infoUsuario.cancion);
}

$(document).ready(() => {
	$("#inputCancion").change(() => {
		setCancion($("#inputCancion").val());
	})

	$("#bttn-cambiarPassword").click(() => {
		if($("#div-cambiarPassword").children().length == 0){
			$("#div-cambiarPassword").append(
				$("<div>").addClass("div-input").append(
					$("<label>").attr("for","inputPassword").text("Introduce una nueva contraseña"),
					$("<input>").attr("type","password").attr("name","inputPassword").attr("id","inputPassword"),
					$("<label>").addClass("error").attr("for","inputPassword").attr("id","inputPassword-error")
				),
				$("<div>").addClass("div-input").append(
					$("<label>").attr("for","inputPassword2").text("Repite la nueva contraseña"),
					$("<input>").attr("type","password").attr("name","inputPassword2").attr("id","inputPassword2"),
					$("<label>").addClass("error").attr("for","inputPassword2").attr("id","inputPassword2-error")
				)
			);
		}else{
			$("#div-cambiarPassword").empty();
		}
	});

	if (typeof jsonResult !== 'undefined'){
		if(jsonResult.error){
			if(!jsonResult.correctPassword){
				$("#inputOldPassword-error").text("Contraseña incorrecta, vuelva a escribir la contraseña");
				$("#inputOldPassword-error").show();
			}else if(jsonResult.errorInfo.errorCode == 23000 && jsonResult.errorInfo.code == 1062){
				switch(jsonResult.errorInfo.key){
					case "UK_email":
					$("#inputEmail-error").text("Ya existe una cuenta con ese email");
					$("#inputEmail-error").show();
					$("#inputEmail-error").val(jsonResult.inputEmail);
					break;
					case "UK_tag":
					$("#inputTag-error").text("Ya existe una cuenta con ese nombre de usuario");
					$("#inputTag-error").show();
					$("#inputTag-error").val(jsonResult.inputTag);
					break;
				}
			}
		}
	}
});