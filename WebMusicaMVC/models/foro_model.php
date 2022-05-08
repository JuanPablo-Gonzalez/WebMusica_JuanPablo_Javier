<?php
include_once "../db/db.php";

$foroElegido= $_POST['foroElegido'];

$elementosTema="SELECT titulo,temas.fecha_publicacion,nombre_usuario,
count(id_comentario) as 'cuentaResp',temas.id_tema
from temas,usuarios,comentarios
where usuarios.id_usuario=temas.id_usuario
and temas.id_tema=comentarios.id_tema and id_foro='$foroElegido' group by temas.id_tema";

$resultado= $conexion->prepare($elementosTema);
$resultado->execute();

$data= $resultado->fetchAll(PDO::FETCH_ASSOC);

$data= utf8_converter($data);

print json_encode($data);

		//Para convertir a utf8 y que el json que envia al datatable acepte tildes
function utf8_converter($array) {
	array_walk_recursive($array, function(&$item, $key){
		if(!mb_detect_encoding($item, 'utf-8', true)){
			$item = utf8_encode($item);
		}
	}); 
	return $array;
}
?>

