	<nav>
		<div id="logo" class="parte-nav">
			<h1><?php echo '<a href="'.$url.'../index.php">'; ?>Music-Network</a></h1>
		</div>
		<ul id="listado-nav">
			<li>
				<?php echo '<a href="'.$url.'../controllers/foro_controller.php">'; ?>Comunidad</a>
			</li>
			<li>
				<?php echo '<a href="'.$url.'../controllers/foro_controller.php#contact">'; ?>Canciones</a>
			</li>
			<li>
				<?php echo '<a href="'.$url.'../controllers/foro_controller.php#sobre">'; ?>Sobre nosotros</a>
			</li>
		</ul>
		<div id="perfil">
			<?php
			if(isset($_SESSION["tag"])){
				if($_SESSION["tag"] != null){
					echo '<a href="'.$url.'../controllers/crearPublicacion_controller.php"><i class="icono-plusCircle"></i></a>';
					echo '
					<a class="active" href="'.$url.'../usuarios/'.$_SESSION["tag"].'">
						<div id="fotoPerfilNav"></div>
					</a>
					';
				}
			}
			?>
		</div>
		<?php
		if(isset($_SESSION["foto_perfil"])){
			if($_SESSION["foto_perfil"] != null){
				echo '
				<script>
					$("#fotoPerfilNav").css("background-image",\'url("'.$url.'../usuarios/'.$_SESSION["tag"].'/imagenes/'.$_SESSION["foto_perfil"].'")\');
				</script>
				';
			}
		}
		?>
	</nav>
