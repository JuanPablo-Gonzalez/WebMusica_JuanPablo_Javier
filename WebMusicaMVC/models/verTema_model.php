<?php
    function obtenerComentarios($conexion,$idTema) {
        try {
            $comentarios= $conexion->prepare("SELECT id_comentario,tag,titulo,
            date_format(temas.fecha_publicacion,'%d/%m/%Y  %H:%i') as fecha_publicacion,mensaje,
            archivo,tipo_archivo,foto_perfil
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
    function mandarRespuesta($conexion,$idTema,$contenidoComentario,$archivo,$tipo_archivo) {
        try {
            $fechaPublicacionComentario= date("Y-m-d H:i:s");
            $idUsuario= $_SESSION["idUsuario"];

            $insertComentario= "INSERT INTO comentarios(fecha_publicacion,mensaje,archivo,tipo_archivo,id_tema,id_usuario) 
            VALUES('$fechaPublicacionComentario','$contenidoComentario','$archivo','$tipo_archivo','$idTema','$idUsuario')";
            
            $conexion->exec($insertComentario);
        } 
        catch(PDOException $e) {
            echo $e->getMessage();
        }
    }

    function editarComentario($conexion,$idTema,$contenidoComentario,$idComentario,$archivo,$tipo_archivo) {
        try {
            $editarComentario= "UPDATE comentarios set mensaje='$contenidoComentario' WHERE id_tema='$idTema' and id_comentario='$idComentario'";
            $conexion->exec($editarComentario);

            if($archivo!="") {
                $editarComentarioArchivo= "UPDATE comentarios set archivo='$archivo' WHERE id_tema='$idTema' and id_comentario='$idComentario'";
                $editarComentarioTipoArchivo= "UPDATE comentarios set tipo_archivo='$tipo_archivo' WHERE id_tema='$idTema' and id_comentario='$idComentario'";
                $conexion->exec($editarComentarioArchivo);
                $conexion->exec($editarComentarioTipoArchivo);
            }
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