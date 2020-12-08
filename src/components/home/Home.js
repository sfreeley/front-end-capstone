import React from "react";
import { Label } from "reactstrap";
import NavBar from "../nav/NavBar";
import MedicationFormModal from "../medication/MedicationFormModal";
import SearchBar from "../search/SearchBar";

const Home = (props) => {
    const { hasUser, clearUser, sessionUser, drugs, renderWidget, imageDesc, removeDrug, isChecked, drugImage, handleChange, getIdOfDrug, drug, handlePharmacyDropdown, pharmacyList, uploadImage, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props;

    return (
        <>
            <NavBar hasUser={hasUser} clearUser={clearUser} sessionUser={sessionUser} />
            <div>
                <span className="span-addDrug-container">
                    <img role="button" onClick={toggle} className="img-addDrug" src="https://img.icons8.com/dotty/80/000000/doctors-folder.png" alt="addDrug" />
                </span>
                <div className="addMedication-image--label">
                    <Label htmlFor="addMedication-image"><h5>Add New Medication</h5></Label>
                </div>

                <SearchBar sessionUser={sessionUser} drugs={drugs} removeDrug={removeDrug} getIdOfDrug={getIdOfDrug} handleChange={handleChange} isChecked={isChecked} />
                <MedicationFormModal imageDesc={imageDesc} renderWidget={renderWidget} drug={drug} handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} drugImage={drugImage} uploadImage={uploadImage} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
                    getIdOfDrug={getIdOfDrug} nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} isChecked={isChecked} />
            </div>
        </>
    )
}
export default Home