<?php
$email = $_POST["email"];
$nombre = $_POST["nombre"];
$tag = $_POST["tag"];
$pwd = MD5($_POST["password"]);
$fechaNacimiento = $_POST["fechaNacimiento"];

include_once "../db/db.php";

$json = [];
try {
	$sql = "INSERT INTO usuarios (email, nombre_usuario, tag, password, fecha_nacimiento) VALUES ('$email','$nombre','$tag','$pwd','$fechaNacimiento')";
	
	$conexion->exec($sql);

	$json["error"] = false;
	$json["idUsuario"] = $conexion->lastInsertId();
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