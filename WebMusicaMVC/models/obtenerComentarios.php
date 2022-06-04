<?php
$idPublicacion = $_POST["idPublicacion"];
//$idPublicacion = 3;

include_once "../db/db.php";

$sql = "SELECT * from comentarios_publicaciones where id_publicacion='$idPublicacion'";

$comentarios = obtenerArraySQL($conexion, $sql);

//var_dump($comentarios);
echo json_encode($comentarios);

?>