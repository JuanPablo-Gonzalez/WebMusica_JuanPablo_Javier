var archivosPublicaciones = [];
var intervaloAudios = [];
$.ajax({
	method: "POST",
	url: "../models/obtenerPublicacion.php",
	data: datos,
	success: function(result){
		$(document).ready(function(){
			if(result.error){
				$("#div-contenedor-publicaciones").append(
					$("<div>").addClass("div-noPublicaciones").append(
						$("<h2>").addClass("h2-noPublicaciones").text("No existe esta publicacion")
						)
					);

				$("#div-crearComentario").hide();
			}else {
				var publicacion = result.publicacion;
				var usuario = {"nombre_usuario" : publicacion.nombre_usuario, "tag" : publicacion.tag, "foto_perfil" : publicacion.foto_perfil};
				var url = "../usuarios/" + usuario.tag +"/";
				mostrarPublicacion(url,"",usuario, publicacion);

				addMenusTressPuntos(result.esTuPerfil,publicacion.id_publicacion);

				$("#img-mg-"+publicacion.id_publicacion).click(() => {
					var datosMg = {
						"idPublicacion": publicacion.id_publicacion,
						"tegusta": publicacion.tegusta
					};
					$.ajax({
						method: "POST",
						url: "../models/megusta.php",
						data: datosMg,
						success: function(result){
							if(!result.error){
								publicacion.tegusta = result.tegusta;
								alternarButtonMeGusta("",result.tegusta,datosMg.idPublicacion);
								if(result.tegusta){
									publicacion.numMegusta++;
								}else{
									publicacion.numMegusta--;
								}
								$("#numMegust-"+publicacion.id_publicacion).text(publicacion.numMegusta)
							}
						},
						dataType: "text"
					});
				});

				mostrarArchivo(url,publicacion);
			}
		});
	},
	dataType: "json"
});

$.ajax({
	method: "POST",
	url: "../models/obtenerComentarios.php",
	data: datos,
	success: function(comentarios){
		$(document).ready(function(){
			if(Object.keys(comentarios).length == 0){
				$("#div-contenedor-comentarios").append(
					$("<div>").addClass("div-noPublicaciones").append(
						$("<h2>").addClass("h2-noPublicaciones").text("No hay comentarios todavía")
					)
				)
			}
			for(let i in comentarios){
				mostrarComentario(comentarios[i]);
			}
		});
	},
	dataType: "json"
});

$(document).ready(() => {
	$("#formAddComentario").submit(() => {
		if($("#formAddComentario").valid()){
			datos["texto"] = $("#inputNewComentario").val();
			$.ajax({
				method: "POST",
				url: "../models/addComentario.php",
				data: datos,
				success: function(result){
					if(!result.error){
						$("#inputNewComentario").val("")
						var comentario = {
							"id_comentario" : result.id_comentarioc,
							"id_publicacion" : datos["idPublicacion"],
							"id_usuario" : datos["idUsuario"],
							"texto" : result.texto,
							"fecha_publicacion" : result.fecha_publicacion,
							"tag" : datos["tag"],
							"foto_perfil" : datos["foto_perfil"],
						}
						mostrarComentario(comentario,true);
					}else{
						alert("Se ha producido un error al publicar el comentario");
					}
				},
				dataType: "json"
			});
		}
		return false;
	});
});

function eliminarPublicacion(id_publicacion){
	$.ajax({
		method: "POST",
		url: "../models/eliminarPublicacion.php",
		data: {"idPublicacion": id_publicacion},
		success: function(tag){
			window.location.assign("../usuarios/" + tag);
		},
		dataType: "text"
	});
}