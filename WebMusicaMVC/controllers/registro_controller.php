<?php
    include_once "../views/registro_view.html";
    include_once "../models/registro_model.php";

    $v1=$_GET['dato'];
    echo $v1; 

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //$destinatarioEmail= $_POST['email'];

        //header('location:../index.php');
        //enviarEmail($destinatarioEmail);
    }
?>