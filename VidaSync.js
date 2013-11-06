var vida : float = 100;
var player : Banana;

function Start () {

}

function Update () {
	if (player.vida<vida)
		vida = player.vida;
	else
		player.vida = vida;
}

function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo){
	var health : int;
	if (stream.isWriting){
		health = vida;
		stream.Serialize(health);
	}else{
		stream.Serialize(health);
		vida =  health;
	}
}
