#pragma strict
private var pos : float;
private var pers : Banana;
var defensa : Boton;					//Boton de defensa
var golpe : Boton;						//Boton de golpe
var patada : Boton;						//Boton de patada
var hadu : Boton;						//Boton para realizar el haduken
var moveTouchPad : Joystick;			//Palanca de movimiento
var forwardSpeed : float = 16;			//Velocidad con la que el punto se mueve

//var pers : Animation;					//animaciones del personaje

//var hadoken : Hadoken;

var combo3 : boolean = false;			//Indica si el combo1 esta activo

var hadoken1 : boolean = false;			//indica si la combinacion del hadoken1 en la palanca ha sido activada
var hadoken2 : boolean = false;			//indica si la combinacion del hadoken2 en la palanca ha sido activada


var abajo : boolean = false;			//indica si la palanca ha sido accionada solo hacia abajo
										//esta variable se usa para validar la combinacion en la palanca
var ko : boolean = true;									//para los hadokens

var def : boolean = false;
//var jumping = false;
var salto : float = 0;
var izq : boolean = false;				//indica la orientacion del personaje, izquierda (true) o derecha (false)

//private var thisTransform : Transform;	//Variable que se usa para el movimiento de la particula

//Secuencia de inicio del script, se inicializan algunas variables
function Start () {
		
//	thisTransform = GetComponent( Transform );	//Se obtiene el transform del objeto al que ha sido asignado este script
	
//	pers = GetComponent(Animation); //se cargan las animaciones del personaje
	//Se conigura la forma de ejecutarse las animaciones
//	pers.wrapMode = WrapMode.Once;
//
//	pers["basico"].wrapMode = WrapMode.Loop;
//   	pers["defensa"].wrapMode = WrapMode.Clamp;
//   	
//   	pers["combo1"].speed = 1;
//   	pers["combo2"].speed = .7;
//   	pers["combo3"].speed = .6;
//   	
//   	pers["golpe"].speed = 2;
//   	pers["patada"].speed = 1.5;
//   	
//   	pers["salto"].speed = .5;
//   	
//   	pers["agachado"].wrapMode = WrapMode.Loop;
//   	
//   	pers.Stop();

	
	//Se configura la posicion de los botones y de la palanca
//	moveTouchPad.SetPos();
	defensa.Start();
	golpe.Start();
	patada.Start();
	hadu.Start();
	
	defensa.SetPos(1, 1);
	golpe.SetPos( 2, 0);
	patada.SetPos( 1, 0);
	hadu.SetPos(2,1);
	if(globalVar.flag==false){ //estoy en el anexo?
	if(globalVar.flagClient==true){
	Network.Connect("192.168.2.4", 25000);
	}
	if(globalVar.flagServer==true){
	Network.InitializeServer(32, 25000, false);
	for (var go : GameObject in FindObjectsOfType(GameObject))
		{
		go.SendMessage("OnNetworkLoadedLevel",
		SendMessageOptions.DontRequireReceiver);
		}
	}
	print("Este es el nivel " + Application.loadedLevelName);
	}
}

//Esta funcion se manda llamar al final del juego
function OnEndGame()
{
	//desactiva la palanca y los botones cuando el juego termina 
	moveTouchPad.Disable();
	patada.Disable();
	defensa.Disable();
	golpe.Disable();

	// Se desactiva este script, por lo que no se pueden hacer mas cambios
	this.enabled = false;
}

