	<div class="div-editarPerfil">
		<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" id="formEditarPerfil" name="formEditarPerfil" enctype="multipart/form-data">
			<h1>Editar Perfil</h1>
			<div class="div-input-contenedor-fotoPerfil">
				<div class="div-contenedor-fotoPerfil">
					<div id="fotoPerfil"></div>
				</div>
				<div class="div-input-contenedor">
					<div class="div-file">
						<label for="inputFotoPerfil">Seleciona una nueva imagen de perfil:</label><br><br>
						<label class="buttonFile" for="inputFotoPerfil">Seleccionar archivo</label>
						<input type="file" name="inputFotoPerfil" id="inputFotoPerfil" maxlength="100"><br><br>
						<label id="fotoPerfilSeleccionada" for="inputArchivo"></label><br>
						<label id="inputFotoPerfil-error" class="error" for="inputFotoPerfil"></label>
					</div>
					<div class="div-file">
						<label for="inputFotoFondo">Seleciona una nueva foto de fondo de perfil:</label><br><br>
						<label class="buttonFile" for="inputFotoFondo">Seleccionar archivo</label>
						<input type="file" name="inputFotoFondo" id="inputFotoFondo" maxlength="100"><br><br>
						<label id="fotoFondoSeleccionada" for="inputArchivo"></label>
						<label id="inputFotoFondo-error" class="error" for="inputFotoFondo"></label>
					</div>
				</div>
			</div>

			<div class="div-input">
				<label for="inputEmail">Correo electronico:</label><br>
				<input type="text" name="inputEmail" id="inputEmail" maxlength="30">
				<label id="inputEmail-error" class="error" for="inputEmail"></label>
			</div>

			<div class="div-input">
				<label for="inputNombreUsuario">Nombre completo del usuario:</label><br>
				<input type="text" name="inputNombreUsuario" id="inputNombreUsuario" maxlength="30">
				<label id="inputNombreUsuario-error" class="error" for="inputNombreUsuario"></label>
			</div>

			<div class="div-input">
				<label for="inputTag">Nombre de usuario (tag):</label><br>
				<input type="text" name="inputTag" id="inputTag" maxlength="15">
				<label id="inputTag-error" class="error" for="inputTag"></label>
			</div>

			<div class="div-input">
				<label for="inputDescripcion">Escribe una brebe descripción de lo que haces:</label>
				<textarea name="inputDescripcion" id="inputDescripcion"></textarea>
				<label id="inputDescripcion-error" class="error" for="inputDescripcion"></label>
			</div>

			<div class="div-input">
				<label for="inputFechaNacimiento">Fecha nacimiento:</label><br>
				<input type="date" name="inputFechaNacimiento" id="inputFechaNacimiento"> 
				<label id="inputFechaNacimiento-error" class="error" for="inputFechaNacimiento"></label>
			</div>

			<div class="div-input">
				<label for="inputCancion">Introduce tu cancion favorita de spotify:</label><br>
				<input type="text" name="inputCancion" id="inputCancion"> 
				<label id="inputCancion-error" class="error" for="inputCancion"></label>
				<iframe class="iframe-spotify" id="iframe-cancion" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media;picture-in-picture"></iframe>
			</div>

			<div class="div-input">
				<label for="inputOldPassword">Escribe tu contraseña para verificar tu identidad</label><br>
				<input type="password" name="inputOldPassword" id="inputOldPassword"> 
				<label id="inputOldPassword-error" class="error" for="inputOldPassword"></label>
			</div>

			<button type="button" class="bttn-cambiarPassword" id="bttn-cambiarPassword">Cambiar contraseña</button>
			<div class="div-cambiarPassword" id="div-cambiarPassword"></div>

			<div class="div-contenedor-bttnsForm">
				<button type="submit" id="bttn-editarPerfil">Guardar cambios</button>
				<button type="button" id="bttn-deshacerCambios">Deshacer cambios</button>
			</div>
		</form>
	</div>