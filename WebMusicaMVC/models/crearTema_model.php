<?php
    function insertarNuevoTema($conexion,$titulo,$contenidoComentario,$foroElegido) {
        $fechaPublicacionTema= date("Y-m-d H:i:s");
        $idUsuario= $_SESSION["idUsuario"];
        
        try {
            $insertTema= "INSERT INTO temas(titulo,fecha_publicacion,id_usuario,id_foro) 
            VALUES('$titulo','$fechaPublicacionTema','$idUsuario','$foroElegido')";
            $conexion->exec($insertTema);
    
            $siguienteIdTema= obtenerUltimoIDTema($conexion);
            
            $insertPrimerComentario= "INSERT INTO comentarios(fecha_publicacion,mensaje,imagen,audio,id_tema,id_usuario) 
            VALUES('$fechaPublicacionTema','$contenidoComentario',null,null,'$siguienteIdTema','$idUsuario')";
            $conexion->exec($insertPrimerComentario);
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
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