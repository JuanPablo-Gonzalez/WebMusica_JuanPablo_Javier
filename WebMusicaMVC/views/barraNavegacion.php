	<nav>
		<ul>
			<li><a href="#"><?php echo '<img src="'.$url.'../imagenes/logo.jpg" alt="perfil">'; ?></a></li>
			<li><a href="../controllers/foro_controller.php">Comunidad</a></li>
			<li><a href="#contact">Canciones</a></li>
			<li><a href="#sobre">Sobre nosotros</a></li>
			<li style="float:right">
				<?php 
				echo '<a class="active" href="'.$url.'../usuarios/'.$_SESSION["tag"].'">
				'; ?> 
					<?php echo '<img src="'.$url.'../imagenes/perfil2.jpg" alt="perfil">'; ?> 
				</a>
			</li>
		</ul>
	</nav>
