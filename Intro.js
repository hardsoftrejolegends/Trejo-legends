#pragma strict

function Start () {
	Handheld.PlayFullScreenMovie ("Intro.mp4", Color.black, FullScreenMovieControlMode.CancelOnInput);
	Application.LoadLevel("Main");
}

function Update () {
}
