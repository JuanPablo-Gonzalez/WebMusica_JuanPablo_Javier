<?php
$tagPerfil = $_POST["tagPerfil"];

include_once "../db/db.php";

$sql = "SELECT id_usuario, nombre_usuario, tag, descripcion, fecha_nacimiento, foto_perfil, foto_fondo, cancion FROM usuarios WHERE tag='$tagPerfil'";

$usuario = obtenerArraySQL($conexion, $sql);

$json = [];
if(count($usuario) != 0){
	$usuario = $usuario[0];
	$idUsuario = $usuario["id_usuario"];
	$usuario["error"] = false;

	$sql = "SELECT count(DISTINCT(seguidor)) as numSeguidores from seguidores where seguido='$idUsuario'";
	$usuario["numSeguidores"] = obtenerArraySQL($conexion, $sql)[0]["numSeguidores"];

	$sql = "SELECT count(DISTINCT(seguido)) as numSeguidos from seguidores where seguidor='$idUsuario'";
	$usuario["numSeguidos"] = obtenerArraySQL($conexion, $sql)[0]["numSeguidos"];

	$sql = "SELECT count(DISTINCT(seguidor)) as numPublicaciones from seguidores where seguido='$idUsuario'";
	$usuario["numPublicaciones"] = obtenerArraySQL($conexion, $sql)[0]["numPublicaciones"];

	setlocale(LC_TIME, "spanish");
	$usuario["fecha_nacimiento"] = str_replace("/", "-", $usuario["fecha_nacimiento"]);			
	$Nueva_Fecha = date("d-m-Y", strtotime($usuario["fecha_nacimiento"]));				
	$usuario["fecha_nacimiento"] = strftime("%d de %B de %Y", strtotime($Nueva_Fecha));
	
	echo json_encode($usuario);
}else{
	$json["error"] = true;
	echo json_encode($json);
}
?>