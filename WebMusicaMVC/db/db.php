<?php
$servername = "localhost";
$username = "root";
$db_password = "";
$database = "musicnetwork";

try {
	$conexion = new PDO("mysql:host=$servername;dbname=$database", $username, $db_password); 	 	 	 	 	 	
	$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); 	 	 	 	
} catch (PDOException $e) {
	echo $e->getMessage(); 	 	 	 	 	 	
}

/*$servername = "localhost";
$username = "id18819700_tfg";
$db_password = "MuNetJaviJP9@";
$database = "id18819700_musicnetwork";

try {
	$conexion = new PDO("mysql:host=$servername;dbname=$database", $username, $db_password); 	 	 	 	 	 	
	$conexion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION); 	 	

} catch (PDOException $e) {
	echo $e->getMessage(); 	 	 	 	 	 	
}*/


function obtenerArraySQL($conexion, $sql){
	$stmt = $conexion->prepare($sql);
	$stmt->execute();
	$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);

	return new RecursiveArrayIterator($stmt->fetchAll());
}
?>
