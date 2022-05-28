<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$tagPerfil = $_POST["tagPerfil"];
include_once "../db/db.php";

$sql = "SELECT id_usuario, nombre_usuario, tag, descripcion, fecha_nacimiento, foto_perfil, foto_fondo, cancion FROM usuarios WHERE  tag='$tagPerfil'";

$usuario = obtenerArraySQL($conexion, $sql);

$json = [];
if(count($usuario) != 0){
	$usuario = $usuario[0];
	$idUsuario = $usuario["id_usuario"];
	$usuario["error"] = false;

	$sql = "SELECT count(DISTINCT(seguidor)) AS numSeguidores FROM seguidores WHERE  seguido='$idUsuario'";
	$usuario["numSeguidores"] = obtenerArraySQL($conexion, $sql)[0]["numSeguidores"];

	$sql = "SELECT count(DISTINCT(seguido)) AS numSeguidos FROM seguidores WHERE  seguidor='$idUsuario'";
	$usuario["numSeguidos"] = obtenerArraySQL($conexion, $sql)[0]["numSeguidos"];

	$sql = "SELECT count(id_publicacion) AS numPublicaciones FROM publicaciones WHERE id_usuario='$idUsuario'";
	$usuario["numPublicaciones"] = obtenerArraySQL($conexion, $sql)[0]["numPublicaciones"];

	$sql ="SELECT * FROM seguidores WHERE seguidor='$idUsuarioActual' AND seguido='$idUsuario'";
	$usuario["siguiendo"] = count(obtenerArraySQL($conexion, $sql));

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