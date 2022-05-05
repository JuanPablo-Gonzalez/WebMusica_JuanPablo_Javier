$(document).ready(function() {
    //$("#listado-foros").hide();
    
    let contenidoAyuda= $("#foro-ayuda").attr('data-value');
    let contenidoBusqueda= $("#foro-busqueda").attr('data-value');
    let contenidoGeneral= $("#foro-general").attr('data-value');

    mostrarTablaForos(contenidoAyuda); //por si queremos mostrarla desde el principio

    //eventos que llaman a una función a la que se le pasan parámetros, que son
    //el contenido del botón que se pulse...

    $("#foro-ayuda").click({foro: contenidoAyuda},mostrarTablaForos);
    $("#foro-busqueda").click({foro: contenidoBusqueda},mostrarTablaForos);
    $("#foro-general").click({foro: contenidoGeneral},mostrarTablaForos);

    /*$($("#tablaTemas tbody").find('tr:first').find('td:first')).on('click', function(){
        alert($("#tablaTemas tbody").find('tr:first').find('td:first').text());
    });

    $('#tablaTemas td').click( function () {
        alert("hola");
    } );
    $('#tablaTemas tbody').on( 'click', 'tr td:eq(0)', function (){
        alert("col1");
     });

     $("#ver").on('click', function () {
        alert($("#tablaTemas tbody").find('tr:first').find('td:first').text());
    });*/
} );

function mostrarTablaForos(event) {
    let foroElegido= event;

    if(foroElegido!='F001') {
       foroElegido= event.data.foro;
    }

    if(foroElegido=='F001') {
        $("#cabecera-titulo>h2").html("Foro de ayuda");
    } else if(foroElegido=='F002') {
        $("#cabecera-titulo>h2").html("Foro de búsqueda");
    } else if(foroElegido=='F003') {
        $("#cabecera-titulo>h2").html("Foro general");
    } 

    //con esto quería evitar que cambiase de tamaño al pulsar sobre el mismo botón, mirar como hacerlo...
    
    if ($.fn.DataTable.isDataTable('#tablaTemas') ) {
        $("#tablaTemas").dataTable().fnDestroy();
    }
    //$("#tablaTemas").dataTable().fnDestroy(); //destruye la datatable anterior para crear la nueva

    /*let tabla=*/ $('#tablaTemas').DataTable( {
        responsive: true,
        //ordering: false, //no aparecerán las flechas ordenación y no funcionará
        retrieve: true, //mirar
        //paging: false, //para quitar o poner los números que aparecen abajo cuando se excede un límite
        "ajax":{
            "url": "../models/foro_model.php",
            "dataSrc": "",
            "data":{"foroElegido":foroElegido}, //envio opcion 4 para que haga un SELECT
            "type" : "post"
        },
        "columns": [
            {"data": "titulo",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) { //otra forma de crear enlace, pero este sí me dejaba elegir que valor de qué td darle
                    $(nTd).html('<a href=../controllers/registro_controller.php?dato='+encodeURIComponent(oData.id_tema)+'>'+sData+'</a>');
                }
            },
            {"data": "fecha_publicacion"},
            {"data": "nombre_usuario",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) { //oData permite recoger cualquier dato de columna, y sData es el propio dato
                    $(nTd).html('<a href=../controllers/registro_controller.php?dato='+encodeURIComponent(sData)+'>'+sData+'</a>');
                }
            }, 
            {"data": "cuentaResp"},
            {"data": "id_tema"}
        ],

        /*"aoColumnDefs": [ //Sirve para quitar la ordenación por columnas al pulsar sobre ellas
            {"bSortable": false, "aTargets": [1, 3]}, //para controlar columnas a ordenar
            {"bSearchable": false, "aTargets": [1, 3 ]} //para controlar las columnas que podrán ser buscadas 
        ],*/ //bSearchable sirve para indicar las columnas que podrán ser buscadas en el campo search, cada posicion puesta en la matriz es de una columna
        
        //Con esta conseguimos añadir un enlace a las celdas especificadas(en targets como antes),
        //y además le pasaremos el valor por url a la siguiente pantalla que mostrará los comentarios...
        "columnDefs": [
            /*{"targets": [0, 1], 
            "render": function (data, type, row, meta) {
                //encodeURIComponent para que no omita los espacios al pasarse...
                
                return '<a href=../controllers/registro_controller.php?dato='+encodeURIComponent(data)+'>'+data+'</a>';
            }},*/
            {"bSortable": false, "aTargets": [0, 2]},
            {"bSearchable": false, "aTargets": [1, 3]},
            {"bVisible": false, "aTargets": [4]},
            {"width": "400px", "targets": [0]},
            {"width": "150px", "targets": [1,2,3]}
        ]
    } );

    //función delegada para sacar el valor de una td al hacer click
    /*$('#tablaTemas').on('click', 'tbody td', function () {
        var data = this.textContent;
        alert(data);
    } );

    $('#tablaTemas').on('click', 'tbody tr', function () {
        var data = this.textContent;
        alert(data);
    } );*/

    $("#listado-foros").show();
}


/*
- Mirar lo de los tamaños de las columnas...
- crear siguiente pantalla con los comentarios...
- Mirar lo del movimiento raro al hacer pulsar sobre el mismo botón, al hacer destroy...
*/