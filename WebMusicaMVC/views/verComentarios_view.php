<?php
    echo "<b>Alquileres del cliente ".$_SESSION['nombre']."de la temática $tematica:<br><br>";

    foreach($peliculasTematica as $row) {
        echo "Título: ".$row["title"].
        "<br> Año lanzamiento: ".$row["release_year"].
        "<br> Fecha alquiler: ".$row["rental_date"].
        "<br> Fecha devolución: ".$row["return_date"]."<br><br>";
    }
?>