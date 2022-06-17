<?php 
session_start();
if(!isset($_SESSION["idUsuario"]) || !isset($_SESSION["tag"])){
	session_unset();
	session_destroy();
	header("Location: ../controllers/login_controller.php");
	die();
}
$url = "";
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Music Network - Inicio</title>
	<link rel="icon" type="image/x-icon" href="../imagenes/musica.png">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

	<link rel="stylesheet" href="https://icono-49d6.kxcdn.com/icono.min.css">

	<link rel="stylesheet" type="text/css" href="../css/estilosnav.css">
	<link rel="stylesheet" type="text/css" href="../css/perfil.css">
	<link rel="stylesheet" type="text/css" href="../css/publicaciones.css">
	<link rel="stylesheet" type="text/css" href="../css/audio.css">
</head>
<body>
	<script type="text/javascript" src="../controllers/inicio.js"></script>
	<?php
	include_once "../views/barraNavegacion.php";
	?>
	<div class="div-contenedor-publicaciones" id="div-contenedor-publicaciones"></div>
	<script type="text/javascript" src="../views/publicaciones.js"></script>
	<script type="text/javascript" src="../controllers/audio.js"></script>
</body>
</html>