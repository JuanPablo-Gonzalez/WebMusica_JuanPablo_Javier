	<div class="divNuevaPublicacion">
		<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="post" id="formNuevaPublicacion" name="formNuevaPublicacion" enctype="multipart/form-data">
			<h1>Nueva publicación</h1>
			<div class="div-input">
				<label for="inputTitulo">Introduce el titulo de la publicacion</label>
				<input type="text" name="inputTitulo" id="inputTitulo" maxlength="100">
				<label id="inputTitulo-error" class="error" for="inputTitulo"></label>
			</div>

			<div class="div-input">
				<label for="inputTexto">Introduce el texto de la publicacion:</label>
				<input type="text" name="inputTexto" id="inputTexto" maxlength="350">
				<label id="inputTexto-error" class="error" for="inputTexto"></label>
			</div>
			<div class="div-contenedor-tipoArchivo">
				<h4>Añade un archivo o un enlace a youtube:</h4>
				<div class="div-bttns-tipoArchivo">
					<button  type="button" class="bttn-tipoArchivo" id="bttnAddArchivo">Archivo</button>
					<button  type="button" class="bttn-tipoArchivo" id="bttnAddEnlace">Enlace a youtube</button>
				</div>

				<div class="div-input div-addArchivos" id="div-addArchivos">
					<label for="inputArchivo">Seleciona una imagen / video / audio:</label><br><br>
					<label class="button" for="inputArchivo">Seleccionar archivo</label>
					<input type="file" name="inputArchivo" id="inputArchivo" maxlength="100">
					<label id="archivoSeleccionado" for="inputArchivo"></label>
					<label id="inputArchivo-error" class="error" for="inputArchivo"></label>
				</div>

				<div class="div-input div-addEnlace" id="div-addEnlace">
					<label for="inputUrl">Introduce un enlace o url a un video de youtube:</label><br>
					<input type="text" name="inputUrl" id="inputUrl" maxlength="100">
					<label id="inputUrl-error" class="error" for="inputUrl"></label>
				</div>
			</div>

			<div class="div-contendor-bttnCrearPublicacion">
				<button type="submit" id="bttnCrearPublicacion"class="bttnCrearPublicacion">Crear publicacion</button>
			</div>
		</form>
	</div>