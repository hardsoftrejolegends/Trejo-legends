public var Rifle:GameObject;
public var SalidaBala:GameObject;
public var Bala:GameObject;
var VelocidadBala=15;

function Start () {
Rifle=GameObject.Find("DragonO");
SalidaBala=GameObject.Find("SalidaDragonO");
Bala=GameObject.Find("BalaDO");
}

function Update () {
if(Input.GetKeyUp(KeyCode.Space))
{
	var NuevoDisparo:GameObject=Instantiate(Bala,SalidaBala.transform.position,Rifle.transform.rotation);
	NuevoDisparo.AddComponent("Suicidio");
	NuevoDisparo.rigidbody.AddRelativeForce(new Vector3(0,VelocidadBala,0), ForceMode.VelocityChange);
	}

}
