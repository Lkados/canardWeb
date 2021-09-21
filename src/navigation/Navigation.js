import React, {useContext} from "react";
import {Route} from "react-router-dom";
import SideNav, {NavIcon, NavItem, NavText} from "@trendmicro/react-sidenav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBullseye, faHome, faLaptopHouse, faUsers, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Goals from "../pages/Goals";
import Users from "../pages/Users/Users"
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import {GlobalContext} from "../context/Provider";
import Logout from "../context/actions/Logout";
import Clients from "../pages/Clients/Clients";

export default function Navigation() {
    const {authDispatch} = useContext(GlobalContext);
    return (
            <Route render={({location, history}) => (
                <React.Fragment>
                    <SideNav
                        onSelect={(selected) => {
                            const to = '/' + selected;
                            if (location.pathname !== to) {
                                history.push(to);
                            }
                        }}

                        style={{position: 'fixed' }}
                    >
                        <SideNav.Toggle/>
                        <SideNav.Nav defaultSelected="home">
                            <NavItem eventKey="home">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faHome}/>
                                </NavIcon>
                                <NavText>
                                    Home
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="users">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faUsers}/>
                                </NavIcon>
                                <NavText>
                                    Utilisateurs
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="clients">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faUsers}/>
                                </NavIcon>
                                <NavText>
                                    Clients
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="properties">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faLaptopHouse}/>
                                </NavIcon>
                                <NavText>
                                    Propriétés
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="goals">
                                <NavIcon>
                                    <FontAwesomeIcon icon={faBullseye}/>
                                </NavIcon>
                                <NavText>
                                    Objectifs
                                </NavText>
                            </NavItem>
                            <NavItem eventKey="logOut">
                                <NavIcon onClick={() => Logout()(authDispatch)}>
                                    <FontAwesomeIcon icon={faSignOutAlt}/>
                                </NavIcon>
                                <NavText onClick={() => Logout()(authDispatch)}>
                                    Deconnexion
                                </NavText>
                            </NavItem>
                        </SideNav.Nav>
                    </SideNav>
                    <main>
                        <Route path="/" exact component={props => <Home/>}/>
                        <Route path="/home" exact component={props => <Home/>}/>
                        <Route path="/properties" component={props => <Properties/>}/>
                        <Route path="/goals" component={props => <Goals/>}/>
                        <Route exact path="/users" component={props => <Users/>}/>
                        <Route exact path="/clients" component={props => <Clients/>}/>
                        <Route path="/users/:id" component={props => <Users/>}/>
                    </main>
                </React.Fragment>
            )}
            />
    );
}