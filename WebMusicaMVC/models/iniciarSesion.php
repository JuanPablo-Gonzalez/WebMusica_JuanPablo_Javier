<?php
session_start();
$email = trim(addslashes($_POST["email"]));
$password = MD5(trim($_POST["password"]));
//$recuerdame = $_POST["recuerdame"];

include_once "../db/db.php";

$sql = "SELECT id_usuario, nombre_usuario, tag, foto_perfil, foto_fondo FROM usuarios WHERE email='$email' and password='$password'";

$stmt = $conexion->prepare($sql);
$stmt->execute();
$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

$usuario = new RecursiveArrayIterator($stmt->fetchAll());

$json = [];
if(count($usuario) != 0){
	$json["error"] = false;
	$usuario = $usuario[0];

	//$json["idUsuario"] = $usuario["id_usuario"];
	$json["tag"] = $usuario["tag"];
	
	$_SESSION["idUsuario"] = $usuario["id_usuario"];
	$_SESSION["nombre"] = $usuario["nombre_usuario"];
	$_SESSION["tag"] = $usuario["tag"];
	$_SESSION["email"] = $email;
	$_SESSION["foto_perfil"] = $usuario["foto_perfil"];
	$_SESSION["foto_fondo"] = $usuario["foto_fondo"];

	/*if($recuerdame){ 
		setcookie("idUsuario",$idUsuario,time() + (86400 * 30 * 365), "/");
	}*/
}else{
	$json["error"] = true;
}
echo json_encode($json);
?>