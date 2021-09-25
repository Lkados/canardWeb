import React, { useState, useEffect } from "react";
import './assets/Goals.css';
import GoalModal from "../components/GoalsModal";
import GoalAdd from "../components/GoalAdd";

import {getGoals} from '../api/immoApi'

function Goals() {
    const [goals, setGoals] = useState([])
    //const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    
    useEffect(() => {
        getGoals().then(res => {
            setGoals(res.data)
            //setLoading(false)
            setRefresh(false)
        })
    }, [refresh])

    return (
        <div className="container noOverfow">
            <h1>Objectifs</h1>
            <div className="goals">
                <div className="goalsList">
                    {goals.map( (goal) => (
                        <GoalModal key={goal.id_goals} subject={goal.title} end_date={goal.end_date} content={goal.description} name={goal.firstname} lastname={goal.lastname} />
                    ))}
                </div>
                <div className="goalsManagment">
                    <GoalAdd refresh={setRefresh} />
                </div>
            </div>
        </div>
    );
}

export default Goals;