using UnityEngine;
using System.Collections;
using System.IO;

public class scr : MonoBehaviour {
	// Update is called once per frame
	void Update () {
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(this.guiTexture != null && (this.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					animation.CrossFade("TCaminar");
					this.transform.Translate(Vector3.forward*5*Time.deltaTime);
				}
			}
		}
		if(Input.GetKeyDown(KeyCode.Escape)){
			Application.Quit();
		}
	}
}

