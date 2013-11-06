#pragma strict
private var pos : float;

//var defensa : Boton;					//Boton de defensa
//var golpe : Boton;						//Boton de golpe
//var patada : Boton;						//Boton de patada
//var moveTouchPad : Joystick;			//Palanca de movimiento
var forwardSpeed : float = 16;			//Velocidad con la que el punto se mueve

var pers : Animation;					//animaciones del personaje

var hadoken : Hadoken;

//var combo3 : boolean = false;			//Indica si el combo1 esta activo
//
//var hadoken1 : boolean = false;			//indica si la combinacion del hadoken1 en la palanca ha sido activada
//var hadoken2 : boolean = false;			//indica si la combinacion del hadoken2 en la palanca ha sido activada
//
//
//var abajo : boolean = false;			//indica si la palanca ha sido accionada solo hacia abajo
//										//esta variable se usa para validar la combinacion en la palanca
										//para los hadokens
var movement : Vector3;
var def : boolean = false;
var jumping = false;
var salto : float = 0;
var izq : boolean = false;				//indica la orientacion del personaje, izquierda (true) o derecha (false)

private var thisTransform : Transform;	//Variable que se usa para el movimiento de la particula

var ko:  boolean; //señal de activacion
var pi : Izq;
var pd : Der;
var mi : Izq;
var md : Der;

var enemigo : String;

//Secuencia de inicio del script, se inicializan algunas variables
function Start () {
//	g=false;
//	p=false;
//	h1=false;
//	h2=false;
//	d=false;
//	bd = false;
	
	thisTransform = GetComponent( Transform );	//Se obtiene el transform del objeto al que ha sido asignado este script
	pos = thisTransform.position.y;
	pers = GetComponent(Animation); //se cargan las animaciones del personaje
	//Se conigura la forma de ejecutarse las animaciones
	pers.wrapMode = WrapMode.Once;

	pers["Reposo"].wrapMode = WrapMode.Loop;
    pers["Dragon"].wrapMode = WrapMode.Clamp;
   	
   	pers["Combo1"].speed = 1;
   	pers["Combo2"].speed = .7;
   	pers["Combo3"].speed = .6;
   	
   	pers["Puno"].speed = 2;
   	pers["Patada"].speed = 1.5;
   	
   	pers["Brincar"].speed = .5;
   	
   	pers["Agachar"].wrapMode = WrapMode.Loop;
   	
//   	pers.Stop();
	
	if(name=="Trejo1(Clone)")
		barraPos.x = Screen.width/100;
	else
		barraPos.x = Screen.width*99/100;

	barraPos.y = Screen.height/100;
	//Se configura la posicion de los botones y de la palanca
//	moveTouchPad.SetPos();
//	defensa.Start();
//	golpe.Start();
//	patada.Start();
//	
//	defensa.SetPos(1.5, 1);
//	golpe.SetPos( 2, 0);
//	patada.SetPos( 1, 0);
	
	
}

//Esta funcion se manda llamar al final del juego
function OnEndGame()
{
	//desactiva la palanca y los botones cuando el juego termina 
//	moveTouchPad.Disable();
//	patada.Disable();
//	defensa.Disable();
//	golpe.Disable();

	// Se desactiva este script, por lo que no se pueden hacer mas cambios
	this.enabled = false;
}

//Esta funcion se manda llamar en cada "frame" del juego
function Update () {	
	if(!IsMov()&&!jumping){
		pers.CrossFade("Reposo");
	}
}

