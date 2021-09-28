import React, {useEffect, useState} from 'react';
import CardHeader from "../../../components/Card/CardHeader";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import CardBody from "../../../components/Card/CardBody";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import {MenuItem} from "@material-ui/core";
import Card from "../../../components/Card/Card";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import {useFormik} from "formik";
import {addUser, getAppointmentsPerDate} from "../../../api/immoApi";
import * as yup from "yup";
import {makeStyles} from "@material-ui/core/styles";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);

export default function AddApointment(props){
    const classes = useStyles();
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
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
                //setUser(result.data)
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
    const date = props.dateAppointment;
    useEffect(() => {
        getAppointmentsPerDate(date).then(res => {
            setTodayAppointments(res.data)
            console.log(todayAppointments)
            setLoading(false)
        })
    }, [date])
    return(
        <div>
        {loading ? <p>chargement en cours ...</p> : (
                <GridContainer>
                    <GridItem xs={10} sm={10} md={6} >
                        <h4 style={{color: message  ? 'Green' : 'red'}}>{message || error }</h4>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<FontAwesomeIcon icon={faEdit}/>}
                            onClick={() => props.setDateAppointment(null)}
                        >
                            Retour
                        </Button>
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
                    </GridItem>
                    <GridItem xs={10} sm={10} md={6} >
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
                    </GridItem>
                </GridContainer>
        )}
        </div>
    )
}