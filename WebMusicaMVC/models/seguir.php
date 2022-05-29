<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$idPerfil = $_POST["idPerfil"];
$siguiendo = filter_var($_POST["siguiendo"], FILTER_VALIDATE_BOOLEAN);

include_once "../db/db.php";
try{
	if($siguiendo){
		$sql = "DELETE FROM seguidores WHERE seguidor='$idUsuarioActual' AND seguido='$idPerfil'";
		$conexion->exec($sql);
	}else{
		$sql = "INSERT INTO seguidores (seguidor,seguido) VALUES ('$idUsuarioActual','$idPerfil')";
		$conexion->exec($sql);
	}
	$json["error"] = false;
	$json["siguiendo"] = !$siguiendo;
}catch(PDOException $e){
	$json["error"] = true;
}
echo json_encode($json);
?>