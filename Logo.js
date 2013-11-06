using UnityEngine;
using System.Collections;
 
public class gggg : MonoBehaviour
{
    
    public string postURL = "funny-software-database.freeserver.me/agregarPuntaje.php"; //Para agregar puntaje
    public string getURL = "funny-software-database.freeserver.me/consultarPuntaje.php";//Para consultar puntaje
 	private string player="";
	private string alias="";
	private string puntaje="";
	
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
		
    }
 	
	private IEnumerator EnviarDatos(){
		string urlString = postURL + "alias=" + WWW.EscapeURL(alias) + "$nombre=" + player + "$puntaje=" + puntaje;
		Debug.Log("Enviando..." + urlString);
		WWW postName = new WWW(urlString);
		yield return postName;
		if(postName!=null){
			print("Error :( " + postName.error);
		}
		print ("\nmmm ");
		Debug.Log(postName.text);
		print ("\nmmm1 ");
	}
	
    
}
