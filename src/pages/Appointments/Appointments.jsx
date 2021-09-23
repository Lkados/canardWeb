import React, {useEffect, useState} from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {getAppointment} from "../../api/immoApi";


function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(true);

    console.log(date)
    useEffect(() => {
        getAppointment().then(res => {
            setAppointments(res.data)
            setLoading(false)
        })
    }, [])
//const appointementCalendar = appointments.map((appointment) => ({'title' : appointment.description, 'date' : appointment.date}));
    const appointementCalendar = appointments.map((appointment) => [{'title' : appointment.description, 'date' : appointment.date}]);
    console.log(appointementCalendar.flat())

    return (
        <div>
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                weekends={false}
                dateClick={() => console.log('test')}
                events={
                    appointementCalendar.flat()
                }
            />
        </div>
    );
}
 
export default Appointments;