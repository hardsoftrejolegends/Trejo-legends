#pragma strict

function OnGUI(){
	// Disconnect from the server
	Network.Disconnect(200);
}

function Start(){
	// Notify our objects that the level and the network is ready
	for (var go : GameObject in FindObjectsOfType(GameObject)){
		go.SendMessage("OnNetworkLoadedLevel",SendMessageOptions.DontRequireReceiver);
	}
}
