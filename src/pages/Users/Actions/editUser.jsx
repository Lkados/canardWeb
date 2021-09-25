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
import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import * as yup from "yup";
import {useFormik} from "formik";
import {updateUser, getUser} from "../../../api/immoApi";
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

export default function EditUser(){
    const history = useHistory();
    const classes = useStyles();
    const [userInfos, setUserInfos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    let { id } = useParams();

    useEffect( () => {
        getUser(id).then(result => {
            setUserInfos(result.data)
            console.log(result.data.lastname)
        })
            .catch((error) => {
                console.log(error)
            });
    },[id])
    const handleGoBack = () => {
        let path = `/users`;
        history.push(path);
    }
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
        enableReinitialize: true,
        initialValues: {
            firstname: userInfos.firstname || '' ,
            lastname: userInfos.lastname,
            phone : userInfos.phone,
            email: userInfos.email,
            password: '',
            confirmPassword:'',
            id_role: userInfos.id_role ? userInfos.id_role.toString() : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm}) => {
            setLoading(true)
            console.log('test')
            updateUser(id, values).then(result => {
                setLoading(false)
                setMessage('Utilisateur modifier avec succée')
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
        <GridItem xs={10} sm={10} md={10} >
            { loading ? <p>Chargement en cours ...</p> : (
                <Card >
                    <CardHeader>
                        <PageHeader
                            title="Modifier un utilisateur"
                            subTitle=""
                            icon={<FontAwesomeIcon icon={faUserEdit} size="2x"/>}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<FontAwesomeIcon icon={faEdit}/>}
                            onClick={() => handleGoBack()}
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
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                    helperText={formik.touched.lastname && formik.errors.lastname}
                                />
                                <TextField
                                    fullWidth
                                    id="firstname"
                                    name="firstname"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                    helperText={formik.touched.firstname && formik.errors.firstname}
                                />
                                <TextField
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
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
                                    <option value={1}>Directeur</option>
                                    <option value={2}>Commercial</option>
                                    <option value={3}>Secrétaire</option>
                                </Select>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    fullWidth type="submit"
                                    style={{marginTop:'25px'}}
                                >
                                    Modifier
                                </Button>
                            </form>
                        </div>
                    </CardBody>
                </Card>
            )}
        </GridItem>
    )
}