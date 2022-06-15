<?php
session_start();
if(!isset($_SESSION["idUsuario"]) || !isset($_SESSION["tag"])){
	session_unset();
	session_destroy();
	header("Location: ../../controllers/login_controller.php");
	die();
}
if($_SERVER["REQUEST_METHOD"] == "POST"){
	include "../models/addPublicacion.php";
}
$url = "";
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Perfil</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>

	<link rel="stylesheet" href="https://icono-49d6.kxcdn.com/icono.min.css">

	<link rel="stylesheet" type="text/css" href="../css/estilosIndex.css">
	<link rel="stylesheet" type="text/css" href="../css/perfil.css">
	<link rel="stylesheet" type="text/css" href="../css/newPublicacion.css">
</head>
<body>
	<?php
	include_once "../views/barraNavegacion.php";
	include_once "../views/formNewPublicacion.php";
	?>
	<script type="text/javascript">
		$("#bttnAddArchivo").click(() => {
			$("#div-addEnlace").hide();
			$("#div-addArchivos").toggle();
		});

		$("#bttnAddEnlace").click(() => {
			$("#div-addArchivos").hide();
			$("#div-addEnlace").toggle();
		});
		$("#inputArchivo").change(() => {
			$("#archivoSeleccionado").text($("#inputArchivo").val())
		});
	</script>

	<script type="text/javascript" src="audio.js"></script>
	<script type="text/javascript" src="validateForms.js"></script>
	<script type="text/javascript" src="../views/publicaciones.js"></script>
	<script type="text/javascript" src="../views/comentarios.js"></script>
</body>
</html>