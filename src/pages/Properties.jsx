import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import PropertiesList from "../components/PropertiesList";
import PropertyForm from "../components/NewProperty";
import './assets/Properties.css';

function Properties() {
    const [formProperty, showForm] = useState(false);

    const addForm = () => {
        if (!formProperty){
            showForm(true);
        }
        else{
            showForm(false);
        }
    }

    return (
        <div className="container">
            <div className="mt-3 w-100 d-flex">
                <h1 className='mr-auto'>Gestion des biens</h1>
                <button className="ml-auto my-auto btn btn-primary rounded rounded-pill" onClick={addForm}><FontAwesomeIcon icon={formProperty ? faMinus : faPlus} /></button>
            </div>
            <div className="my-3 w-100">
                {formProperty ? <PropertyForm /> : <PropertiesList />}
            </div>
        </div>
    );
}
 
export default Properties;