var archivosPublicaciones = [];
var intervaloAudios = [];
$.ajax({
	method: "POST",
	url: "../models/obtenerPublicacionesSeguidos.php",
	data: {},
	success: function(publicaciones){
		$(document).ready(function(){
			if(Object.keys(publicaciones).length == 0){
				$("#div-contenedor-publicaciones").append(
					$("<div>").addClass("div-noPublicaciones").append(
						$("<h2>").addClass("h2-noPublicaciones").text("No sigues a nadie")
					)
				);
			}
			for(let i in publicaciones){
				var infoUsuario = {
					nombre_usuario: publicaciones[i].nombre_usuario,
					tag: publicaciones[i].tag,
					foto_perfil: publicaciones[i].foto_perfil
				};

				var url = "../usuarios/" + infoUsuario.tag +"/";
				console.log(url)
				mostrarPublicacion(url,"",infoUsuario, publicaciones[i]);

				let id_publicacion = publicaciones[i].id_publicacion;

				$("#publicacion-"+id_publicacion).click(() => {
					irAPublicacion("",id_publicacion);
				});

				$("#img-mg-"+id_publicacion).click((event) => {
					event.stopPropagation();
					var datosMg = {
						"idPublicacion": id_publicacion,
						"tegusta": publicaciones[i].tegusta
					};
					$.ajax({
						method: "POST",
						url: "../models/megusta.php",
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

				mostrarArchivo(url,publicaciones[i]);
			}
		})
	},
	dataType: "json"
});

function irAPublicacion(url,id_publicacion) {
	window.location.assign(url+"../controllers/publicacion_controller.php?idPublicacion="+id_publicacion);
}

function eliminarPublicacion(id_publicacion){
	$.ajax({
		method: "POST",
		url: "../models/eliminarPublicacion.php",
		data: {"idPublicacion": id_publicacion},
		success: function(tag){
			location.reload();
		},
		dataType: "text"
	});
}