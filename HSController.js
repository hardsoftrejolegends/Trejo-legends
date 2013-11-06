//private var secretKey="mySecretKey"; // Edit this value and make sure it's the same as the one stored on the server
var addScoreUrl="funny-software-database.freeserver.me/agregarPuntaje.php?"; //be sure to add a ? to your url
var highscoreUrl="funny-software-database.freeserver.me/consultarPuntaje.php";    
 
function Start() {
	postScore("HS","123456789");
	getScores();
}
 
function postScore(name, score) {
    //This connects to a server side php script that will add the name and score to a MySQL DB.
    // Supply it with a string representing the players name and the players score.
    //var hash=Md5.Md5Sum(name + score + secretKey); 
 
    //var scoreurl = addScoreUrl + "$alias=HS" + "$nombre=" + "HardSoft"+ "$puntaje=" + score;// + "&hash=" + hash;
 
    // Post the URL to the site and create a download object to get the result.
  //  var hspost = WWW(scoreurl);
    
    var form = new WWWForm(); //here you create a new form connection

    form.AddField( "alias", "Eddii" ); //add your hash code to the field myform_hash, check that this variable name is the same as in PHP file

    form.AddField( "nombre", "HS" );

    form.AddField( "puntaje", "123" );
    
   // var headers=form.headers;
    
    //headers["Authorization"]="Basic " + System.Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes(secretKey));
    
    var headers = form.headers;
 
       if (!headers.Contains("Content-Type"))
       {
           headers.Add("Content-Type", "application/x-www-form-urlencoded");
       }

    var w = WWW(addScoreUrl, form.data,headers); //here we create a var called 'w' and we sync with our URL and the form
    print("Scores enviando");
    
    yield w; // Wait until the download is done
    if(w.error) {
        print("There  was an error posting the high score: " + w.error);
    }
    print(w.text);
}
 
// Get the scores from the MySQL DB to display in a GUIText.
function getScores() {
	//var words = new Array;
    gameObject.guiText.text = "Loading Scores";
    var hs_get = WWW(highscoreUrl);
    yield hs_get;
 
    if(hs_get.error) {
    	print("There was an error getting the high score: " + hs_get.error);
    } else {
        gameObject.guiText.text = hs_get.text; // this is a GUIText that will display the scores in game.
    }
}
