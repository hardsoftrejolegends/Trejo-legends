var lastAnim : AniS = AniS.Reposo;
var animActual : AniS = AniS.Reposo;

function Start () {
	animation.wrapMode = WrapMode.Once;

	animation["Reposo"].wrapMode = WrapMode.Loop;
   	//animation["defensa"].wrapMode = WrapMode.Clamp;
   	
   	animation["Combo1"].speed = 1;
   	animation["Combo2"].speed = .7;
   	animation["Combo3"].speed = .6;
   	
   	animation["Puno"].speed = 2;
   	animation["Patada"].speed = 1.5;
   	
   	animation["Brincar"].speed = .5;
   	
   	animation["Agachar"].wrapMode = WrapMode.Loop;
   	
    animation.Stop();
}

function Update () {
//	if(networkView.isMine)
//		SyncAnimation(CurrenAnimation());
	
	if(lastAnim != animActual){
		lastAnim = animActual;
		animation.Play(AniS.GetName(typeof(AniS),animActual));
	}
	
}

public enum AniS
{
	agachado = 0,
	Agachar,
	Caminar,
	Reposo,
	Combo1,
	Combo2,
	Combo3,
	dc1,
	dc2,
	dc3,
	def_f,
	def_i,
	Dragon,
	Puno,
	Hadu,
	Muere,
	Patada,
	patada_001,
	punch,
	Brincar
}


	
function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo){
	var ani : int;
	if (stream.isWriting){
		SyncAnimation(CurrenAnimation());
		ani = animActual;
		stream.Serialize(ani);
	}else{
		stream.Serialize(ani);
		animActual =  ani;
		Debug.Log(info.sender +" mando: " + ani + " , " + animActual);
	}
}

function SyncAnimation(animacion : String){
	animActual = AniS.Parse(typeof(AniS), animacion);
}

function CurrenAnimation() : String {
	if(animation.IsPlaying("Agachar")){
		return "Agachar";
	}
	
	
	/*if(animation.IsPlaying("defensa")){
		return "defensa";
	}

	if(animation.IsPlaying("agacharse")){
		return "agacharse";
	}

	if(animation.IsPlaying("atras")){
		return "atras";
	}*/

	if(animation.IsPlaying("Reposo")){
		return "Reposo";
	}

	if(animation.IsPlaying("Caminar")){
		return "Caminar";
	}

	if(animation.IsPlaying("Combo1")){
		return "Combo1";
	}

	if(animation.IsPlaying("Combo2")){
		return "Combo2";
	}

	if(animation.IsPlaying("Combo3")){
		return "Combo3";
	}

	if(animation.IsPlaying("Reposo")){
		return "Reposo";
	}

	if(animation.IsPlaying("def_f")){
		return "def_f";
	}

	if(animation.IsPlaying("def_i")){
		return "def_i";
	}

	if(animation.IsPlaying("Gana")){
		return "Gana";
	}

	if(animation.IsPlaying("Puno")){
		return "Puno";
	}

	if(animation.IsPlaying("Hadu")){
		return "Hadu";
	}

	if(animation.IsPlaying("Muere")){
		return "Muere";
	}

	if(animation.IsPlaying("Reposo")){
		return "Reposo";
	}

	if(animation.IsPlaying("Patada")){
		return "Patada";
	}

	if(animation.IsPlaying("Brincar")){
		return "Brincar";
	}

	return "Reposo";
}
