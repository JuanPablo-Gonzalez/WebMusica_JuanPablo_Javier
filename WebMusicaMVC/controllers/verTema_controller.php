<?php
    include_once "../db/db.php";
    include_once "../models/verTema_model.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $contenidoComentario= $_POST["comentario"];
        $idTema= $_POST["tema-elegido"];
        $comentarios= obtenerComentarios($conexion,$idTema);

        if($contenidoComentario!="") {
            mandarRespuesta($conexion,$idTema,$contenidoComentario);
            header("location: verTema_controller.php?dato=$idTema"); 
        }
    } else {
        $idTema=$_GET['dato']; 
        $comentarios= obtenerComentarios($conexion,$idTema);
    }

    include_once "../views/verTema_view.html";
?>