var tiempoVida=1;

function Start(){
Destroy(this.gameObject,tiempoVida);
}
function OnCollisionEnter(collision : Collision) {
		// Debug-draw all contact points and normals
		if(collision.gameObject.name == "Puma"){
			Destroy(this.gameObject);
		}
}
