function Start(){
	collider.gameObject.SetActive(false);
}

function OnTriggerEnter(other : Collider){

	if(other.tag=="DanTM"){
//		barraVida.bajarVida(10, true);
	}
	
}

function Activar(x : float){
	collider.gameObject.SetActive(true);
	yield WaitForSeconds(0.8);
	collider.gameObject.SetActive(false);
}
