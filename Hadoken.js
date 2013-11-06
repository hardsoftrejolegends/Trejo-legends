#pragma strict
var velocidad = .25;
private var speed = 0;
var pos : Vector3;
var wait = 0.8;

function Start () {
	pos = transform.localPosition;
	Disable();
}

function Update () {
	
	transform.Translate(speed,0,0,Space.World);
}

function OnTriggerEnter(other : Collider){
	print(other.tag);
	if(other.tag!="Untagged"){
//		barraVida.bajarVida(10, true);
			Disable();
	}

}

function Lanzar(izq : boolean){
	yield WaitForSeconds(wait);
	Activar();
	if(izq)
		speed = velocidad;
	else
		speed= (-1)*velocidad;
}

function Disable(){
	collider.active=false;
	transform.position.y = -100;
	speed = 0;
}

function Activar(){
	collider.active=false;
	transform.localPosition = pos;
}
