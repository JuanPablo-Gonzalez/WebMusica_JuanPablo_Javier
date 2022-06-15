<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Music Network - <?php echo $tagPerfil; ?></title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

	<link rel="stylesheet" href="https://icono-49d6.kxcdn.com/icono.min.css">

	<link rel="stylesheet" type="text/css" href="../../css/perfil.css">
	<link rel="stylesheet" type="text/css" href="../../css/publicaciones.css">
	<link rel="stylesheet" type="text/css" href="../../css/audio.css">
</head>
<body>
	<script type="text/javascript">
		var datos = {};
		datos["tagPerfil"] = <?php echo '"'.$tagPerfil.'"'; ?>;
	</script>
	<script type="text/javascript" src="../../controllers/perfil.js"></script>

	<?php
	include_once "../../views/cabeceraPerfil.php";
	include_once "../../views/estadisticasPerfil.html";
	?>

	<div class="div-contenedor-publicaciones" id="div-contenedor-publicaciones"></div>

	<script type="text/javascript">
		$("#bttnEditar").click(() => {
			window.location.assign("../../controllers/editarPerfil_controller.php");
		});
	</script>
	<script type="text/javascript" src="../../views/publicaciones.js"></script>
	<script type="text/javascript" src="../../controllers/audio.js"></script>
</body>
</html>