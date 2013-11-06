var Banana : Transform;
var Principal : Transform;
var Controles : Morro;

function OnNetworkLoadedLevel () {
	// Instantiating SpaceCraft when Network is loaded
	if(!Controles.hasPers()){
		if(Network.isClient){
			Network.Instantiate(Banana, Banana.transform.position, Banana.transform.rotation, 0);
			Controles.SetPers(globalVar.Ene);
		}
		if(Network.isServer){
			Network.Instantiate(Principal, Principal.transform.position, Principal.transform.rotation, 0);
			Controles.SetPers(globalVar.T);
			Controles.izq = true;
		}
	}
}

function OnPlayerDisconnected (player : NetworkPlayer) {
	Network.RemoveRPCs(player, 0);
	Network.DestroyPlayerObjects(player);
}
