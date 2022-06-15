function alternarButtonMeGusta(urlImagenes,tegusta,id_publicacion){
	if(tegusta){
		$("#img-mg-"+id_publicacion).attr("src",urlImagenes+"../imagenes/mg.png")
	}else{
		$("#img-mg-"+id_publicacion).attr("src",urlImagenes+"../imagenes/nomg.png")
	}
}

function mostrarPublicacion(url,urlImagenes,infoUsuario, publicacion){
	if(infoUsuario.foto_perfil != null){
		var urlImgPerfil = url + "imagenes/" + infoUsuario.foto_perfil;
	}else{
		var urlImgPerfil = urlImagenes + "../imagenes/estandarPerfil.png"; 
	}

	$("#div-contenedor-publicaciones").append(
		$("<article>").addClass("div-publicacion").attr("id","publicacion-"+publicacion.id_publicacion).append(
			$("<div>").addClass("div-contenedora-img-nombre").append(
				$("<div>").addClass("div-contenedora-imgUser").append(
					$("<div>").attr("id","fotoPerfil").css("background-image",'url("'+urlImgPerfil+'")').click(() => {
						window.location.assign(url);
					})
				),
				$("<div>").addClass("div-contenedora-nombre").append(
					$("<h4>").attr("id","h4-nombre").text(infoUsuario.nombre_usuario),
					$("<a>").attr("id","a-tag").text("@"+infoUsuario.tag).attr("href",url)
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
				$("<div>").attr("id","div-contenido-textoPuntos-"+publicacion.id_publicacion)
				.addClass("div-contenido-textoPuntos").append(
					$("<div>").addClass("div-contenido-texto").append(
						$("<h2>").text(publicacion.titulo),
						$("<p>").text(publicacion.texto)
					)
				)
			)
		)
	);
	alternarButtonMeGusta(urlImagenes,publicacion.tegusta,publicacion.id_publicacion);
}

function mostrarArchivo(url,publicacion){
	switch(publicacion.tipo_archivo){
		case "1":
		mostrarAudioPublicacion(url,publicacion);
		break;
		case "2":
		mostrarImagenPublicacion(url,publicacion);
		break;
		case "3":
		mostrarVideoPublicacion(url,publicacion);
		break;
		case "4":
		mostrarEnlacePublicacion(publicacion);
		break;
	}

	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<p>").addClass("nombre-archivo").text(publicacion.archivo)
	);
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
				).click((event) => {
					event.stopPropagation();
					alternarReproducion(publicacion.id_publicacion);
				}),
				$("<div>").addClass("barraCancion").append(
					$("<div>").addClass("completeBar").append(
						$("<div>").attr("id","progressBar-"+publicacion.id_publicacion).addClass("progressBar-cancion")
					)
				),
				$("<div>").addClass("time").append(
					$("<p>").attr("id","song-currentTime-"+publicacion.id_publicacion).text("00:00"),
					$("<p>").attr("id","divider").text("/"),
					$("<p>").attr("id","song-length-"+publicacion.id_publicacion)
				)/*,
				$("<div>").addClass("volume-container").append(
					$("<div>").addClass("volume-slider").append(
						$("<div>").addClass("volume-percentage")
					),
					$("<div>").addClass("div-boton-volumen").append(
						$("<div>").addClass("volume icono-volumeMedium")
					)
				)*/
			)
		)
	);
}

function mostrarImagenPublicacion(url,publicacion){
	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<div>").addClass("div-contenido-img").append(
			$("<img>").attr("src",url +"imagenes/" + publicacion.archivo)
		)
	);
}

function mostrarVideoPublicacion(url,publicacion){
	archivo = publicacion.archivo;
	var type = archivo.substr(archivo.lastIndexOf(".")+1,archivo.length);
	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<video controls>").addClass("videoPublicacion").append(
			$("<source>").attr("src",url + "videos/" + archivo).attr("type","video/"+type)
		)
	);
}

function mostrarEnlacePublicacion(publicacion){
	$("#div-contenido-"+publicacion.id_publicacion).append(
		$("<iframe>").addClass("iframe-publicacion").attr("src",publicacion.archivo)
	);

	$("#div-contenido-"+publicacion.id_publicacion+" iframe").height(
		$("#div-contenido-"+publicacion.id_publicacion+" iframe").width() / 1.8
	);
	$(window).resize(() => {
		$("#div-contenido-"+publicacion.id_publicacion+" iframe").height(
			$("#div-contenido-"+publicacion.id_publicacion+" iframe").width() / 1.8
		);
	});
}

function addMenusTressPuntos(esTuPerfil,id_publicacion) {
	if(esTuPerfil){
		$("#div-contenido-textoPuntos-"+id_publicacion).append(
			$("<div>").addClass("div-contenerdor-tresPuntos").append(
				$("<div>").addClass("div-punto"),
				$("<div>").addClass("div-punto"),
				$("<div>").addClass("div-punto")
			).hover(() => {
				$("#div-dropdown-"+id_publicacion).toggle();
			}),
			$("<div>").attr("id","div-dropdown-"+id_publicacion).addClass("div-dropdown").append(
				$("<div>").attr("onClick","eliminarPublicacion("+id_publicacion+")").text("Eliminar Publicación")
			).hover(() => {
				$("#div-dropdown-"+id_publicacion).toggle();
			})
		)
	}
}