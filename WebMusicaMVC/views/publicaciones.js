function alternarButtonSeguir(siguiendo){
	if(siguiendo){
		$("#bttnSeguir").html("Siguiendo");
	}else{
		$("#bttnSeguir").html("Seguir");
	}
}

function alternarButtonMeGusta(tegusta,id_publicacion){
	console.log(tegusta)	;
	if(tegusta){
		$("#img-"+id_publicacion).attr("src","../../imagenes/mg.png")
	}else{
		$("#img-"+id_publicacion).attr("src","../../imagenes/nomg.png")
	}
}

function setImagenPerfil(foto_perfil){
	if(foto_perfil != null){
		$("#fotoPerfil").attr("src","imagenes/"+foto_perfil);
	}
}

function mostrarPublicacion(infoUsuario, publicacion){
	$("#div-contenedor-publicaciones").append(
		$("<div>").attr("id","publicacion-"+publicacion.id_publicacion).addClass("div-publicacion").append(
			$("<div>").addClass("div-contenedora-img-nombre").append(
				$("<div>").addClass("div-contenedora-imgUser").append(
					$("<img>").attr("id","fotoPerfil").attr("src","imagenes/" + infoUsuario.foto_perfil)
				),
				$("<div>").addClass("div-contenedora-nombre").append(
					$("<h4>").attr("id","h4-nombre").text(infoUsuario.nombre_usuario),
					$("<p>").attr("id","p-tag").text(infoUsuario.tag)
				),
				$("<div>").addClass("div-contenedora-mgComents").append(
					$("<div>").addClass("div-contenedora-mg").append(
						$("<img>").attr("id","img-"+publicacion.id_publicacion),
						$("<p>").text(publicacion.numMegusta)
					),
					$("<div>").addClass("div-contenedora-coments").append(
						$("<img>").attr("src","../../imagenes/coments.png"),
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
	alternarButtonMeGusta(publicacion.tegusta,publicacion.id_publicacion);
	$("#img-"+publicacion.id_publicacion).click(() => {
		var datosMg = {
			"idPublicacion": publicacion.id_publicacion,
			"tegusta": publicacion.tegusta
		};
		$.ajax({
			method: "POST",
			url: "../../models/megusta.php",
			data: datosMg,
			success: function(result){
				console.log(result);
				if(!result.error){
					publicacion.tegusta = result.tegusta;
					alternarButtonMeGusta(result.tegusta,datosMg.idPublicacion);
				}
			},
			dataType: "json"
		});
	});

	switch(publicacion.tipo_archivo){
		case "1":
			mostrarAudioPublicacion(publicacion);
		break;
		case "2":
			mostrarImagenPublicacion(publicacion);
		break;
	}

	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<p>").addClass("nombre-archivo").text(publicacion.archivo)
	)
}

function mostrarAudioPublicacion(publicacion){
	prepararAudio(publicacion);
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

function mostrarImagenPublicacion(publicacion){
	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<div>").addClass("div-contenido-img").append(
			$("<img>").attr("src","imagenes/"+publicacion.archivo)
		)
	)
}