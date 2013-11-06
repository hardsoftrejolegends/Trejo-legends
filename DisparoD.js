public var Rifle:GameObject;
public var SalidaBala:GameObject;
public var Bala:GameObject;
public var Trejo:GameObject;
var VelocidadBala=15;

function Start () {
Rifle=GameObject.Find("Dragon");
SalidaBala=GameObject.Find("SalidaDragon");
Bala=GameObject.Find("BalaD");
Trejo=GameObject.Find("Trejo1(Clone)");
}

function Update () {
if(Input.GetKeyUp(KeyCode.Space))
{
	Trejo.animation.CrossFade("TDragon");
	var NuevoDisparo:GameObject=Instantiate(Bala,SalidaBala.transform.position,Rifle.transform.rotation);
	NuevoDisparo.transform.eulerAngles.y=180;
	NuevoDisparo.AddComponent("Suicidio");
	NuevoDisparo.rigidbody.AddRelativeForce(new Vector3(0,VelocidadBala,0), ForceMode.VelocityChange);
	}

}
