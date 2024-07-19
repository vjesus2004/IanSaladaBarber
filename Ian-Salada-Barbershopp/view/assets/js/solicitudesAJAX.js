// Agregar un evento de clic al botón "Día Anterior"
document.getElementById('prevDayButton').addEventListener('click', function() {
    $.ajax({
        url: 'controller/AgendaController.php',
        type: 'POST',
        data: { 'prev-day': true },
        success: function(response) {
            // Actualizar la vista con la respuesta del controlador si es necesario
            console.log(response); // Solo para depuración
            window.location.reload(); // Recargar la página
        },
        error: function(xhr, status, error) {
            console.error(error); // Manejar errores si es necesario
        }
    });
});

// Agregar un evento de clic al botón "Próximo Día"
document.getElementById('nextDayButton').addEventListener('click', function() {
    $.ajax({
        url: 'controller/AgendaController.php',
        type: 'POST',
        data: { 'next-day': true },
        success: function(response) {
            // Actualizar la vista con la respuesta del controlador si es necesario
            console.log(response); // Solo para depuración
            window.location.reload(); // Recargar la página
        },
        error: function(xhr, status, error) {
            console.error(error); // Manejar errores si es necesario
        }
    });
});

$(document).ready(function() {
    // Agregar un evento de clic al botón "Confirmar"
    $('#btnConfirmarBorrar').click(function() {
        // Obtener el valor del campo "hora-delete-hidden"
        var horaDeleteValue = $('#hora-delete').val();

        // Realizar la solicitud AJAX
        $.ajax({
            url: 'controller/AgendaController.php',
            method: 'POST',
            data: { 'hora-delete': horaDeleteValue }, // Datos a enviar
            success: function(response) {
                // Manejar la respuesta del controlador si es necesario
                console.log('Respuesta del controlador:', response);
                window.location.reload();
                // Aquí puedes agregar cualquier otra lógica para manejar la respuesta
            },
            error: function(xhr, status, error) {
                // Manejar errores si es necesario
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    });
});

$(document).ready(function() {
    // Agregar un evento de clic al botón "Confirmar"
    $('#btnConfirmarMostrar').click(function() {
        // Obtener el valor del campo "hora-delete-hidden"
        var horaDeleteValue = $('#hora-show').val();

        // Realizar la solicitud AJAX
        $.ajax({
            url: 'controller/AgendaController.php',
            method: 'POST',
            data: { 'hora-show': horaDeleteValue }, // Datos a enviar
            success: function(response) {
                // Manejar la respuesta del controlador si es necesario
                console.log('Respuesta del controlador:', response);
                window.location.reload();
                // Aquí puedes agregar cualquier otra lógica para manejar la respuesta
            },
            error: function(xhr, status, error) {
                // Manejar errores si es necesario
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    });
});

$(document).ready(function() {
    // Agregar un evento de clic al botón "Confirmar"
    $('#btnConfirmarOcultar').click(function() {
        // Obtener el valor del campo "hora-delete-hidden"
        var horaOcultar = $('#hora-hidde').val();

        // Realizar la solicitud AJAX
        $.ajax({
            url: 'controller/AgendaController.php',
            method: 'POST',
            data: { 'hora-hidde': horaOcultar }, // Datos a enviar
            success: function(response) {
                // Manejar la respuesta del controlador si es necesario
                console.log('Respuesta del controlador:', response);
                window.location.reload();
                // Aquí puedes agregar cualquier otra lógica para manejar la respuesta
            },
            error: function(xhr, status, error) {
                // Manejar errores si es necesario
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    });
});

$(document).ready(function() {
    // Agregar un evento de clic al botón "Confirmar"
    $('#btn-reservar').click(function() {
        var horaSeleccionada = $('#horaSeleccionada').val();
        
        // Realizar la solicitud AJAX
        $.ajax({
            url: 'controller/AgendaController.php', // Reemplaza 'tu_controlador.php' con la URL de tu controlador
            method: 'POST',
            data: { 'btn-pre-reserva': horaSeleccionada }, // Datos a enviar
            success: function(response) {
                // Manejar la respuesta del controlador si es necesario
                console.log('Respuesta del controlador:', response);
                // Aquí puedes agregar cualquier otra lógica para manejar la respuesta
            },
            error: function(xhr, status, error) {
                // Manejar errores si es necesario
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    });
});

$(document).ready(function() {
    // Agregar un evento de clic al botón "refresh"
    $('#refresh').click(function() {
        // Realizar la solicitud AJAX
        $.ajax({
            url: 'controller/AgendaController.php', // URL del controlador
            method: 'POST',
            data: { 'refresh': 'valor' }, // Enviar 'refresh' con cualquier valor que desees
            success: function(response) {
                // Manejar la respuesta del controlador si es necesario
                console.log('Respuesta del controlador:', response);
                location.reload();
                // Aquí puedes agregar cualquier otra lógica para manejar la respuesta
            },
            error: function(xhr, status, error) {
                // Manejar errores si es necesario
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    });
});
