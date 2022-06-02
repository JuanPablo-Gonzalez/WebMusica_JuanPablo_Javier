<?php
if(isset($_GET["idPublicacion"])){
	$idPublicacion = $_GET["idPublicacion"];
}else{
	
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Perfil</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

	<link rel="stylesheet" href="https://icono-49d6.kxcdn.com/icono.min.css">

	<link rel="stylesheet" type="text/css" href="../css/perfil.css">
	<link rel="stylesheet" type="text/css" href="../css/publicaciones.css">
	<link rel="stylesheet" type="text/css" href="../css/comentarios.css">
	<link rel="stylesheet" type="text/css" href="../css/audio.css">
</head>
<body>
	<script type="text/javascript">
		var datos = {};
		datos["idPublicacion"] = <?php echo '"'.$idPublicacion.'"'; ?>;
	</script>
	<script type="text/javascript" src="publicacion.js"></script>
	<script type="text/javascript" src="audio.js"></script>
	<script type="text/javascript" src="../views/publicaciones.js"></script>
	<div class="div-contenedor-publicaciones" id="div-contenedor-publicaciones"></div>
	<div class="div-contenerdor-comentarios" id="div-contenedor-comentarios">
		<div class="div-comentario div-crearComentario">
			<input class="input-comentario" type="text" id="nuevoComentario">
			<button class="bttn-addComentario">
				<img src="../imagenes/enviar.png">
			</button>
		</div>
		<div class="div-comentario">
			<div class="div-contenedora-imgUser">
				<img id="fotoPerfil" src="../usuarios/JRenedo/imagenes/yoda-bebe.jpg">
			</div>
			<div class="div-contenedora-tag-fecha">
				<a id="a-tag">@JRenedo</a>
				<p class="p-fecha" id="p-fecha">2 de junio de 2022</p>
			</div>
			<div class="div-contenido">
				<p>Esto es un comentario Hardcodeado muy guapo</p>				
			</div>
		</div>
	</div>
</body>
</html>