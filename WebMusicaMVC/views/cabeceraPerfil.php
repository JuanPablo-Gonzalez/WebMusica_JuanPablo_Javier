	<div class="div-contenedor-fotoPerfilNombre">
		<div class="div-fotoPerfilNombre">
			<div class="div-contenedor-fotoPerfil">
				<div id="fotoPerfil"></div>
			</div>
			<div class="div-contedor-info">
				<div class="div-tagNombre">
					<p class="p-tagNombre-nombre" id="p-tagNombre-nombre"></p>
					<p class="p-tagNombre-tag" id="p-tagNombre-tag"></p>
				</div>
				<?php
				if($_SESSION["tag"] == $tagPerfil){
				echo '<div class="div-bttnPerfil">
					<button id="bttnEditar">Editar Perfil</button>
				</div>';
				}else{
				echo '<div class="div-bttnPerfil">
					<button id="bttnSeguir">Seguir</button>
				</div>';
				}
				?>
				
				<div class="div-fechaNacimiento">
					<p id="p-fechaNacimiento"></p>
				</div>
				<div class="div-descripcion">
					<p id="p-descripcion"></p>
				</div>
			</div>
			<div class="div-contenedor-iframe-Spotify">
				<iframe class="iframe-spotify" id="iframe-cancion" width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media;picture-in-picture"></iframe>
			</div>
		</div>
	</div>