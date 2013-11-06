#pragma strict

@script RequireComponent(GUITexture)

var BtnCP : GUITexture;
var BtnBP : GUITexture;
var BtnBack : GUITexture;
//Networking
var remoteIP = "";
var remotePort = 25000;
var listenPort = 25000;
var useNAT = false;
var yourIP = "";
var yourPort = "";
var extPort = "";
var extIP = "";

function Start () {
}

function Update () {
	if (Network.peerType == NetworkPeerType.Disconnected){
		if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(BtnCP.guiTexture != null && (BtnCP.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					// Creating server
					Network.InitializeServer(32, listenPort, useNAT);
				}
			}
			if(BtnBP.guiTexture != null && (BtnBP.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					Application.LoadLevel("Oponentes");
				}
			}
			if(BtnBack.guiTexture != null && (BtnBack.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					Application.LoadLevel("Main");
				}
			}
		}
	}else{
		// Getting your ip address and port
		yourIP = Network.player.ipAddress;
		yourPort = Network.player.port.ToString();
		extPort = Network.player.externalPort.ToString();
		extIP = Network.player.externalIP;
		
		GUI.Label(new Rect(150,20,300,100),"IP Adress: "+yourIP+" : "+yourPort + " -- " + extPort + "--" + extIP);
		if (GUI.Button (new Rect(10,10,100,50),"Disconnect"))
		{
			// Disconnect from the server
			Network.Disconnect(200);
		}
	}
}

function OnConnectedToServer () {
	// Notify our objects that the level and the network are ready
	for (var go : GameObject in FindObjectsOfType(GameObject))
		go.SendMessage("OnNetworkLoadedLevel",
	SendMessageOptions.DontRequireReceiver);
}
