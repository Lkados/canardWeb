import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin } from "@fortawesome/free-solid-svg-icons";

// import bootstrap
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function PropertyCard(props) {
    return (
        <div className="col-xl-3 col-lg-4 col-sm-6">
        	<Card className="my-2 h-100 shadow">
	            <Card.Img variant="top" src={props.img} />
	            <Card.Body className="h-100 d-flex align-content-between flex-wrap">
	            	<div className="w-100">
		                <Card.Title className="mb-0">{props.title}</Card.Title>
		                <div className="text-secondary">{props.reference}</div>
		            </div>
	                <div className="mt-1 w-100">
	                	<div className="mr-1 px-2 d-inline-block bg-light text-dark border rounded-pill small">
	                		<FontAwesomeIcon className="mr-1" icon={faMapPin} />
	                		{props.city}
	                	</div>
	                	{props.furniture ? <div className="mr-1 px-2 d-inline-block bg-light text-dark border rounded-pill small">Meublé</div> : null}
	                	{props.garage ? <div className="mr-1 px-2 d-inline-block bg-light text-dark border rounded-pill small">Garage/parking privé</div> : null}
	                	{props.garden ? <div className="mr-1 px-2 d-inline-block bg-light text-dark border rounded-pill small">Jardin</div> : null}
	                </div>
	                <div className="mt-1 h5 w-100 d-flex justify-content-end">{props.price}{(props.type === 'vente') ? '€' : '€/mois HC'}</div>
	                <Button size="sm" variant="outline-primary">Voir l'annonce</Button>
	            </Card.Body>
	        </Card>
        </div>
    );
}

export default PropertyCard;