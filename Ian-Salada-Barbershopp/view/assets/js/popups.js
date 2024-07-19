//////////////  Modal Reservar //////////////////////////// 

var modal = document.getElementById("confirmModal");

var btnCancel = document.getElementById("cancelButton");

btnCancel.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//////////////  Modal Borrar ////////////////////////////

var modalBorrar = document.getElementById("confirmarBorrarModal");

var btnCancelarBorrar = document.getElementById("btnCancelarBorrar");

function mostrarModalBorrar() {

    modalBorrar.style.display = "block";

    document.body.style.overflow = "hidden";

    window.scrollTo(4, 8);
}

btnCancelarBorrar.onclick = function() {
    modalBorrar.style.display = "none";
    document.body.style.overflow = "auto";
}


//////////////  Modal Mostrar ////////////////////////////

var modalMostrar = document.getElementById("confirmarMostrarModal");

var btnCancelarMostrar = document.getElementById("btnCancelarMostrar");

function mostrarModalMostrar() {

    modalMostrar.style.display = "block";

    document.body.style.overflow = "hidden";

    window.scrollTo(4, 8);
}

btnCancelarMostrar.onclick = function() {
    modalMostrar.style.display = "none";
    document.body.style.overflow = "auto";
}

//////////////  Modal Ocultar ////////////////////////////

var modalOcultar = document.getElementById("confirmarOcultarModal");

var btnCancelarOcultar = document.getElementById("btnCancelarOcultar");

function mostrarModalOcultar() {

    modalOcultar.style.display = "block";

    document.body.style.overflow = "hidden";

    window.scrollTo(4, 8);
}

btnCancelarOcultar.onclick = function() {
    modalOcultar.style.display = "none";
    document.body.style.overflow = "auto";
}