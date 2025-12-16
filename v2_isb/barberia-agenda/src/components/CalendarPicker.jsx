import React, { useMemo, useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function pad2(n) {
    return String(n).padStart(2, "0");
}

function toISODate(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

export default function CalendarPicker({ value, onChange }) {
    /** 🟢 RANGO PERMITIDO */
    const today = new Date();
    const startDate = new Date(today.setHours(0, 0, 0, 0));
    const endDate = addDays(startDate, 30);

    /** 📍 Vista inicial */
    const initialDate = value ? new Date(`${value}T00:00:00`) : startDate;

    const [view, setView] = useState({
        month: initialDate.getMonth(),
        year: initialDate.getFullYear(),
    });

    const currentMonth = view.month;
    const currentYear = view.year;

    const firstDayOfMonth = useMemo(
        () => new Date(currentYear, currentMonth, 1).getDay(),
        [currentYear, currentMonth]
    );

    const lastDateOfMonth = useMemo(
        () => new Date(currentYear, currentMonth + 1, 0).getDate(),
        [currentYear, currentMonth]
    );

    const cells = useMemo(() => {
        const result = [];
        let date = 1;

        for (let i = 0; i < 42; i++) {
            const isEmpty = i < firstDayOfMonth || date > lastDateOfMonth;

            if (isEmpty) {
                result.push({ type: "empty", key: `e-${i}` });
            } else {
                const cellDate = new Date(currentYear, currentMonth, date);
                const iso = toISODate(cellDate);

                result.push({
                    type: "day",
                    day: date,
                    iso,
                    date: cellDate,
                    key: iso,
                });

                date++;
            }
        }

        return result;
    }, [firstDayOfMonth, lastDateOfMonth, currentYear, currentMonth]);

    /** 🔒 Validaciones */
    const isDateDisabled = (date) => {
        const isSunday = date.getDay() === 0; // 0 = Domingo
        return isSunday || date < startDate || date > endDate;
    };


    const isSelected = (iso) => value === iso;

    /** ⛔ Navegación bloqueada */
    const canGoPrev =
        new Date(currentYear, currentMonth, 1) >
        new Date(startDate.getFullYear(), startDate.getMonth(), 1);

    const canGoNext =
        new Date(currentYear, currentMonth + 1, 1) <=
        new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1);

    const prevMonth = () => {
        if (!canGoPrev) return;

        setView(({ month, year }) =>
            month === 0 ? { month: 11, year: year - 1 } : { month: month - 1, year }
        );
    };

    const nextMonth = () => {
        if (!canGoNext) return;

        setView(({ month, year }) =>
            month === 11 ? { month: 0, year: year + 1 } : { month: month + 1, year }
        );
    };

    return (
        <div className="bg-barberia-dark border border-gray-600 rounded-md p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <button
                    type="button"
                    onClick={prevMonth}
                    disabled={!canGoPrev}
                    className="px-3 py-2 rounded-md bg-gray-700 text-white disabled:opacity-40"
                >
                    ◀
                </button>

                <div className="text-white font-semibold">
                    {months[currentMonth]}{" "}
                    <span className="text-gray-300">{currentYear}</span>
                </div>

                <button
                    type="button"
                    onClick={nextMonth}
                    disabled={!canGoNext}
                    className="px-3 py-2 rounded-md bg-gray-700 text-white disabled:opacity-40"
                >
                    ▶
                </button>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-400 mb-2">
                {daysOfWeek.map((d) => (
                    <div key={d}>{d}</div>
                ))}
            </div>

            {/* Calendar */}
            <div className="grid grid-cols-7 gap-2">
                {cells.map((c) => {
                    if (c.type === "empty") {
                        return <div key={c.key} className="h-10" />;
                    }

                    const disabled = isDateDisabled(c.date);
                    const selected = isSelected(c.iso);

                    return (
                        <button
                            key={c.key}
                            type="button"
                            disabled={disabled}
                            onClick={() => onChange?.(c.iso)}
                            title={
                                disabled && c.date.getDay() === 0
                                    ? "Domingos cerrado"
                                    : c.iso
                            }
                            className={[
                                "h-10 rounded-md font-semibold",
                                disabled
                                    ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                                    : "bg-barberia-gray text-white hover:border hover:border-barberia-gold",
                                selected && "border-2 border-barberia-gold",
                            ].join(" ")}
                        >
                            {c.day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}