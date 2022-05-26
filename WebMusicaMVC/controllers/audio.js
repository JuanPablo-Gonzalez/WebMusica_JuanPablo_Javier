var song = new Audio("audios/American Idiot.mp3");
song.loop = false;
var songInterval;

var songStateInterval = setInterval(() =>{
	if(song.readyState == 4){
		duration = parseInt(song.duration, 10);		
		$("#song-length").text(formatearTiempo(duration));
		clearInterval(songStateInterval);
	}
},100);

$("#boton-play").click(() => {
	if(song.readyState == 4){
		if(song.paused){
			song.play();
			songInterval = setInterval(recorrerCancion, 100);
			$("#boton-play").removeClass("play");
			$("#boton-play").addClass("pause");
		}else{
			song.pause();
			clearInterval(songInterval);
			$("#boton-play").addClass("play");
			$("#boton-play").removeClass("pause");
		}
	}
});

function recorrerCancion(){
	var currentTime = parseInt(song.currentTime, 10);
	$("#song-currentTime").text(formatearTiempo(currentTime));

	var progresoCancion = (song.currentTime / song.duration) * 100;
	$("#barra-progreso").css("width",progresoCancion+"%");
	if(progresoCancion == 100 && song.ended){
		clearInterval(songInterval);
	}
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