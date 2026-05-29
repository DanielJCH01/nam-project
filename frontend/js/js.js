const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('nav a');

/* ───────── SCROLL NAV ───────── */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            navLinks.forEach(link => link.classList.remove('Brillo'));

            const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);

            if(link){
                link.classList.add('Brillo');
            }
        }
    });

}, {
    rootMargin: '-40% 0px -50% 0px'
});

sections.forEach(section => observer.observe(section));


/* ───────── SESIÓN ───────── */

function actualizarUsuario(){

    let sesion = localStorage.getItem("sesion");

    let label = document.getElementById("usuarioLogueado");
    let logoutLink = document.getElementById("logoutLink");

    if(label){
        label.textContent = sesion ? sesion : "Invitado";
    }

    if(logoutLink){
        logoutLink.style.display = sesion ? "inline-flex" : "none";
    }
}

document.addEventListener("DOMContentLoaded", actualizarUsuario);


/* ───────── LOGOUT ───────── */

function logout(){
    localStorage.removeItem("sesion");
    window.location.href = "./html/login.html";
}