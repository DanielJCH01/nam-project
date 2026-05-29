function login(){

    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    let mensaje = document.getElementById("mensaje");

    fetch("https://nam-backend-p85u.onrender.com/login", {
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

        if(data.usuario){

            mensaje.style.color = "#4ef0c0";
            mensaje.innerHTML = "✔ Login correcto";

            localStorage.setItem("sesion", data.usuario);

            setTimeout(() => {

                // ✅ REDIRECCIÓN CORRECTA
                window.location.href = "/index.html";

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