import React, { useState } from "react";
import MedicationCard from "./MedicationCard";
import NavBar from "../nav/NavBar";
import { useHistory } from "react-router-dom";
import MedicationFormModal from "./MedicationFormModal";
import { Container, CardDeck, Button, Label, Input } from "reactstrap"
import "./styles/MedicationList.css"

const MedicationList = (props) => {
    const { drugs, imageDesc, renderWidget, imageName, sessionUser, removeDrug, handleChange, getIdOfDrug, drug, handlePharmacyDropdown, pharmacyList, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props
    const history = useHistory();
    const [searchEvent, setSearchEvent] = useState("")

    const filtered = drugs.filter(drug => {
        let drugValues = Object.values(drug)
        for (let i = 0; i < drugValues.length; i++) {
            return drugValues.join().toLowerCase().includes(searchEvent.toLowerCase())
        }
    })

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
                <MedicationFormModal imageDesc={imageDesc} renderWidget={renderWidget} imageName={imageName} drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                    nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />

                <h2>Current Medication List</h2>
            </div>

            <div className="searchBar-container">
                <Input className="form-control searchBar-position" name="searchTerm" id="keywordSearch" onChange={(e) => setSearchEvent(e.target.value)}
                    type="text" placeholder="Search for keywords"
                    aria-label="Search" />
            </div>

            <div className="pharmacyListButton--container">
                <Button onClick={() => history.push("/medication/pharmacies")}>My Pharmacy List</Button>
            </div>
            <Container className="section-currentMedicationList--container">
                <CardDeck xs="4" >
                    {filtered && filtered.map(drug => drug.taking &&
                        <MedicationCard
                            key={drug.id}
                            drug={drug}
                            getIdOfDrug={getIdOfDrug}
                            imageName={imageName}
                            sessionUser={sessionUser}
                            removeDrug={removeDrug}
                            handleChange={handleChange}
                        />)}
                </CardDeck>
            </Container>

        </>

    )
}

export default MedicationList;