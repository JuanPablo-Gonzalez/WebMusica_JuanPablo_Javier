function prepararAudio(publicacion){
	let audio = new Audio("audios/" + publicacion.archivo)
	audio.loop = false;

	let audioStateInterval = setInterval(() =>{
		if(audio.readyState == 4){
			duration = parseInt(audio.duration, 10);		
			$("#song-length-"+publicacion.id_publicacion).text(formatearTiempo(duration));
			archivosPublicaciones[publicacion.id_publicacion] = audio;
			clearInterval(audioStateInterval);
		}
	},100);
}

function alternarReproducion(id_publicacion){
	if(archivosPublicaciones[id_publicacion].readyState == 4){
		if(archivosPublicaciones[id_publicacion].paused){
			for(let i in archivosPublicaciones){
				if(i == id_publicacion){
					archivosPublicaciones[i].play();
					intervaloAudios[i] = setInterval(() => {
						var currentTime = parseInt(archivosPublicaciones[i].currentTime, 10);
						$("#song-currentTime-"+i).text(formatearTiempo(currentTime));

						var progresoCancion = (archivosPublicaciones[i].currentTime / archivosPublicaciones[i].duration) * 100;
						$("#progressBar-"+i).css("width",progresoCancion+"%");
						if(progresoCancion == 100 && archivosPublicaciones[i].ended){
							clearInterval(intervaloAudios[i]);
						}
					}, 100);
					$("#boton-play-"+i).removeClass("play");
					$("#boton-play-"+i).addClass("pause");
				}else{
					pausarAudio(i);
				}
			}
		}else{
			pausarAudio(id_publicacion);
		}
	}
}

function pausarAudio(id){
	archivosPublicaciones[id].pause();
	clearInterval(intervaloAudios[id]);
	$("#boton-play-"+id).addClass("play");
	$("#boton-play-"+id).removeClass("pause");
}

function formatearTiempo(tiempo){
	if(tiempo < 60){
		tiempo = formatearCifrasTiempo(tiempo);
		return "00:" + tiempo;
	}else{
		var minActual = Math.trunc(tiempo / 60);
		minActual = formatearCifrasTiempo(minActual);

		var segundoActual = tiempo % 60;
		segundoActual = formatearCifrasTiempo(segundoActual);

		return minActual + ":" + segundoActual;
	}
}

function formatearCifrasTiempo(tiempo){
	if(tiempo < 10){
		tiempo = "0" + tiempo;
	}
	return tiempo;
}