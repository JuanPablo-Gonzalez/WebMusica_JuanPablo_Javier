<?php
    session_start();

    include_once "../db/db.php";
    include_once "../models/verTema_model.php";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $contenidoComentario=$_POST["comentario"];
        $contenidoComentarioEditar=$_POST["comentario-editar"];
        $idTema= $_POST["tema-elegido"];
        $comentarios= obtenerComentarios($conexion,$idTema);
        $usuario= $_SESSION["tag"];
        $idComentario= $_POST["editar-comentario"];
        $tipoArchivo= "";
	    $archivo= "";

        if($contenidoComentario!=""|| $contenidoComentarioEditar!="") {
            if(strpos($_FILES['imagen-archivo']['name'], ".jpg") != false
            ||strpos($_FILES['imagen-archivo']['name'], ".jpeg") != false
            ||strpos($_FILES['imagen-archivo']['name'], ".png") != false) {
                $directorio = '../usuarios/'.$usuario.'/imagenes/';
                $archivo= '../usuarios/'.$usuario.'/imagenes/'.$_FILES['imagen-archivo']['name'];
                $tipoArchivo= "image";

                $subir_archivo = $directorio.basename($_FILES['imagen-archivo']['name']);
                move_uploaded_file($_FILES['imagen-archivo']['tmp_name'], $subir_archivo);
            } else if(strpos($_FILES['imagen-archivo']['name'], ".mp3") != false) {
                $directorio = '../usuarios/'.$usuario.'/audios/';
                $archivo= '../usuarios/'.$usuario.'/audios/'.$_FILES['imagen-archivo']['name'];
                $tipoArchivo= "audio";

                $subir_archivo = $directorio.basename($_FILES['imagen-archivo']['name']);
                move_uploaded_file($_FILES['imagen-archivo']['tmp_name'], $subir_archivo);
            }
            
            if(isset($_POST["boton-responder"])) 
                mandarRespuesta($conexion,$idTema,$contenidoComentario,$archivo,$tipoArchivo);
            else if(isset($_POST["boton-editar-comentario"]))
                editarComentario($conexion,$idTema,$contenidoComentarioEditar,$idComentario,$archivo,$tipoArchivo);
            else if(isset($_POST["eliminar-comentario"]))
                eliminarComentario($conexion,$idTema,$idComentario);
            
            header("location: verTema_controller.php?dato=$idTema"); 
        }
    } else {
        $idTema=$_GET['dato']; 
        $comentarios= obtenerComentarios($conexion,$idTema);
    }

    include_once "../views/verTema_view.html";
?>