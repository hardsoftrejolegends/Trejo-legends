using UnityEngine;
using System.Collections;
using System.IO;

public class writeFileCs : MonoBehaviour {
	public string ruta = "/mnt/sdcard/TrejoLegens/default.log";
	public GUITexture esc;
	public GUITexture lee;
	public string cad="default";
	public GUIText Msj;
	
	void Update() {
	if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(esc.guiTexture != null && (esc.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					WriteFile();
				}
			}
			if(lee.guiTexture != null && (lee.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					ReadFile();
				}
			}
		}

}
	public void WriteFile(){

    	StreamWriter sw = new StreamWriter(ruta,true);

    	sw.WriteLine(cad);

    	sw.Flush();

    	sw.Close();

	}	

 

	public void ReadFile() {

    	StreamReader sr = new StreamReader(ruta);
	
	    string line = "default";

	  // 	while (line != null) {

	        line = sr.ReadLine();
		Msj.guiText.text = line;
    	//}

    	sr.Close();

	}
}
