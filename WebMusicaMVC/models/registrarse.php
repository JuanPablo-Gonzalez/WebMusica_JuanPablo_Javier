<?php
session_start();
$email = trim(addslashes($_POST["email"]));
$nombre = trim(addslashes($_POST["nombre"]));
$tag = trim(addslashes($_POST["tag"]));
$pwd = MD5(trim($_POST["password"]));
$fechaNacimiento = trim(addslashes($_POST["fechaNacimiento"]));

include_once "../db/db.php";

$json = [];
try {
	$sql = "INSERT INTO usuarios (email, nombre_usuario, tag, password, fecha_nacimiento) VALUES ('$email','$nombre','$tag','$pwd','$fechaNacimiento')";
	
	$conexion->exec($sql);
	
	$idUsuario = $conexion->lastInsertId();

	$json["error"] = false;
	$json["tag"] = $tag;
	//$json["idUsuario"] = $idUsuario;
	
	$_SESSION["idUsuario"] = $idUsuario;
	$_SESSION["nombre"] = $nombre;
	$_SESSION["tag"] = $tag;
	$_SESSION["email"] = $email;
	$_SESSION["foto_perfil"] = null;
	$_SESSION["foto_fondo"] = null;

	if(!file_exists("../usuarios")){
		mkdir("../usuarios");
	}
	if(!file_exists("../usuarios/" . $tag)){
		mkdir("../usuarios/" . $tag);
	}
	if(!file_exists("../usuarios/" . $tag . "/fotos")){
		mkdir("../usuarios/" . $tag . "/fotos");
	}
	if(!file_exists("../usuarios/" . $tag . "/videos")){
		mkdir("../usuarios/" . $tag . "/videos");
	}
	if(!file_exists("../usuarios/" . $tag . "/audios")){
		mkdir("../usuarios/" . $tag . "/audios");
	}

	$indexFile = fopen("../usuarios/" . $tag ."/index.php", "w");
	$codeIndex = '<?php include_once "../../controllers/perfil_controller.php"; ?>';
	fwrite($indexFile, $codeIndex);
} catch(PDOException $e) {
	$json["error"] = true;
	$json["errorInfo"]["errorCode"] = $e->getCode();

	if($e->getCode() == 23000){
		$json["errorInfo"]["code"] = $e->errorInfo[1];
		if($e->errorInfo[1] == 1062){
			$key = str_replace("'","",explode(" ",$e->errorInfo[2])[5]);
			$json["errorInfo"]["key"] = $key;
		}
	}
}
echo json_encode($json);
?>