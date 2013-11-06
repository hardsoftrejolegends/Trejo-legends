using UnityEngine;
using System.Collections;

public class Bottons : MonoBehaviour {
	
	public Texture btnTexture;
	
	void OnGUI(){
		GUI.Button(new Rect(Screen.width/2 - 120, Screen.height/2 + 140, 100, 50), btnTexture);
		GUI.Button(new Rect(Screen.width/2 - 300, Screen.height/2 + 140, 100, 40), btnTexture);
		GUI.Button(new Rect(Screen.width/2 + 120, Screen.height/2 + 140, 100, 40), btnTexture);
	}

	
	// Update is called once per frame
	void Update () {
		
	}
}
