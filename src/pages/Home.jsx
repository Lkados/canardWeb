import React, { useState, useEffect } from "react";
import './assets/home.css';
import GoalModal from "../components/GoalsModal";
import {getGoals} from '../api/immoApi'
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
        <GridContainer>
            <GridItem xs={10} sm={10} md={10} >
                <Appointments />
            </GridItem>
        </GridContainer>
    );
}

// chart.js

export default Home;