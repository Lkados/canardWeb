import React, { useState, useEffect } from "react";
import './assets/home.css';
import AppoitmentModal from "../components/AppoitmentModal";
import GoalModal from "../components/GoalsModal";
import {getAppointment, getGoals} from '../api/immoApi'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import Appointments from "./Appointments/Appointments";

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
        <div className="container">
            <div className="dashboard">
                {/* <div className="stats align-self-center">
                    <LineChart />
                </div> */}
                <div className="appointments">
                    <h2>Mes rendez vous</h2>
                    <Appointments />
                </div>
                
                <div className="mt-3 dasboardGoals">
                    <h2>Mes objectifs</h2>
                    <div>
                        {goals.map( (goal) => (
                            <GoalModal key={goal.id_goals} subject={goal.title} end_date={goal.end_date} content={goal.description} name={goal.firstname} lastname={goal.lastname} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// chart.js

export default Home;