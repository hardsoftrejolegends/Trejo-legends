 #pragma strict
var i=0;
var mensaje = "Golpe";
var v100 : GUITexture;
var ko : GUITexture;
var ko2 : Texture2D;
var v90 : Texture2D;
var v80 : Texture2D;
var v70 : Texture2D;
var v60 : Texture2D;
var v50 : Texture2D;
var v40 : Texture2D;
var v30 : Texture2D;
var v20 : Texture2D;
var v10 : Texture2D;

function Start () {

}

function Update () {
}

function OnCollisionEnter(collision : Collision) {
		// Debug-draw all contact points and normals
		if(collision.gameObject.name == "Pato"){
		globalVar.BarraP= globalVar.BarraP+1;
		Debug.Log("hit");
		if (globalVar.BarraP==1){
			v100.texture = v90;	
			}
		if (globalVar.BarraP==2){
			v100.texture = v80;	
			}
		if (globalVar.BarraP==3){
			v100.texture = v70;	
			}
		if (globalVar.BarraP==4){
			v100.texture = v60;	
			}
		if (globalVar.BarraP==5){
			v100.texture = v50;	
			}
		if (globalVar.BarraP==6){
			v100.texture = v40;	
			}
		if (globalVar.BarraP==7){
			v100.texture = v30;	
			}
		if (globalVar.BarraP==8){
			v100.texture = v20;	
			}
		if (globalVar.BarraP==9){
			v100.texture = v10;	
			}
		if (globalVar.BarraP==10){
			ko.texture = ko2;
			yield WaitForSeconds (2);
			globalVar.vidas = globalVar.vidas - 1;
			Application.LoadLevel("Estadio");
			}
	}
}
