<?php 

function conseguirNumeroID($conexion) {
	try {
		$idUsuario=$conexion-> prepare("SELECT max(id_usuario) as ultimoidUsuario from usuarios");
		$idUsuario->execute();
		// set the resulting array to associative
		$result= $idUsuario->setFetchMode(PDO::FETCH_ASSOC);
		foreach($idUsuario->fetchAll() as $row) {
			$idUsuario= $row["ultimoidUsuario"];
		}

		return $idUsuario+1;
	}
	catch(PDOException $e) {
		echo $e->getMessage();
	}
}

function altaUsuario() {
	
}

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