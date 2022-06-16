<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$idPublicacion = $_POST["idPublicacion"];
//$idPublicacion = 4;

include_once "../db/db.php";

$sql = "SELECT 
	publicaciones.*, 
	COUNT(DISTINCT(comentarios_publicaciones.id_comentario)) as numComentarios,
	COUNT(DISTINCT(megusta.id_usuario)) as numMegusta,
	IF('$idUsuarioActual' in (SELECT id_usuario from megusta where megusta.id_publicacion=publicaciones.id_publicacion),'true','false') as tegusta,
	usuarios.nombre_usuario,
	usuarios.tag,
	usuarios.foto_perfil,
	usuarios.foto_fondo
	FROM publicaciones
	LEFT JOIN comentarios_publicaciones ON comentarios_publicaciones.id_publicacion = publicaciones.id_publicacion 
	LEFT JOIN megusta ON megusta.id_publicacion = publicaciones.id_publicacion 
	LEFT JOIN usuarios on usuarios.id_usuario = publicaciones.id_usuario
	WHERE publicaciones.id_publicacion = '$idPublicacion'";

$publicacion = obtenerArraySQL($conexion, $sql)[0];

$idPublicacion = $publicacion["id_publicacion"];
$publicacion["tegusta"] = filter_var($publicacion["tegusta"], FILTER_VALIDATE_BOOLEAN);

if($idPublicacion != null){
	$sql = "SELECT 
		comentarios_publicaciones.*,
		usuarios.nombre_usuario,
		usuarios.tag,
		usuarios.foto_perfil
		FROM comentarios_publicaciones
		LEFT JOIN usuarios ON comentarios_publicaciones.id_usuario = usuarios.id_usuario
		where id_publicacion='$idPublicacion'
		ORDER BY fecha_publicacion desc";

	$comentarios = obtenerArraySQL($conexion, $sql);

	$json["error"] = false;
	$json["esTuPerfil"] = $idUsuarioActual == $publicacion["id_usuario"];
	$json["publicacion"] = $publicacion;
	$json["comentarios"] = $comentarios;
}else{
	$json["error"] = true;
}
echo json_encode($json);
?>