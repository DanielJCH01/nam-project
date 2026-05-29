function registrar(){

    let usuario = document.getElementById("nuevoUsuario").value;
    let password = document.getElementById("nuevaPassword").value;
    let mensaje = document.getElementById("mensaje");

    if(usuario === "" || password === ""){
        mensaje.style.color = "#f06a6a";
        mensaje.innerHTML = "✖ Completa todos los campos";
        return;
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario,
            password
        })
    })
    .then(res => res.json())
    .then(data => {

        if(data.msg === "Usuario registrado"){

            mensaje.style.color = "#4ef0c0";
            mensaje.innerHTML = "✔ Usuario registrado";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);

        } else {

            mensaje.style.color = "#f06a6a";
            mensaje.innerHTML = "✖ " + data.msg;

        }

    })
    .catch(err => {
        mensaje.style.color = "#f06a6a";
        mensaje.innerHTML = "✖ Error de conexión con el servidor";
    });

}