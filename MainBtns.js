#pragma strict

@script RequireComponent(GUITexture)

var BtnSettings : GUITexture;
var BtnPlay : GUITexture;
var BtnScores : GUITexture;

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
	if(Input.touches.Length <= 0){
		//No hay toque sobre la GUI
	}else{
		if(BtnSettings.guiTexture != null && (BtnSettings.guiTexture.HitTest(Input.GetTouch(0).position))){
			if(Input.GetTouch(0).phase == TouchPhase.Began){
				Application.LoadLevel("Settings");
			}
		}
		if(BtnPlay.guiTexture != null && (BtnPlay.guiTexture.HitTest(Input.GetTouch(0).position))){
			if(Input.GetTouch(0).phase == TouchPhase.Began){
				Application.LoadLevel("Login");
			}
		}
		if(BtnScores.guiTexture != null && (BtnScores.guiTexture.HitTest(Input.GetTouch(0).position))){
			if(Input.GetTouch(0).phase == TouchPhase.Began){
				Application.LoadLevel("Scores");
			}
		}
	}
	//Es apretado el boton Back de android
	if(Input.GetKeyDown(KeyCode.Escape)){
		Application.Quit();
	}
}
