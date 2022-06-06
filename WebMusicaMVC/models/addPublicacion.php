<?php
session_start();
$idUsuarioActual = $_SESSION["idUsuario"];
$titulo = $_POST["titulo"];
$texto = $_POST["texto"];
$archivo = $_POST["archivo"];
$tipo_archivo = $_POST["tipo_archivo"];

$sql = "INSERT into publicaciones ()";
?>