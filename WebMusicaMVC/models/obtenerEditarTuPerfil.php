<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];

include_once "../db/db.php";

$sql = "SELECT nombre_usuario, tag, email, descripcion, fecha_nacimiento, foto_perfil, foto_fondo, cancion FROM usuarios WHERE  id_usuario='$idUsuarioActual'";

$usuario = obtenerArraySQL($conexion, $sql);

$json = [];
if(count($usuario) != 0){
	$usuario = $usuario[0];
	$usuario["error"] = false;

	echo json_encode($usuario);
}else{
	$json["error"] = true;
	echo json_encode($json);
}
?>