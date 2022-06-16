function mostrarComentario(comentario, nuevo = false){
	if(comentario.foto_perfil == null || comentario.foto_perfil == ""){
		var urlImagenPerfil = "../imagenes/estandarPerfil.png";
	}else{
		var urlImagenPerfil = "../usuarios/"+comentario.tag+"/imagenes/"+comentario.foto_perfil;
	}
	var nuevoComentario = $("<div>").addClass("div-comentario").append(
				$("<div>").addClass("div-contenedora-imgUser").append(
					$("<div>").css("background-image",'url("'+urlImagenPerfil+'")').click(() => {
						window.location.assign("../usuarios/"+comentario.tag);
					})
				),
				$("<div>").addClass("div-contenedora-tag-fecha").append(
					$("<a>").attr("href","../usuarios/"+comentario.tag).text("@"+comentario.tag),
					$("<p>").addClass("p-fecha").text(comentario.fecha_publicacion)
				),
				$("<div>").addClass("div-contenido-comentario").append(
					$("<p>").text(comentario.texto)
				)
			)
	if(!nuevo){
		$("#div-contenedor-comentarios").append(nuevoComentario);
	}else{
		$("#div-crearComentario").after(nuevoComentario);
	}
}