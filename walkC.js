#pragma strict

function Start () {

}

function Update () {
	if (Input.GetKeyDown (KeyCode.Z)){
			animation.CrossFade("AgacharC",0.2F);
	}
	if (Input.GetKeyDown (KeyCode.X)){
		animation.Play("HaduC");
	}
	if (Input.GetKeyDown (KeyCode.C)){
		animation.CrossFade("PatadaC",0.2F);
	}
	if (Input.GetKeyDown (KeyCode.V)){
		animation.Play("PuñoC");
	}
	if (Input.GetKeyDown (KeyCode.B)){
		animation.CrossFade("SaltarC",0.2F);
	}
}
