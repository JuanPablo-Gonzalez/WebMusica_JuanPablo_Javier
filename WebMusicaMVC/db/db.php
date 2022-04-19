<?php
	$servername = "localhost";
	$username = "root";
	$password = "rootroot";
	$database = "musicnetwork";

	try {
		$conexion = new PDO("mysql:host=$servername;dbname=$database", $username, $password); 	 	 	 	 	 	
		$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); 	 	 	 	 	 	
	} catch (PDOException $e) {
		echo $e->getMessage(); 	 	 	 	 	 	
	}
?>
