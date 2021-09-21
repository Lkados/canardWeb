import React, { useState, useEffect } from "react";
import axiosInstance from "../helpers/axiosInstance";
import { useFormik } from 'formik';
import { getUsersList } from '../api/immoApi'
import { getGoalType } from '../api/immoApi'

function GoalAdd(props) {
    const [users, setUsers] = useState([])
    const [goalsTypes, setGoalsType] = useState([])
    useEffect(() => {
        getUsersList().then(res => {
            setUsers(res.data)
        })
        getGoalType().then(res => {
            setGoalsType(res.data)
        })

    }, [])

    const validate = values => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Le champ titre est requis';
        }
        if (values.id_users == 'null' || !values.id_users) {
            errors.id_users = 'veuillez selectionner un utilisateur';
        }

        if (!values.endDate) {
            errors.endDate = 'L\'objectif doit avoir une date de fin';
        } else if (new Date(values.endDate) < Date.now()) {
            errors.endDate = 'La date sélectionnée est antérieure à la date du jour';
        }

        if (!values.description) {
            errors.description = 'l\'objectif doit comporter une description';
        }

        if (values.id_type == 'null' || !values.id_type) {
            errors.id_type = 'veuillez selectionner un type d\'objectif';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            endDate: '',
            description: '',
            id_users: '',
            id_type: '',
            title: ''
        },
        validate,
        onSubmit: values => {
            // envoyer les data ici
            console.log(values.endDate)
            // alert(JSON.stringify(values, null, 2));
            axiosInstance
                .post('goal', {
                    end_date: values.endDate,
                    description: values.description,
                    id_users: values.id_users,
                    id_type: values.id_type,
                    title: values.title
                })
                .then((res) => {
                    console.log(res)
                    props.refresh(true)
                })
                .catch((err) => {
                    console.log(err)
                });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div class="form-group">
                <label htmlFor="title">Titre de l'objectif</label>
                <input
                    class="form-control"
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                {formik.errors.title ? <div>{formik.errors.title}</div> : null}
            </div>

            <div class="form-group">
                <label htmlFor="users">Utilisateur concerné</label>
                <select
                    class="form-control"
                    id="id_users"
                    value={formik.values.id_users}
                    onChange={formik.handleChange}
                >   <option value="null">--selectionnez un utilisateur--</option>
                    {users.map((user) => (
                        <option value={user.id_users}>
                            {user.firstname + ' ' + user.lastname}
                        </option>
                    ))}
                </select>
                {formik.errors.id_users ? <div>{formik.errors.id_users}</div> : null}
            </div>
            <div class="form-group">
                <label htmlFor="endDate">Date de fin pour cet objectif</label>
                <input type="date"
                    class="form-control"
                    name="endDate"
                    id="endDate"
                    onChange={formik.handleChange}
                    value={formik.values.endDate}
                />
                {formik.errors.endDate ? <div>{formik.errors.endDate}</div> : null}
            </div>
            <div class="form-group">
                <label for="id_type">Type d'objectif</label>
                <select
                    class="form-control"
                    id="id_type"
                    value={formik.values.id_type}
                    onChange={formik.handleChange}
                >   
                <option value="null">--selectionnez un type d'objectif --</option>
                    {goalsTypes.map((type) => (
                        <option value={type.id_type}>
                            {type.name}
                        </option>
                    ))}
                </select>
                {formik.errors.id_type ? <div>{formik.errors.id_type    }</div> : null}
            </div>
            <div class="form-group">
                <label for="description">Description de l'objectif</label>
                <textarea
                    class="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                ></textarea>
                {formik.errors.description ? <div>{formik.errors.description}</div> : null}

                <button class="btn btn-primary mt-3 rigth" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default GoalAdd;