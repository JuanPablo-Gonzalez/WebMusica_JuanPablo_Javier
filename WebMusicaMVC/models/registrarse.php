<?php
$email = $_POST["email"];
$nombre = $_POST["nombre"];
$tag = $_POST["tag"];
$pwd = MD5($_POST["password"]);
$fechaNacimiento = $_POST["fechaNacimiento"];

include_once "../db/db.php";

$json = [];
try {
	$sql = "INSERT INTO usuarios (email, nombre_usuario, tag, password, fecha_nacimiento) VALUES ('$email','$nombre','$tag','$pwd','$fechaNacimiento')";
	
	$conexion->exec($sql);

	$json["error"] = false;
	$json["idUsuario"] = $conexion->lastInsertId();
} catch(PDOException $e) {
	$json["error"] = true;
	$json["errorInfo"]["errorCode"] = $e->getCode();

	if($e->getCode() == 23000){
		$json["errorInfo"]["code"] = $e->errorInfo[1];
		if($e->errorInfo[1] == 1062){
			$key = str_replace("'","",explode(" ",$e->errorInfo[2])[5]);
			$json["errorInfo"]["key"] = $key;
		}
	}
}

echo json_encode($json);

function enviarEmail($para) {
	//destinatarios
	//$para  = 'juanpabloglez202@gmail.com'; // atención a la coma

	// título
	$título = 'Confirmación registro cuenta';

	// mensaje
	$mensaje = '
	<html>
	<head>
	<title>Confirmación del registro de la cuenta</title>
	</head>
	<body>
	<p>Confirme su cuenta poniendo el siguiente código en la casila del formulario</p>
	<p>2020</p>
	</body>
	</html>
	';

	// Para enviar un correo HTML, debe establecerse la cabecera Content-type
	$cabeceras  = 'MIME-Version: 1.0' . "\r\n";
	$cabeceras .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	/* Cabeceras adicionales
	$cabeceras .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
	$cabeceras .= 'From: Recordatorio <cumples@example.com>' . "\r\n";
	$cabeceras .= 'Cc: birthdayarchive@example.com' . "\r\n";
	$cabeceras .= 'Bcc: birthdaycheck@example.com' . "\r\n";*/

	// Enviarlo
	$mail= mail($para, $título, $mensaje, $cabeceras);

	if ($mail) {
		echo "Su mail se ha enviado correctamente";
	} else {
		echo "Ha ocurrido un error al intentar enviar su mail";
	}
}
?>