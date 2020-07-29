import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";
import { calculateNextRefill } from "../modules/helperFunctions";
import { Link } from "react-router-dom"
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, UncontrolledCollapse, CustomInput, Form, FormGroup
  } from 'reactstrap';

const EditMedicationForm = (props) => {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const [isLoading, setIsLoading] = useState(false)

  //edit whole drug entry state
  const [drug, setDrug] = useState({
    id: "",
    name: "",
    userId: sessionUser.id, 
    strength: "",
    dosageForm: "", 
    directions: "",
    indication: "",
    notes: "",
    rxNumber: "", 
    dateFilled: "", 
    daysSupply: "", 
    nextRefillDate: "", 
    dateInput: "",
    taking: true
})

//handle field changes for whole drug entry edit functionality
const handleEditFieldChange = (event) => {
    const stateToChange = {...drug};
    stateToChange[event.target.id] = event.target.value;
    
    setDrug(stateToChange);  
    console.log(event.target.value) 
};

//this is the drug entry that will be edited
const editingDrug = {
    id: drug.id,
    name: drug.name,
    userId: sessionUser.id,
    strength: drug.strength,
    dosageForm: drug.dosageForm,
    directions: drug.directions,
    indication: drug.indication,
    notes: drug.notes,
    rxNumber: drug.rxNumber,
    dateFilled: drug.dateFilled,
    daysSupply: drug.daysSupply,
    nextRefillDate: calculateNextRefill(drug.dateFilled, parseInt(drug.daysSupply)),
    dateInput: drug.dateInput,
    taking: drug.taking

}



    useEffect(() => {
        ApplicationManager.getDrugById(props.match.params.drugId)
            .then( (result) => {
                setDrug(result)
                console.log(result)
                    // {
                    // id: result.id,
                    // name: result.name,
                    // userId: sessionUser.id,
                    // strength: result.strength,
                    // dosageForm: result.dosageForm,
                    // directions: result.directions,
                    // indication: result.indication,
                    // notes: result.notes,
                    // rxNumber: result.rxNumber,
                    // dateFilled: result.dateFilled,
                    // daysSupply: result.daysSupply,
                    // nextRefillDate: result.nextRefillDate,
                    // dateInput: result.dateInput,
                    // taking: result.taking
                // }
                
                setIsLoading(false)
            })
        }, []);
        
 //this will take the editingDrug object and update it in database 
 const handleEditChange = (event) => {
    event.preventDefault()
    setIsLoading(true)

    ApplicationManager.editDrug(editingDrug)
    .then(() => {
        ApplicationManager.getDrugsForUser(sessionUser.id).then((drugsFromAPI) => {
            setDrug(drugsFromAPI)
            props.history.push("/medication/list")
            
        })
     }) 
} 


return (
     
        <>
        <NavBar {...props} />
        
        <CardDeck>
          <Card body color="info" >
           
           
            <CardBody>
              <CardTitle>
              <strong>Date Entered:</strong> {drug.dateInput}
                <h3>Edit Medication Entry</h3>
              
              </CardTitle>
              {/* <CardSubtitle></CardSubtitle> */}
              
              <CardText>
              <Form id="form" className="form-group d-lg-inline-flex flex-column bd-highlight border">
            <FormGroup>
                <label htmlFor="name"><strong>Medication Name:</strong></label>
                <input className="p-2 bd-highlight justify-content-center"
                    value={drug.name}
                    onChange={handleEditFieldChange}
                    type="name"
                    name="name"
                    id="name"
                    required=""
                    placeholder="Medication Name"
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="strength"><strong>Medication Strength:</strong></label>
                <input className="p-2 bd-highlight"
                    value={drug.strength}
                    onChange={handleEditFieldChange}
                    type="strength"
                    name="strength"
                    id="strength"
                    required=""
                    placeholder="ie 5 mg, 100 mcg, 1 g, etc"
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="dosageForm"><strong>Medication Type:</strong></label>
                <input className="p-2 bd-highlight"
                    value={drug.dosageForm}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="dosageForm"
                    id="dosageForm"
                    required=""
                    placeholder="ie tablet, capsule, solution"
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="directions"><strong>How I Should Take My Medication?</strong></label>
                <input className="p-2 bd-highlight"
                    value={drug.directions}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="directions"
                    id="directions"
                    required=""
                    placeholder="ie take 1 tablet by mouth..."
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="indication"><strong>Why am I taking this?</strong></label>
                <input className="p-2 bd-highlight"
                     value={drug.indication}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="indication"
                    id="indication"
                    required=""
                    placeholder="What did your doctor or pharmacist tell you this medication was for?"
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="notes"><strong>Notes for Me:</strong></label>
                <textarea className="p-2 bd-highlight"
                    value={drug.notes}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="notes"
                    id="notes"
                    required=""
                    placeholder="Questions? Side effects?"
                />
            </FormGroup>
            </Form>
              </CardText>
              <hr/>
            
            </CardBody>
            {/* <Link to={`/medication/${props.drug.id}/edit`}>
                                <Button 
                                    className="editMedication" 
                                    id="editMedication"
                                    type="button"
                                    >
                                    Edit
                                </Button>
                            </Link>
              <Link to={`/medication/detail/${props.drug.id}`}>
              <Button>Details</Button>
              </Link> */}
              <Button onClick={handleEditChange}>Save</Button>
                <Link to="/medication/list">
                            <Button 
                                className="returnMedicationList" 
                                id="returnMedicationList"
                                type="button"
                                >
                                Cancel
                            </Button>
                        </Link> 
          </Card>
           
          <>
          <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
          Rx Details
          </Button>
          <UncontrolledCollapse toggler="#toggler">
          <Card>
            {/* <CardImg top width="100%" src="png" alt="bottle" /> */}
            <CardBody> 
              <CardTitle><h3>Prescription Details</h3></CardTitle>
              {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
              <CardText>
              <FormGroup>
                <label htmlFor="rxNumber"><strong>Prescription Number:</strong></label>
                <input className="p-2 bd-highlight"
                    value={drug.rxNumber}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="rxNumber"
                    id="rxNumber"
                    required=""
                    
                />
            </FormGroup>
              <FormGroup>
                <label htmlFor="dateFilled"><strong>Last Date Filled:</strong></label>
                <input className="p-2 bd-highlight"
                    value={drug.dateFilled}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="dateFilled"
                    id="dateFilled"
                    required=""
                    placeholder="Most recent fill date (Format: MM/DD/YYYY)"
                   
                />
            </FormGroup>
              <FormGroup>
                <label htmlFor="daysSupply"><strong>Days Supply:</strong></label>
                <input className="p-2 bd-highlight"
                    value={drug.daysSupply}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="daysSupply"
                    id="daysSupply"
                    required=""
                    placeholder="How many days will this medication last you?"
                />
            </FormGroup>
              
              </CardText>
            </CardBody>
              <Button onClick={handleEditChange}>Save</Button>
              <Link to="/medication/list">
                            <Button 
                                className="returnMedicationList" 
                                id="returnMedicationList"
                                type="button"
                                >
                                Cancel
                            </Button>
                        </Link> 
          </Card>
          </UncontrolledCollapse>
          </>
        </CardDeck> 
      
        </>
        )

}

export default EditMedicationForm