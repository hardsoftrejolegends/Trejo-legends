#pragma strict

function Start () {
	globalVar.TrejoVidas = 3;
}

function Update () {
	if(globalVar.TrejoVidas == 0 && !globalVar.TrejoPierde){
		globalVar.TrejoDiaInic = globalVar.TrejoTiempo.Now.Day;
		globalVar.TrejoHoraInic = globalVar.TrejoTiempo.Now.Hour;
		globalVar.TrejoMinInic = globalVar.TrejoTiempo.Now.Minute;
		globalVar.TrejoPierde = true;
	}
	
	if(globalVar.TrejoPierde){
		globalVar.TrejoDiaFin = globalVar.TrejoTiempo.Now.Day;
		globalVar.TrejoHoraFin = globalVar.TrejoTiempo.Now.Hour;
		globalVar.TrejoMinFin = globalVar.TrejoTiempo.Now.Minute;
		
		if(globalVar.TrejoMinInic == globalVar.TrejoMinFin && globalVar.TrejoHoraFin >= (globalVar.TrejoHoraInic + 3) && globalVar.TrejoDiaFin >= globalVar.TrejoDiaFin){
			globalVar.TrejoVidas = 3;
			Application.LoadLevel("Main");
		}else{
			Application.LoadLevel("Settings"); //pongo settings solo para diferenciar casos, aqui va la pantalla de bloqueo...
		}
	}
}
