<?php
$idUsuarioActual = $_POST["idUsuario"];
$idPublicacion = $_POST["idPublicacion"];
$texto = trim(addslashes($_POST["texto"]));

include_once "../db/db.php";

try{
	$sql = "INSERT INTO comentarios_publicaciones (id_publicacion, id_usuario, texto) VALUES ('$idPublicacion', '$idUsuarioActual', '$texto')";
	$conexion->exec($sql);

	$json["error"] = false;
	$json["id_comentario"] = $conexion->lastInsertId();
	$json["texto"] = $texto;
	$json["fecha_publicacion"] = date("Y-m-dd H:i:s");
}catch(PDOException $e){
	$json["error"] = true;
}
echo json_encode($json);
?>