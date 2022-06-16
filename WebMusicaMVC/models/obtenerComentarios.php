<?php
$idPublicacion = $_POST["idPublicacion"];

include_once "../db/db.php";

$sql = "SELECT 
	comentarios_publicaciones.*,
	usuarios.tag,
	usuarios.foto_perfil
	FROM comentarios_publicaciones 
	LEFT JOIN usuarios on comentarios_publicaciones.id_usuario = usuarios.id_usuario
	WHERE id_publicacion='$idPublicacion'
	ORDER BY fecha_publicacion ASC";

$comentarios = obtenerArraySQL($conexion, $sql);

echo json_encode($comentarios);
?>