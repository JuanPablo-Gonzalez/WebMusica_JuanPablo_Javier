<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$idPublicacion = $_POST["idPublicacion"];
$tegusta = filter_var($_POST["tegusta"], FILTER_VALIDATE_BOOLEAN);

include_once "../db/db.php";
try{
	if($tegusta){
		$sql = "DELETE FROM megusta WHERE id_usuario='$idUsuarioActual' AND id_publicacion='$idPublicacion'";
		$conexion->exec($sql);
	}else{
		$sql = "INSERT INTO megusta (id_usuario,id_publicacion) VALUES ('$idUsuarioActual','$idPublicacion')";
		$conexion->exec($sql);
	}
	$json["error"] = false;
	$json["tegusta"] = !$tegusta;
}catch(PDOException $e){
	$json["error"] = true;
}
echo json_encode($json);
?>