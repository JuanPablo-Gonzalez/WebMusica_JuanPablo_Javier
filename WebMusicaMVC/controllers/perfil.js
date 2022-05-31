var archivosPublicaciones = [];
var intervaloAudios = [];
$.ajax({
	method: "POST",
	url: "../../models/obtenerUsuarioPerfil.php",
	data: datos,
	success: function(infoUsuario){
		if(!infoUsuario.error){
			$(document).ready(function(){
				$("body").css("background-image",'url("fotos/'+infoUsuario.foto_fondo+'")');
				setImagenPerfil(infoUsuario.foto_perfil);
				$("#p-tagNombre-nombre").text(infoUsuario.nombre_usuario);
				$("#p-tagNombre-tag").text("@" + infoUsuario.tag);
				$("#p-fechaNacimiento").text(infoUsuario.fecha_nacimiento);
				$("#p-descripcion").text(infoUsuario.descripcion);
				$("#iframe-cancion").attr("src", "https://open.spotify.com/embed/track/" + infoUsuario.cancion + "?utm_source=generator&theme=0");
				$("#p-descripcion").text(infoUsuario.descripcion);
				$("#span-numPublicaciones").text(infoUsuario.numPublicaciones);
				$("#span-numSeguidores").text(infoUsuario.numSeguidores);
				$("#span-numSeguidos").text(infoUsuario.numSeguidos);

				alternarButtonSeguir(infoUsuario.siguiendo);

				$("#bttnSeguir").click(() => {
					let datosSeguir = {
						"idPerfil" : infoUsuario.id_usuario,
						"siguiendo" : infoUsuario.siguiendo
					}
					$.ajax({
						method: "POST",
						url: "../../models/seguir.php",
						data: datosSeguir,
						success: function(result){
							if(!result.error){
								infoUsuario.siguiendo = result.siguiendo;
								alternarButtonSeguir(infoUsuario.siguiendo);
							}
						},
						dataType: "json"
					});
				})
			});

			$.ajax({
				method: "POST",
				url: "../../models/obtenerPublicaciones.php",
				data: {"idPerfil": infoUsuario.id_usuario},
				success: function(publicaciones){
					console.log(infoUsuario);
					for(let i in publicaciones){
						mostrarPublicacion(infoUsuario, publicaciones[i]);
					}
				},
				dataType: "json"
			});
		}
	},
	dataType: "json"
});