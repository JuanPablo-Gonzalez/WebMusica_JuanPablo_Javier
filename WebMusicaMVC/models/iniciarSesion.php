<?php
session_start();
$email = $_POST["email"];
$password = MD5($_POST["password"]);

include_once "../db/db.php";

$sql = "SELECT id_usuario, nombre_usuario, tag, foto_perfil FROM usuarios WHERE email='$email' and password='$password'";

$stmt = $conexion->prepare($sql);
$stmt->execute();
$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

$usuario = new RecursiveArrayIterator($stmt->fetchAll());

$json = [];
if(count($usuario) != 0){
	$json["error"] = false;
	$usuario = $usuario[0];

	$json["idUsuario"] = $usuario["id_usuario"];

	$_SESSION["idUsuario"] = $usuario["id_usuario"];
	$_SESSION["nombre"] = $usuario["nombre_usuario"];
	$_SESSION["tag"] = $usuario["tag"];
	$_SESSION["email"] = $email;
	$_SESSION["foto_perfil"] = $usuario["foto_perfil"];
}else{
	$json["error"] = true;
}
?>