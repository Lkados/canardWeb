import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import PageHeader from "../../../components/PageHeader/PageHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import CardBody from "../../../components/Card/CardBody";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import GridItem from "../../../components/Grid/GridItem";
import React, {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {addClient, addUser} from "../../../api/immoApi";
import {MenuItem} from "@material-ui/core";
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

export default function AddClient(props){

    //const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const classes = useStyles();

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
        adress: yup
            .string('Veuillez saisir votre adresse')
            .required('Veuillez saisir votre adresse'),
        confirmPassword: yup
            .string('Veuillez saisir un commentaire valide'),
        type: yup
            .string('Veuillez choisir un type de client')
            .required('Veuillez choisir un type de client'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: '',
            lastname: '',
            phone : '',
            email: '',
            adress: '',
            comment: '',
            type:'1'
        },
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm}) => {
            setLoading(true)
            console.log('test')
            addClient(values).then(result => {
                //setUser(result.data)
                setLoading(false)
                setMessage('Client crée avec succée')
                setError('')
                resetForm({})
            })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                    setMessage('')
                    setError("Ce client existe deja")
                });
        },
    });
    return(
        <GridItem xs={12} sm={12} md={12} >
            { loading ? <p>Chargement en cours ...</p> : (
                <Card >
                    <CardHeader>
                        <PageHeader
                            title="Ajouter un client"
                            subTitle=""
                            icon={<FontAwesomeIcon icon={faUserEdit} size="2x"/>}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<FontAwesomeIcon icon={faEdit}/>}
                            onClick={() => props.setAddClientForm(false)}
                        >
                            Retour
                        </Button>
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
                                    id="adress"
                                    name="adress"
                                    label="Adresse"
                                    type="adress"
                                    value={formik.values.adress}
                                    onChange={formik.handleChange}
                                    error={formik.touched.adress && Boolean(formik.errors.adress)}
                                    helperText={formik.touched.adress && formik.errors.adress}
                                />
                                <TextField
                                    fullWidth
                                    id="comment"
                                    name="comment"
                                    label="Commentaire"
                                    type="comment"
                                    value={formik.values.comment}
                                    onChange={formik.handleChange}
                                    error={formik.touched.comment && Boolean(formik.errors.comment)}
                                    helperText={formik.touched.comment && formik.errors.comment}
                                />
                                <Select
                                    id="type"
                                    name="type"
                                    label="type"
                                    type="select"
                                    value={formik.values.type}
                                    onChange={formik.handleChange}
                                    error={formik.touched.type && Boolean(formik.errors.type)}
                                    helperText={formik.touched.type && formik.errors.type}
                                    style={{width:'200px'}}
                                >
                                    <MenuItem selected={true} value={1}>Propriétaire</MenuItem>
                                    <MenuItem value={2}>Locataire</MenuItem>
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