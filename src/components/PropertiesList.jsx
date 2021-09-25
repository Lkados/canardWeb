import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import {getProperties} from '../api/immoApi'

function PropertiesList() {
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProperties().then(properties => {
            setProperties(properties.data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
        });
    }, [])

    return (
        <div className="row">
        { loading ? <p>Chargement en cours ...</p> : (
            properties.map((property) => (
                <PropertyCard
                    key={property.id_properties}
                    title={property.name}
                    img={property.img}
                    type={property.type}
                    price={property.price}
                    reference={property.reference}
                    city={property.city}
                    furniture={property.furniture}
                    garage={property.garage}
                    garden={property.garden}
                />
            ))
        )}
        </div>
    );
}

export default PropertiesList;