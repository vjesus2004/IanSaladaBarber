const calendar = document.querySelector('.calendar');
const monthYear = document.querySelector('.month-year');
const prevMonth = calendar.querySelector('.prev-month');
const nextMonth = calendar.querySelector('.next-month');
const calendarTable = calendar.querySelector('#calendar-table tbody');
const botonesHoras = document.querySelectorAll('.btn-hora');
const divReserva = document.getElementById('divReserva');
const divBtnReserva = document.getElementById('div-btn-reserva');
const btnReservar = document.getElementById('btn-reservar');
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Función para obtener la fecha actual y establecerla en la variable currentDate
const getCurrentDate = () => {
    const currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    return currentDate;
};

// Obtener la fecha actual
let currentDate = getCurrentDate();

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const renderCalendar = () => {
    calendarTable.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 para comparar solo las fechas

    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Ajustar el primer día del mes para que sea el domingo si es 0 (domingo)
    if (firstDayOfMonth === 0) {
        firstDayOfMonth = 7; // Cambia el domingo (0) a 7
    }

    // Resta 1 al primer día del mes para que sea compatible con el índice de día de la semana (1-7)
    firstDayOfMonth -= 1;

    let date = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            const cellText = document.createTextNode('');

            if (i === 0 && j < firstDayOfMonth) {
                cell.classList.add('empty');
            } else if (date > lastDateOfMonth) {
                break;
            } else {
                cellText.nodeValue = date;
                date++;
                cell.appendChild(cellText);
                cell.dataset.date = date - 1;
                cell.addEventListener('click', () => handleCellClick(cell));

                // Verificar si la fecha es anterior a la fecha actual y agregar la clase para cambiar el color de fondo
                const selectedDate = new Date(currentYear, currentMonth, cell.dataset.date);
                if (selectedDate < today || selectedDate > new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)) {
                    cell.classList.add('cell-disabled');
                }
            }

            row.appendChild(cell);
        }

        calendarTable.appendChild(row);
    }

    monthYear.innerHTML = `${months[currentMonth]} <span id="year">${currentYear}</span>`;
};

//Solicitud AJAX

$(document).ready(function(){
    // Detectar clic en una celda de la tabla
    $('#calendar-table tbody').on('click', 'td:not(.cell-disabled)', function() {
        // Obtener el contenido de la celda clicada
        var diaSeleccionado = $(this).text();

        // Obtener la fecha actual
        const selectedDate = new Date(currentYear, currentMonth, diaSeleccionado);
        
        // Formatear la fecha en el formato YYYY-MM-DD
        const formattedDate = selectedDate.toISOString().split('T')[0];

        // Enviar una solicitud POST a controlarDia.php utilizando AJAX
        $.ajax({
            url: 'controller/AgendaController.php', // Ruta del archivo PHP
            method: 'POST',
            data: { seleccionarDia: formattedDate }, // Fecha en formato 'YYYY-MM-DD'
            dataType: 'json', // Especifica el tipo de datos que esperas recibir
            success: function(response){
                // Manejar la respuesta del servidor
                console.log(response); // Muestra la respuesta en la consola para depuración
                
                // Actualiza la interfaz de usuario con los horarios disponibles recibidos
                actualizarHorarios(response);
            },
            error: function(xhr, status, error){
                // Manejar errores en la solicitud AJAX
                console.error(xhr.responseText);
            }
        });
    });
});


const handleCellClick = (cell) => {

    // Verificar si la celda ya ha sido seleccionada previamente
    if (cell.classList.contains('selected')) {
        // Si ya ha sido seleccionada, no hacer nada
        return;
    }

    // Obtener el mes actual
    const currentMonthName = months[currentMonth];

    // Mostrar la celda seleccionada y el mes
    console.log('Celda seleccionada:', cell.textContent, 'del mes de', currentMonthName);

    const date = parseInt(cell.dataset.date, 10);
    
    // Obtener la fecha actual
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Crear la fecha seleccionada
    const selectedDate = new Date(currentYear, currentMonth, date);

    // Verificar si la fecha seleccionada está dentro de los próximos 30 días
    if (selectedDate < today || selectedDate > new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)) {
        // Si la fecha seleccionada está fuera del rango permitido, no hacer nada
        return;
    }

    // Limpiar la selección anterior
    const allCells = document.querySelectorAll('td');
    allCells.forEach((cell) => {
        if (!cell.classList.contains('cell-disabled')) {
            cell.classList.remove('selected');
            cell.style.backgroundColor = ''; // Limpiar el color de fondo de todas las celdas
        }
    });

    // Agregar la clase 'selected' a la celda clickeada si no está deshabilitada
    if (!cell.classList.contains('cell-disabled')) {
        cell.classList.add('selected');
        cell.style.backgroundColor = '#887b40'; // Establecer el color de fondo de la celda clickeada
    }

    divReserva.style.display = 'none';
    btnReservar.style.display = 'none';
};


var minmonth=0;
prevMonth.addEventListener('click', () => {
    if (minmonth==1){
    currentMonth--;
        minmonth=0;
        maxmonth=0;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if(maxmonth==0){

    }
    renderCalendar();

}
});

var maxmonth=0;
nextMonth.addEventListener('click', () => {
    maxmonth++;
    minmonth=1;
if (maxmonth==1){
    currentMonth++;
if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }else if(maxmonth==2){

    }
    renderCalendar();
}
});

renderCalendar();

