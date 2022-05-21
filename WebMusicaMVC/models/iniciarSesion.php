<?php
$email = $_POST["email"];
$password = MD5($_POST["password"]);

include_once "../db/db.php";

//echo $email;
//echo strlen($password);
?>