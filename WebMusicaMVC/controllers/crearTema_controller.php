<?php
session_start();

if(!isset($_SESSION["email"])){
	session_unset();
	session_destroy();
	header("Location: login_controller.php");
	die();
}

include_once "../db/db.php";
include_once "../models/crearTema_model.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$titulo= $_POST["titulo-tema"];
	$contenidoComentario= $_POST["comentario"];
	$foroElegido= $_POST["foro-elegido"];
	$usuario= $_SESSION["tag"];
	$tipoArchivo= "";
	$archivo= "";

	if($titulo!=""&&$contenidoComentario!="") {
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
	
		insertarNuevoTema($conexion,$titulo,$contenidoComentario,$archivo,$tipoArchivo,$foroElegido);

		header("location: foro_controller.php");
	}
}

$foroElegido=$_GET['dato']; 
include_once "../views/crearTema_view.html";
?>