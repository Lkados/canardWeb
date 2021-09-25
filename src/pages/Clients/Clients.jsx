import React, {useEffect, useState} from "react";
import {getClientsList} from '../../api/immoApi'
import MUIDataTable from 'mui-datatables';
import {useParams} from 'react-router-dom'
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

// Components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import PageHeader from "../../components/PageHeader/PageHeader";

//ICon
import {faEdit, faUsers} from "@fortawesome/free-solid-svg-icons";
import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AddClient from "./actions/AddClient";


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

function Clients() {
    const classes = useStyles();
    const history = useHistory();
    const [clientsData, setClientsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addClientForm, setAddClientForm] = useState(false);
    const {id} = useParams();

    const handleRowEdit = (id) =>{
        let path = `/clients/` + id;
        history.push(path);
    }
    useEffect(() => {
        getClientsList().then(res => {
            setClientsData(res.data)
            setLoading(false)
        })
    }, []);

    const columns = [
        { label: 'ID', name: 'id_clients' },
        { label: 'Prénom', name: 'firstname' },
        { label: 'Nom', name: 'lastname' },
        { label: 'Email', name: 'email', options: { sort: true } },
        { label: 'Adresse', name: 'adress' },
        { label: 'Téléphone', name: 'phone' },
        {
            name: "Action",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<FontAwesomeIcon icon={faEdit}/>}
                            onClick={() => handleRowEdit(tableMeta.rowData[0]) }
                        >
                            Modifier
                        </Button>
                    )
                }
            }
        }
    ];
    const options = {
        filterType: "dropdown",
        responsive: "stacked",
        caseSensitive: false,
    };


    return (
        <GridContainer>
            <GridItem xs={110} sm={10} md={10}>
                {loading ? <p>chargement en cours ...</p> : (
                    <div>
                        {
                            id
                                ? <AddClient />
                                : addClientForm ?
                                <AddClient setAddClientForm = {setAddClientForm} />
                                :
                                <Card>
                                    <CardHeader>
                                        <PageHeader
                                            title="Clients"
                                            subTitle="Liste des clients"
                                            icon={<FontAwesomeIcon icon={faUsers} size="2x"/>}
                                        />
                                    </CardHeader>
                                    <CardBody>
                                        <div>
                                            <MUIDataTable
                                                title={
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        size="small"
                                                        className={classes.button}
                                                        startIcon={<FontAwesomeIcon icon={faUsers}/>}
                                                        onClick={() => setAddClientForm(true)}
                                                    >
                                                        Ajouter
                                                    </Button>
                                                }
                                                columns={columns}
                                                data={clientsData}
                                                options={options}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                        }
                    </div>
                )}
            </GridItem>
            {/*{
                id ?
                    <EditUser />
                    :
                    <AddUser />

            }*/}
        </GridContainer>
    )};

export default Clients;
