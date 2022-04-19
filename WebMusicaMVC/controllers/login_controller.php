<?php
    /*session_start();

    /*Cuando se vuelva al login siempre se borrará la sesión activa
    if(isset($_SESSION["email"])) {
        unset($_SESSION["email"]);
        unset($_SESSION["nombre"]);
        unset($_SESSION["numeroSocio"]);
        //session_destroy();
    }*/

    //include_once "models/login_model.php";
    include_once "views/login_view.html";
	
	/*
    $conn=conexion();
	if(isset($_POST['submit'])){//Si no se ha pulsado el boton de login cierra sesión
            if(isset($_POST['usuario']) && isset($_POST['clave']))
			{//Si se han rellenado los campos del login

			    $respuesta = getCustomerId($conn,$_POST['usuario'], $_POST['clave']);

                //Conseguimos el nombre y el número de socio
                $result = $respuesta->setFetchMode(PDO::FETCH_ASSOC);
                //Se recoge la variable para saber si el nif existe.
                foreach($respuesta->fetchAll() as $row) {
                    $numeroSocio= $row["customer_id"];
                    $nombre= $row["first_name"];
                }
                
                if($respuesta->rowCount() > 0)
				{
                    $_SESSION["email"]= $_POST['usuario'];
                    $_SESSION["nombre"]= $nombre;
                    $_SESSION["numeroSocio"]= $numeroSocio;
                    header("location:controllers/welcome_controller.php");
                }
				else{
                    echo "No existe ningun email con esa contrase&ntilde;a.";
					}
            }
			else
			{
                if(!isset($_POST['usuario']))
				{
                    echo "No se ha proporcionado un usuario!";
                }
                if(!isset($_POST['clave']))
				{
                    echo "No se ha proporcionado una contrase&ntilde;a!";
                }
			}
          }*/
?>