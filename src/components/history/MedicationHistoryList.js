import React from "react";
import MedicationCard from "../medication/MedicationCard";
import NavBar from "../nav/NavBar";
import MedicationFormModal from "../medication/MedicationFormModal";
import { Container, CardDeck } from "reactstrap";
import "./styles/MedicationHistoryList.css";

const MedicationHistoryList = (props) => {
    const { drugs, isChecked, removeDrug, handleChange, getIdOfDrug, drug, handlePharmacyDropdown, pharmacyList, uploadImage, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props;

    return (
        <>
            <NavBar {...props} />
            <MedicationFormModal drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} uploadImage={uploadImage} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />

            <h3>Medication History</h3>

            <Container className="section-historicalMedicationList--container">
                <CardDeck xs="4">
                    {drugs && drugs.map(drug => !drug.taking && <MedicationCard
                        key={drug.id}
                        drug={drug}
                        handleChange={handleChange}
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