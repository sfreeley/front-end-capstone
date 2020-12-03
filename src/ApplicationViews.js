import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import ApplicationManager from "./components/modules/ApplicationManager";
import { currentDateTime } from "./components/modules/helperFunctions";
import { calculateNextRefill } from "./components/modules/helperFunctions";
import { useHistory } from "react-router-dom";

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
    const { hasUser, setUser, removeDrug, drugs, setDrugs, handleChange, getIdOfDrug, drug, drugImage, handlePharmacyDropdown, pharmacyList, uploadImage, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props

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
                    return (hasUser ? <Home hasUser={hasUser} {...props} drugId={parseInt(props.match.params.drugId)} setDrugs={setDrugs} drugs={drugs} removeDrug={removeDrug}
                        drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} drugImage={drugImage} uploadImage={uploadImage} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} getIdOfDrug={getIdOfDrug} handleChange={handleChange}
                    /> : <Redirect to="/login" />)
                }}
            />

            <Route exact path="/medication/list"
                render={props => {
                    return (hasUser ? <MedicationList drugId={parseInt(props.match.params.drugId)} {...props} removeDrug={removeDrug} drugs={drugs} drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} drugImage={drugImage} uploadImage={uploadImage} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} getIdOfDrug={getIdOfDrug} handleChange={handleChange} setDrugs={setDrugs}
                    /> : <Redirect to="/login" />)
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