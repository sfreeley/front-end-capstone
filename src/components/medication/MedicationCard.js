import React from "react";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, UncontrolledCollapse, CustomInput
  } from 'reactstrap';

const MedicationCard = (props, editCurrentDrug) => {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  
    return (   
    <>
    {props.drug &&
    
    <CardDeck>
      <Card body color="info" >
        <strong>Date Entered:</strong> {props.drug.dateInput}
        {/* <input id="checkbox" type="checkbox" className="checkbox" value={props.drug.taking} onClick={() =>  editCurrentDrug}
        /> */}
        {/* <label for="checkbox">Save to Medication History</label> */}
        <Button onClick={() => editCurrentDrug} >Save to Medication History</Button>
      
        {/* <CardImg className="img-thumbnail"src={"https://img.icons8.com/dusk/64/000000/prescription-pill-bottle.png/"} alt="medicationBottle" /> */}
        <CardBody>
          <CardTitle>
          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>Medication Name:</strong> {props.drug.name}</li>
          <li className="list-group-item"><strong>Medication Strength:</strong> {props.drug.strength}</li>
          <li className="list-group-item"><strong>Medication Type:</strong> {props.drug.dosageForm}</li>
          </ul>
          </CardTitle>
          {/* <CardSubtitle></CardSubtitle> */}
          
          <CardText>
          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>How I Should Take My Medication:</strong>{props.drug.directions}</li>
          <li className="list-group-item"><strong>Why am I taking this?:</strong> {props.drug.indication}</li>
          
          {props.drug.notes === "" ? null : 
          <li className="list-group-item"><strong>Notes for me:</strong>: {props.drug.notes}</li>     
          }
          </ul>
          </CardText>
          <hr/>
        
        </CardBody>
          <Button>Edit</Button>
          <Button>Details</Button>
          <Button onClick={() => props.removeDrug(props.drug.id)}>Delete</Button>
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
          <li className="list-group-item"><strong>RxNumber:</strong> {props.drug.rxNumber}</li>
          <li className="list-group-item"><strong>Last time this was filled:</strong>: {props.drug.dateFilled}</li>     
          <li className="list-group-item"><strong>How long is this going to last me?:</strong> {props.drug.daysSupply} days</li>     
          <li className="list-group-item"><strong>When should I fill this next?:</strong>: {props.drug.nextRefillDate}</li>     
          </ul> 
          </CardText>
        </CardBody>
          <Button>Edit</Button>
          <Button>Details</Button>
          <Button>Delete</Button>
      </Card>
      </UncontrolledCollapse>
    </CardDeck> 
  }
    </>
    )
}
export default MedicationCard;