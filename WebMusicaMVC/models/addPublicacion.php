<?php
//session_start();
//$idUsuarioActual = $_SESSION["idUsuario"];
//$tag = $_SESSION["tag"];
//$titulo = $_POST["titulo"];

//$titulo = $_POST["inputTitulo"];
//$texto = $_POST["inputTexto"];

//$texto = $_POST["texto"];
//$file = $_POST["archivo"];

$type = explode("/",$_FILES["inputArchivo"]["type"])[0];
var_dump($type);

switch($type){
	case "audio":
	$target_dir = "../usuarios/".$tag."/audios/";
	$tipo_archivo = 1;
	break;
	case "image":
	$target_dir = "../usuarios/".$tag."/imagenes/";
	$tipo_archivo = 2;
	break;
	case "video":
	$target_dir = "../usuarios/".$tag."/videos/";
	$tipo_archivo = 3;
	break;
}

$target_file = $target_dir . basename($_FILES["inputArchivo"]["name"]);

var_dump($_FILES);
var_dump($target_file);

$subido = move_uploaded_file($_FILES["inputArchivo"]["tmp_name"], $target_file);

var_dump($subido);

?>