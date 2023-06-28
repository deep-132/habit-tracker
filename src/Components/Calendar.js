import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FaCalendarAlt } from "react-icons/fa";

const Calendar = () => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    const [dateArray, setDateArray] = useState([]);
    var weekOfYear = require('dayjs/plugin/weekOfYear')
    dayjs.extend(weekOfYear)

    useEffect(() => {
        let arrayOfDate = [];
        const curr_Month = dayjs().month();
        const curr_Year = dayjs().year();
        const firstDateOfMonth = dayjs().year(curr_Year).month(curr_Month).startOf("month");
        const lastDateOfMonth = dayjs().year(curr_Year).month(curr_Month).endOf("month");
        
        for (let i = 0; i < firstDateOfMonth.day(); i++) {
            const date = firstDateOfMonth.day(i);

            arrayOfDate.push({
                currentMonth: false,
                currentWeek: false,
                date,
            });
        }

        for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
            let istoday = firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString();
            arrayOfDate.push({
                currentMonth: true,
                date: firstDateOfMonth.date(i),
                today: istoday,
                week: istoday ? false : firstDateOfMonth.date(i).week() === dayjs().week()
            });
        }

        const remaining = 35 - arrayOfDate.length;

        for (
            let i = lastDateOfMonth.date() + 1;
            i <= lastDateOfMonth.date() + remaining;
            i++
        ) {
            arrayOfDate.push({
                currentMonth: false,
                week: false,
                date: lastDateOfMonth.date(i),
            });
        }
        setDateArray(arrayOfDate);
    }, []);

    return (
        <div className='text-white flex justify-center items-center'>
            <div className='w-56 h-72'>
                <div className="flex justify-center items-center select-none font-semibold gap-2">
                    {/* calendar icon and current month and year */}
                    <FaCalendarAlt />
                    {months[dayjs().month()]}, {dayjs().year()}
                </div>
                {/* headings */}
                <div className="grid grid-cols-7 ">
                    {days.map((day, index) => {
                        return (
                            <h1 key={index}
                                className="text-sm text-center h-10 w-10 grid place-content-center select-none">
                                {day}
                            </h1>
                        );
                    })}
                </div>
                {/* add days */}
                <div className='w-full grid grid-cols-7'>
                    {dateArray.map(
                        ({ date, currentMonth, week, today }, index) => {
                            return (
                                <div
                                    key={index}
                                    className="p-2 text-center h-10 grid place-content-center text-sm border-t"
                                >
                                    <h1
                                        className={
                                            `  h-6 w-6 rounded-full grid place-content-center select-none 
                                            ${currentMonth ? "" : "text-gray-600"}
                                            ${today ? "bg-red-600" : ""}
                                            ${week ? "bg-blue-500" : ""}`}>
                                        {date.date()}
                                    </h1>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    )
}

export default Calendar;