<?php
//session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$tag = $_SESSION["tag"];

$titulo = trim(addslashes($_POST["inputTitulo"]));
$texto = trim(addslashes($_POST["inputTexto"]));

$type = explode("/",$_FILES["inputArchivo"]["type"])[0];

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
$archivo = basename($_FILES["inputArchivo"]["name"]);
$target_file = $target_dir . $archivo;

$subido = move_uploaded_file($_FILES["inputArchivo"]["tmp_name"], $target_file);

include_once "../db/db.php";

try{
	$sql = "INSERT into publicaciones (id_usuario, titulo, texto, archivo, tipo_archivo) VALUES ('$idUsuarioActual', '$titulo', '$texto', '$archivo', '$tipo_archivo')";

	$conexion->exec($sql);

	header("Location: ../usuarios/".$tag."/");
	die();
}catch(PDOException $e){
	$json["error"] = true;
}
?>