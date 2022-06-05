<?php
$idPublicacion = $_POST["idPublicacion"];
//$idPublicacion = 3;

include_once "../db/db.php";

$sql = "SELECT 
	comentarios_publicaciones.*,
	usuarios.tag,
	usuarios.foto_perfil
	FROM comentarios_publicaciones 
	LEFT JOIN usuarios on comentarios_publicaciones.id_usuario = usuarios.id_usuario
	WHERE id_publicacion='$idPublicacion'
	ORDER BY fecha_publicacion DESC";

$comentarios = obtenerArraySQL($conexion, $sql);

//var_dump($comentarios);
echo json_encode($comentarios);
?>