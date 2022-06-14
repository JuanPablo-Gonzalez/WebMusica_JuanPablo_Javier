<?php
session_start();
if(!isset($_SESSION["idUsuario"]) || !isset($_SESSION["tag"])){
	session_unset();
	session_destroy();
	header("Location: ../../controllers/login_controller.php");
	die();
}

$arrayPath = explode("\\",getcwd());
$tagPerfil = $arrayPath[count($arrayPath)-1];

if($_SESSION["tag"] == $tagPerfil){
	include_once "../../controllers/tuperfil_controller.php";
}else{
	include_once "../../controllers/perfil_controller.php";
}
?>