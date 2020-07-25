import React, { useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import AddMedicationFormModal from "../medication/AddMedicationFormModal";


const Home = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [newDrug, setNewDrug] = useState({
        name: "",
        strength: "",
        dosageForm: "",
        directions: "",
        indication: "",
        notes: "",
        image: "",
        dateInput: new Date()
    })
   
    const handleFieldChange = (event) => {
        const stateToChange = {...newDrug};
        stateToChange[event.target.id] = event.target.value;
        console.log(event.target.value)
        setNewDrug(stateToChange);
        
    };

    const handleAddNewDrug = (event) => {
        event.preventDefault();
        props.history.push("/medication/list")

    }
    
    return (
        <div>
            <span>
            <img src="https://img.icons8.com/dusk/64/000000/pills.png" alt="addDrug"/>
            <Button onClick={toggle}>
                {'Add New Medication'}
            </Button>
            <AddMedicationFormModal handleFieldChange={handleFieldChange} handleAddNewDrug={handleAddNewDrug} newDrug={newDrug} toggle={toggle} modal={modal} />
            </span>
         </div>
    )
} 
export default Home