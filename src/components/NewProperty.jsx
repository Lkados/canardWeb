import React, { useState, useEffect } from "react";
import {getClientsFilter} from '../api/immoApi'

function NewProperty() {
	const [labelText, setText] = useState("Prix de vente");
	const [input, setInput] = useState('');
	const [client, setClient] = useState([])
	const [hidden, setHidden] = useState(true);
	const handleChange = event => {
		setInput(event.currentTarget.value); // met à jour le state avec la value du input
	}

	useEffect(() => {
		if (input.length > 1){
			getClientsFilter(input).then(clients => {
	            setClient(clients.data)
	        })
		}
		else{
			setClient([])
		}
	}, [input]);

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
                            <input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="title"/>
                        </div>
                    </div>
                    <div className="mt-4 w-100">
                        <div className="mr-3 d-inline">Type :</div>
                      	<div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="appartement" name="typeHabitation" className="custom-control-input" value="1"/>
                            <label className="custom-control-label" for="appartement">Appartement</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="maison" name="typeHabitation" className="custom-control-input" value="2"/>
                            <label className="custom-control-label" for="maison">Maison</label>
                        </div>
                    </div>
                    <div className="mt-4 w-100">
						<div className="mr-3 d-inline">Vente :</div>
						<div className="custom-control custom-radio custom-control-inline" onClick={locationText}>
							<input type="radio" id="location" name="typeSale" className="custom-control-input" value="1"/>
							<label className="custom-control-label" for="location">Location</label>
						</div>
						<div className="custom-control custom-radio custom-control-inline" onClick={saleText}>
							<input type="radio" id="vente" name="typeSale" className="custom-control-input" value="2"/>
							<label className="custom-control-label" for="vente">Vente</label>
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Nombre de pièces</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" name="nb_room">
									<option value="1">T1</option>
									<option value="2">T2</option>
									<option value="3">T3</option>
									<option value="3">T4</option>
								</select>
							</div>
						</div>
						<div className="ml-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Nombre de m²</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="number" name="area"/>
							</div>
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">{labelText}</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="number" name="price" min="1" placeholder="Prix en euros (€)"/>
							</div>
						</div>
						<div className="ml-1 w-100">
							{ hidden ? null : (
								<div className="input-customized border border-secondary rounded-lg">
									<label className="px-1 small text-secondary">Charges locatives</label>
									<input className="px-3 py-2 w-100 border-0 rounded-lg" type="number" name="rentalExpenses" min="0" placeholder="Prix en euros (€)"/>
								</div>
							)}
						</div>
					</div>
					<div className="mt-4 w-100">
						<div className="input-customized border border-secondary rounded-lg">
							<label className="px-1 small text-secondary">Informations complémentaires</label>
							<textarea className="px-3 py-2 w-100 border-0 rounded-lg" name="description" rows="4"></textarea>
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Meublé</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" name="furniture">
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
						</div>
						<div className="mx-2 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Jardin</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" name="furniture">
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
						</div>
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Garage/Parking</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" name="furniture">
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
						</div>
					</div>
					<div className="mt-5 w-100">
						<h5>Localisation du bien</h5>
					</div>
					<div className="mt-3 w-100">
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Adresse (numéro, rue, complément)</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="adress"/>
							</div>
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Code postale</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="zipcode"/>
							</div>
						</div>
						<div className="ml-2 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Ville</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="city"/>
							</div>
						</div>
					</div>
					<div className="mt-5 w-100">
						<h5>Propriétaire du bien</h5>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Rechercher un client</label>
								<input className="px-3 py-2 w-100 border-0 rounded-lg" type="text" name="search" onChange={handleChange}/>
							</div>
							{ (client.length !== 0) ?
								<div className="mt-2">
									<div className="mx-1">{client.length} résulat(s) trouvé(s) pour <i>{input}</i></div>
									<select className="form-control">
										<option value="" selected disabled hidden>Choisir un client</option>
										{ client.map((clients) => (
											<option value="{clients.id}">{clients.firstname+' '+clients.lastname} ({clients.email})</option>
										)) }
									</select>
								</div>
							: null }
						</div>
						<div className="ml-2 w-25 d-flex justify-content-end align-items-start">
							<button className="btn btn-primary" type="submit" name="ajouter">Nouveau client</button>
						</div>
					</div>
					<div className="mt-5 w-100 d-flex justify-content-center">
						<button className="btn btn-success" type="submit" name="save">Enregistrer</button>
					</div>
                </form>
            </div>
		</div>
	)
}

export default NewProperty;