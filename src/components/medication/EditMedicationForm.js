import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";
import { calculateNextRefill } from "../modules/helperFunctions";
import { Link } from "react-router-dom"
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, UncontrolledCollapse, Input, Label
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
                setIsLoading(false)
            })
        }, []);
        
 //this will take the editingDrug object and update it in database and display new info
 const handleEditChange = (event) => {
    event.preventDefault()
    setIsLoading(true)

    ApplicationManager.editDrug(editingDrug)
    .then(() => {
        ApplicationManager.getDrugsForUser(sessionUser.id).then((drugsFromAPI) => {
            setDrug(drugsFromAPI)
            editingDrug.taking ? props.history.push("/medication/list") :
            props.history.push("/medication/history")
            
        })
     }) 
} 


return (
     
        <>
        <NavBar {...props} />
        
        <CardDeck>
       
          <Card>
           
           
            <CardBody>
              <CardTitle>
              <strong>Date Entered:</strong> {drug.dateInput}
              
              </CardTitle>
              {/* <CardSubtitle></CardSubtitle> */}
              
              <CardText>
              
             
             
            <Label htmlFor="name"><strong>Medication Name:</strong></Label>
            <Input className="p-2 bd-highlight justify-content-center"
                    value={drug.name}
                    onChange={handleEditFieldChange}
                    type="name"
                    name="name"
                    id="name"
                    required=""
                    placeholder="Medication Name"
                    />
                
               
                <Label htmlFor="strength"><strong>Medication Strength:</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={drug.strength}
                    onChange={handleEditFieldChange}
                    type="strength"
                    name="strength"
                    id="strength"
                    required=""
                    placeholder="ie 5 mg, 100 mcg, 1 g, etc"
                />
           
            
                <Label htmlFor="dosageForm"><strong>Medication Type:</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={drug.dosageForm}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="dosageForm"
                    id="dosageForm"
                    required=""
                    placeholder="ie tablet, capsule, solution"
                />
            
            
                <Label htmlFor="directions"><strong>How I Should Take My Medication?</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={drug.directions}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="directions"
                    id="directions"
                    required=""
                    placeholder="ie take 1 tablet by mouth..."
                />
            
            
                <Label htmlFor="indication"><strong>Why am I taking this?</strong></Label>
                <Input className="p-2 bd-highlight"
                     value={drug.indication}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="indication"
                    id="indication"
                    required=""
                    placeholder="What did your doctor or pharmacist tell you this medication was for?"
                />
            
            
                <Label htmlFor="notes"><strong>Notes for Me:</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={drug.notes}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="notes"
                    id="notes"
                    required=""
                    placeholder="Questions? Side effects?"
                />
            
        
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
             
                <Label htmlFor="rxNumber"><strong>Prescription Number:</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={drug.rxNumber}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="rxNumber"
                    id="rxNumber"
                    required=""
                    
                />
           
              
                <Label htmlFor="dateFilled"><strong>Last Date Filled:</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={drug.dateFilled}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="dateFilled"
                    id="dateFilled"
                    required=""
                    placeholder="Most recent fill date (Format: MM/DD/YYYY)"
                   
                />
           
              
                <Label htmlFor="daysSupply"><strong>Days Supply:</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={drug.daysSupply}
                    onChange={handleEditFieldChange}
                    type="type"
                    name="daysSupply"
                    id="daysSupply"
                    required=""
                    placeholder="How many days will this medication last you?"
                />
            
              
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