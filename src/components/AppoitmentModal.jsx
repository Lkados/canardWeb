import React from 'react'

function AppoitmentModal(props) {
    return (
        <div>
            <div className="list-group">
                <a href="/appointments" className="list-group-item list-group-item-action flex-column align-items-start mb-2">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">Sujet : {props.subject}</h5>
                        <small className="text-muted">Date : {props.date}</small>
                    </div>
                    <p className="mb-1">{props.content}</p>
                    <small className="text-muted">Rdv de : {props.name} {props.lastname}</small>
                </a>
            </div>
        </div>
    );
}

export default AppoitmentModal;