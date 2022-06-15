<?php
    function obtenerComentarios($conexion,$idTema) {
        try { //incluir aqui el id del comentario, para pasarlo donde la vista y que se edite el comentario correcto
            $comentarios= $conexion->prepare("SELECT id_comentario,tag,titulo,temas.fecha_publicacion,mensaje 
            from usuarios,comentarios,temas where temas.id_tema=comentarios.id_tema and
            usuarios.id_usuario=comentarios.id_usuario and temas.id_tema='$idTema' order by id_comentario");

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
            $idUsuario= $_SESSION["idUsuario"];

            $insertComentario= "INSERT INTO comentarios(fecha_publicacion,mensaje,imagen,audio,id_tema,id_usuario) 
            VALUES('$fechaPublicacionComentario','$contenidoComentario',null,null,'$idTema','$idUsuario')";
            
            $conexion->exec($insertComentario);
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    function editarComentario($conexion,$idTema,$contenidoComentario,$idComentario) {
        try {
            $editarComentario= "UPDATE comentarios set mensaje='$contenidoComentario' WHERE id_tema='$idTema' and id_comentario='$idComentario'";
            
            $conexion->exec($editarComentario);
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    function eliminarComentario($conexion,$idTema,$idComentario) {
        try {
            $eliminarComentario= "DELETE from comentarios WHERE id_tema='$idTema' and id_comentario='$idComentario'";
            
            $conexion->exec($eliminarComentario);
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }
?>