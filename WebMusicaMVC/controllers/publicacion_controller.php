<?php
session_start();
if(!isset($_SESSION["idUsuario"]) || !isset($_SESSION["tag"])){
	session_unset();
	session_destroy();
	header("Location: ../../controllers/login_controller.php");
	die();
}
if(isset($_GET["idPublicacion"])){
	$idPublicacion = $_GET["idPublicacion"];
}else{
	header("Location: ../usuarios/".$_SESSION["tag"]."/");
	die();
}
$url = "";
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php echo $_SESSION["tag"]; ?>-Publicacion</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.0/jquery.validate.min.js"></script>

	<link rel="stylesheet" href="https://icono-49d6.kxcdn.com/icono.min.css">

	<link rel="stylesheet" type="text/css" href="../css/estilosnav.css">
	<link rel="stylesheet" type="text/css" href="../css/perfil.css">
	<link rel="stylesheet" type="text/css" href="../css/publicaciones.css">
	<link rel="stylesheet" type="text/css" href="../css/comentarios.css">
	<link rel="stylesheet" type="text/css" href="../css/audio.css">
</head>
<body>
	<script type="text/javascript">
		var datos = {};
		datos["idPublicacion"] = <?php echo '"'.$idPublicacion.'"'; ?>;
		datos["idUsuario"] = <?php echo '"'.$_SESSION["idUsuario"].'"'; ?>;
		datos["tag"] = <?php echo '"'.$_SESSION["tag"].'"'; ?>;
		datos["foto_perfil"] = <?php echo '"'.$_SESSION["foto_perfil"].'"'; ?>;
	</script>
	<script type="text/javascript" src="publicacion.js"></script>
	
	<?php
	include_once "../views/barraNavegacion.php";
	include_once "../views/publicacion.html";
	?>

	<script type="text/javascript" src="audio.js"></script>
	<script type="text/javascript" src="validateForms.js"></script>
	<script type="text/javascript" src="../views/publicaciones.js"></script>
	<script type="text/javascript" src="../views/comentarios.js"></script>
</body>
</html>