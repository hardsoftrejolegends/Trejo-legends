#pragma strict
var hSliderValue : float = 0.6;

function OnGUI(){
	hSliderValue = GUI.HorizontalSlider(Rect(300, 210, 400, 120), hSliderValue, 0.0, 1.0);
	GUI.Label(Rect(750, 210, 200, 20), (hSliderValue * 100) + "%");
	audio.volume = hSliderValue;
}
