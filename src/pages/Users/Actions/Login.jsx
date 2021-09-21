import React, {useState, useContext} from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import loginUser from "../../../context/actions/loginUser";
import {GlobalContext} from "../../../context/Provider";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function Login() {
    const classes = useStyles();
    const [user, setUser] = useState({username: "", password: ""});
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value})
    }
    const {
        authDispatch,
        authState: {error, loading},
    } = useContext(GlobalContext);

    const handleSubmit = e => {
        e.preventDefault(); // empeche le rechargement de page
        console.log(loginUser)
        loginUser({user})(authDispatch);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Typography align={"center"} variant="h4" component="h1" gutterBottom>
                Canard IMMO
            </Typography>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Connexion
                </Typography>
                { error ? <Alert severity="error">{error}</Alert> : null }
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="username"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Se souvenir de moi"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Connexion
                    </Button>
                </form>
            </div>
        </Container>
    )
}
