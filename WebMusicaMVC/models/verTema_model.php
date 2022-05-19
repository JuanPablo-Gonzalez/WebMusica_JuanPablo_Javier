<?php
    function obtenerComentarios($conexion,$idTema) {
        try {
            $comentarios= $conexion->prepare("SELECT nombre_usuario,titulo,temas.fecha_publicacion,mensaje 
            from usuarios,comentarios, temas where temas.id_tema=comentarios.id_tema and
            usuarios.id_usuario=comentarios.id_usuario and temas.id_tema='$idTema'");

            /*
            SELECT titulo,temas.fecha_publicacion,
            temas.id_usuario as 'creadorTema',comentarios.id_usuario as 'creadorComentario',mensaje 
            from comentarios, temas where temas.id_tema=comentarios.id_tema and temas.id_tema='T004'*/

            $comentarios->execute();

            return $comentarios->fetchAll(PDO::FETCH_ASSOC); 
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    //Para responder a en un tema
    function mandarRespuesta($conexion,$idTema,$contenidoComentario) {
        try {
            $idComentario= obtenerUltimoIDComentario($conexion);
            $fechaPublicacionComentario= date("Y-m-d H:i:s");
            $siguienteIdComentario= intval(substr($idComentario,-3))+1;

            $insertComentario= "INSERT INTO comentarios VALUES 
            ('C".str_pad($siguienteIdComentario,3,"0",STR_PAD_LEFT)."','$fechaPublicacionComentario','$contenidoComentario',null,null,'$idTema','U002')";
            
            $conexion->exec($insertComentario);
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