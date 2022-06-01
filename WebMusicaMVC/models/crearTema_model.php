<?php
    function insertarNuevoTema($conexion,$titulo,$contenidoComentario,$foroElegido) {
        $fechaPublicacionTema= date("Y-m-d H:i:s");

        $insertTema= "INSERT INTO temas(titulo,fecha_publicacion,id_usuario,id_foro) 
        VALUES('$titulo','$fechaPublicacionTema','1','$foroElegido')";
        $conexion->exec($insertTema);

        $siguienteIdTema= obtenerUltimoIDTema($conexion);
        //insertaremos en la tabla comentarios, el primer comentario siempre será en del
        //usuario que publica el tema
        $insertPrimerComentario= "INSERT INTO comentarios(fecha_publicacion,mensaje,imagen,audio,id_tema,id_usuario) 
        VALUES('$fechaPublicacionTema','$contenidoComentario',null,null,'$siguienteIdTema','1')";
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
?>