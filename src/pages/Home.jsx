import React, { useState, useEffect } from "react";
import './assets/home.css';
import AppoitmentModal from "../components/AppoitmentModal";
import GoalModal from "../components/GoalsModal";
import {getAppointment, getGoals} from '../api/immoApi'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import Appointments from "./Appointments/Appointments";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";

function Home() {
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getGoals().then(res => {
            setGoals(res.data)
            setLoading(false)
        })
    }, [loading])
    return (
        <GridContainer >
            <GridItem xs={10} sm={10} md={10}>
                    <Appointments />
            </GridItem>
            <GridItem xs={10} sm={10} md={10}>
                <h2>Mes objectifs</h2>
                {goals.map( (goal) => (
                    <GoalModal key={goal.id_goals} subject={goal.title} end_date={goal.end_date} content={goal.description} name={goal.firstname} lastname={goal.lastname} />
                ))}
            </GridItem>
        </GridContainer>
    );
}

// chart.js

export default Home;