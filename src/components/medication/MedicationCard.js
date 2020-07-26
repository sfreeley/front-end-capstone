import React from "react";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';

const MedicationCard = (props) => {
   
    return (   
    <>
    {props.drug &&
    
    <CardDeck>
      <Card>
        Date Entered: {props.drug.dateInput}
        <CardImg className="img-thumbnail"src={"https://img.icons8.com/dusk/64/000000/prescription-pill-bottle.png/"} alt="medicationBottle" />
        <CardBody>
          <CardTitle>
          <ul className="list-group list-group-flush flex">
          <li className="list-group-item"><strong>Medication Name:</strong> {props.drug.name}</li>
          <li className="list-group-item"><strong>Medication Strength:</strong> {props.drug.strength}</li>
          <li className="list-group-item"><strong>Medication Type:</strong> {props.drug.dosageForm}</li>
          </ul>
          </CardTitle>
          <CardSubtitle><strong>How I Should Take My Medication:</strong>{props.drug.directions}</CardSubtitle>
          <CardText>
          <ul className="list-group list-group-flush flex">
          <li className="list-group-item"><strong>Why am I taking this?:</strong> {props.drug.indication}</li>
          <li className="list-group-item"><strong>Notes for me:</strong>: {props.drug.notes}</li>     
          </ul>
          </CardText>
          <Button>Edit</Button>
          <Button>Details</Button>
          <Button>Delete</Button>
        </CardBody>
      </Card>
      <Card>
        {/* <CardImg top width="100%" src="png" alt="bottle" /> */}
        <CardBody> 
          <CardTitle>Prescription Details</CardTitle>
          {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
          <CardText>
          <ul className="list-group list-group-flush flex">
          <li className="list-group-item"><strong>RxNumber:</strong> {props.drug.rxNumber}</li>
          <li className="list-group-item"><strong>Last time this was filled:</strong>: {props.drug.dateFilled}</li>     
          <li className="list-group-item"><strong>How long is this going to last me?:</strong> {props.drug.daysSupply} days</li>     
          <li className="list-group-item"><strong>When should I fill this next?:</strong>: {props.drug.nextRefillDate}</li>     
          </ul> 
          </CardText>
          <Button>Edit</Button>
          <Button>Details</Button>
          <Button>Delete</Button>
        </CardBody>
      </Card>
    </CardDeck> 
  }
    </>
    )
}
export default MedicationCard;