#pragma strict

@script RequireComponent(GUITexture)

var TiempoFade : float=0.4;
var TiempoEspera : float=0;

function fLogo () {
	
	yield Fade.use.Alpha(guiTexture, 0.0, 1.0, TiempoFade, EaseType.In);
	yield WaitForSeconds(TiempoEspera);
	
}

function Start () {
	fLogo();
}

function Update () {

}
