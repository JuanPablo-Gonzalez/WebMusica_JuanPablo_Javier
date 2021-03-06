var archivosPublicaciones = [];
var intervaloAudios = [];
$.ajax({
	method: "POST",
	url: "../../models/obtenerUsuarioPerfil.php",
	data: datos,
	success: function(infoUsuario){
		if(!infoUsuario.error){
			$(document).ready(function(){
				if(infoUsuario.foto_fondo != null){
					$("body").css("background-image",'url("imagenes/'+infoUsuario.foto_fondo+'")');
				}
				if(infoUsuario.foto_perfil != null){
					$("#fotoPerfil").css("background-image",'url("imagenes/'+infoUsuario.foto_perfil+'")');
				}

				$("#p-tagNombre-nombre").text(infoUsuario.nombre_usuario);
				$("#p-tagNombre-tag").text("@" + infoUsuario.tag);
				$("#p-fechaNacimiento").text(infoUsuario.fecha_nacimiento);
				$("#p-descripcion").text(infoUsuario.descripcion);
				setCancion(infoUsuario.cancion);
				$("#p-descripcion").text(infoUsuario.descripcion);
				$("#span-numPublicaciones").text(infoUsuario.numPublicaciones);
				$("#span-numSeguidores").text(infoUsuario.numSeguidores);
				$("#span-numSeguidos").text(infoUsuario.numSeguidos);

				alternarButtonSeguir(infoUsuario.siguiendo);

				$("#bttnSeguir").click((event) => {
					event.stopPropagation();
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
								if(result.siguiendo){
									$("#span-numSeguidores").text(++infoUsuario.numSeguidores);
								}else{
									$("#span-numSeguidores").text(--infoUsuario.numSeguidores);
								}
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
				success: function(jsonPublicaciones){
					var publicaciones = jsonPublicaciones.publicaciones;
					if(Object.keys(publicaciones).length == 0){
						$("#div-contenedor-publicaciones").append(
							$("<div>").addClass("div-noPublicaciones").append(
								$("<h2>").addClass("h2-noPublicaciones").text("@" + infoUsuario.tag + " no tiene publicaciones todav??a")
							)
						);
					}
					for(let i in publicaciones){
						mostrarPublicacion("","../",infoUsuario, publicaciones[i]);
						let id_publicacion = publicaciones[i].id_publicacion;
						
						$("#publicacion-"+id_publicacion).click(() => {
							irAPublicacion("../",id_publicacion);
						});

						addMenusTressPuntos(jsonPublicaciones.esTuPerfil,id_publicacion);

						$("#img-mg-"+id_publicacion).click((event) => {
							event.stopPropagation();
							var datosMg = {
								"idPublicacion": id_publicacion,
								"tegusta": publicaciones[i].tegusta
							};
							$.ajax({
								method: "POST",
								url: "../../models/megusta.php",
								data: datosMg,
								success: function(result){
									if(!result.error){
										publicaciones[i].tegusta = result.tegusta;
										alternarButtonMeGusta("../",result.tegusta, datosMg.idPublicacion);
										if(result.tegusta){
											publicaciones[i].numMegusta++;
										}else{
											publicaciones[i].numMegusta--;
										}
										$("#numMegust-"+id_publicacion).text(publicaciones[i].numMegusta)
									}
								},
								dataType: "json"
							});
						});

						mostrarArchivo("",publicaciones[i]);
					}
				},
				dataType: "json"
			});
		}
	},
	dataType: "json"
});

function irAPublicacion(url,id_publicacion) {
	window.location.assign(url+"../controllers/publicacion_controller.php?idPublicacion="+id_publicacion);
}

function alternarButtonSeguir(siguiendo){
	if(siguiendo){
		$("#bttnSeguir").html("Siguiendo");
	}else{
		$("#bttnSeguir").html("Seguir");
	}
}

function setCancion(cancion){
	var theme = "&utm_source=generator&theme=0";
	if(cancion == null || cancion == ""){
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

function eliminarPublicacion(id_publicacion){
	$.ajax({
		method: "POST",
		url: "../../models/eliminarPublicacion.php",
		data: {"idPublicacion": id_publicacion},
		success: function(tag){
			location.reload();
		},
		dataType: "text"
	});
}