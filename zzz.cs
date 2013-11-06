using UnityEngine;
using System.Collections;
 
public class zzz : MonoBehaviour
{
    
    public string postURL = "http://funny-software-database.freeserver.me/agregarPuntaje.php?"; //Para agregar puntaje
    public string getURL = "http://funny-software-database.freeserver.me/Equipo1-4/consultarPunta.php";//Para consultar puntaje
 	private string player="";
	private string alias="";
	private string puntaje="";
	string[] words;
	int i=0;
	string nom="";
	string ali="";
	string punta="";
	string aux="";
    void OnGUI()
    {
        GUI.Label( new Rect(10, 10, 50, 25), "Nombre" );//Para Salvar nombre
		player = GUI.TextField( new Rect(70,10,100,25),player);
		GUI.Label( new Rect(10, 40, 50, 25), "Alias" );//Para Salvar nombre
		alias = GUI.TextField( new Rect(70,40,100,25),alias);
		GUI.Label( new Rect(10, 80, 50, 25), "Puntaje" );//Para Salvar nombre
		puntaje = GUI.TextField( new Rect(70,80,100,25),puntaje);
		
		if(GUI.Button(new Rect(180,10,80,25),"Enviar Datos"))
			StartCoroutine("EnviarDatos");
		
		if(GUI.Button(new Rect(200,100,300,100),"consultar Datos1"))
	        StartCoroutine(CoDatos());
		
		GUI.TextArea(new Rect(10,250,110,30),"Alias");	
		GUI.TextArea(new Rect(10,300,150,500),ali);	
		
		GUI.TextArea(new Rect(150,250,110,30),"Nombre");
		GUI.TextArea(new Rect(150,300,150,500),nom);	
		
		GUI.TextArea(new Rect(300,250,110,30),"Puntaje");	
		GUI.TextArea(new Rect(300,300,150,500),punta);	
		
		
    }
 	
	private IEnumerator EnviarDatos(){
		WWWForm form = new WWWForm(); 
		form.AddField("nombre",player);
		form.AddField("alias",alias);
		form.AddField("puntaje",puntaje);
		
		if(!form.headers.ContainsKey("Content-Type"))
           form.headers.Add("Content-Type", "application/x-www-form-urlencoded");
		
		WWW postName = new WWW(postURL,form.data,form.headers);
		Debug.Log("Enviando..." + form.data);
		
		yield return postName;
		if(postName!=null){
			print("Error :( " + postName.error);
		}
	}
	
	private IEnumerator CoDatos(){
		WWW conseguirDatos = new WWW(getURL);
		yield return conseguirDatos;
		
		if (conseguirDatos.error != null)
            print("There was an error getting the high score: " + conseguirDatos.error);
        else {
        	string datos=conseguirDatos.text;
			char[] clave = {'\t','\n','\r','+','-','*','/','(',')'};
			words = datos.Split(clave);
			for(i=0;i<30;i=i+3){
				ali += words[i]+"\n";
				nom += words[i+1]+"\n";
				punta += words[i+2]+"\n";
				}   
        }
		
	}
	
	
}
