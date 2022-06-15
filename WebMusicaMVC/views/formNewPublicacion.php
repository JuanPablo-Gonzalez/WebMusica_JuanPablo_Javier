	<div class="divNuevaPublicacion">
		<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" id="formNuevaPublicacion" name="formNuevaPublicacion" enctype="multipart/form-data">
			<h1>Nuevo publicación</h1>
			<div class="div-input">
				<label for="inputTitulo">Titulo de la publicacion</label>
				<input type="text" name="inputTitulo" id="inputTitulo" maxlength="100">
				<label id="inputTitulo-error" class="error" for="inputTitulo"></label>
			</div>

			<div class="div-input">
				<label for="inputTexto">Texto de la publicacion</label>
				<input type="text" name="inputTexto" id="inputTexto" maxlength="350">
				<label id="inputTexto-error" class="error" for="inputTexto"></label>
			</div>
			<div class="div-contenedor-tipoArchivo">
				<h3>Añadir:</h3>
				<div class="div-bttns-tipoArchivo">
					<button  type="button" class="bttn-tipoArchivo" id="bttnAddArchivo">Archivo</button>
					<button  type="button" class="bttn-tipoArchivo" id="bttnAddEnlace">Enlace a youtube</button>
				</div>

				<div class="div-addArchivos" id="div-addArchivos">
					<label for="inputArchivo">Seleciona una imagen / video / audio:</label><br>
					<input type="file" name="inputArchivo" id="inputArchivo" maxlength="100">
					<label id="inputArchivo-error" class="error" for="inputArchivo"></label>
				</div>

				<div id="div-addEnlace" class="div-addEnlace">
					<label for="inputUrl">Introduce un enlace o url a un video de youtube:</label><br>
					<input type="text" name="inputUrl" id="inputUrl" maxlength="100">
					<label id="inputUrl-error" class="error" for="inputUrl"></label>
				</div>
			</div>

			<button type="submit" id="bttnCrearPublicacion">Crear publicacion</button>
		</form>
	</div>