<?php
session_start();
//$idUsuarioActual = $_SESSION["idUsuario"];
//$idPublicacion = $_POST["idPublicacion"];
$idUsuarioActual = 43;
$idPublicacion = 3;

include_once "../db/db.php";

$sql = "SELECT 
    publicaciones.*, 
    COUNT(comentarios_publicaciones.id_comentario) as numComentarios,
    COUNT(megusta.id_publicacion) as numMegusta,
    IF('$idUsuarioActual' in (SELECT id_usuario from megusta where megusta.id_publicacion=publicaciones.id_publicacion),'true','false') as tegusta,
    usuarios.nombre_usuario,
    usuarios.tag,
    usuarios.foto_perfil
    FROM publicaciones
    LEFT JOIN comentarios_publicaciones ON comentarios_publicaciones.id_publicacion = publicaciones.id_publicacion 
    LEFT JOIN megusta ON megusta.id_publicacion = publicaciones.id_publicacion 
    LEFT JOIN usuarios on usuarios.id_usuario = publicaciones.id_usuario
    WHERE publicaciones.id_publicacion = '$idPublicacion'";

$publicacion = obtenerArraySQL($conexion, $sql)[0];

$idPublicacion = $publicacion["id_publicacion"];

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
	$json["publicacion"] = $publicacion;
	$json["comentarios"] = $comentarios;
}else{
	$json["error"] = true;
}
//var_dump($json);
echo json_encode($json)
?>