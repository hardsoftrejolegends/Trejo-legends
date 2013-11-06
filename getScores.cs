using UnityEngine;
using System.Collections;
using System.IO;

public class getScores : MonoBehaviour {
	
	public GUITexture BtnBack; //Back de la escena
	public Vector2 scrollPosition; //Scroll de la tabla
	public string getURL = "http://funny-software-database.freeserver.me/Equipo2-5/consultarScore.php?";//URL de consulta de Scores
	public string path=""; //Variable que almacena la ruta del fichero en dispositivo
	public bool flagWifi=false; //Bandera para discernir si hay conexion a internet o no
	//Variables encargadas de crear la BD de HighScores dentro del dispositivo
	string[] words; //Almacenamos todos los valores que nos arroja el request
	string name="Nombre\n\n"; //Solo los nombres
	string alias="Alias\n\n"; //Solo el alias
	string score="Puntuacion\n\n"; //Solo la Puntuacion
	string cad=""; //Variable auxiliar donde juntamos lo que nos regresa el request para escribirlo en un archivo
	int i=0; //Auxiliar usado en el for para ir separando lo que regresa el request
	public Font f;
	
	int x;
	int y;
	int xArea;
	int yArea;
	int yScroll;
	public int sizeFont;
	
	void OnGUI(){
		GUI.skin.font = f;
		//GUI.Box(new Rect (100,100,Screen.width - 500, Screen.height - 500),""); 
    	//GUILayout.BeginArea(new Rect((Screen.height)-425,(Screen.width)-850, Screen.width - 400, Screen.height - 100));
		GUILayout.BeginArea(new Rect(x,y, xArea, yArea)); //Crea un area donde se desplegara la informacion
		if(flagWifi==true){ //Conexion a internet?
			GUI.skin.label.fontSize=sizeFont;
			scrollPosition = GUILayout.BeginScrollView(scrollPosition, GUILayout.Height(yScroll)); //Altura del scroll vertical
			GUILayout.BeginHorizontal(); //Creamos un espacio
			
			GUILayout.Label(alias); //Creamos una columna de Alias
			GUILayout.Label(name); //Creamos una columna de Nombres
			GUILayout.Label(score); //Creamos una columna de Scores
			
			GUILayout.EndHorizontal(); //Finalizamos el area deel espacio
        	GUILayout.EndScrollView(); //Cerramos el scroll
		}else{
			GUILayout.BeginHorizontal(); //Creamos un espacio
			GUI.skin.label.fontSize=20;
			GUILayout.Label("Lo sentimos pero en este momento no le podemos mostrar la informacion que necesita.Revise su conexion a Internet");
			GUILayout.EndHorizontal(); //Finalizamos el area deel espacio
		}
		GUILayout.EndArea(); //Si no cerramos el area hay error
	}

	// Use this for initialization
	void Start () {
		StartCoroutine("CheckConexion");
		StartCoroutine("getDate");
		path=Application.persistentDataPath; //Aisgnamos a path la ruta delarchivo
		if(!(System.IO.File.Exists(path+"/HighScores.txt"))){
			StreamWriter auxf = new StreamWriter(path+"/HighScores.txt");//Cuando es incovado por primera vez
			auxf.Close();
		}
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(BtnBack.guiTexture != null && (BtnBack.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					Application.LoadLevel("Main");
				}
			}
		}
		//Back de Android nos regresa al Menu Principal
		if(Input.GetKeyDown(KeyCode.Escape)){
			Application.LoadLevel("Main");
		}
		
		if(Screen.width<1024&&Screen.height<600){ //Resolucion para telefonos gama media-baja
			x=175;
			y=100;
			xArea=Screen.width - 325;
			yArea=Screen.height - 100;
			yScroll=350;
			sizeFont=13;
		}else{ //Resolucion para tablets y telefonos de gama alta
			x=275;
			y=150;
			xArea=Screen.width - 530;
			yArea=Screen.height - 100;
			yScroll=500;
			sizeFont=16;
		}
	}
	
	private IEnumerator getDate(){
		WWW Datos = new WWW(getURL);
		yield return Datos;
		
		if (Datos.error != null)
        {
            print("There was an error getting the high score: " + Datos.error);
        }
        else
        {
         	string datos=Datos.text;
			char[] clave = {'\t','\n','\r','+','-','*','/','(',')'};
			words = datos.Split(clave);
			i=words.Length;
			Debug.Log(i);
			for(i=0;i<(words.Length)-59;i=i+3){
				alias += words[i]+"\n\n";
				name += words[i+1]+"\n\n";
				score += words[i+2]+"\n\n";
				cad=words[i]+"|"+words[i+1]+"|"+words[i+2];
				WriteFile(path+"/HighScores.txt");
			}  
        }		
	}
	
	private IEnumerator CheckConexion(){
		WWW www = new WWW(getURL);
		yield return www; //Esperamos hago que haga el request con la url
		
		if(!string.IsNullOrEmpty(www.error)){ //Comprobamos la conexion a internet

		}else{
			flagWifi=true; //Si no hay errores de descarga hay acceso a la pagina
		}
	}
	
	public void WriteFile(string ruta){

   		StreamWriter sw = new StreamWriter(ruta,true);
    	sw.WriteLine(cad);
   		sw.Flush();
    	sw.Close();
	}
}
