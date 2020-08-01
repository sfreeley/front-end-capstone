import React from "react";
import { Link } from "react-router-dom";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, UncontrolledCollapse, CustomInput
  } from 'reactstrap';

const MedicationHistoryCard = (props) => {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))

  const currentDrugNotTaking = {
    id: props.drug.id,
    name: props.drug.name,
    userId: sessionUser.id,
    strength: props.drug.strength,
    dosageForm: props.drug.dosageForm,
    directions: props.drug.directions,
    indication: props.drug.indication,
    notes: props.drug.notes,
    rxNumber: props.drug.rxNumber,
    dateFilled: props.drug.dateFilled,
    daysSupply: props.drug.daysSupply,
    nextRefillDate: props.drug.nextRefillDate,
    dateInput: props.drug.dateInput,
    taking: true
  }

    return (
        <>
        {props.drug &&
    <div>
    <CardDeck >
      <Card body color="warning"  >
       
        <span>
        <input id="checkbox" type="checkbox" className="checkbox" checked={props.isChecked} value={props.drug.taking} onClick={() => props.handleChange(currentDrugNotTaking)}
        /> 
         <label htmlFor="checkbox">Save back into Medication List</label>
         </span>
       
        {/* <CardImg className="img-thumbnail"src={"https://img.icons8.com/dusk/64/000000/prescription-pill-bottle.png/"} alt="medicationBottle" /> */}
        <CardBody>
          <CardTitle>
          <strong>Date Entered:</strong> {props.drug.dateInput}
          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>Medication Name:</strong> {props.drug.name}</li>
          <li className="list-group-item"><strong>Medication Strength:</strong> {props.drug.strength}</li>
          <li className="list-group-item"><strong>Medication Type:</strong> {props.drug.dosageForm}</li>
          </ul>
          </CardTitle>
          {/* <CardSubtitle></CardSubtitle> */}
          
          <CardText>
          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>How should I take my medication?</strong> {props.drug.directions}</li>
          <li className="list-group-item"><strong>Why am I taking this?</strong> {props.drug.indication}</li>
          
          {props.drug.notes === "" ? null : 
          <li className="list-group-item"><strong>Notes for me</strong>: {props.drug.notes}</li>     
          }
          </ul>
          </CardText>
          <hr/>
        
        </CardBody>
          <Link to={`/medication/${props.drug.id}/edit`}>
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
          </Link>
          <Button onClick={() => props.removeDrug(props.drug.id)}>Delete Forever</Button>
      </Card>
      {props.drug.rxNumber === "" && props.drug.dateFilled === "" && props.drug.daysSupply === "" ? null : 
      <>
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
          <li className="list-group-item"><strong>Last time this was filled:</strong> {props.drug.dateFilled}</li>     
          <li className="list-group-item"><strong>How long is this going to last me?</strong> {props.drug.daysSupply} days</li>     
          <li className="list-group-item"><strong>When should I renew or refill this next?</strong> {props.drug.nextRefillDate}</li>     
          </ul> 
          </CardText>
        </CardBody>
          <Link to={`/medication/${props.drug.id}/edit`}>
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
          </Link>
          <Button onClick={() => props.removeDrug(props.drug.id)}>Permanently Remove Medication</Button>
      </Card>
      </UncontrolledCollapse>
      </>
      }
    </CardDeck> 
    </div>
  }
    </>
    )
}
export default MedicationHistoryCard