function registrar() {

    let usuario = document.getElementById("nuevoUsuario").value;
    let password = document.getElementById("nuevaPassword").value;
    let mensaje = document.getElementById("mensaje");

    if (usuario === "" || password === "") {

        mensaje.style.color = "#f06a6a";
        mensaje.innerHTML = "✖ Completa todos los campos";
        return;
    }

    fetch("https://nam-backend-p85u.onrender.com/register", {

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

        console.log(data);

        // ✅ SI EL REGISTRO FUE EXITOSO
        if (data.msg && data.msg.toLowerCase().includes("registr")) {

            mensaje.style.color = "#4ef0c0";
            mensaje.innerHTML = "✔ Usuario registrado correctamente";

            setTimeout(() => {
                window.location.href = "/html/login.html";
            }, 1500);

        } else {

            mensaje.style.color = "#f06a6a";
            mensaje.innerHTML = "✖ " + data.msg;

        }

    })

    .catch(err => {

        console.error(err);

        mensaje.style.color = "#f06a6a";
        mensaje.innerHTML = "✖ Error de conexión con el servidor";

    });

}
