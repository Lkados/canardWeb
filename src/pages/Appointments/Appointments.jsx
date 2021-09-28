import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {getUserAppointments} from "../../api/immoApi";
import AddApointment from "./actions/AddApointment";
import CardHeader from "../../components/Card/CardHeader";
import PageHeader from "../../components/PageHeader/PageHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";


function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [dateAppointment, setDateAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getUserAppointments().then(res => {
            setAppointments(res.data)
            setLoading(false)
        })
    }, [])

    const appointementCalendar = appointments.map((appointment) => [{'title' : appointment.description, 'date' : appointment.date}]);

    console.log(dateAppointment)

    return (
            <Card >
                <CardHeader >
                    <PageHeader
                        title="Rendez-vous"
                        subTitle="Vos Rendez-vous du mois"
                        icon={<FontAwesomeIcon icon={faUserEdit} size="2x"/>}
                    />
                </CardHeader>
                <CardBody>
                    {
                        dateAppointment ?
                            <AddApointment dateAppointment={dateAppointment} setDateAppointment={setDateAppointment} />
                            :
                            <FullCalendar
                                plugins={[ dayGridPlugin, interactionPlugin ]}
                                initialView="dayGridMonth"
                                weekends={false}
                                dateClick={(arg) => setDateAppointment(arg.dateStr)}
                                events={
                                    appointementCalendar.flat()
                                }
                            />

                    }
                </CardBody>
            </Card>
    );
}
 
export default Appointments;