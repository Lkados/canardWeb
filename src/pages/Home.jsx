import React, { useState, useEffect } from "react";
import './assets/home.css';
// import {Chart} from 'chart.js'
// import LineChart from "../components/LineChart";
import AppoitmentModal from "../components/AppoitmentModal";
import GoalModal from "../components/GoalsModal";
import {getAppointment, getGoals} from '../api/immoApi'

function Home() {
    const [appointments, setAppointments] = useState([])
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAppointment().then(res => {
            setAppointments(res.data)
            setLoading(false)
        })

        getGoals().then(res => {
            setGoals(res.data)
            setLoading(false)
        })
        
    }, [])

    return (
        <div className="container">
            {loading ? <p>Chargement en cours ...</p> : (

            <div className="dashboard">
                {/* <div className="stats align-self-center">
                    <LineChart />
                </div> */}
                <div className="appointments">
                    <h2>Mes rendez vous</h2>
                    <div className="AppoitmentModal">
                        {/* boucler sur un for each depuis les données de l'user et api props : subject, date, content*/}
                        {appointments.map( (appointment) => (
                            <AppoitmentModal key={appointment.id_appointments} subject={appointment.title} date={appointment.date} content={appointment.description} name={appointment.firstname} lastname={appointment.lastname}/>
                        ))}
                    </div>
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
            )}
        </div>
    );
}

// chart.js

export default Home;