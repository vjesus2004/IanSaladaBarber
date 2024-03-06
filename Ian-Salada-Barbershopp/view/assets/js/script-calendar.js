const calendar = document.querySelector('.calendar');
const monthYear = document.querySelector('.month-year');
const prevMonth = calendar.querySelector('.prev-month');
const nextMonth = calendar.querySelector('.next-month');
const calendarTable = calendar.querySelector('#calendar-table tbody');

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const renderCalendar = () => {
    calendarTable.innerHTML = '';

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

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
            }

            row.appendChild(cell);
        }

        calendarTable.appendChild(row);
    }

    monthYear.innerHTML = `${months[currentMonth]} <span id="year">${currentYear}</span>`;
};

const handleCellClick = (cell) => {
    const date = parseInt(cell.dataset.date, 10);
    alert(`You clicked on day ${date + 1}`);
};

prevMonth.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

renderCalendar();