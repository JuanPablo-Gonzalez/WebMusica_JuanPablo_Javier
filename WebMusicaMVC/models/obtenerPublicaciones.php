<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$idPerfil = $_POST["idPerfil"];
//$idUsuarioActual = 44;
//$idPerfil = 43;

include_once "../db/db.php";

$sql = "SELECT 
	publicaciones.*, 
	COUNT(comentarios_publicaciones.id_comentario) as numComentarios,
	COUNT(megusta.id_publicacion) as numMegusta,
	IF('$idUsuarioActual' in (SELECT id_usuario from megusta where megusta.id_publicacion=publicaciones.id_publicacion),'true','false') as tegusta
	FROM publicaciones 
	LEFT JOIN comentarios_publicaciones ON comentarios_publicaciones.id_publicacion = publicaciones.id_publicacion 
	LEFT JOIN megusta ON megusta.id_publicacion = publicaciones.id_publicacion 
	WHERE publicaciones.id_usuario = '$idPerfil'
	GROUP BY publicaciones.id_publicacion";

$array = obtenerArraySQL($conexion, $sql);
//var_dump($array);
echo json_encode($array);
?>

