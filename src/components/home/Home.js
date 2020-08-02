import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import NavBar from "../nav/NavBar";
import AddMedicationFormModal from "../medication/AddMedicationFormModal";
import ApplicationManager from "../modules/ApplicationManager";
import { currentDateTime } from "../modules/helperFunctions";
import { calculateNextRefill } from "../modules/helperFunctions";
import SearchBar from "../search/SearchBar";


const Home = (props) => {
    const hasUser = props.hasUser
    const clearUser = props.clearUser
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    }
    const [isLoading, setIsLoading] = useState(false);

    //add 
    const [newDrug, setNewDrug] = useState({
        id: "",
        userId: sessionUser.id,
        name: "",
        strength: "",
        dosageForm: "",
        directions: "",
        indication: "",
        notes: "",
        rxNumber: "",
        dateFilled: "",
        daysSupply: "",
        nextRefillDate: "",
        taking: true,
        dateInput: ""
    })

    const handleFieldChange = (event) => {
        const stateToChange = { ...newDrug };
        stateToChange[event.target.id] = event.target.value;
        console.log(event.target.value)
        setNewDrug(stateToChange);

    };

    const handleAddNewDrug = (event) => {
        event.preventDefault();
        if (newDrug.name === "" || newDrug.strength === "" || newDrug.dosageForm === ""
            || newDrug.directions === "" || newDrug.indication === "") {
            alert("Please fill out required fields")
        } else {
            setIsLoading(true);
            const timestamp = Date.now()
            newDrug.dateInput = currentDateTime(timestamp)
            newDrug.nextRefillDate = calculateNextRefill(newDrug.dateFilled, parseInt(newDrug.daysSupply))
            ApplicationManager.postNewDrug(newDrug).then(() => {
                ApplicationManager.getAllDrugs();
                props.history.push("/medication/list")
            })

        }


    }

    return (
        <>
            <NavBar {...props} hasUser={hasUser} clearUser={clearUser} />
            <div> 
            <span className="span-addDrug-container">
                <img className="img-addDrug" src="https://img.icons8.com/office/40/000000/plus-math.png" alt="addDrug"/>
                <Button className="btn-addMedication" onClick={toggle}>
                    {'Add New Medication'}
                </Button>
            </span>

            <SearchBar {...props} />
            <AddMedicationFormModal isLoading={isLoading} handleFieldChange={handleFieldChange} handleAddNewDrug={handleAddNewDrug} newDrug={newDrug}
                nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} /> 
            </div>
        </>
    )
}
export default Home