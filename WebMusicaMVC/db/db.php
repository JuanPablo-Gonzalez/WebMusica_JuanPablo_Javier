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

/*$servername = "localhost";
$username = "id18819700_tfg";
$password = "MuNetJaviJP9@";
$database = "id18819700_musicnetwork";

try {
	$conexion = new PDO("mysql:host=$servername;dbname=$database", $username, $password); 	 	 	 	 	 	
	$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); 	 	

} catch (PDOException $e) {
	echo $e->getMessage(); 	 	 	 	 	 	
}*/
?>
