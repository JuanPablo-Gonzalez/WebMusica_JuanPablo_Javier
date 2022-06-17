$(document).ready(function() {
	$("#negrita").on("click",convertirNegrita);
	$("#cursiva").on("click",convertirCursiva);
	$("#subrayado").on("click",convertirSubrayado);

	$("#comentario").on("keyup",visualizarTextarea);
	$("#comentario-editar").on("keyup",visualizarTextareaEditar);

	$(".seccion-responder").hide();

	$("#imagen-elegida").hide();
	$("#audio-elegido").hide();

	$("#imagen-archivo").on("change",verImagen);
	$("#quitar-imagen").on("click",quitarImagen);

	$(".boton-editar").on("click",cambiarEditarComentario);
	$(".seccion-comentarios a:first-child").on("click",mostrarResponder);
	$(".citar-comentario").on("click",mostrarResponderCitando);

	$("#form-login").on("submit",enviarFormulario);
	$("#form-responder").on("submit",enviarFormularioEditar);

	let numeroComentarios= $(".contenedor-comentario").toArray().length;

	if(numeroComentarios==1&&$(".creador-comentario a").eq(0).text()==$("#tag-usuario").val()) {
		$(".seccion-comentarios a").eq(0).hide();
	} else {
		$(".seccion-comentarios a").eq(0).show();
	}

	$("#eliminar-comentario").eq(0).hide();

	mostrarEditar();
	mostrarCitar();
});

/*Método que sirve para poner en negrita un texto seleccionado*/
function convertirNegrita() {
	let texto= $("#comentario").val();
	let textoEditar= $("#comentario-editar").val();

	if(texto!="") {
		let desde = $("#comentario")[0].selectionStart;
		let hasta = $("#comentario")[0].selectionEnd;

		let textoSeleccionado = texto.substring(desde, hasta);

		if (textoSeleccionado.length > 0)
			$("#comentario")[0].setRangeText(`<b>${textoSeleccionado}</b>`,desde,hasta,'select');

		visualizarTextarea();
	} else if(textoEditar!="") {
		let desde = $("#comentario-editar")[0].selectionStart;
		let hasta = $("#comentario-editar")[0].selectionEnd;

		let textoSeleccionado = textoEditar.substring(desde, hasta);

		if (textoSeleccionado.length > 0)
			$("#comentario-editar")[0].setRangeText(`<b>${textoSeleccionado}</b>`,desde,hasta,'select');
		
		visualizarTextareaEditar();
	}
}

function convertirCursiva() {
	let texto= $("#comentario").val();
	let textoEditar= $("#comentario-editar").val();

	if(texto!="") {
		let desde = $("#comentario")[0].selectionStart;
		let hasta = $("#comentario")[0].selectionEnd;

		let textoSeleccionado = texto.substring(desde, hasta);

		if (textoSeleccionado.length > 0)
			$("#comentario")[0].setRangeText(`<i>${textoSeleccionado}</i>`,desde,hasta,'select');

		visualizarTextarea();
	} else if(textoEditar!="") {
		let desde = $("#comentario-editar")[0].selectionStart;
		let hasta = $("#comentario-editar")[0].selectionEnd;

		let textoSeleccionado = textoEditar.substring(desde, hasta);

		if (textoSeleccionado.length > 0)
			$("#comentario-editar")[0].setRangeText(`<i>${textoSeleccionado}</i>`,desde,hasta,'select');
		
		visualizarTextareaEditar();
	}
}

function convertirSubrayado() {
	let texto= $("#comentario").val();
	let textoEditar= $("#comentario-editar").val();

	if(texto!="") {
		let desde = $("#comentario")[0].selectionStart;
		let hasta = $("#comentario")[0].selectionEnd;

		let textoSeleccionado = texto.substring(desde, hasta);

		if (textoSeleccionado.length > 0) {
			$("#comentario")[0].setRangeText(`<u>${textoSeleccionado}</u>`,desde,hasta,'select');
		}

		visualizarTextarea();
	} else if(textoEditar!="") {
		let desde = $("#comentario-editar")[0].selectionStart;
		let hasta = $("#comentario-editar")[0].selectionEnd;

		let textoSeleccionado = textoEditar.substring(desde, hasta);

		if (textoSeleccionado.length > 0) {
			$("#comentario-editar")[0].setRangeText(`<u>${textoSeleccionado}</u>`,desde,hasta,'select');
		}

		visualizarTextareaEditar();
	}
}

//Función para que el contenido se visualice justo debajo, como debe salir
function visualizarTextarea() {
	let contenidoTextarea= $("#comentario").val();

	//el replace sirve para que se vean los saltos de línea correctamente al pulsar enter
	$("#ver").html(contenidoTextarea.replace(/\n/g,"<br>"));
}

function visualizarTextareaEditar() {
	let contenidoTextarea= $("#comentario-editar").val();

	//el replace sirve para que se vean los saltos de línea correctamente al pulsar enter
	$("#ver").html(contenidoTextarea.replace(/\n/g,"<br>"));
}

function verImagen() {
	const $seleccionArchivos = document.querySelector("#imagen-archivo");
	const $imagenPrevisualizacion = document.querySelector("#imagen-elegida");

	// Escuchar cuando cambie
		// Los archivos seleccionados, pueden ser muchos o uno
	const archivos = $seleccionArchivos.files;
		// Si no hay archivos salimos de la función y quitamos la imagen
	if (!archivos || !archivos.length) {
		$imagenPrevisualizacion.src = "";
		return;
	}
		// Ahora tomamos el primer archivo, el cual vamos a previsualizar
	const primerArchivo = archivos[0];
		// Lo convertimos a un objeto de tipo objectURL
	const objectURL = URL.createObjectURL(primerArchivo);
		// Y a la fuente de la imagen le ponemos el objectURL
	
	if($("#imagen-archivo").val().includes(".jpg")||$("#imagen-archivo").val().includes(".jpeg")||
	$("#imagen-archivo").val().includes(".png"))
		$("#imagen-elegida").show();
	else {
		$("#imagen-elegida").hide();
	}

	$imagenPrevisualizacion.src = objectURL;
}

