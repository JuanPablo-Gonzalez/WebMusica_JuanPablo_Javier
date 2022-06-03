$("#form-AddComentario").submit(() => {
	//if($("#form-AddComentario").valid()){

		datos["texto"] = $("#inputNewComentario").val();
		console.log(datos)
		$.ajax({
			method: "POST",
			url: "../models/addComentario.php",
			data: datos,
			success: function(result){
				console.log(result)
				if(!result.error){
					
				}else{
					
				}
			},
			dataType: "json"
		});
	//}
	return false;
})