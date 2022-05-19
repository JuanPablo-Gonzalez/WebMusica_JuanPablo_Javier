<?php
    function insertarNuevoTema($conexion,$titulo,$contenidoComentario,$foroElegido) {
        $idTema= obtenerUltimoIDTema($conexion);
        $idComentario= obtenerUltimoIDComentario($conexion);
        $fechaPublicacionTema= date("Y-m-d H:i:s");

        $siguienteIdTema= intval(substr($idTema,-3))+1; //cogeremos los 3 últimos números siempre.
        $siguienteIdComentario= intval(substr($idComentario,-3))+1;

        //insertaremos en la tabla temas
        $insertTema= "INSERT INTO temas VALUES 
        ('T".str_pad($siguienteIdTema,3,"0",STR_PAD_LEFT)."','$titulo','$fechaPublicacionTema','U001','$foroElegido')";
        $conexion->exec($insertTema);

        //insertaremos en la tabla comentarios, el primer comentario siempre será en del
        //usuario que publica el tema
        $insertPrimerComentario= "INSERT INTO comentarios VALUES 
        ('C".str_pad($siguienteIdComentario,3,"0",STR_PAD_LEFT)."','$fechaPublicacionTema','$contenidoComentario',null,null,'T".str_pad($siguienteIdTema,3,"0",STR_PAD_LEFT)."','U001')";
        $conexion->exec($insertPrimerComentario);
    }

    function obtenerUltimoIDTema($conexion) {
        try {
            $idTema= $conexion->prepare("SELECT max(id_tema) as 'ultimoIdTema' FROM temas");
            $idTema->execute();
            // set the resulting array to associative
            $result = $idTema->setFetchMode(PDO::FETCH_ASSOC);
            foreach($idTema->fetchAll() as $row) {
                $siguienteIdTema= $row["ultimoIdTema"];
            }

            return $siguienteIdTema;
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    function obtenerUltimoIDComentario($conexion) {
        try {
            $idComentario= $conexion->prepare("SELECT max(id_comentario) as 'ultimoIdComentario' FROM comentarios");
            $idComentario->execute();
            // set the resulting array to associative
            $result = $idComentario->setFetchMode(PDO::FETCH_ASSOC);
            foreach($idComentario->fetchAll() as $row) {
                $siguienteIdComentario= $row["ultimoIdComentario"];
            }

            return $siguienteIdComentario;
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
?>