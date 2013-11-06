using UnityEngine;
using System.Collections;
using System.IO;
 
public class Registrar : MonoBehaviour{
    
    public string postURL = "http://funny-software-database.freeserver.me/agregarUsuario.php?"; //Para agregar 
	public GUITexture BtnOK;
	public GUITexture BtnBack;
	public GUIText Msj;
 	public string userName="";
	public string password="";
	public string passOK="";
	public string cad;
	public string path="";
	public bool flag=true;
	public bool flagWifi=false;
	public string[] aux;
	public int y=150;
	
    void OnGUI () {
		// Make a text field that modifies stringToEdit.
		userName = GUI.TextField (new Rect ((Screen.width/2) - 175, (Screen.height/2) - 105, 400, 50), userName, 15);
		// Make a password field that modifies passwordToEdit.
		password = GUI.PasswordField (new Rect ((Screen.width/2) - 50 , (Screen.height/2) - 3, 400, 50), password, "*"[0], 15);
		//password = GUI.TextField (Rect (50, 165, 275, 25), password, 25);
		passOK = GUI.PasswordField (new Rect ((Screen.width/2) - 50, (Screen.height/2) + y, 400, 50), passOK, "*"[0], 15);
}
 	
	private IEnumerator EnviarDatos(){
		WWWForm form = new WWWForm(); 
		form.AddField("correo",userName);
		form.AddField("password",password);
		
		if(!form.headers.ContainsKey("Content-Type"))
           form.headers.Add("Content-Type", "application/x-www-form-urlencoded");
		
		WWW postName = new WWW(postURL,form.data,form.headers);
		Debug.Log("Enviando..." + form.data);
		
		yield return postName;
		if(postName==null){
			//print("Error :( " + postName.error);
			flagWifi=true;
		}
	}
	
	private IEnumerator CheckConexion(){
		WWW www = new WWW(postURL);
		yield return www; //Esperamos hago que haga el request con la url
		
		if(!string.IsNullOrEmpty(www.error)){ //Comprobamos la conexion a internet

		}else{
			flagWifi=true; //Si no hay errores de descarga hay acceso a la pagina
		}
	}
	
	void Start(){
		StartCoroutine("CheckConexion");
	}
	
	void Update(){
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(BtnOK.guiTexture != null && (BtnOK.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					if(password==passOK){ //Verificamos que las contraseñas sean las mismas
						StartCoroutine("CheckConexion");
						if(flagWifi==true){
							path=Application.persistentDataPath; //Aisgnamos a path la ruta delarchivo
							if(System.IO.File.Exists(path+"/Users.txt")){
								ReadFile(path+"/Users.txt");//Verificamos que no haya 2 usuarios repetidos
								if(flag){ //El valor de flag cambia en la funcion ReadFile
									cad=userName+"|"+password;
									WriteFile(path+"/Users.txt");
									Application.LoadLevel("Login");
								}else{
									Msj.guiText.text = "Lo sentimos pero el usuario ya existe";
								}
							}else{
								StreamWriter auxf = new StreamWriter(path+"/Users.txt",true);//temporalmente para cuando es incovado por primera vez
								auxf.Close();
								cad=userName+"|"+password;
								WriteFile(path+"/Users.txt");
								Application.LoadLevel("Login");
							}
						}else{
							Msj.guiText.text = "Revise su conexion a internet";
						}
					}else{
						Msj.guiText.text = "Las contraseñas no son las mismas";
					}
				}
			}
			if(BtnBack.guiTexture != null && (BtnBack.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					Application.LoadLevel("Login");
				}
			}
		}
		
		if(Screen.width<1024&&Screen.height<600){
			y=115;
		}
		
		//Apretando el boton Back de android sale de la App
		if(Input.GetKeyDown(KeyCode.Escape)){
			Application.LoadLevel("Login");
		}
	}
	
	public void WriteFile(string ruta){

   		StreamWriter sw = new StreamWriter(ruta,true);
    	sw.WriteLine(cad);
   		sw.Flush();
    	sw.Close();
	}

	public void ReadFile(string ruta) {

    	StreamReader sr = new StreamReader(ruta);
		string line = " | ";
		while (line != null) {
			aux=line.Split('|');
			if(aux[0]==userName){
				flag=false;
			}
			line = sr.ReadLine();
    	}
		sr.Close();
	}
}
