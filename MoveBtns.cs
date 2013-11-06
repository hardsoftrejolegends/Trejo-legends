using UnityEngine;
using System.Collections;

public class MoveBtns : MonoBehaviour {
	
	GUITexture A;
	GUITexture B;
	GUITexture X;
	GUITexture Y;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(A.guiTexture != null && (A.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){					
				}
			}
			if(B.guiTexture != null && (B.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){					
				}
			}
			if(X.guiTexture != null && (X.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){					
				}
			}
			if(Y.guiTexture != null && (Y.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){					
				}
			}
		}
	}
}
