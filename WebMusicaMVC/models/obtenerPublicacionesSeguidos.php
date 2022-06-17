<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];

include_once "../db/db.php";

$json = [];

$sql = "SELECT 
	publicaciones.*, 
	COUNT(DISTINCT(comentarios_publicaciones.id_comentario)) as numComentarios,
	COUNT(DISTINCT(megusta.id_usuario)) as numMegusta,
	IF('$idUsuarioActual' in (SELECT id_usuario from megusta where megusta.id_publicacion=publicaciones.id_publicacion),'true','false') as tegusta,
	usuarios.nombre_usuario,
	usuarios.tag,
	usuarios.foto_perfil
	FROM publicaciones
	LEFT JOIN comentarios_publicaciones ON comentarios_publicaciones.id_publicacion = publicaciones.id_publicacion 
	LEFT JOIN megusta ON megusta.id_publicacion = publicaciones.id_publicacion 
	LEFT JOIN usuarios on usuarios.id_usuario = publicaciones.id_usuario
	WHERE publicaciones.id_usuario in (SELECT seguido from seguidores where seguidor='$idUsuarioActual')
	GROUP BY publicaciones.id_publicacion
	ORDER BY publicaciones.fecha_publicacion DESC;";

$array = obtenerArraySQL($conexion, $sql);

foreach($array as $i => $publicacion){
	$array[$i]["tegusta"] = filter_var($publicacion["tegusta"], FILTER_VALIDATE_BOOLEAN);
}

echo json_encode($array);
?>