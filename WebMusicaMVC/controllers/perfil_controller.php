<?php
session_start();
if(!isset($_SESSION["idUsuario"]) || !isset($_SESSION["tag"])){
	session_unset();
	session_destroy();
	header("../../controllers/login_controller.php");
	die();
}
$arrayPath = explode("\\",getcwd());
$tagPerfil = $arrayPath[count($arrayPath)-1];
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Perfil</title>
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
		$.ajax({
			method: "POST",
			url: "../../models/obtenerUsuarioPerfil.php",
			data: datos,
			success: function(result){
				console.log(result)
				if(!result.error){
					$(document).ready(function(){
						$("body").css("background-image",'url("fotos/'+result.foto_fondo+'")');
						$("#fotoPerfil").attr("src","fotos/"+result.foto_perfil);
					});
				}
			},
			dataType: "json"
		});
	</script>
	<?php
	include_once "../../views/cabeceraPerfil.php";
	include_once "../../views/estadisticasPerfil.html";
	include_once "../../views/publicaciones.html";
	?>
	<script type="text/javascript" src="../../controllers/audio.js"></script>
</body>
</html>