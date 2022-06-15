<?php
$idUsuarioActual = $_SESSION["idUsuario"];
$inputEmail = trim(addslashes($_POST["inputEmail"]));
$inputNombreUsuario = trim(addslashes($_POST["inputNombreUsuario"]));
$inputTag = trim(addslashes($_POST["inputTag"]));
$inputDescripcion = trim(addslashes($_POST["inputDescripcion"]));
$inputFechaNacimiento = $_POST["inputFechaNacimiento"];
$inputCancion = trim(addslashes($_POST["inputCancion"]));
$inputOldPassword = trim($_POST["inputOldPassword"]);
$inputPassword = trim($_POST["inputPassword"]);
$inputPassword2 = trim($_POST["inputPassword2"]);

include_once "../db/db.php";

$sql = "SELECT password FROM usuarios WHERE id_usuario = '$idUsuarioActual'";

$oldPassword = obtenerArraySQL($conexion, $sql)[0]["password"];

if(MD5($inputOldPassword) == $oldPassword){
	try{
		$sql = "UPDATE usuarios SET 
					email='$inputEmail',
					tag='$inputTag' WHERE id_usuario = '$idUsuarioActual'";
		$conexion->exec($sql);

		if($inputTag != $_SESSION["tag"]){
			$urlUsuarios = "../usuarios/";
			if(!file_exists($urlUsuarios . $inputTag)){
				mkdir($urlUsuarios . $inputTag);
			}

			cortarCarpeta($urlUsuarios,$inputTag,"imagenes");
			cortarCarpeta($urlUsuarios,$inputTag,"videos");
			cortarCarpeta($urlUsuarios,$inputTag,"audios");

			copy($urlUsuarios . $_SESSION["tag"] . "/index.php", $urlUsuarios . $inputTag . "/index.php");
			unlink($urlUsuarios . $_SESSION["tag"] . "/index.php");
			rmdir($urlUsuarios . $_SESSION["tag"]);

			$_SESSION["tag"] = $inputTag;
		}

		$target_dir = "../usuarios/" . $_SESSION["tag"] . "/imagenes/";
		$sql = "UPDATE usuarios SET 
					nombre_usuario='$inputNombreUsuario',
					descripcion='$inputDescripcion',
					fecha_nacimiento='$inputFechaNacimiento',
					cancion='$inputCancion'";

		if($inputPassword == $inputPassword2 && $inputPassword != ""){
			$sql .= ",password='$inputPassword'";
		}

		if(isset($_FILES["inputFotoPerfil"]) && $_FILES["inputFotoPerfil"]["type"] != ""){
			$archivo = basename($_FILES["inputFotoPerfil"]["name"]);
			$target_file = $target_dir . $archivo;
			if(move_uploaded_file($_FILES["inputFotoPerfil"]["tmp_name"], $target_file)){
				$sql .= ",foto_perfil='$archivo'";
			}
		}

		if(isset($_FILES["inputFotoFondo"]) && $_FILES["inputFotoFondo"]["type"] != ""){
			$archivo = basename($_FILES["inputFotoFondo"]["name"]);
			$target_file = $target_dir . $archivo;
			if(move_uploaded_file($_FILES["inputFotoFondo"]["tmp_name"], $target_file)){
				$sql .= ",foto_fondo='$archivo'";
			}
		}
		$sql .= " WHERE id_usuario = '$idUsuarioActual'";

		$conexion->exec($sql);
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
		//var_dump($json);
	}
}else{
	//echo "NO password";
}

function cortarCarpeta($url,$inputTag,$nombre){
	if(!file_exists($url . $inputTag . "/".$nombre)){
		mkdir($url . $inputTag . "/".$nombre);
	}
	foreach(scandir($url . $_SESSION["tag"] ."/".$nombre) as $file){
		if($file != "." && $file != ".."){
			copy($url.$_SESSION["tag"] . "/".$nombre."/" . $file,$url . $inputTag . "/".$nombre."/" . $file);
			unlink($url . $_SESSION["tag"] . "/".$nombre."/" . $file);
		}
	}
	rmdir($url . $_SESSION["tag"] ."/".$nombre);
}
?>
