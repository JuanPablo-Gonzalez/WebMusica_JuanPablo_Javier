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
			<?php echo '
			<a class="active" href="'.$url.'../usuarios/'.$_SESSION["tag"].'">
				<img src="'.$url.'../imagenes/perfil2.jpg" alt="perfil">
			</a>
			'; ?>
		</div>
	</nav>
