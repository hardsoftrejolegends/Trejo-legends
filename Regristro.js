#pragma strict

@script RequireComponent(GUITexture)

var BtnOK : GUITexture;
var BtnBack : GUITexture;

var userName : String = "";
var password : String = "";
var passOK : String = "";

var TiempoFade : float=0.4;
var TiempoEspera : float=0;

var flag : boolean=false;
//var sw : StreamWriter = null;

function fLogo () {
	
	yield Fade.use.Alpha(guiTexture, 0.0, 1.0, TiempoFade, EaseType.In);
	flag=true;
	yield WaitForSeconds(TiempoEspera);
	
}

function Start () {

	fLogo();
}

function Update () {
	if(Input.touches.Length <= 0){
		//No hay toque sobre la GUI
	}else{
		if(BtnOK.guiTexture != null && (BtnOK.guiTexture.HitTest(Input.GetTouch(0).position))){
			if(Input.GetTouch(0).phase == TouchPhase.Began){
				Application.LoadLevel("Fondo");
			}
		}
		if(BtnBack.guiTexture != null && (BtnBack.guiTexture.HitTest(Input.GetTouch(0).position))){
			if(Input.GetTouch(0).phase == TouchPhase.Began){
				Application.LoadLevel("Login");
			}
		}
	}
}

function OnGUI () {

	if(flag==true){
		// Make a text field that modifies stringToEdit.
		userName = GUI.TextField (Rect (Screen.width/2 - 175, Screen.height/2 - 100, 400, 40), userName, 25);
		// Make a password field that modifies passwordToEdit.
		password = GUI.PasswordField (Rect (Screen.width/2 - 175, Screen.height/2 , 400, 40), password, "*"[0], 25);
		//password = GUI.TextField (Rect (50, 165, 275, 25), password, 25);
		passOK = GUI.PasswordField (Rect (Screen.width/2 - 175, Screen.height/2 + 115, 400, 40), passOK, "*"[0], 25);
	}
}
