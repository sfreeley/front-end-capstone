import React from "react";
import { Route, Redirect } from "react-router-dom";

//login
import Login from "./components/auth/Login";

//register
import Registration from "./components/auth/Registration"

//home
import Home from "./components/home/Home";

//medication
import MedicationDetail from "./components/medication/MedicationDetail";
import MedicationList from "./components/medication/MedicationList";
import MedicationHistoryList from "./components/history/MedicationHistoryList";

//resources
import Resource from "./components/resource/Resource";

//pharmacy
import PharmacyList from "./components/pharmacy/PharmacyList";
import AddPharmacyForm from "./components/pharmacy/AddPharmacyForm";
import EditPharmacyForm from "./components/pharmacy/EditPharmacyForm";


const ApplicationViews = (props) => {
    const hasUser = props.hasUser
    const setUser = props.setUser
    return (
        <>
            <Route path="/login"
                render={props => {
                    return <Login setUser={setUser} {...props} />
                }}
            />
            <Route path="/register"
                render={props => {
                    return (<Registration {...props} setUser={setUser} />)
                }}
            />

            <Route exact path="/"
                render={props => {
                    return (hasUser ? <Home hasUser={hasUser} {...props} drugId={parseInt(props.match.params.drugId)} /> : <Redirect to="/login" />)
                }}
            />

            {/* <Route exact path="/medication/new"
                render={props => {
                    return <AddMedicationFormModal {...props} />
                }}
            /> */}

            <Route exact path="/medication/list"
                render={props => {
                    return (hasUser ? <MedicationList drugId={parseInt(props.match.params.drugId)} {...props} /> : <Redirect to="/login" />)
                }}
            />

            <Route exact path="/medication/history"
                render={props => {
                    return (hasUser ? <MedicationHistoryList {...props} drugId={parseInt(props.match.params.drugId)} /> : <Redirect to="/login" />)
                }}
            />

            <Route exact path="/medication/detail/:drugId(\d+)"
                render={props => {
                    return (hasUser ? <MedicationDetail {...props} drugId={parseInt(props.match.params.drugId)} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/resources"
                render={props => {
                    return (hasUser ? <Resource {...props} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/pharmacies"
                render={props => {
                    return (hasUser ? <PharmacyList {...props} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/pharmacy/add"
                render={props => {
                    return (hasUser ? <AddPharmacyForm {...props} /> : <Redirect to="/login" />)
                }}
            />
            <Route path="/medication/pharmacy/edit/:pharmacyId(\d+)"
                render={props => {
                    return (hasUser ? <EditPharmacyForm {...props} /> : <Redirect to="/login" />)
                }}
            />
        </>
    )


}
export default ApplicationViews;