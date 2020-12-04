import React from "react";
import { Label } from "reactstrap";
import MedicationCard from "./MedicationCard";
import SearchBar from "../search/SearchBar";
import NavBar from "../nav/NavBar";
import MedicationFormModal from "./MedicationFormModal";
import { Container, CardDeck, Button } from "reactstrap"
import "./styles/MedicationList.css"

const MedicationList = (props) => {
    const { renderWidget, imageName, isChecked, drugs, removeDrug, handleChange, getIdOfDrug, drug, handlePharmacyDropdown, pharmacyList, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props

    return (
        <>
            <NavBar {...props} />
            <div className="headingContainer-medicationList">
                <span className="span-addDrug-container">
                    <img role="button" onClick={toggle} className="img-addDrug" src="https://img.icons8.com/dotty/80/000000/doctors-folder.png" alt="addDrug" />
                </span>
                <div className="addMedication-image--label">
                    <Label htmlFor="addMedication-image"><h5>Add New Medication</h5></Label>
                </div>
                <MedicationFormModal renderWidget={renderWidget} imageName={imageName} drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                    nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />

                <h2>Current Medication List</h2>
            </div>

            <SearchBar className="searchBar-medicationList" {...props} drug={drug} getIdOfDrug={getIdOfDrug} handleChange={handleChange} />
            <div className="pharmacyListButton--container">
                <Button onClick={() => props.history.push("/medication/pharmacies")}>My Pharmacy List</Button>
            </div>
            <Container className="section-currentMedicationList--container">
                <CardDeck xs="4" >
                    {drugs && drugs.map(drug => drug.taking &&
                        <MedicationCard
                            key={drug.id}
                            drug={drug}
                            getIdOfDrug={getIdOfDrug}
                            isChecked={isChecked}
                            removeDrug={removeDrug}
                            handleChange={handleChange}
                        />)}
                </CardDeck>
            </Container>

        </>

    )
}

export default MedicationList;