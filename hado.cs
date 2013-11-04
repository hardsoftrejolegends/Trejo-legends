using UnityEngine;
using System.Collections;
using System.IO;

public class hado : MonoBehaviour {
	// Update is called once per frame
	void Update () {
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(this.guiTexture != null && (this.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					animation.CrossFade("THaduken");
				}
			}
		}
		if(Input.GetKeyDown(KeyCode.Escape)){
			Application.Quit();
		}
	}
}
