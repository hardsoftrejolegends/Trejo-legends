#pragma strict

function Start () {
	globalVar.vidas = 9;
}

function Update () {
	if(globalVar.vidas == 0 && !globalVar.pierde){
		globalVar.diaInic = globalVar.tiempo.Now.Day;
		globalVar.horaInic = globalVar.tiempo.Now.Hour;
		globalVar.minInic = globalVar.tiempo.Now.Minute;
		globalVar.pierde = true;
	}
	
	if(globalVar.pierde){
		globalVar.diaFin = globalVar.tiempo.Now.Day;
		globalVar.horaFin = globalVar.tiempo.Now.Hour;
		globalVar.minFin = globalVar.tiempo.Now.Minute;
		
		if(globalVar.minInic == globalVar.minFin && globalVar.horaFin >= (globalVar.horaInic + 3) && globalVar.diaFin >= globalVar.diaFin){
			globalVar.vidas = 9;
			Application.LoadLevel("Main");
		}else{
			Application.LoadLevel("Settings"); //pongo settings solo para diferenciar casos, aqui va la pantalla de bloqueo...
		}
	}
}
