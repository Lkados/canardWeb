import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons";
import CardBody from "../../../components/Card/CardBody";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import GridItem from "../../../components/Grid/GridItem";
import React, {useEffect, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {addUser} from "../../../api/immoApi";
import {MenuItem} from "@material-ui/core";


export default function AddUser(){

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const validationSchema = yup.object({
        lastname: yup
            .string('Veuillez saisir votre nom')
            .required('Veuillez saisir votre nom'),
        firstname: yup
            .string('Veuillez saisir votre prénom')
            .required('Veuillez saisir votre prénom'),
        phone: yup
            .number('Veuillez saisir votré téléphone')
            .min(10, 'Veuillez vérifier votre numero de téléphone')
            .required('Veuillez saisir votre téléphone'),
        email: yup
            .string('Veuillez saisir votre adresse email')
            .email('Veuillez vérifier votre adresse email')
            .required('Email is required'),
        password: yup
            .string('Veuillez saisir votre mot de passe')
            .min(8, 'Mot de passe pas faible')
            .required('Veuillez saisir votre mot de passe'),
        confirmPassword: yup
            .string('Veuillez confirmer votre mot de passe')
            .min(8, 'Mot de passe pas faible')
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Veuillez saisir votre mot de passe'),
        id_role: yup
            .string('Veuillez choisir un role')
            .required('Veuillez choisir un role'),
    });

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            phone : '',
            email: '',
            password: '',
            confirmPassword:'',
            id_role:''
        },
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm}) => {
            setLoading(true)
            console.log('test')
                addUser(values).then(result => {
                    setUser(result.data)
                    setLoading(false)
                    setMessage('Utilisateur crée avec succée')
                    setError('')
                    resetForm({})
                })
                    .catch((error) => {
                        console.log(error)
                        setLoading(false)
                        setMessage('')
                        setError("Cet utilisateur existe deja")
                    });
        },
    });
    return(
        <GridItem xs={3} sm={3} md={3} >
            { loading ? <p>Chargement en cours ...</p> : (
            <Card >
                <CardHeader>
                    <PageHeader
                        title="Ajouter un utilisateur"
                        subTitle=""
                        icon={<FontAwesomeIcon icon={faUserEdit} size="2x"/>}
                    />
                </CardHeader>
                <CardBody>
                    <h4 style={{color: message  ? 'Green' : 'red'}}>{message || error }</h4>
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                id="lastname"
                                name="lastname"
                                label="Nom"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                helperText={formik.touched.lastname && formik.errors.lastname}
                            />
                            <TextField
                                fullWidth
                                id="firstname"
                                name="firstname"
                                label="Prénom"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                helperText={formik.touched.firstname && formik.errors.firstname}
                            />
                            <TextField
                                fullWidth
                                id="phone"
                                name="phone"
                                label="Téléphone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                            />
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField
                                fullWidth
                                id="confirmPassword"
                                name="confirmPassword"
                                label="confirmer votre mot de passe"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                            <Select
                                id="id_role"
                                name="id_role"
                                label="role"
                                type="select"
                                value={formik.values.id_role}
                                onChange={formik.handleChange}
                                error={formik.touched.id_role && Boolean(formik.errors.id_role)}
                                helperText={formik.touched.id_role && formik.errors.id_role}
                                style={{width:'200px'}}
                            >
                                <MenuItem selected={true} value={1}>Directeur</MenuItem>
                                <MenuItem value={2}>Commercial</MenuItem>
                                <MenuItem value={3}>Secrétaire</MenuItem>
                            </Select>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth type="submit"
                                style={{marginTop:'25px'}}
                            >
                                Créer
                            </Button>
                        </form>
                    </div>
                </CardBody>
            </Card>
            )}
        </GridItem>
    )
}