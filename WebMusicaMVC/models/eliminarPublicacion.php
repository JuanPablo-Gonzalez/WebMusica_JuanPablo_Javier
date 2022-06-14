<?php
session_start();
$idPublicacion = $_POST["idPublicacion"];
$tag = $_SESSION["tag"];

include_once "../db/db.php";

$sql = "DELETE from publicaciones where id_publicacion='$idPublicacion'";
$conexion->exec($sql);

echo $tag;
?>