//Esta funcion se manda llamar en cada "frame" del juego
function Update () {
if(!ko){
	//Si el numero de toques del golpe es igual a cero singifica que ha acabado su tiempo de juntar toques
	//lo que nos permite resetear los combos
	if(golpe.tapCount==0)
	{
		combo3 = false;
	}
	
	//Si se expira el tiempo de toques de la palanca se deshabilitan los hadokens y la propiedad "abajo"
	if(moveTouchPad.GettapTimeWindow()<=0){
		hadoken1 = false;
		hadoken2 = false;
		abajo = false;
	}
	
	//Condiciones de acciones del punto (personaje)
	
	if(defensa.t) //valida si se ha tocado el boton de defensa
	{
			//estado de defensa, si esta defendiendo no puede atacar
			pers.Defensa();
			//al presionar defensa se rompe la combinacion para los hadokens
			hadoken1 = false;
			hadoken2 = false;
	}else {
		pers.BajarDefensa();
		 //entra estado idle, se quita el estado de defensa, se vuelve solida de nuevo
		
		if(golpe.t) //valida se se ha tocado el boton de golpe
		{
//		Izquierda.dan=true;
			if (hadoken1){	//valida la combinacion del hadoken1 en la palanca
				//realiza el hadoken,
				pers.Hadoken(1);
				//deshabilita la combinacion del hadoken1
				hadoken1 = false;
				
			//en caso de no hacer hadoken
			}else if(!combo3&&golpe.tapCount==3){ //se valida el combo1, no debe estarse haciendo el combo3 y el boton de golpe debe de haberse tocado 3 veces
				//realiza combo1
				pers.Combo(1);
			}
			//en caso de no hacer hadoken, ni combo1
				//valida la condicion de combo3: patada, 2 golpes, en ese orden. LA verificacion de los tiempos es para validar el orden
			else if(patada.tapCount==1&&golpe.tapCount==2 && patada.GettapTimeWindow() < golpe.GettapTimeWindow()){ 
				//realiza combo3
				pers.Combo(3);
				combo3 = true;
			}
			//en caso de no hacer hadoken, combo1 o combo3
			else {
				//realiza accion de golpe
				pers.Golpe();
				
				//rompe la combinacion de los hadokens
				hadoken1 = false;
				hadoken2 = false;
			}
		}
		
		if(patada.t)//valida si se acciona el boton de patada
		{
//		Izquierda.dan=true;
			if(hadoken2){ //valida la combinacion del hadoken1 en la palanca
				//realiza hadoken2
				pers.Hadoken(2);
				//deshabilita la combinacion del hadoken1
				hadoken2 = false;
			}
			//si no realiza hadoken2
			else if(patada.tapCount==3){ //valida la secuencia para el combo2 (tres patadas)
				//realiza combo2
				pers.Combo(2);
			}
			//si no realiza hadoken2 ni combo2
			else if(!IsAtack()){
				//realiza accion de patada
				pers.Patada();
				//rompe las combinaciones de los hadokens
				hadoken1 = false;
				hadoken2 = false;
			}
		}
	}
	
	//Condiciones de movimiento
	//se crea una variable que nos indicara el movimento del punto (personaje)
	//esta variable tomara los valores de la posicion de la palanca con respecto al centro de la palanca
	var movement = Vector3( moveTouchPad.position.x, moveTouchPad.position.y, 0 );
//	movement.Normalize();
	
	//Se crea una variable que nos indica la posicion absoluta de la palanca,
	//que tan alejada del centro se encuentra.
	var absJoyPos = Vector2(Mathf.Abs( moveTouchPad.position.x ), Mathf.Abs( moveTouchPad.position.y  ));

		if ( absJoyPos.y < 0.6) //si la palanca esta muy cercana al centro respecto de y
		{
			//el personaje no se movera en y
			movement.y = 0;
			
		//valida si la palanca se encuentra exclusivamente hacia abajo, este es el inicio de secuencia pra ambos hadokens
		}else if(movement.y < 0 && absJoyPos.x < 0.6)
			abajo = true;
	if(!izq){
		if ( absJoyPos.x < 0.6){ // si la palanca esta muy cercana al centro respecto de x
			movement.x = 0; //el personaje no se movera en x
			
		}else if(movement.x > 0){//valida si la palanca fue accionada hacia atras
			if(abajo && movement.y == 0) // sigue la secuencia del hadoken, valida si ya fue accionado abajo y si la palanca fue accionada excusivamente la palanca hacia atras			
				hadoken2 = true;//dice que se cumple la secuencia de de la palanca para el hadoken2
		}
		//la palanca fue accionada hacia adelante
		else if(abajo && movement.y == 0) // sigue la secuencia del hadoken, valida si ya fue accionado abajo y si la palanca fue accionada excusivamente la palanca hacia adelante
			hadoken1= true;//dice que se cumple la secuencia de la palanca para el hadoken1
	}else{
		if ( absJoyPos.x < 0.6){ // si la palanca esta muy cercana al centro respecto de x
			movement.x = 0; //el personaje no se movera en x
			
		}else if(movement.x < 0){//valida si la palanca fue accionada hacia atras
			if(abajo && movement.y == 0) // sigue la secuencia del hadoken, valida si ya fue accionado abajo y si la palanca fue accionada excusivamente la palanca hacia atras			
				hadoken2 = true;//dice que se cumple la secuencia de de la palanca para el hadoken2
		}
		//la palanca fue accionada hacia adelante
		else if(abajo && movement.y == 0) // sigue la secuencia del hadoken, valida si ya fue accionado abajo y si la palanca fue accionada excusivamente la palanca hacia adelante
			hadoken1= true;//dice que se cumple la secuencia de la palanca para el hadoken1
	}
	if(!IsAtack()&&!pers.Def()){
		if(izq)
			movement.x*=-1;
		movement *= forwardSpeed;
		pers.movement = movement; //mueve el punto (personaje)
	}
	pers.Move(movement);
}else{}
}

function IsAtack(){
	return pers.IsAtack();
}

function SetPers(p : String){
	pers = GameObject.Find(p).GetComponent(Banana);
	if(pers!=null){
		print(":)2");
		pos = pers.transform.position.y;
		pers.Start();
		ko = false;
		}
}

function hasPers(){
	return pers!=null;
}
