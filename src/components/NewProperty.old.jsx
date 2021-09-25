import React, { useState, useEffect, useMemo } from "react";
import {getClientsFilter, addProperty} from '../api/immoApi'
import randomString from "random-string";
import * as yup from 'yup';

function NewProperty() {
	const [labelText, setText] = useState("Prix de vente");
	const [inputSearch, setInputSearch] = useState('');
	const [client, setClient] = useState([])
	const [hidden, setHidden] = useState(true);
	const [error, setError] = useState([]);
	const [property, setProperty] = useState({
		title: '',
		type: '',
		nb_room: null,
		area: null,
		price: null,
		reference: randomString({length: 6, numeric: true, letters: true, special: false}),
		rental_expenses: null,
		description: '',
		availability: true,
		furniture: false,
		garden: false,
		garage: false,
		adress: '',
		zipcode: undefined,
		city: '',
		country: 'FRANCE',
		energy_class: 'G',
		id_users: 1,
		id_client: ''
	});

	const schema = yup.object().shape({
		title: yup.string().required('Ce champ est requis').length(50, 'Le nom de l\'annonce est trop long'),
		type: yup.string('La donnée attendue n\est pas correcte').required('Veuillez cocher une réponse'),
		nb_room: yup.number('La donnée attendue doit être un chiffre').required('Veuillez choisir une réponse').positive().integer().min(1, 'La donnée attendue n\est pas correcte').max(4, 'La donnée attendue n\est pas correcte'),
		area: yup.number('La donnée attendue doit être un nombre').positive().integer('Veuillez saisir un nombre sans virgule').min(1, 'La superficie doit être de 1 m² minimum').required('Ce champ est requis'),
		price: yup.number('La donnée attendue doit être un nombre').positive().integer('Veuillez saisir un nombre sans virgule').min(1, 'Le prix de vente/location doit être de 1 euro minimum').required('Ce champ est requis'),
		rental_expenses: yup.number('La donnée attendue doit être un nombre').integer('Veuillez saisir un nombre sans virgule').min(1, 'Le prix de vente/location doit être de 1 euro minimum').nullable().notRequired(),
		description: yup.string().required('Ce champ est requis'),
		furniture: yup.boolean().required('Ce champ est requis'),
		garden: yup.boolean().required('Ce champ est requis'),
		garage: yup.boolean().required('Ce champ est requis'),
		adress: yup.string().required('Ce champ est requis'),
		zipcode: yup.number('La donnée saisie n\'est pas correcte').integer('Veuillez saisir un nombre sans virgule').required('Ce champ est requis'),
		city: yup.string().required(),
		energy_class: yup.string().matches('/[A-G]$/'),
		id_client: yup.number().positive().integer().required('Ce champ est requis')
	});

	const handleInputChange = (event) => {
        var target = event.target;
    	var inputValue = target.value;
    	var inputName = target.name;

    	if (inputName === 'energy_class') {
    		const energy_class = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    		inputValue = energy_class[inputValue];
    	}

    	if (inputName === 'id_client') {
    		inputValue = parseInt(inputValue);
    	}

        setProperty({...property, [inputName]: inputValue})
    }

    const handleSubmit = (e) => {
    	e.preventDefault();
    	schema.validate({ // insert le state dans les champs de validation
    		title: property.title,
    		type: property.type,
    		nb_room: property.nb_room,
    		area: property.area,
    		price: property.price,
    		rental_expenses: property.rental_expenses,
    		description: property.description,
    		furniture: property.description,
    		garden: property.garden,
    		garage: property.garage,
    		adress: property.adress,
    		zipcode: property.zipcode,
    		city: property.city,
    		energy_class: property.energy_class,
    		id_client: property.id_client
    	})
    	.then(function(valid){
    		console.log(valid);
    	})
    	.catch(function(errorInput){
    		setError({...error, [errorInput.path]: errorInput.message}); // récupère le message d'erreur associé au nom du champ
    		console.log(error);
		});

    	//addProperty(property).then(function(response){
    		//console.log(response);
    	//})
    }

	const searchClient = (event) => {
		setInputSearch(event.currentTarget.value); // met à jour le state avec la value du input
	}

	useEffect(() => {
		if (inputSearch.length > 1){
			getClientsFilter(inputSearch).then(clients => {
	            setClient(clients.data)
	        })
		}
		else{
			setClient([])
		}
	}, [inputSearch]);

	const locationText = () => {
        setText("Loyer mensuel");
        setHidden(false);
    };

    const saleText = () => {
       setText("Prix de vente");
       setHidden(true);
    };

	return (
		<div className="w-100">
			<h3>Enregistrer une nouvelle propiété</h3>
            <p>Inscrire les informations du bien à mettre en vente ou en location</p>
            <div className="mt-4">
            	<form>
                    <div className="w-100">
                        <h5>Informations générales</h5>
                    </div>
                    <div className="mt-3 w-100">
                    	<div className="input-customized border border-secondary rounded-lg">
                            <label className="px-1 small text-secondary">Titre de l'annonce</label>
                            <input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="title" onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="mt-4 w-100">
						<div className="mr-3 d-inline">Vente :</div>
						<div className="custom-control custom-radio custom-control-inline" onClick={locationText}>
							<input type="radio" id="location" name="type" className="custom-control-input" value="1" onChange={handleInputChange}/>
							<label className="custom-control-label" for="location">Location</label>
						</div>
						<div className="custom-control custom-radio custom-control-inline" onClick={saleText}>
							<input type="radio" id="vente" name="type" className="custom-control-input" value="2" onChange={handleInputChange}/>
							<label className="custom-control-label" for="vente">Vente</label>
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Nombre de pièces</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" name="nb_room" onChange={handleInputChange}>
									<option value="1">T1</option>
									<option value="2">T2</option>
									<option value="3">T3</option>
									<option value="4">T4</option>
								</select>
							</div>
						</div>
						<div className="ml-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Nombre de m²</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="number" name="area" onChange={handleInputChange}/>
							</div>
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">{labelText}</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="number" name="price" min="1" placeholder="Prix en euros (€)" onChange={handleInputChange}/>
							</div>
						</div>
						<div className="ml-1 w-100">
							{ hidden ? null : (
								<div className="input-customized border border-secondary rounded-lg">
									<label className="px-1 small text-secondary">Charges locatives</label>
									<input className="px-3 py-2 w-100 border-0 rounded-lg" type="number" name="rental_expenses" min="0" placeholder="Prix en euros (€)" onChange={handleInputChange}/>
								</div>
							)}
						</div>
					</div>
					<div className="mt-4 w-100">
						<div className="input-customized border border-secondary rounded-lg">
							<label className="px-1 small text-secondary">Informations complémentaires</label>
							<textarea className="px-3 py-2 w-100 border-0 rounded-lg" name="description" rows="4" onKeyUp={handleInputChange}></textarea>
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Meublé</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" name="furniture" onChange={handleInputChange}>
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
						</div>
						<div className="mx-2 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Jardin</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" name="garden" onChange={handleInputChange}>
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
						</div>
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Garage/Parking</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" name="garage" onChange={handleInputChange}>
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
						</div>
					</div>
					<div class="mt-3 form-group">
    					<label for="energy_class">Classe énergétique</label>
    					<div className="d-flex">
    						<div className="px-2">{property.energy_class}</div>
    						<input type="range" className="form-control-range" id="energy_class" name="energy_class" min="0" max="6" step="1" onChange={handleInputChange}/>
  						</div>
  						{error.energy_class ? <div className="text-danger small">{error.energy_class}</div> : null}
  					</div>
					<div className="mt-5 w-100">
						<h5>Localisation du bien</h5>
					</div>
					<div className="mt-3 w-100">
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Adresse (numéro, rue, complément)</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="adress" onChange={handleInputChange}/>
							</div>
							{error.adress ? <div className="text-danger small">{error.adress}</div> : null}
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Code postale</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="zipcode" onChange={handleInputChange}/>
							</div>
							{error.zipcode ? <div className="text-danger small">{error.zipcode}</div> : null}
						</div>
						<div className="ml-2 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Ville</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="city" onChange={handleInputChange}/>
							</div>
							{error.city ? <div className="text-danger small">{error.city}</div> : null}
						</div>
					</div>
					<div className="mt-5 w-100">
						<h5>Propriétaire du bien</h5>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Rechercher un client</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="search" onChange={searchClient}/>
							</div>
							{error.id_client ? <div className="text-danger small">{error.id_client}</div> : null}
							{ (client.length != 0) ?
								<div className="mt-2">
									<div className="mx-1">{client.length} résulat(s) trouvé(s) pour <span className="px-1 font-italic bg-dark text-light">{inputSearch}</span></div>
									<select className="form-control" name="id_client" onChange={handleInputChange}>
										<option value="" selected disabled hidden>Choisir un client</option>
										{ client.map((clientInfo) => (
											<option value={clientInfo.id_clients}>{clientInfo.firstname+' '+clientInfo.lastname} ({clientInfo.email})</option>
										)) }
									</select>
									{error.id_client ? <div className="text-danger small">{error.id_client}</div> : null}
								</div>
							: null }
						</div>
						<div className="ml-2 w-25 d-flex justify-content-end align-items-start">
							<button className="btn btn-primary" type="button" name="ajouter">Nouveau client</button>
						</div>
					</div>
					<div className="mt-5 w-100 d-flex justify-content-center">
						<button className="btn btn-success" type="submit" name="save" onClick={handleSubmit}>Enregistrer</button>
					</div>
                </form>
            </div>
		</div>
	)
}

export default NewProperty;