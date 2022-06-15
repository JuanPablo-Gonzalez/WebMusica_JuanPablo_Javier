$(document).ready(function() {
	$("#negrita").on("click",convertirNegrita);
	$("#cursiva").on("click",convertirCursiva);
	$("#subrayado").on("click",convertirSubrayado);
	$("#enlace").on("click",convertirEnlace);

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

	mostrarEditar();
	mostrarNotificaciones();
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

function convertirEnlace() {
	let texto= $("#comentario").val();
	let desde = $("#comentario")[0].selectionStart;
	let hasta = $("#comentario")[0].selectionEnd;

	let textoSeleccionado = texto.substring(desde, hasta);

	if (textoSeleccionado.length > 0) {
		$("#comentario")[0].setRangeText(`<a href="${textoSeleccionado}">${textoSeleccionado}</a>`,desde,hasta,'select');
	}

	visualizarTextarea();
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
	let mostrarCitado= '<div class="citado">'+$('#mostrar-citado').val()+'</div>';
	let usuarioActivo= $("#tag-usuario").val();
	let valido= false;
	let seleccionArchivos = document.querySelector("#imagen-archivo");
	let archivoTextarea= "";
	
	/*archivoTextarea= '<br><video width="800" height="600" controls>'+
		'<source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="video/ogg"/>'+
		'<source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="video/mp4"/>'+
		'<source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="video/webm"/>'+
		'<p>Tu navegador no soporta HTML5</p>'+
	 '</video>';*/

	if(contenidoTextareaEditar==""&&contenidoTextareaResponder=="") {
		alert("Comentario no puede estar vacío ");
	}
	else {
		valido= true;

		if($('#mostrar-citado').val()!="")
			$("#comentario").val(mostrarCitado+=contenidoTextareaResponder);

		if(seleccionArchivos.files[0].type.includes("audio")) {
			archivoTextarea= '<br><audio controls><source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="audio/mp3"></audio>';
		} else if(seleccionArchivos.files[0].type.includes("video")) {
			archivoTextarea= '<br><video width="800" height="600" controls>'+
				'<source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="video/mp4">'+
			'</video>';
		} else if(seleccionArchivos.files[0].type.includes("image")){
			archivoTextarea= '<br><img src="../usuarios/'+usuarioActivo+'/imagenes/'+seleccionArchivos.files[0].name+'" width="200px">';
		}
		
		contenidoTextareaResponder= $("#comentario").val();
		$("#comentario").val(contenidoTextareaResponder+=archivoTextarea);
		$("#comentario-editar").val(contenidoTextareaEditar+=archivoTextarea);
	}

	return valido;
}

function enviarFormulario() {
	let titulo= $("#titulo-tema").val();
	let contenidoTextarea= $("#comentario").val();
	let usuarioActivo= $("#tag-usuario").val();
	let valido= false;
	let seleccionArchivos = document.querySelector("#imagen-archivo");
	let archivoTextarea= "";
	
	/*archivoTextarea= '<br><video width="800" height="600" controls>'+
		'<source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="video/ogg"/>'+
		'<source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="video/mp4"/>'+
		'<source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="video/webm"/>'+
		'<p>Tu navegador no soporta HTML5</p>'+
	 '</video>';*/

	if(contenidoTextarea=="")
		alert("Comentario no puede estar vacío");
	else if(titulo=="") 
		alert("Titulo no puede estar vacío");
	else if(titulo==""||contenidoTextarea=="") 
		alert("Titulo y comentario no pueden estar vacíos");
	else {
		valido= true;

		if(seleccionArchivos.files[0].type.includes("audio")) {
			archivoTextarea= '<br><audio controls><source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="audio/mp3"></audio>';
		} else if(seleccionArchivos.files[0].type.includes("video")) {
			archivoTextarea= '<br><video width="800" height="600" controls>'+
				'<source src="../usuarios/'+usuarioActivo+'/audios/'+seleccionArchivos.files[0].name+'" type="video/mp4">'+
			'</video>';
		} else if(seleccionArchivos.files[0].type.includes("image")){
			archivoTextarea= '<br><img src="../usuarios/'+usuarioActivo+'/imagenes/'+seleccionArchivos.files[0].name+'" width="200px">';
		}

		$("#comentario").val(contenidoTextarea+=archivoTextarea);
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

	/*alert(listadoComentarios);
	alert($(".creador-comentario a").length);*/
}

function cambiarEditarComentario() {
	//Se mostrará el texto correspondiente del mensaje elegido, hacer que también se muestre el archivo,
	//y que sea el del pinchado correspondiente
	$("#comentario").val("");
	$("#comentario-antes-editar").show();

	let comentarioCorr= $(this).text();
	comentarioCorr= comentarioCorr.replace('#','')-1;

	$("#comentario-editar").val("");
	$("#comentario-antes-editar").html("Comentario a editar: <br>"+$(".mensaje-comentario").eq(comentarioCorr).html());

	$(".seccion-responder").show();

	$("#comentario-editar-label").show();
	$("#comentario-editar").show();
	$("#boton-editar-comentario").show();

	$("#comentario-label").hide();
	$("#comentario").hide();
	$("#boton-responder").hide();

	$("#eliminar-comentario").show();
	$(".seccion-comentarios .contenedor-comentario:first-child .mensaje-comentario #eliminar-comentario").hide();

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

function mostrarNotificaciones() {
	if($("#tag-usuario").val().includes("xdebug-error"))
		$("#listado-nav li").eq(2).hide();
	else
		$("#listado-nav li").eq(2).show();
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