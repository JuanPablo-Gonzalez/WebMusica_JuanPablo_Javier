$.ajax({
	method: "POST",
	url: "../models/obtenerEditarTuPerfil.php",
	data: {},
	success: function(infoUsuario){
		if(!infoUsuario.error){
			$(document).ready(function(){
				setCancion(infoUsuario.cancion);
				if(infoUsuario.foto_fondo != null){
					$("body").css("background-image",'url("../usuarios/'+infoUsuario.tag+'/imagenes/'+infoUsuario.foto_fondo+'")');
				}
				if(infoUsuario.foto_perfil != null){
					$("#fotoPerfil").attr("src","../usuarios/"+infoUsuario.tag+"/imagenes/"+infoUsuario.foto_perfil);
				}

				$("#inputEmail").val(infoUsuario.email);
				$("#inputNombreUsuario").val(infoUsuario.	nombre_usuario);
				$("#inputTag").val(infoUsuario.tag);
				$("#inputDescripcion").val(infoUsuario.descripcion);
				$("#inputFechaNacimiento").val(infoUsuario.fecha_nacimiento);
				$("#inputCancion").val(infoUsuario.cancion);
			});
		}
	},
	dataType: "json"
});

function setCancion(cancion){
	var theme = "&utm_source=generator&theme=0";
	if(cancion == null){
		cancion = "https://open.spotify.com/embed/track/57iDDD9N9tTWe75x6qhStw?" + theme;
	}else if(cancion.startsWith("https://open.spotify.com/track/")){
		cancion = cancion.replace("https://open.spotify.com/track/","https://open.spotify.com/embed/track/");
		cancion = cancion.split("?")[0];
		console.log(cancion);
		cancion = cancion + "?" + theme;
	}else if(!cancion.startsWith("https://open.spotify.com/embed/")){
		cancion = "https://open.spotify.com/embed/track/" + cancion + "?" + theme;
	}
	$("#iframe-cancion").attr("src", cancion);
}