import React, { useState, useEffect, useMemo } from "react";
import {getClientsFilter, addProperty, authUser} from "../../../api/immoApi";
import randomString from "random-string";
import * as yup from 'yup';
import { useFormik, setFieldValue } from 'formik';

function AddProperty() {
	const [labelText, setText] = useState("Prix de vente");
	const [inputSearch, setInputSearch] = useState('');
	const [client, setClient] = useState([]);
	const [user, setUser] = useState([]);
	const [hidden, setHidden] = useState(true);
	const energy_class = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

	useEffect(() => {
		authUser().then(userInfo => {
			setUser(userInfo.data);
		})
	}, []);

	const schema = yup.object().shape({
		name: yup.string()
			.required('Ce champ est requis')
			.max(50, 'Le nom de l\'annonce est trop long'),
		type: yup.string('La donnée attendue n\est pas correcte')
			.required('Veuillez cocher une réponse'),
		nb_room: yup.number('La donnée attendue doit être un chiffre')
			.required('Veuillez choisir une réponse').
			positive()
			.integer()
			.min(1, 'La donnée attendue n\est pas correcte')
			.max(4, 'La donnée attendue n\est pas correcte'),
		area: yup.number('La donnée attendue doit être un nombre')
			.positive()
			.integer('Veuillez saisir un nombre sans virgule')
			.min(1, 'La superficie doit être de 1 m² minimum')
			.required('Ce champ est requis'),
		price: yup.number('La donnée attendue doit être un nombre')
			.positive()
			.integer('Veuillez saisir un nombre sans virgule')
			.min(1, 'Le prix de vente/location doit être de 1 euro minimum')
			.required('Ce champ est requis'),
		rental_expenses: yup.number('La donnée attendue doit être un nombre')
			.integer('Veuillez saisir un nombre sans virgule')
			.min(1, 'Le prix de vente/location doit être de 1 euro minimum')
			.nullable()
			.notRequired(),
		description: yup.string()
			.required('Ce champ est requis'),
		furniture: yup.boolean()
			.required('Ce champ est requis'),
		garden: yup.boolean()
			.required('Ce champ est requis'),
		garage: yup.boolean()
			.required('Ce champ est requis'),
		adress: yup.string()
			.required('Ce champ est requis'),
		zip_code: yup.number('La donnée saisie n\'est pas correcte')
			.integer('Veuillez saisir un nombre sans virgule')
			.required('Ce champ est requis'),
		city: yup.string()
			.required('Ce champ est requis'),
		energy_class: yup.number()
			.min(0, 'La donnée attendue n\'est pas correcte')
			.max(6, 'La donnée attendue n\'est pas correcte'),
		id_clients: yup.number()
			.positive()
			.integer()
			.required('Ce champ est requis')
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			type: '',
			img: 'https://lh3.googleusercontent.com/proxy/tZRvA5Qt0SH2peD-KlIsSrTZg6ReLAqoyof5Pi7lWOhKTzAlEndrP7Mj-RN5QwMAWDTXht6Cu97Y_KiNcedIp6jEa0JUldsGM0_d2iCpq2yCBrMHrzgJPylJmvrnLHg4UDaeT_1rcH7noA',
			nb_room: 1,
			area: '',
			price: '',
			reference: randomString({length: 6, numeric: true, letters: true, special: false}),
			rental_expenses: '',
			description: '',
			availability: 1,
			furniture: 0,
			garden: 0,
			garage: 0,
			adress: '',
			zip_code: '',
			city: '',
			country: 'FRANCE',
			energy_class: 3,
			id_clients: 0
		},
		validationSchema: schema,
		onSubmit: values => {
			values = {...values, id_users: user.id_users}
			console.log(values)
			addProperty(values).then(response => {
				console.log(response);
			});
		}
	})

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
				<form onSubmit={formik.handleSubmit} autocomplete="off">
					<div className="w-100">
						<h5>Informations générales</h5>
					</div>
					<div className="mt-3 w-100">
						<div className="input-customized border border-secondary rounded-lg">
							<label htmlFor="name" className="px-1 small text-secondary">Titre de l'annonce</label>
							<input
								className="px-3 py-2 w-100 border-0 rounded-lg"
								type="text"
								id="name"
								name="name"
								onChange={formik.handleChange}
								value={formik.values.name}
							/>
						</div>
						{formik.touched.name && formik.errors.name ? (
							<div className="text-danger small">{formik.errors.name}</div>
						) : null}
					</div>
					<div className="mt-4 w-100">
						<div className="mr-3 d-inline">Vente :</div>
						<div className="custom-control custom-radio custom-control-inline" onClick={locationText}>
							<input
								className="custom-control-input"
								type="radio"
								id="location"
								name="type"
								value="1"
								onChange={formik.handleChange}
							/>
							<label className="custom-control-label" htmlFor="location">Location</label>
						</div>
						<div className="custom-control custom-radio custom-control-inline" onClick={saleText}>
							<input
								className="custom-control-input"
								type="radio"
								id="vente"
								name="type"
								onChange={formik.handleChange}
								value="2"
							/>
							<label className="custom-control-label" htmlFor="vente">Vente</label>
						</div>
						{formik.touched.type && formik.errors.type ? (
							<div className="text-danger small">{formik.errors.type}</div>
						) : null}
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="nb_room">Nombre de pièces</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" id="nb_room" name="nb_room" onChange={formik.handleChange}>
									<option value="1">T1</option>
									<option value="2">T2</option>
									<option value="3">T3</option>
									<option value="4">T4</option>
								</select>
							</div>
							{formik.touched.nb_room && formik.errors.nb_room ? (
								<div className="text-danger small">{formik.errors.nb_room}</div>
							) : null}
						</div>
						<div className="ml-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="area">Nombre de m²</label>
								<input
									className="px-3 py-2 w-100 border-0 rounded-lg"
									type="number"
									id="area"
									name="area"
									onChange={formik.handleChange}
									value={formik.values.area}
								/>
							</div>
							{formik.touched.area && formik.errors.area ? (
								<div className="text-danger small">{formik.errors.area}</div>
							) : null}
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="price">{labelText}</label>
								<input
									className="px-3 py-2 w-100 border-0 rounded-lg"
									type="number"
									id="price"
									name="price"
									min="1"
									placeholder="Prix en euros (€)"
									onChange={formik.handleChange}
									value={formik.values.price}
								/>
							</div>
							{formik.touched.price && formik.errors.price ? (
								<div className="text-danger small">{formik.errors.price}</div>
							) : null}
						</div>
						<div className="ml-1 w-100">
							{ hidden ? null : (
								<div className="input-customized border border-secondary rounded-lg">
									<label className="px-1 small text-secondary">Charges locatives</label>
									<input
										className="px-3 py-2 w-100 border-0 rounded-lg"
										type="number"
										id="rental_expenses"
										name="rental_expenses"
										min="1"
										placeholder="Prix en euros (€)"
										onChange={formik.handleChange}
										value={formik.values.rental_expenses}
									/>
								</div>
							)}
							{formik.touched.rental_expenses && formik.errors.rental_expenses ? (
								<div className="text-danger small">{formik.errors.rental_expenses}</div>
							) : null}
						</div>
					</div>
					<div className="mt-4 w-100">
						<div className="input-customized border border-secondary rounded-lg">
							<label className="px-1 small text-secondary" htmlFor="description">Informations complémentaires</label>
							<textarea
								className="px-3 py-2 w-100 border-0 rounded-lg"
								id="description"
								name="description"
								rows="4"
								onChange={formik.handleChange}
								value={formik.values.description}
							></textarea>
						</div>
						{formik.touched.description && formik.errors.description ? (
							<div className="text-danger small">{formik.errors.description}</div>
						) : null}
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="furniture">Meublé</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" id="furniture" name="furniture" onChange={formik.handleChange}>
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
							{formik.touched.furniture && formik.errors.furniture ? (
								<div className="text-danger small">{formik.errors.furniture}</div>
							) : null}
						</div>
						<div className="mx-2 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="garden">Jardin</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" id="garden" name="garden" onChange={formik.handleChange}>
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
							{formik.touched.garden && formik.errors.garden ? (
								<div className="text-danger small">{formik.errors.garden}</div>
							) : null}
						</div>
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="garage">Garage/Parking</label>
								<select className="px-3 py-2 w-100 border-0 rounded-lg" id="garage" name="garage" onChange={formik.handleChange}>
									<option value="0">Non</option>
									<option value="1">Oui</option>
								</select>
							</div>
							{formik.touched.garage && formik.errors.garage ? (
								<div className="text-danger small">{formik.errors.garage}</div>
							) : null}
						</div>
					</div>
					<div class="mt-3 form-group">
						<label htmlFor="energy_class">Classe énergétique</label>
						<div className="d-flex">
							<div className="px-2">{energy_class[formik.values.energy_class]}</div>
							<input
								className="form-control-range"
								type="range"
								id="energy_class"
								name="energy_class"
								min="0"
								max="6"
								step="1"
								onChange={formik.handleChange}
								value={formik.values.energy_class}
							/>
						</div>
						{formik.touched.energy_class && formik.errors.energy_class ? (
							<div className="text-danger small">{formik.errors.energy_class}</div>
						) : null}
					</div>
					<div className="mt-5 w-100">
						<h5>Localisation du bien</h5>
					</div>
					<div className="mt-3 w-100">
						<div className="w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary">Adresse (numéro, rue, complément)</label>
								<input
									className="px-3 py-2 w-100 border-0 rounded-lg"
									type="text"
									id="adress"
									name="adress"
									onChange={formik.handleChange}
									value={formik.values.adress}
								/>
							</div>
							{formik.touched.adress && formik.errors.adress ? (
								<div className="text-danger small">{formik.errors.adress}</div>
							) : null}
						</div>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="zip_code">Code postale</label>
								<input
									className="px-3 py-2 w-100 border-0 rounded-lg"
									type="text"
									id="zip_code"
									name="zip_code"
									onChange={formik.handleChange}
									value={formik.values.zip_code}
								/>
							</div>
							{formik.touched.zip_code && formik.errors.zip_code ? (
								<div className="text-danger small">{formik.errors.zip_code}</div>
							) : null}
						</div>
						<div className="ml-2 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="city">Ville</label>
								<input
									className="px-3 py-2 w-100 border-0 rounded-lg"
									type="text"
									id="ciry"
									name="city"
									onChange={formik.handleChange}
									value={formik.values.city}
								/>
							</div>
							{formik.touched.city && formik.errors.city ? (
								<div className="text-danger small">{formik.errors.city}</div>
							) : null}
						</div>
					</div>
					<div className="mt-5 w-100">
						<h5>Propriétaire du bien</h5>
					</div>
					<div className="mt-4 w-100 d-flex">
						<div className="mr-1 w-100">
							<div className="input-customized border border-secondary rounded-lg">
								<label className="px-1 small text-secondary" htmlFor="search">Rechercher un client</label>
								<input
									className="px-3 py-2 w-100 border-0 rounded-lg"
									type="text"
									id="search"
									name="search"
									onChange={searchClient}
								/>
							</div>
							{formik.touched.id_clients && formik.errors.id_clients ? (
								<div className="text-danger small">{formik.errors.id_clients}</div>
							) : null}
							{ (client.length != 0) ?
								<div className="mt-2">
									<div className="mx-1">{client.length} résulat(s) trouvé(s) pour <span className="px-1 font-italic bg-dark text-light">{inputSearch}</span></div>
									<select className="form-control" name="id_clients" onChange={formik.handleChange}>
										<option value="" selected disabled hidden>Choisir un client</option>
										{ client.map((clientInfo) => (
											<option value={parseInt(clientInfo.id_clients)}>{clientInfo.firstname+' '+clientInfo.lastname} ({clientInfo.email})</option>
										)) }
									</select>
									{formik.touched.id_clients && formik.errors.id_clients ? (
										<div className="text-danger small">{formik.errors.id_clients}</div>
									) : null}
								</div>
								: null }
						</div>
						<div className="ml-2 w-25 d-flex justify-content-end align-items-start">
							<button className="btn btn-primary" type="button" name="ajouter">Nouveau client</button>
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

export default AddProperty;