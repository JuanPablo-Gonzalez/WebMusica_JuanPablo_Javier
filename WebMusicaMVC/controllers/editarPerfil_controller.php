<?php
session_start();
if(!isset($_SESSION["idUsuario"]) || !isset($_SESSION["tag"])){
	session_unset();
	session_destroy();
	header("Location: ../../controllers/login_controller.php");
	die();
}
if($_SERVER["REQUEST_METHOD"] == "POST"){
	include "../models/actualizarPerfil.php";
}
$url = "";
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Music Network - <?php echo $_SESSION["tag"]; ?></title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>

	<link rel="stylesheet" href="https://icono-49d6.kxcdn.com/icono.min.css">

	<link rel="stylesheet" type="text/css" href="../css/estilosIndex.css">
	<link rel="stylesheet" type="text/css" href="../css/perfil.css">
	<link rel="stylesheet" type="text/css" href="../css/publicaciones.css">
	<link rel="stylesheet" type="text/css" href="../css/audio.css">
	<link rel="stylesheet" type="text/css" href="../css/editarPerfil.css">

	<script type="text/javascript" src="../controllers/editarPerfil.js"></script>
</head>
<body>
	<?php
	include_once "../views/barraNavegacion.php";
	include_once "../views/formEditarPerfil.php";
	?>
	<script type="text/javascript" src="validateForms.js"></script>
</body>
</html>