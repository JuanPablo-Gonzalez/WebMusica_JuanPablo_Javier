<?php
$idUsuarioActual = $_SESSION["idUsuario"];
$tag = $_SESSION["tag"];

$titulo = trim(addslashes($_POST["inputTitulo"]));
$texto = trim(addslashes($_POST["inputTexto"]));

include_once "../db/db.php";

if(isset($_FILES["inputArchivo"]) && $_FILES["inputArchivo"]["type"] != ""){
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

	$sql = "INSERT into publicaciones (id_usuario, titulo, texto, archivo, tipo_archivo) VALUES ('$idUsuarioActual', '$titulo', '$texto', '$archivo', '$tipo_archivo')";

	$conexion->exec($sql);

	header("Location: ../usuarios/".$tag."/");
	die();
}else if(isset($_POST["inputUrl"])){
	$url = $_POST["inputUrl"];
	if($url != "" && $titulo != "" && $texto != ""){
		$url = str_replace("https://youtu.be/","https://www.youtube.com/embed/",$url);
		
		$sql = "INSERT into publicaciones (id_usuario, titulo, texto, archivo, tipo_archivo) VALUES ('$idUsuarioActual', '$titulo', '$texto', '$url', 4)";

		$conexion->exec($sql);

		header("Location: ../usuarios/".$tag."/");
		die();
	}
}else{
	if($titulo != "" && $texto != ""){
		$sql = "INSERT into publicaciones (id_usuario, titulo, texto) VALUES ('$idUsuarioActual', '$titulo', '$texto')";

		$conexion->exec($sql);
	}

	header("Location: ../usuarios/".$tag."/");
	die();
}
?>