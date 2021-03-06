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
            .string('Veuillez saisir votre pr??nom')
            .required('Veuillez saisir votre pr??nom'),
        phone: yup
            .number('Veuillez saisir votr?? t??l??phone')
            .min(10, 'Veuillez v??rifier votre numero de t??l??phone')
            .required('Veuillez saisir votre t??l??phone'),
        email: yup
            .string('Veuillez saisir votre adresse email')
            .email('Veuillez v??rifier votre adresse email')
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
            title: '',
            description: '',
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
                setMessage('Utilisateur cr??e avec succ??e')
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
                                    id="title"
                                    name="title"
                                    label="Titre"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                />
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth type="submit"
                                    style={{marginTop:'25px'}}
                                >
                                    Cr??er
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
                                    Cr??er
                                </Button>
                            </form>
                        </div>
                    </GridItem>
                </GridContainer>
        )}
        </div>
    )
}