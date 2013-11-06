#pragma strict

static var BarraT1: int;
static var BarraT2: int;
static var BarraT3: int;
static var BarraC: int;
static var BarraP: int;
static var BarraPu: int;
static var T ="";
static var Ene ="";
static var flag =true;
static var flagServer =false;
static var flagClient =false;

static var TrejoTiempo = new Date();
static var TrejoVidas: int;
static var tiempo = new Date();
static var vidas: int;

// Fecha en la que perdio...
static var TrejoDiaInic: int;
static var TrejoHoraInic: int;
static var TrejoMinInic: int;
static var diaInic: int;
static var horaInic: int;
static var minInic: int;

// Fecha que se esta comparando para saber si el tiempo de espera se cumplio...
static var TrejoDiaFin: int;
static var TrejoHoraFin: int;
static var TrejoMinFin: int;
static var diaFin: int;
static var horaFin: int;
static var minFin: int;

// Bandera
static var TrejoPierde: boolean;
static var pierde: boolean;

function Start () {

}

function Update () {
if(Input.GetKey(KeyCode.RightArrow)){
		animation.CrossFade("TCaminar");
		this.transform.Translate(Vector3.forward*5*Time.deltaTime);
		}
	if(Input.GetKey(KeyCode.LeftArrow)){
		animation.CrossFade("TCaminar");
		this.transform.Translate(Vector3.back*5*Time.deltaTime);
		}
	if(Input.GetKeyDown("s"))
		animation.CrossFade("TPatada");
	if(Input.GetKeyDown("d"))
		animation.CrossFade("TAgacha");
	if(Input.GetKeyDown("a"))
		animation.CrossFade("TPuno");
	if(Input.GetKeyDown("g"))
		animation.CrossFade("TBrincar");
	if(Input.GetKeyDown("h"))
		animation.CrossFade("THadu");
}
