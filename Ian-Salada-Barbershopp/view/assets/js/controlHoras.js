function mostrarFormulario() {
    document.getElementById('divReserva').style.display = 'block';
    document.getElementById('btn-reservar').style.display = 'block';
}

function getHoraShow(hora) {

    document.getElementById('hora-show').value = hora;

}

function getHoraDelete(hora) {
    document.getElementById('hora-delete').value = hora;
}

function getHoraHidde(hora) {
    document.getElementById('hora-hidde').value = hora;
}

function actualizarHorarios(horarios) {
    // Limpiar los horarios disponibles anteriores
    $('#div-horas-disponibles').empty();

    // Agregar el encabezado "Horarios Disponibles"
    var horariosDisponiblesHeader = $('<h4>Horarios Disponibles</h4>');
    $('#div-horas-disponibles').append(horariosDisponiblesHeader);

    // Agregar los nuevos horarios disponibles
    var container = $('#div-horas-disponibles');

    // Crear un div para contener los botones de hora
    var divBotonesHora = $('<div class="botones-hora-container"></div>');

    // Agregar los botones de hora al div
    for (var i = 0; i < horarios.length; i++) {
        var botonHora = $('<input class="btn-hora" type="button" value="' + horarios[i] + '">');
        botonHora.click(mostrarFormulario); // Agrega el evento click
        divBotonesHora.append(botonHora);
    }

    // Agregar el div de botones de hora al contenedor principal sin borrar lo que ya estaba
    container.append(divBotonesHora);

    // Agregar un event listener directamente a todos los botones de hora
    $('.btn-hora').on('click', function () {
        // Obtener la hora seleccionada del valor del botón presionado
        var hiddenInput = $('#horaSeleccionada');
        hiddenInput.val(this.value);

        // Remover el color de fondo de todos los botones
        $('.btn-hora').css('background-color', '');

        // Establecer el color de fondo del botón seleccionado
        $(this).css('background-color', '#887b40');
    });
}


            var botonesHora = document.querySelectorAll('.btn-hora');

					botonesHora.forEach(function(boton) {
						
						boton.addEventListener('click', function() {
							botonesHora.forEach(function(boton) {
								boton.style.backgroundColor = '';
							});

							this.style.backgroundColor = '#887b40';
						});
						
					});

