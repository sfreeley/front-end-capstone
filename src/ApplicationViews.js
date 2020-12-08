import React from "react";
import { Route, Redirect } from "react-router-dom";

//login
import Login from "./components/auth/Login";

//register
import Registration from "./components/auth/Registration"

//home
import Home from "./components/home/Home";

//medication
import MedicationList from "./components/medication/MedicationList";
import MedicationHistoryList from "./components/history/MedicationHistoryList";

//resources
import Resource from "./components/resource/Resource";

//pharmacy
import PharmacyList from "./components/pharmacy/PharmacyList";
import AddPharmacyForm from "./components/pharmacy/AddPharmacyForm";
import EditPharmacyForm from "./components/pharmacy/EditPharmacyForm";


const ApplicationViews = (props) => {
    const { hasUser, setUser, sessionUser, renderWidget, imageDesc, imageName, isChecked, removeDrug, drugs, handleChange, getIdOfDrug, drug, handlePharmacyDropdown, pharmacyList, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props

    return (
        <>

            <Route path="/login"
                render={props => {
                    return <Login setUser={setUser} {...props} sessionUser={sessionUser} />
                }}
            />
            <Route path="/register"
                render={props => {
                    return (<Registration {...props} setUser={setUser} sessionUser={sessionUser} />)
                }}
            />

            <Route exact path="/"
                render={props => {
                    return (hasUser ? <Home drugs={drugs} hasUser={hasUser} setUser={setUser} sessionUser={sessionUser} drugId={parseInt(props.match.params.drugId)} imageDesc={imageDesc} renderWidget={renderWidget} imageName={imageName} removeDrug={removeDrug} isChecked={isChecked}
                        drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} getIdOfDrug={getIdOfDrug} handleChange={handleChange}
                    /> : <Redirect to="/login" />)
                }}
            />

            <Route exact path="/medication/list"
                render={props => {
                    return (hasUser ? <MedicationList imageDesc={imageDesc} renderWidget={renderWidget} imageName={imageName} sessionUser={sessionUser} drugId={parseInt(props.match.params.drugId)} removeDrug={removeDrug}
                        drugs={drugs} drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll}
                        getIdOfDrug={getIdOfDrug} handleChange={handleChange} isChecked={isChecked}
                    /> : <Redirect to="/login" />)
                }}
            />

            <Route exact path="/medication/history"
                render={props => {
                    return (hasUser ? <MedicationHistoryList {...props} drugId={parseInt(props.match.params.drugId)}
                        renderWidget={renderWidget} imageDesc={imageDesc} sessionUser={sessionUser} removeDrug={removeDrug} drugs={drugs} drug={drug}
                        handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} getIdOfDrug={getIdOfDrug} handleChange={handleChange} isChecked={isChecked} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/resources"
                render={props => {
                    return (hasUser ? <Resource {...props} sessionUser={sessionUser} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/pharmacies"
                render={props => {
                    return (hasUser ? <PharmacyList {...props} sessionUser={sessionUser} pharmacyList={pharmacyList} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/pharmacy/add"
                render={props => {
                    return (hasUser ? <AddPharmacyForm {...props} sessionUser={sessionUser} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/pharmacy/edit/:pharmacyId(\d+)"
                render={props => {
                    return (hasUser ? <EditPharmacyForm {...props} sessionUser={sessionUser} /> : <Redirect to="/login" />)
                }}
            />
        </>
    )

}
export default ApplicationViews;