public var Rifle:GameObject;
public var SalidaBala:GameObject;
public var Bala:GameObject;
public var Trejo:GameObject;
var VelocidadBala=15;

function Start () {
Rifle=GameObject.Find("Hadu");
SalidaBala=GameObject.Find("SalidaHadu");
Bala=GameObject.Find("BalaH");
Trejo=GameObject.Find("Trejo1(Clone)");
}

function Update () {
if(Input.GetKeyUp(KeyCode.A))
{
	Trejo.animation.CrossFade("THadu");
	var NuevoDisparo:GameObject=Instantiate(Bala,SalidaBala.transform.position,Rifle.transform.rotation);
	NuevoDisparo.transform.eulerAngles.y=180;
	NuevoDisparo.AddComponent("Suicidio");
	NuevoDisparo.rigidbody.AddRelativeForce(new Vector3(0,VelocidadBala,0), ForceMode.VelocityChange);
	}
}
