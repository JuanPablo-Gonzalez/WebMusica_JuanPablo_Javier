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
			}else {
				var publicacion = result.publicacion;
				var usuario = {"nombre_usuario" : publicacion.nombre_usuario, "tag" : publicacion.tag, "foto_perfil" : publicacion.foto_perfil};
				var url = "../usuarios/" + usuario.tag +"/";
				mostrarPublicacion(url,"",usuario, publicacion);

				$("#img-mg-"+publicacion.id_publicacion).click(() => {
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
								alternarButtonMeGusta("",result.tegusta,datosMg.idPublicacion);
								if(result.tegusta){
									publicacion.numMegusta++;
								}else{
									publicacion.numMegusta--;
								}
								$("#numMegust-"+publicacion.id_publicacion).text(publicacion.numMegusta)
							}
						},
						dataType: "json"
					});
				});

				mostrarArchivo(url,publicacion);
			}
		});
	},
	dataType: "json"
});

/*$.ajax({
	method: "POST",
	url: "../models/obtenerComentarios.php",
	data: datos,
	success: function(result){
		$(document).ready(function(){

		});
	},
	dataType: "json"
});*/