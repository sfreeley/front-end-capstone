import React from "react";
import MedicationCard from "../medication/MedicationCard";
import NavBar from "../nav/NavBar";
import MedicationFormModal from "../medication/MedicationFormModal";
import { Container, CardDeck } from "reactstrap";
import "./styles/MedicationHistoryList.css";

const MedicationHistoryList = (props) => {
    const { drugs, imageName, sessionUser, renderWidget, imageDesc, removeDrug, handleChange, getIdOfDrug, drug, handlePharmacyDropdown, pharmacyList, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props;

    return (
        <>
            <NavBar {...props} />
            <MedicationFormModal drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} renderWidget={renderWidget} imageDesc={imageDesc} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />

            <h3>Medication History</h3>

            <Container className="section-historicalMedicationList--container">
                <CardDeck xs="4">
                    {drugs && drugs.map(drug => !drug.taking && <MedicationCard
                        key={drug.id}
                        drug={drug}
                        imageName={imageName}
                        getIdOfDrug={getIdOfDrug}
                        sessionUser={sessionUser}
                        removeDrug={removeDrug}
                        handleChange={handleChange}
                    />
                    )}
                </CardDeck>
            </Container>
        </>

    )
}
export default MedicationHistoryList