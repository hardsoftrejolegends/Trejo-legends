 #pragma strict
var i=0;
var mensaje = "Golpe";
var v100 : GUITexture;
var ko : GUITexture;
var perdido : GUITexture;
var perder : Texture2D;
var v90 : Texture2D;
var v80 : Texture2D;
var v70 : Texture2D;
var v60 : Texture2D;
var v50 : Texture2D;
var v40 : Texture2D;
var v30 : Texture2D;
var v20 : Texture2D;
var v10 : Texture2D;
var ko2 : Texture2D;

function Start () {

}

function Update () {
}

function OnCollisionEnter(collision : Collision) {
		// Debug-draw all contact points and normals
		if(collision.gameObject.name == "TREJOANIMACIONESerie"){
		i= i+1;
		Debug.Log("hit");
		if (i==1){
			v100.texture = v90;	
			}
		if (i==2){
			v100.texture = v80;	
			}
		if (i==3){
			v100.texture = v70;	
			}
		if (i==4){
			v100.texture = v60;	
			}
		if (i==5){
			v100.texture = v50;	
			}
		if (i==6){
			v100.texture = v40;	
			}
		if (i==7){
			v100.texture = v30;	
			}
		if (i==8){
			v100.texture = v20;	
			}
		if (i==9){
			v100.texture = v10;	
			}
		if (i==10){
			ko.texture = ko2;
			yield WaitForSeconds (2);
			perdido.texture = perder;
			yield WaitForSeconds (2);
			Application.LoadLevel("Main");
			}
	}
}
