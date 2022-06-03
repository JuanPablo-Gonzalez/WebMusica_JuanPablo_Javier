<?php 
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$idPublicacion = $_POST["idPublicacion"];
$texto = $_POST["texto"];

include_once "../db/db.php";

try{
	$sql = "INSERT INTO comentarios_publicaciones (id_publicacion, id_usuario, texto) VALUES ('$idPublicacion', '$idUsuarioActual', '$texto')";
	$conexion->exec($sql);

	$json["error"] = false;
}catch(PDOException $e){
	$json["error"] = true;
}
echo json_encode($json);
?>