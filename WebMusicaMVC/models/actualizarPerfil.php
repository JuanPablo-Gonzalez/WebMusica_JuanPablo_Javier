<?php
$idUsuarioActual = $_SESSION["idUsuario"];
$tag = $_SESSION["tag"];
$inputEmail = trim(addslashes($_POST["inputEmail"]));
$inputNombreUsuario = trim(addslashes($_POST["inputNombreUsuario"]));
$inputTag = trim(addslashes($_POST["inputTag"]));
$inputDescripcion = trim(addslashes($_POST["inputDescripcion"]));
$inputFechaNacimiento = $_POST["inputFechaNacimiento"];
$inputCancion = trim(addslashes($_POST["inputCancion"]));
$inputOldPassword = trim($_POST["inputOldPassword"]);

if(isset($_POST["inputPassword"]) && isset($_POST["inputPassword2"])){
	$inputPassword = trim($_POST["inputPassword"]);
	$inputPassword2 = trim($_POST["inputPassword2"]);
}else{
	$inputPassword = null;
	$inputPassword2 = null;
}

include_once "../db/db.php";

$sql = "SELECT password FROM usuarios WHERE id_usuario = '$idUsuarioActual'";

$oldPassword = obtenerArraySQL($conexion, $sql)[0]["password"];

$json = [];

if(MD5($inputOldPassword) == $oldPassword){
	$json["correctPassword"] = true;
	try{
		$sql = "UPDATE usuarios SET 
					email='$inputEmail',
					tag='$inputTag' WHERE id_usuario = '$idUsuarioActual'";
		$conexion->exec($sql);

		if($inputTag != $tag){
			$urlUsuarios = "../usuarios/";
			if(!file_exists($urlUsuarios . $inputTag)){
				mkdir($urlUsuarios . $inputTag);
			}

			cortarCarpeta($urlUsuarios,$inputTag,"imagenes");
			cortarCarpeta($urlUsuarios,$inputTag,"videos");
			cortarCarpeta($urlUsuarios,$inputTag,"audios");

			copy($urlUsuarios . $tag . "/index.php", $urlUsuarios . $inputTag . "/index.php");
			unlink($urlUsuarios . $tag . "/index.php");
			rmdir($urlUsuarios . $tag);

			$tag = $_SESSION["tag"] = $inputTag;
			$_SESSION["email"] = $inputEmail;
		}

		$target_dir = "../usuarios/" . $tag . "/imagenes/";
		$sql = "UPDATE usuarios SET 
					nombre_usuario='$inputNombreUsuario',
					descripcion='$inputDescripcion',
					fecha_nacimiento='$inputFechaNacimiento',
					cancion='$inputCancion'";

		if($inputPassword == $inputPassword2 && $inputPassword != "" && $inputPassword != null){
			$inputPassword = MD5($inputPassword);
			$sql .= ",password='$inputPassword'";
		}

		if(isset($_FILES["inputFotoPerfil"]) && $_FILES["inputFotoPerfil"]["type"] != ""){
			$archivo = basename($_FILES["inputFotoPerfil"]["name"]);
			$target_file = $target_dir . $archivo;
			if(move_uploaded_file($_FILES["inputFotoPerfil"]["tmp_name"], $target_file)){
				$sql .= ",foto_perfil='$archivo'";
				$_SESSION["foto_perfil"] = $archivo;
			}
		}

		if(isset($_FILES["inputFotoFondo"]) && $_FILES["inputFotoFondo"]["type"] != ""){
			$archivo = basename($_FILES["inputFotoFondo"]["name"]);
			$target_file = $target_dir . $archivo;
			if(move_uploaded_file($_FILES["inputFotoFondo"]["tmp_name"], $target_file)){
				$sql .= ",foto_fondo='$archivo'";
				$_SESSION["foto_fondo"] = $archivo;
			}
		}
		$sql .= " WHERE id_usuario = '$idUsuarioActual'";

		$conexion->exec($sql);

		$_SESSION["nombre"] = $inputNombreUsuario;

		header("Location: ../usuarios/".$tag."/");
		die();
	} catch(PDOException $e) {
		$json["inputTag"] = $inputTag;
		$json["inputEmail"] = $inputEmail;
		$json["error"] = true;
		$json["errorInfo"]["errorCode"] = $e->getCode();

		$key = "";
		if($e->getCode() == 23000){
			if($e->errorInfo[1] == 1062){
				$key = str_replace("'","",explode(" ",$e->errorInfo[2])[5]);
			}
		}else if($e->getCode() == 22001){
			if($e->errorInfo[1] == 1406){
				$key = explode("'",$e->errorInfo[2])[1];
			}
		}
		$json["errorInfo"]["code"] = $e->errorInfo[1];
		$json["errorInfo"]["key"] = $key;
	}
}else{
	$json["error"] = true;
	$json["correctPassword"] = false;
}
echo "<script>var jsonResult = " . json_encode($json) .";</script>
"; 

function cortarCarpeta($url,$inputTag,$nombre){
	$tag = $_SESSION["tag"];
	if(!file_exists($url . $inputTag . "/".$nombre)){
		mkdir($url . $inputTag . "/".$nombre);
	}
	foreach(scandir($url . $tag ."/".$nombre) as $file){
		if($file != "." && $file != ".."){
			copy($url.$tag . "/".$nombre."/" . $file,$url . $inputTag . "/".$nombre."/" . $file);
			unlink($url . $tag . "/".$nombre."/" . $file);
		}
	}
	rmdir($url . $tag ."/".$nombre);
}
?>
