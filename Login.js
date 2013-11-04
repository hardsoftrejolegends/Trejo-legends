#pragma strict

@script RequireComponent(GUITexture)

var BtnEntrar : GUITexture;
var BtnRegistrar : GUITexture;

var userName : String = "Usuario";
var password : String = "Contraseña";

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

	if(userName=="Edgar"&&password=="wxyz"){
		//Reseteamos las variables
		//userName = "Usuario";
		//password = "Contraseña";
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(BtnEntrar.guiTexture != null && (BtnEntrar.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					Application.LoadLevel("MenuP");
				}
			}
		}
	}
	if(BtnRegistrar.guiTexture != null && (BtnRegistrar.guiTexture.HitTest(Input.GetTouch(0).position))){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
		Application.LoadLevel("Registrar");
		}
	}
}

function OnGUI () {

	if(flag==true){
		// Make a text field that modifies stringToEdit.
		userName = GUI.TextField (Rect (Screen.width/2 - 200, Screen.height/2 - 50, 400, 40), userName, 25);
		// Make a password field that modifies passwordToEdit.
		password = GUI.PasswordField (Rect (Screen.width/2 - 200, Screen.height/2 + 40, 400, 40), password, "*"[0], 25);
		//password = GUI.TextField (Rect (50, 165, 275, 25), password, 25);
	}
}
