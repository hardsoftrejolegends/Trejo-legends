var remoteIP = "";
var remotePort = 25000;
var listenPort = 25000;
var useNAT = false;
var yourIP = "";
var yourPort = "";
var extPort = "";
var extIP = "";


function OnGUI () {
	// Checking if you are connected to the server or not
	if (Network.peerType == NetworkPeerType.Disconnected)
	{
		// If not connected
		if (GUI.Button (new Rect(10,10,100,30),"Connect"))
		{
			// Connecting to the server
			Network.Connect(remoteIP, remotePort);
			globalVar.flagClient=true;
		}	
	if (GUI.Button (new Rect(10,50,100,30),"Start Server"))
	{
		// Creating server
		Network.InitializeServer(32, listenPort, useNAT);
		globalVar.flagServer=true;
		// Notify our objects that the level and the network is ready
		for (var go : GameObject in FindObjectsOfType(GameObject))
		{


		go.SendMessage("OnNetworkLoadedLevel",
		SendMessageOptions.DontRequireReceiver);
		}
	}
	// Fields to insert ip address and port
	remoteIP = GUI.TextField(new Rect(120,10,100,35),remoteIP);
	remotePort = parseInt(GUI.TextField(new	Rect(230,10,50,35),remotePort.ToString()));
	}
	else
	{
		// Getting your ip address and port
		yourIP = Network.player.ipAddress;
		yourPort = Network.player.port.ToString();
		extPort = Network.player.externalPort.ToString();
		extIP = Network.player.externalIP;
		
		GUI.Label(new Rect(150,20,250,50),"IP Adress: "+yourIP+" : "+yourPort + " -- " + extPort + "--" + extIP);
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
