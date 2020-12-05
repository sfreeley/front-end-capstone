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
    const { hasUser, setUser, getMatchingCards, filteredDrugsArray, clearSearch, searchTerm, filterMedicationCards, renderWidget, imageDesc, imageName, isChecked, removeDrug, drugs, handleChange, getIdOfDrug, drug, drugImage, handlePharmacyDropdown, pharmacyList, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props

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
                    return (hasUser ? <Home drugs={drugs} hasUser={hasUser} {...props} drugId={parseInt(props.match.params.drugId)} filteredDrugsArray={filteredDrugsArray} filterMedicationCards={filterMedicationCards} imageDesc={imageDesc} renderWidget={renderWidget} imageName={imageName} removeDrug={removeDrug} isChecked={isChecked}
                        drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} getIdOfDrug={getIdOfDrug} handleChange={handleChange}
                    /> : <Redirect to="/login" />)
                }}
            />

            <Route exact path="/medication/list"
                render={props => {
                    return (hasUser ? <MedicationList clearSearch={clearSearch} searchTerm={searchTerm} imageDesc={imageDesc} renderWidget={renderWidget} imageName={imageName} drugId={parseInt(props.match.params.drugId)} filterMedicationCards={filterMedicationCards} removeDrug={removeDrug}
                        drugs={drugs} drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} drugImage={drugImage} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll}
                        getIdOfDrug={getIdOfDrug} handleChange={handleChange} isChecked={isChecked} getMatchingCards={getMatchingCards}
                    /> : <Redirect to="/login" />)
                }}
            />

            <Route exact path="/medication/history"
                render={props => {
                    return (hasUser ? <MedicationHistoryList {...props} drugId={parseInt(props.match.params.drugId)}
                        removeDrug={removeDrug} drugs={drugs} drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} drugImage={drugImage} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} getIdOfDrug={getIdOfDrug} handleChange={handleChange} isChecked={isChecked} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/resources"
                render={props => {
                    return (hasUser ? <Resource {...props} /> : <Redirect to="/login" />)
                }}
            />

            <Route path="/medication/pharmacies"
                render={props => {
                    return (hasUser ? <PharmacyList {...props} pharmacyList={pharmacyList} /> : <Redirect to="/login" />)
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