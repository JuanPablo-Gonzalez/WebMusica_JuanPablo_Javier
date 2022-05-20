$(document).ready(function() {
	//alert(2);
	$("#negrita").on("click",convertirNegrita);
	$("#cursiva").on("click",convertirCursiva);
	$("#subrayado").on("click",convertirSubrayado);

	$("#comentario").on("keyup",visualizarTextarea);
	$("#insertar-imagen").on("change",anadirImagen);

	/*
  $("#comentario").on('keyup', function (e) {
	var keycode = e.keyCode || e.which;
	  if (keycode == 13) {
		  let contenidoTextarea= $("#comentario").val();

		  $("#comentario").val(contenidoTextarea+='<br>\n');
	  }
	});*/
});

/*Método que sirve para poner en negrita un texto seleccionado*/
function convertirNegrita() {
	let texto= $("#comentario").val();
	let desde = $("#comentario")[0].selectionStart;
	let hasta = $("#comentario")[0].selectionEnd;

	let textoSeleccionado = texto.substring(desde, hasta);

	// si hay algo seleccionado
	if (textoSeleccionado.length > 0) {
		/*reemplazar el texto seleccionado con una cadena
		donde el texto seleccionado aparece entre etiquetas strong*/
		$("#comentario")[0].setRangeText(`<b>${textoSeleccionado}</b>`,desde,hasta,'select');
	}

	visualizarTextarea();
}

function convertirCursiva() {
	let texto= $("#comentario").val();
	let desde = $("#comentario")[0].selectionStart;
	let hasta = $("#comentario")[0].selectionEnd;

	let textoSeleccionado = texto.substring(desde, hasta);

	// si hay algo seleccionado
	if (textoSeleccionado.length > 0) {
	/*reemplazar el texto seleccionado con una cadena
	donde el texto seleccionado aparece entre etiquetas strong*/
	$("#comentario")[0].setRangeText(`<i>${textoSeleccionado}</i>`,desde,hasta,'select');
}

visualizarTextarea();
}

function convertirSubrayado() {
	let texto= $("#comentario").val();
	let desde = $("#comentario")[0].selectionStart;
	let hasta = $("#comentario")[0].selectionEnd;

	let textoSeleccionado = texto.substring(desde, hasta);

	// si hay algo seleccionado
	if (textoSeleccionado.length > 0) {
	/*reemplazar el texto seleccionado con una cadena
	donde el texto seleccionado aparece entre etiquetas strong*/
	$("#comentario")[0].setRangeText(`<u>${textoSeleccionado}</u>`,desde,hasta,'select');
}

visualizarTextarea();
}

//Función para que el contenido se visualice justo debajo, como debe salir
function visualizarTextarea() {
	let contenidoTextarea= $("#comentario").val();

	//el replace sirve para que se vean los saltos de línea correctamente al pulsar enter
	$("#ver").html(contenidoTextarea.replace(/\n/g,"<br>"));
}

function anadirImagen() {
	let contenidoTextarea= $("#comentario").val();
	/*let imagenSeleccionada= $("#insertar-imagen").val().replace("C:\\fakepath\\","");

  alert(imagenSeleccionada);
  let imagen= "<img src='../imagenes/"+imagenSeleccionada+"'>";

  $("#comentario").val(contenidoTextarea+=imagen);*/

	// Obtener referencia al input y a la imagen
	const $seleccionArchivos = document.querySelector("#insertar-imagen");

	//const $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

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
	alert(primerArchivo);
	const objectURL = URL.createObjectURL(primerArchivo);
	alert(objectURL);
	// Y a la fuente de la imagen le ponemos el objectURL
	//$('#comentario').append("<img src='"+objectURL+"'>");
	let imagen= "<img src='"+objectURL+"'>";

	$("#comentario").val(contenidoTextarea+=imagen);
	//$("#comentario").val(contenidoTextarea+=imagen);

	arrayImagenes.push();
}

document.addEventListener("keyup", function(event) { 
	if (event.key === 13) { 
		let line = document.createElement("line");
		line.innerHTML = "<br> this should go to the bottom of the element   ";
		document.querySelector("div#elmtobetrig").append(line) 
	} 

	visualizarTextarea();
});



/*
// Obtener referencia al input y a la imagen
const $seleccionArchivos = document.querySelector("#insertar-imagen");
const $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");

// Escuchar cuando cambie
$seleccionArchivos.addEventListener("change", () => {
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
  $imagenPrevisualizacion.src = objectURL;
});*/
