import React, { useState, useEffect } from "react";
import MedicationCard from "../medication/MedicationCard";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";
import SearchBar from "../search/SearchBar";
import { calculateNextRefill } from "../modules/helperFunctions";
import MedicationFormModal from "../medication/MedicationFormModal";
import { Container, CardDeck } from "reactstrap";
import "./styles/MedicationHistoryList.css";

const MedicationHistoryList = (props) => {
    const { drugs, removeDrug, handleChange, getIdOfDrug, drug, handlePharmacyDropdown, pharmacyList, uploadImage, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props;
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //controls showing of upload image button (will not be able to edit if in med hx list)
    const [movingToHx, setMovingToHx] = useState(false);


    return (
        <>
            <NavBar {...props} />
            <MedicationFormModal drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} uploadImage={uploadImage} isLoading={isLoading} setIsLoading={setIsLoading} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} movingToHx={movingToHx} />

            <h3>Medication History</h3>
            <SearchBar {...props} handleChange={handleChange} getIdOfDrug={getIdOfDrug} removeDrug={removeDrug} drug={drug} />

            <Container className="section-historicalMedicationList--container">
                <CardDeck xs="4">
                    {drugs && drugs.map(drug => !drug.taking && <MedicationCard
                        key={drug.id}
                        drug={drug}
                        handleChange={handleChange}
                        isLoading={isLoading}
                        isChecked={isChecked}
                        getIdOfDrug={getIdOfDrug}
                        removeDrug={removeDrug}
                    />
                    )}
                </CardDeck>
            </Container>
        </>

    )
}
export default MedicationHistoryList