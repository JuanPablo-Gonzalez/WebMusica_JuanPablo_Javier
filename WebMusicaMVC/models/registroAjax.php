<?php
	include_once "../db/db.php";

	try {
		$usuario= $_REQUEST["usuario"]; 
		$existe= 'no';
		$nombre_usuario=$conexion-> prepare("SELECT nombre_usuario from usuarios");
		$nombre_usuario->execute();
		// set the resulting array to associative
		$result= $nombre_usuario->setFetchMode(PDO::FETCH_ASSOC);
		foreach($nombre_usuario->fetchAll() as $row) {
			if($row["nombre_usuario"]==$usuario) {
				$existe= 'si';
			}
		}

		echo $existe;
	}
	catch(PDOException $e) {
		echo $e->getMessage();
	}
?>