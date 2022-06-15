$(document).ready(function() {
    //$("#listado-foros").hide();
    
    let contenidoAyuda= $("#foro-ayuda").attr('data-value');
    let contenidoBusqueda= $("#foro-busqueda").attr('data-value');
    let contenidoGeneral= $("#foro-general").attr('data-value');

    mostrarTablaForos(contenidoAyuda); //por si queremos mostrarla desde el principio

    //eventos que llaman a una función a la que se le pasan parámetros, que son
    //el contenido del botón que se pulse...

    $("#foro-ayuda").click({foro: contenidoAyuda},mostrarTablaForos,cambiarForoCrearTema);
    $("#foro-busqueda").click({foro: contenidoBusqueda},mostrarTablaForos,cambiarForoCrearTema);
    $("#foro-general").click({foro: contenidoGeneral},mostrarTablaForos,cambiarForoCrearTema);

    mostrarNotificaciones();
} );

function mostrarTablaForos(event) {
    let foroElegido= event;

    if(foroElegido!='1') {
       foroElegido= event.data.foro;
    }

    if(foroElegido=='1') {
        $("#cabecera-titulo>h2").html("Foro de ayuda");
    } else if(foroElegido=='2') {
        $("#cabecera-titulo>h2").html("Foro de búsqueda");
    } else if(foroElegido=='3') {
        $("#cabecera-titulo>h2").html("Foro general");
    } 

    //con esto quería evitar que cambiase de tamaño al pulsar sobre el mismo botón, mirar como hacerlo...
    
    if ($.fn.DataTable.isDataTable('#tablaTemas') ) {
        $("#tablaTemas").dataTable().fnDestroy();
    }
    //$("#tablaTemas").dataTable().fnDestroy(); //destruye la datatable anterior para crear la nueva

    /*let tabla=*/ $('#tablaTemas').DataTable( {
        responsive: true,
        "aaSorting": [],
        "lengthChange": false,
        "pageLength": 15,
        "info": false,
        //ordering: false, //no aparecerán las flechas ordenación y no funcionará
        retrieve: true, //mirar
        //paging: false, //para quitar o poner los números que aparecen abajo cuando se excede un límite
        "language": {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ de _TOTAL_ temas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar por título o usuario:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
            }
        },
        "ajax":{
            "url": "../models/foro_model.php",
            "dataSrc": "",
            "data":{"foroElegido":foroElegido}, //envio opcion 4 para que haga un SELECT
            "type" : "post"
        },
        "columns": [
            {"data": "titulo",
                "fnCreatedCell": function (nTd, sData, oData) { //otra forma de crear enlace, pero este sí me dejaba elegir que valor de qué td darle
                    $(nTd).html('<a href=../controllers/verTema_controller.php?dato='+encodeURIComponent(oData.id_tema)+'>'+sData+'</a>');
                }
            },
            {"data": "fecha_publicacion"},
            {"data": "tag",
                "fnCreatedCell": function (nTd, sData) { //oData permite recoger cualquier dato de columna, y sData es el propio dato
                    $(nTd).html('<a href=../usuarios/'+sData+'>'+sData+'</a>');
                }
            }, 
            {"data": "id_tema"}
        ],
        
        //Con esta conseguimos añadir un enlace a las celdas especificadas(en targets como antes),
        //y además le pasaremos el valor por url a la siguiente pantalla que mostrará los comentarios...
        "columnDefs": [
            {"bSortable": false, "aTargets": [0, 2]},
            {"bSearchable": false, "aTargets": [1]},
            {"bVisible": false, "aTargets": [3]}
        ]
    } );

    $("#listado-foros").show();
    cambiarForoCrearTema(foroElegido);
}

/*Función para que recoja y envía el foro correcto para crear el tema*/
function cambiarForoCrearTema(foroElegido) {
    $('#pad-superior a').attr('href','crearTema_controller.php?dato='+encodeURIComponent(foroElegido));
}

function mostrarNotificaciones() {
	if($("#tag-usuario").val().includes("xdebug-error"))
		$("#listado-nav li").eq(2).hide();
	else
		$("#listado-nav li").eq(2).show();
}