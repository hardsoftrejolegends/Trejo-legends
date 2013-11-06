#pragma strict
import System.IO;

@script RequireComponent(GUITexture)
//Botones de control de escena
var BtnEntrar : GUITexture;
var BtnRegistrar : GUITexture;
//Formulario
var userName : String = "Usuario";
var password : String = "Contraseña";
//Efectos de desvanecimiento
var TiempoFade : float=0.4;
var TiempoEspera : float=0;
//Banderas 
var flag : boolean=false;
var flagUser : boolean=false;

var Msj : GUIText;
var path : String="";


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
		if(BtnEntrar.guiTexture != null && (BtnEntrar.guiTexture.HitTest(Input.GetTouch(0).position))){
			if(Input.GetTouch(0).phase == TouchPhase.Began){
				if(!(userName=="Usuario" || password=="Contraseña")){
					path=Application.persistentDataPath;
					if(path!=""){
						ReadFile(path+"/Users.txt");
						if(flagUser){
							Application.LoadLevel("MenuP");
						}else{
							Msj.guiText.text = "Usuario y contraseña inexistentes. Porfavor registrese";//+auxName;
						}
					}
				}else{
					Msj.guiText.text = "Ingrese un usuario y contraseña para poder ingresar";
				}
			}
		}
		if(BtnRegistrar.guiTexture != null && (BtnRegistrar.guiTexture.HitTest(Input.GetTouch(0).position))){
			if(Input.GetTouch(0).phase == TouchPhase.Began){
				Application.LoadLevel("Registrar");
			}
		}
	}
	
	//Apretando el boton Back de android sale de la App
	if(Input.GetKeyDown(KeyCode.Escape)){
		Application.LoadLevel("Main");
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

function ReadFile(ruta : String) {

    var sr : StreamReader = new StreamReader(ruta);
	var line : String =" | ";
    var aux : String[];
    var auxName : String="";

   	while (line != null) {
   		aux=line.Split("|"[0]); //[0] es necesario para hacer el split
   		//Msj.guiText.text = line;
		auxName=aux[0]+aux[1];
		if(auxName == userName+password){
			flagUser=true;
		}
		line = sr.ReadLine();
    }
    sr.Close();
}
