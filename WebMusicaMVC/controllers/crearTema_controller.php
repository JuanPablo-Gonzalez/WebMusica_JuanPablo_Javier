<?php
include_once "../db/db.php";
include_once "../models/crearTema_model.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$titulo= $_POST["titulo-tema"];
	$contenidoComentario= $_POST["comentario"];
	$foroElegido= $_POST["foro-elegido"];

	if($titulo!=""&&$contenidoComentario!="") {
		/*$directorio = '../imagenes/';
		$subir_archivo = $directorio.basename($_FILES['audio-archivo']['name']);
		echo "<div>";
		if (move_uploaded_file($_FILES['audio-archivo']['tmp_name'], $subir_archivo)) {
			echo "El archivo es válido y se cargó correctamente.<br><br>";
		} else {
			echo "La subida ha fallado";
		}
			echo "</div>";
		if($_FILES['audio-archivo']['name']!="") {
			$directorio = '../imagenes/';
			$subir_archivo = $directorio.basename($_FILES['subir_archivo']['name']);
		
			if (copy($_FILES['audio-archivo']['tmp_name'],$_FILES['audio-archivo']['name'])) {
				echo "<h2>Se ha transferido el archivo ". $_FILES['audio-archivo']['name']. "</h2>";
			}
			else{
				echo "<h2>No ha podido transferirse el fichero</h2>";
			}
		}*/

		insertarNuevoTema($conexion,$titulo,$contenidoComentario,$foroElegido);

		header("location: foro_controller.php");
	}
}
	
$foroElegido=$_GET['dato']; 
include_once "../views/crearTema_view.html";
?>