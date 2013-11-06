import System.IO;

var filePath : String = "/mnt/sdcard/TrejoLegens/Users.txt";
var esc : GUITexture;
var lee : GUITexture;
var Msj : GUIText;

function Update() {
	if(Input.touches.Length <= 0){
			//No hay toque sobre la GUI
		}else{
			if(esc.guiTexture != null && (esc.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					WriteFile(filePath);
				}
			}
			if(lee.guiTexture != null && (lee.guiTexture.HitTest(Input.GetTouch(0).position))){
				if(Input.GetTouch(0).phase == TouchPhase.Began){
					ReadFile(filePath);
				}
			}
		}

}

 

function WriteFile(filepathIncludingFileName : String)

{

    var sw : StreamWriter = new StreamWriter(filepathIncludingFileName, true);

    sw.WriteLine("Line to write");

    sw.WriteLine("Another Line");

    sw.Flush();

    sw.Close();

}

 

function ReadFile(filepathIncludingFileName : String) {

    var sr : StreamReader = new StreamReader(filepathIncludingFileName);
	var line : String ="default";
    var list : ArrayList = new ArrayList();

   	while (line != null) {
   		
   		line = sr.ReadLine();
   		if (line != null)
   		 	Msj.guiText.text = line;
			list.Add(line);
        
       

    }

    sr.Close();

}
