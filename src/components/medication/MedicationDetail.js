import React, { useState, useEffect } from "react";
import NavBar from "../nav/NavBar";
import SearchBar from "../search/SearchBar";
import ApplicationManager from "../modules/ApplicationManager";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, UncontrolledCollapse, CustomInput
  } from 'reactstrap';

const MedicationDetail = (props) => {
    const [drug, setDrug] = useState({
            id: "",
            name: "",
            userId: "", 
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

    const [isLoading, setIsLoading] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    

    useEffect( () => {
        ApplicationManager.getDrugById(props.drugId)
            .then(drug => {
                setDrug({
                    ...drug
                });
                setIsLoading(false)
            })
    }, [props.drugId])

    const removeDrug = () => {
        setIsLoading(true);
        ApplicationManager.deleteDrug(props.drugId).then(() => {
            props.history.push("/medication/list")
        })
    }

    //edit the property "taking" to false and move card to medication hx  
    const handleChange = (drugToEdit) => {
        setIsChecked(true)
        setIsLoading(true)
        ApplicationManager.editDrug(drugToEdit)
        .then(() => {
            ApplicationManager.getUserDrugById(drug.id).then((drugFromAPI) => {
                setDrug(drugFromAPI)
                props.history.push("/medication/history")
        
            })
            
        })
     }

     //object to be sent to handleChange function that will edit property of "taking" to false and move card to medication hx
     const currentDrugDetail = {
         ...drug,
         taking: false
     }

    return (
        <>
    <div>
    <NavBar {...props} />
    </div>
    <span>
      <SearchBar />
    </span>
    <CardDeck>
      <Card body color="success" >
        <strong>Date Entered:</strong> {drug.dateInput}
        <span>
          <input id="checkbox" type="checkbox" className="checkbox" checked={isChecked} value={drug.taking} onClick={() => handleChange(currentDrugDetail)}
          /> 
          <label for="checkbox">Save to Medication History</label>
         </span>
        {/* <Button  onClick={() => props.history.push("/medication/history")} >Save to Medication History</Button> */}
      
        {/* <CardImg className="img-thumbnail"src={"https://img.icons8.com/dusk/64/000000/prescription-pill-bottle.png/"} alt="medicationBottle" /> */}
        <CardBody>
          <CardTitle>
          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>Medication Name:</strong> {drug.name}</li>
          <li className="list-group-item"><strong>Medication Strength:</strong> {drug.strength}</li>
          <li className="list-group-item"><strong>Medication Type:</strong> {drug.dosageForm}</li>
          </ul>
          </CardTitle>
          {/* <CardSubtitle></CardSubtitle> */}
          
          <CardText>
          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>How I Should Take My Medication:</strong>{drug.directions}</li>
          <li className="list-group-item"><strong>Why am I taking this?:</strong> {drug.indication}</li>
          
          {drug.notes === "" ? null : 
          <li className="list-group-item"><strong>Notes for me:</strong>: {drug.notes}</li>     
          }
          </ul>
          </CardText>
          <hr/>
        
        </CardBody>
          <Button>Edit</Button>
          <Button onClick={() => removeDrug(drug.id)}>Delete</Button>
      </Card>
      <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
      Rx Details
      </Button>
      <UncontrolledCollapse toggler="#toggler">
      <Card>
        {/* <CardImg top width="100%" src="png" alt="bottle" /> */}
        <CardBody> 
          <CardTitle><strong>Prescription Details</strong></CardTitle>
          {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
          <CardText>
          <ul className="list-group list-group">
          <li className="list-group-item"><strong>RxNumber:</strong> {drug.rxNumber}</li>
          <li className="list-group-item"><strong>Last time this was filled:</strong>: {drug.dateFilled}</li>     
          <li className="list-group-item"><strong>How long is this going to last me?:</strong> {drug.daysSupply} days</li>     
          <li className="list-group-item"><strong>When should I fill this next?:</strong>: {drug.nextRefillDate}</li>     
          </ul> 
          </CardText>
        </CardBody>
          <Button>Edit</Button>
          <Button>Delete</Button>
      </Card>
      </UncontrolledCollapse>
    </CardDeck> 
  
    </>

    )
}
export default MedicationDetail