//Funcion que define el movimiento del punto (personaje) recibe un vector para declarar el movimiento
function Move(mov : Vector3){
		
		if(mov.y<0&&!jumping){
			if(!pers.IsPlaying("Agachar")){
					pers.Play("Reposo");	
			}
			pers.CrossFadeQueued("Agachar");
			mov.y = 0;
			
		}else{
			if(pers.IsPlaying("Agachar")){
				pers.Play("Reposo");
				}
			if(mov.y>0){
				if(!jumping&&!IsMov()){
					salto = forwardSpeed*5.5;
					Saltar();
				}
			}
			if(jumping){
				salto += (Physics.gravity.y * Time.deltaTime+Physics.gravity.y);
			}
			if(mov.x!=0 && !Salto()){
				if(izq){
					if(mov.x<0){
						pers.CrossFade("Caminar");
						}
					else{
						pers.CrossFade("Caminar");
						}
				}else{
					if(mov.x>0){
						pers.CrossFade("Caminar");
						}
					else{
						pers.CrossFade("Caminar");
						}
				}
			}
			mov.x *=2;
			mov.y = salto;
			mov *= Time.deltaTime;
			thisTransform.Translate(mov);
			if(pos > thisTransform.position.y){
				thisTransform.position.y = pos;
				Ground();
			}
		}

}

function IsMov() : boolean{
	return pers.isPlaying&&!pers.IsPlaying("Reposo");
}

function IsAtack() : boolean{
	return pers.IsPlaying("Puno")||pers.IsPlaying("Patada")||pers.IsPlaying("Hadu")||pers.IsPlaying("Combo3")||pers.IsPlaying("Combo2")||pers.IsPlaying("Combo1");
}


function Salto() : boolean{
	return pers.IsPlaying("Brincar");
}


function Rotar() : boolean{
		thisTransform.Rotate(0,180,0);
	return !izq;
}


function Ground(){
	jumping = false;
	salto = 0;
	pers.Play("Agachar");
	pers.PlayQueued("Reposo");
}


function Saltar(){
	jumping = true;
	pers.Play("Brincar");
}


function Golpe(){
if (!IsAtack()){
	pers.Play("Puno");
		md.Activar(.8);
		mi.Activar(.8);
	}
	
}


function Patada(){

if (!IsAtack()){
	pers.Play("Patada");
	pd.Activar(.8);
	pi.Activar(.8);
}
	
}


function Combo(c){
	switch(c){
		case 1:
			pers.Play("Combo1");
			break;
		case 2:
			pers.Play("Combo2");
			break;
		case 3:
			pers.Play("Combo3");
			break;
	}
}


function Defensa(){
	if(!pers.IsPlaying("Dragon")){
					pers.Play("def_i");	
			}
			pers.CrossFadeQueued("Dragon");
}

function BajarDefensa(){
	if(pers.IsPlaying("Dragon")){
			pers.Play("def_f");
	}
}


function Hadoken(c){
	switch(c){
		case 1:
			pers.Play("Hadu");
				hadoken.Lanzar(izq);
			break;
		case 2:
			pers.Play("Hadu");
				hadoken.Lanzar(izq);
			break;
	}
}


function Def(){
	return pers.IsPlaying("Dragon")||pers.IsPlaying("def_i");
}




function FixedUpdate () {
	if(vida==0)
		ko = true;
}


function OnTriggerEnter(other : Collider){
	if (other.tag =="Hadu")
		bajarVida(10);
}

function OnTriggerExit(other : Collider){
	
	if (other.tag == enemigo)
		bajarVida(10);
}

function OnCollisionExit(CollisionInfo : Collision){
	rigidbody.velocity.x = 0;
}

	var barraPos : Vector2 = Vector2.zero;
	private var max : float =100;
	var vida :float =100;
	private var tam : float = (Screen.width/16)*7;
	private var ancho : float = Screen.height/8;
	

function bajarVida(x : int){
	if(!animation.IsPlaying("Dragon")){
		animation.Play("Hadu");
		vida -= x;
	}
	tam = (Screen.width/16)*7 * (vida/max);
}

//diseño de barra
function OnGUI()
{
	if(name=="Trejo1(Clone)")
		GUI.Box(new Rect(barraPos.x, barraPos.y, tam, ancho), vida + "/" + max);
	else
		GUI.Box(new Rect(barraPos.x - tam, barraPos.y, tam, ancho), vida + "/" + max);

	
}
