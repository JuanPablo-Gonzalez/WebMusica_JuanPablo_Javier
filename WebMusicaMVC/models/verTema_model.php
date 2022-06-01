<?php
    function obtenerComentarios($conexion,$idTema) {
        try {
            $comentarios= $conexion->prepare("SELECT nombre_usuario,titulo,temas.fecha_publicacion,mensaje 
            from usuarios,comentarios, temas where temas.id_tema=comentarios.id_tema and
            usuarios.id_usuario=comentarios.id_usuario and temas.id_tema='$idTema'");

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
            $fechaPublicacionComentario= date("Y-m-d H:i:s");

            $insertComentario= "INSERT INTO comentarios(fecha_publicacion,mensaje,imagen,audio,id_tema,id_usuario) 
            VALUES('$fechaPublicacionComentario','$contenidoComentario',null,null,'$idTema','2')";
            
            $conexion->exec($insertComentario);
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
?>