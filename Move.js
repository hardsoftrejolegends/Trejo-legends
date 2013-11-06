#pragma strict

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
		animation.CrossFade("TSalta");
	if(Input.GetKeyDown("h"))
		animation.CrossFade("THaduken");
}

