using UnityEngine;
using System.Collections;

public class database : MonoBehaviour 
{
    public static string correo = "";
    public static string password = "", rePass = "", message = "";

    private bool register = false;

    private void OnGUI()
    {
        if (message != "")
            GUILayout.Box(message);

        if (register)
        {
            GUILayout.Label("Correo");
            correo = GUILayout.TextField(correo);
            GUILayout.Label("Contrasena");
            password = GUILayout.PasswordField(password, "*"[0]);
            GUILayout.Label("Repite contrasena");
            rePass = GUILayout.PasswordField(rePass, "*"[0]);

            GUILayout.BeginHorizontal();

            if (GUILayout.Button("Atras"))
                register = false;

            if (GUILayout.Button("Registrarse"))
            {
                message = "";

                if (correo == "" || password == "")
                    message += "Por favor llena todos los campos \n";
                else
                {
                    if (password == rePass)
                    {
                        WWWForm form = new WWWForm();
                        form.AddField("correo", correo);
                        form.AddField("password", password);
                        WWW w = new WWW("http://funny-software-database.freeserver.me/agregarUsuarioFS.php", form);
                        StartCoroutine(registerFunc(w));
                    }
                    else
                        message += "Contrasenas diferentes \n";
                }
            }

            GUILayout.EndHorizontal();
        }
        else
        {
            GUILayout.Label("Correo:");
            correo = GUILayout.TextField(correo);
            GUILayout.Label("Contrasena:");
            password = GUILayout.PasswordField(password, "*"[0]);

            GUILayout.BeginHorizontal();

            if (GUILayout.Button("Entrar"))
            {
                message = "";

                if (correo == "" || password == "")
                    message += "Por favor llena todos los campos \n";
                else
                {
                    WWWForm form = new WWWForm();
                    form.AddField("correo", correo);
                    form.AddField("password", password);
                    WWW w = new WWW("http://funny-software-database.freeserver.me/login.php", form);
                    StartCoroutine(login(w));
                }
            }

            if (GUILayout.Button("Registrarse"))
                register = true;

            GUILayout.EndHorizontal();
        }
    }

    IEnumerator login(WWW w)
    {
        yield return w;
        if (w.error == null)
        {
            if (w.text == "Login exitoso")
            {
                print("WOOOOOOOOOOOOOOO!");
            }
            else
                message += w.text;
        }
        else
        {
            message += "ERROR: " + w.error + "\n";
        }
    }

    IEnumerator registerFunc(WWW w)
    {
        yield return w;
        if (w.error == null)
        {
            message += w.text;
        }
        else
        {
            message += "ERROR: " + w.error + "\n";
        }
    }
}
