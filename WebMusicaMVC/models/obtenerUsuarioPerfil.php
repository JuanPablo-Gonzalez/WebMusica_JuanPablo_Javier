<?php
//$tagPerfil = $_POST["tagPerfil"];
$tagPerfil = "JRenedo";
include_once "../db/db.php";

$sql = "SELECT id_usuario, nombre_usuario, tag, descripcion, fecha_nacimiento, foto_perfil, foto_fondo, cancion FROM usuarios WHERE tag='$tagPerfil'";

$stmt = $conexion->prepare($sql);
$stmt->execute();
$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

$usuario = new RecursiveArrayIterator($stmt->fetchAll());

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