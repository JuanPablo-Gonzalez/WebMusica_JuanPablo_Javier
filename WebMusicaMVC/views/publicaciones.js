function alternarButtonMeGusta(urlImagenes,tegusta,id_publicacion){
	if(tegusta){
		$("#img-mg-"+id_publicacion).attr("src",urlImagenes+"../imagenes/mg.png")
	}else{
		$("#img-mg-"+id_publicacion).attr("src",urlImagenes+"../imagenes/nomg.png")
	}
}

function mostrarPublicacion(url,urlImagenes,infoUsuario, publicacion){
	$("#div-contenedor-publicaciones").append(
		$("<div>").attr("id","publicacion-"+publicacion.id_publicacion).addClass("div-publicacion").append(
			$("<div>").addClass("div-contenedora-img-nombre").append(
				$("<div>").addClass("div-contenedora-imgUser").append(
					$("<img>").attr("id","fotoPerfil").attr("src",url+"imagenes/" + infoUsuario.foto_perfil)
				),
				$("<div>").addClass("div-contenedora-nombre").append(
					$("<h4>").attr("id","h4-nombre").text(infoUsuario.nombre_usuario),
					$("<p>").attr("id","p-tag").text(infoUsuario.tag)
				),
				$("<div>").addClass("div-contenedora-mgComents").append(
					$("<div>").addClass("div-contenedora-mg").append(
						$("<img>").attr("id","img-mg-"+publicacion.id_publicacion),
						$("<p>").attr("id","numMegust-"+publicacion.id_publicacion).text(publicacion.numMegusta)
					),
					$("<div>").addClass("div-contenedora-coments").append(
						$("<img>").attr("src",urlImagenes+"../imagenes/coments.png"),
						$("<p>").text(publicacion.numComentarios)
					)
				)
			),
			$("<div>").attr("id","div-contenido-"+publicacion.id_publicacion).addClass("div-contenido").append(
				$("<div>").addClass("div-contenido-texto").append(
					$("<h2>").text(publicacion.titulo),
					$("<p>").text(publicacion.texto)
				)
			)
		)
	);
	alternarButtonMeGusta(urlImagenes,publicacion.tegusta,publicacion.id_publicacion);

	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<p>").addClass("nombre-archivo").text(publicacion.archivo)
	)
}

function mostrarAudioPublicacion(url,publicacion){
	prepararAudio(url,publicacion);
	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<div>").addClass("div-contenido-audio").append(
			$("<div>").addClass("controls").append(
				$("<div>").addClass("play-container").append(
					$("<div>")
					.attr("id","boton-play-"+publicacion.id_publicacion)
					.addClass("toggle-play play")
					.attr("onClick","alternarReproducion("+publicacion.id_publicacion+")")
				),
				$("<div>").addClass("barraCancion").append(
					$("<div>").addClass("completeBar").append(
						$("<div>").attr("id","progressBar-"+publicacion.id_publicacion).addClass("progressBar-cancion")
					)
				),
				$("<div>").addClass("time").append(
					$("<p>").attr("id","song-currentTime-"+publicacion.id_publicacion).text("00:00"),
					$("<p>").attr("id","divider").text("/"),
					$("<p>").attr("id","song-length-"+publicacion.id_publicacion)
				),
				$("<div>").addClass("volume-container").append(
					$("<div>").addClass("volume-slider").append(
						$("<div>").addClass("volume-percentage")
					),
					$("<div>").addClass("div-boton-volumen").append(
						$("<div>").addClass("volume icono-volumeMedium")
					)
				)
			)
		)
	)
}

function mostrarImagenPublicacion(url,publicacion){
	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<div>").addClass("div-contenido-img").append(
			$("<img>").attr("src",url+"imagenes/"+publicacion.archivo)
		)
	)
}

function mostrarVideoPublicacion(url,publicacion){

}

function mostrarEnlacePublicacion(publicacion){
	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<iframe>").addClass("iframe-publicacion").attr("src",publicacion.archivo)
	);
}