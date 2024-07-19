function validarSoloLetras(input) {
    // Elimina cualquier caracter que no sea una letra o un espacio
       var nuevoValor = '';
    // Iterar sobre cada carácter del valor de entrada
    for (var i = 0; i < input.value.length; i++) {
        var char = input.value[i];
        // Verificar si el carácter es una letra o un espacio
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || char === ' ') {
            nuevoValor += char; // Agregar el carácter válido al nuevo valor
        }
    }
    // Actualizar el valor del input con el nuevo valor
    input.value = nuevoValor;
}

function validarSoloNumeros(input) {
    // Elimina cualquier caracter que no sea un número
    input.value = input.value.replace(/\D/g, '');
}

function mostrarModal1() {
    // Obtener los valores de nombre y teléfono
    var nombre = document.getElementById('nombreForm').value.trim();
    var telefono = document.getElementById('telefonoForm').value.trim();

    // Verificar si nombre y teléfono están vacíos
    if (nombre === '' || telefono === '') {
        alert('Por favor, llene los campos obligatorios (*)');
        return;
    }

    // Verificar si la longitud del teléfono es exactamente 9 caracteres
    if (telefono.length !== 9) {
        alert('El teléfono debe contener 9 caracteres');
        return;
    }

    // Si pasa todas las validaciones, mostrar el modal
    var modal = document.getElementById('confirmModal');
    modal.style.display = 'block';
    window.scrollTo(4, 8);

    
}