function quitarImagen() {
	const $seleccionArchivos = document.querySelector("#imagen-archivo");
	const $imagenPrevisualizacion = document.querySelector("#imagen-elegida");

	$seleccionArchivos.value= "";
	$imagenPrevisualizacion.src = "";

	$("#imagen-elegida").hide();
}

function enviarFormularioEditar() {
	let contenidoTextareaResponder= $("#comentario").val();
	let contenidoTextareaEditar= $("#comentario-editar").val();
	let mostrarCitado= '<div class="citado">'+$('#mostrar-citado').val()+'</div><br>';
	let valido= false;

	if(contenidoTextareaEditar==""&&contenidoTextareaResponder=="") {
		alert("Comentario no puede estar vacío ");
	}
	else {
		valido= true;

		if($('#mostrar-citado').val()!="")
			$("#comentario").val(mostrarCitado+=contenidoTextareaResponder);
	}

	return valido;
}

function enviarFormulario() {
	let titulo= $("#titulo-tema").val();
	let contenidoTextarea= $("#comentario").val();
	let valido= false;

	if(titulo==""||contenidoTextarea=="") 
		alert("Titulo y comentario no pueden estar vacíos");
	else {
		valido= true;

		$("#comentario").val(contenidoTextarea);
	}

	return valido;
}

//Solo se mostrará el botón de editar si es un comentario del usuario activo
function mostrarEditar() {
	let listadoComentarios= $(".creador-comentario a");
	let usuarioActivo= $("#tag-usuario").val();
	$(".boton-editar").hide();

	for (let index=0; index < listadoComentarios.length; index++) {
		if(listadoComentarios.eq(index).text()==usuarioActivo)
			$(".boton-editar").eq(index).show();
	}
}

function cambiarEditarComentario() {
	//Se mostrará el texto correspondiente del mensaje elegido
	$("#comentario").val("");
	$("#comentario-antes-editar").show();

	let comentarioCorr= $(this).text();
	comentarioCorr= comentarioCorr.replace('#','')-1;

	$("#comentario-editar").val($(".mensaje-comentario p").eq(comentarioCorr).html());
	//$("#comentario-antes-editar").html("Comentario a editar: <br>"+$(".mensaje-comentario").eq(comentarioCorr).html());

	$(".seccion-responder").show();

	$("#comentario-editar-label").show();
	$("#comentario-editar").show();
	$("#boton-editar-comentario").show();

	$("#comentario-label").hide();
	$("#comentario").hide();
	$("#boton-responder").hide();

	if($(this).text().replace('#','')==1)
		$("#eliminar-comentario").hide();
	else
		$("#eliminar-comentario").show();
	

	$("#editar-comentario").val($(".idComentario").eq(comentarioCorr).html());

	$("#ver-citado").hide();
	$("#mostrar-citado").val("");
}

function mostrarResponder() {
	if($("#tag-usuario").val()=="")
		alert("Debes iniciar sesión para poder comentar");
	else {
		$("#comentario-editar").val("");

		$(".seccion-responder").show();

		$("#comentario-editar-label").hide();
		$("#comentario-editar").hide();
		$("#boton-editar-comentario").hide();

		$("#comentario-label").show();
		$("#comentario").show();
		$("#boton-responder").show();

		$("#eliminar-comentario").hide();
		$(".alerta-eliminar-comentario").hide();

		$("#ver-citado").hide();
		$("#mostrar-citado").val("");

		$("#comentario-antes-editar").hide();
	}
}

function mostrarResponderCitando() {
	if($("#tag-usuario").val()=="")
		alert("Debes iniciar sesión para poder comentar");
	else {
		let idComentarioActual= $(this).text().replace('#','');
		let comentarioCorr= $(this).text().replace('#','')-1;
		let listadoComentarios= $(".creador-comentario a");
		let usuario= listadoComentarios.eq(comentarioCorr).text();
		let idComentarioCitar= $(".contenedor-comentario").eq(comentarioCorr).attr("id");

		$("#mostrar-citado").val('Citando mensaje <a href="#'+idComentarioCitar+'">#'+idComentarioActual+'</a> de <b>'+usuario+'</b>:<br><br>'+$('.mensaje-comentario').eq(comentarioCorr).html());
		$("#ver-citado").html("Mensaje a citar: <br>"+$('.mensaje-comentario').eq(comentarioCorr).html());

		$("#comentario-editar").val("");

		$(".seccion-responder").show();

		$("#comentario-editar-label").hide();
		$("#comentario-editar").hide();
		$("#boton-editar-comentario").hide();

		$("#comentario-label").show();
		$("#comentario").show();
		$("#boton-responder").show();

		$("#eliminar-comentario").hide();
		$(".alerta-eliminar-comentario").hide();

		$("#ver-citado").show();
		$("#comentario-antes-editar").hide();
	}
}

function mostrarCitar() {
	let listadoComentarios= $(".creador-comentario a");
	let usuarioActivo= $("#tag-usuario").val();
	$(".citar-comentario").hide();

	for (let index=0; index < listadoComentarios.length; index++) {
		if(listadoComentarios.eq(index).text()!=usuarioActivo)
			$(".citar-comentario").eq(index).show();
	}
}