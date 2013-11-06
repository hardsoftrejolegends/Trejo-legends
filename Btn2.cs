using UnityEngine;
using System.Collections;

public class Btn2 : MonoBehaviour {
	// Update is called once per frame
	void Update () {
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(this.guiTexture != null && (this.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					System.IO.Directory.CreateDirectory("/mnt/sdcard/TrejoLegens");
					Application.LoadLevel("Login");
				}
			}
		}
	}
}
