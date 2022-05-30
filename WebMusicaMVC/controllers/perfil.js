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

function alternarButtonSeguir(siguiendo){
	if(siguiendo){
		$("#bttnSeguir").html("Siguiendo");
	}else{
		$("#bttnSeguir").html("Seguir");
	}
}

function setImagenPerfil(foto_perfil){
	if(foto_perfil != null){
		$("#fotoPerfil").attr("src","fotos/"+foto_perfil);
	}
}

function mostrarPublicacion(infoUsuario, publicacion){
	var divContenido = $("<div>").addClass("div-contenido");
	$("#div-contenedor-publicaciones").append(
		$("<div>").attr("id","publicacion-"+publicacion.id_publicacion).addClass("div-publicacion")
		.append(
			$("<div>").addClass("div-contenedora-img-nombre")
			.append(
				$("<div>").addClass("div-contenedora-imgUser")
				.append(
					$("<img>").attr("id","fotoPerfil").attr("src","fotos/" + infoUsuario.foto_perfil)
				),
				$("<div>").addClass("div-contenedora-nombre")
				.append(
					$("<h4>").attr("id","h4-nombre").text(infoUsuario.nombre_usuario),
					$("<p>").attr("id","p-tag").text(infoUsuario.tag)
				)
			),
			divContenido.append(
				$("<h2>").text(publicacion.titulo),
				$("<p>").text(publicacion.texto)
			)
		)
	);

	if(publicacion.tipo_archivo == 0){
		prepararAudio(publicacion);
		divContenido.append(
			$("<div>").addClass("div-contenido-audio")
			.append(
				$("<div>").addClass("controls")
				.append(
					$("<div>").addClass("play-container")
					.append(
						$("<div>")
						.attr("id","boton-play-"+publicacion.id_publicacion)
						.addClass("toggle-play play")
						.attr("onClick","reproducirAudio("+publicacion.id_publicacion+")")
					),
					$("<div>").addClass("barraCancion")
					.append(
						$("<div>").addClass("completeBar")
						.append(
							$("<div>").attr("id","progressBar-"+publicacion.id_publicacion).addClass("progressBar-cancion")
						)
					),
					$("<div>").addClass("time")
					.append(
						$("<p>").attr("id","song-currentTime-"+publicacion.id_publicacion).text("00:00"),
						$("<p>").attr("id","divider").text("/"),
						$("<p>").attr("id","song-length-"+publicacion.id_publicacion)
					),
					$("<div>").addClass("volume-container")
					.append(
						$("<div>").addClass("volume-slider")
						.append(
							$("<div>").addClass("volume-percentage")
						),
						$("<div>").addClass("div-boton-volumen")
						.append(
							$("<div>").addClass("volume icono-volumeMedium")
						)
					)
				)
			)
		)
	}
}

function prepararAudio(publicacion){
	let audio = new Audio("audios/" + publicacion.archivo);
	archivosPublicaciones[publicacion.id_publicacion] = audio;
	audio.loop = false;

	let audioStateInterval = setInterval(() =>{
		if(audio.readyState == 4){
			duration = parseInt(audio.duration, 10);		
			$("#song-length-"+publicacion.id_publicacion).text(formatearTiempo(duration));
			clearInterval(audioStateInterval);
		}
	},100);
}

function reproducirAudio(id_publicacion){
	if(archivosPublicaciones[id_publicacion].readyState == 4){
		if(archivosPublicaciones[id_publicacion].paused){
			for(let i in archivosPublicaciones){
				if(i == id_publicacion){
					archivosPublicaciones[i].play();
					intervaloAudios[i] = setInterval(() => {
						var currentTime = parseInt(archivosPublicaciones[i].currentTime, 10);
						$("#song-currentTime-"+i).text(formatearTiempo(currentTime));

						var progresoCancion = (archivosPublicaciones[i].currentTime / archivosPublicaciones[i].duration) * 100;
						$("#progressBar-"+i).css("width",progresoCancion+"%");
						if(progresoCancion == 100 && archivosPublicaciones[i].ended){
							clearInterval(intervaloAudios[i]);
						}
					}, 100);
					$("#boton-play-"+i).removeClass("play");
					$("#boton-play-"+i).addClass("pause");
				}else{
					archivosPublicaciones[i].pause();
					clearInterval(intervaloAudios[i]);
					$("#boton-play-"+i).addClass("play");
					$("#boton-play-"+i).removeClass("pause");
				}
			}
		}else{
			archivosPublicaciones[id_publicacion].pause();
			clearInterval(intervaloAudios[id_publicacion]);
			$("#boton-play-"+id_publicacion).addClass("play");
			$("#boton-play-"+id_publicacion).removeClass("pause");
		}
	}
}