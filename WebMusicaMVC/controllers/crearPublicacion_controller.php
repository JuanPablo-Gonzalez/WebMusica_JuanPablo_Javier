<?php
session_start();
if(!isset($_SESSION["idUsuario"]) || !isset($_SESSION["tag"])){
	session_unset();
	session_destroy();
	header("Location: ../../controllers/login_controller.php");
	die();
}
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

	<!--<link rel="stylesheet" type="text/css" href="../css/perfil.css">
	<link rel="stylesheet" type="text/css" href="../css/publicaciones.css">
	<link rel="stylesheet" type="text/css" href="../css/comentarios.css">
	<link rel="stylesheet" type="text/css" href="../css/audio.css">-->
</head>
<body>
	<?php
	$tag = $_SESSION["tag"];
	include "../models/addPublicacion.php";
	?>
	<script type="text/javascript">
		var datos = {};
		datos["idUsuario"] = <?php echo '"'.$_SESSION["idUsuario"].'"'; ?>;
		datos["tag"] = <?php echo '"'.$_SESSION["tag"].'"'; ?>;
		datos["foto_perfil"] = <?php echo '"'.$_SESSION["foto_perfil"].'"'; ?>;
	</script>
	<script type="text/javascript" src="publicacion.js"></script>
	
	<div class="divNuevaPublicacion">
		<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" id="formNuevaPublicacion" name="formNuevaPublicacion" enctype="multipart/form-data">
			<h1>Nuevo publicación</h1>
			<div class="div-input">
				<label for="inputTitulo">Titulo</label>
				<input type="text" name="inputTitulo" id="inputTitulo" maxlength="100">
				<label id="inputTitulo-error" class="error" for="inputTitulo"></label>
			</div>

			<div class="div-input">
				<label for="inputTexto">Texto</label>
				<input type="text" name="inputTexto" id="inputTexto" maxlength="350">
				<label id="inputTexto-error" class="error" for="inputTexto"></label>
			</div>
			<button type="button" id="bttnAddArchivo">Añadir un archivo</button>
			<div class="div-addArchivos" id="div-addArchivos">
				<label for="inputArchivo"></label>
				<input type="file" name="inputArchivo" id="inputArchivo" maxlength="100">
				<label id="inputArchivo-error" class="error" for="inputArchivo"></label>
			</div>

			<button type="submit" id="bttnCrearPublicacion">Crear publicacion</button>
		</form>
	</div>

	<script type="text/javascript">
		$("#bttnAddArchivo").click(() => {
			$("#div-addArchivos").toggle();
		})

		/*$("#bttnCrearPublicacion").click(() => {
			//if($("#formNuevaPublicacion").valid()){

				datos["titulo"] = $("#inputTitulo").val();
				datos["texto"] = $("#inputTexto").val();
				//datos["archivo"] = $("#inputNombreArchivo").val();
				datos["archivo"] = $("#inputNombreArchivo")[0].files[0].name;
				console.log(datos);
				$.ajax({
					method: "POST",
					url: "../models/addPublicacion.php",
					data: datos,
					success: function(result){
						document.write(result);
					},
					dataType: "text"
				})
			//}
			return false;
		})*/
	</script>

	<script type="text/javascript" src="audio.js"></script>
	<script type="text/javascript" src="validateForms.js"></script>
	<script type="text/javascript" src="../views/publicaciones.js"></script>
	<script type="text/javascript" src="../views/comentarios.js"></script>
</body>
</html>