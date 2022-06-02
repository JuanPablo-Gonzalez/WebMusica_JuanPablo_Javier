<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$idPerfil = $_POST["idPerfil"];

include_once "../db/db.php";

$sql = "SELECT 
	publicaciones.*, 
	COUNT(DISTINCT(comentarios_publicaciones.id_comentario)) as numComentarios,
	COUNT(DISTINCT(megusta.id_usuario)) as numMegusta,
	IF('$idUsuarioActual' in (SELECT id_usuario from megusta where megusta.id_publicacion=publicaciones.id_publicacion),'true','false') as tegusta
	FROM publicaciones 
	LEFT JOIN comentarios_publicaciones ON comentarios_publicaciones.id_publicacion = publicaciones.id_publicacion 
	LEFT JOIN megusta ON megusta.id_publicacion = publicaciones.id_publicacion 
	WHERE publicaciones.id_usuario = '$idPerfil'
	GROUP BY publicaciones.id_publicacion
	ORDER BY publicaciones.fecha_publicacion DESC";

$array = obtenerArraySQL($conexion, $sql);
foreach($array as $i => $publicacion){
	$array[$i]["tegusta"] = filter_var($publicacion["tegusta"], FILTER_VALIDATE_BOOLEAN);
}
echo json_encode($array);
?>

