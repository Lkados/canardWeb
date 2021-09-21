import React from 'react'
import axiosInstance from "../helpers/axiosInstance";

function GoalsModal(props) {
    return (
        <div>
            <div className="list-group">
                <a href="/goals" className="list-group-item list-group-item-action flex-column align-items-start mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Sujet : {props.subject}</h5>
                        <small className="text-muted">Date : {props.end_date}</small>
                    </div>
                    <p className="mb-1">{props.content}</p>
                    <small className="text-muted">Objectif de : {props.name} {props.lastname}</small>
                    <button class="btn btn-outline-danger ml-5 float-right btn-sm" >supprimer</button>
                </a>
            </div>
        </div>
    );
}

export default GoalsModal;