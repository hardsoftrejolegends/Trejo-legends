using UnityEngine;
using System.Collections;

public class BtnEntrar : MonoBehaviour {

	void Update () {
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(this.guiTexture != null && (this.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					Application.LoadLevel("MenuP");
				}
			}
		}
	}
}
