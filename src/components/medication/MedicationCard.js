import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck,
    Container, CardBody, UncontrolledCollapse, Row, Col, ListGroup, ListGroupItem, Input, Label
  } from 'reactstrap';
  import "./styles/MedicationCard.css"

const MedicationCard = (props) => {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const isFirstCard = true;
  
  const currentDrugTaking = {
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
    taking: false
  }

    return (  
    <> 
      
    {props.drug &&
      <div className="card-style-containerz">
    <div className="card-style">
   
    
      <div className="card-item-style-medicationCard" >
        <img className="img-thumbnail-medicationCard" src={"https://img.icons8.com/windows/32/000000/prescription.png"} alt="medicationBottle" />
        
        <CardBody>
          <CardTitle>
          <span className="span-date"><strong>Date Entered:</strong> {props.drug.dateInput} </span>
        
          <ul className="list-group-group list-group flex">
          <li className="list-group-item"><strong>Medication Name:</strong> {props.drug.name}</li>
          <li className="list-group-item"><strong>Medication Strength:</strong> {props.drug.strength}</li>
          <li className="list-group-item"><strong>Medication Type:</strong> {props.drug.dosageForm}</li>
          </ul>
          </CardTitle>
        
          <CardText>
          <ListGroup className="list-group-group list-group flex">
          <ListGroupItem className="list-group-item-entry"><strong>How I Should Take My Medication:</strong> {props.drug.directions}</ListGroupItem>
          <ListGroupItem className="list-group-item-entry"><strong>Why am I taking this? </strong> {props.drug.indication}</ListGroupItem>
          
          {props.drug.notes === "" ? null : 
          <ListGroupItem className="list-group-item-notes"><strong>Notes for me:</strong> {props.drug.notes}</ListGroupItem>     
          }
          </ListGroup>
          <div className="checkbox-alignment">
          <span>
          <Input id="checkbox" type="checkbox" className="checkbox" checked={props.isChecked} value={props.drug.taking} onClick={() => props.handleChange(currentDrugTaking)}
          /> 
          <Label for="checkbox">Save to Medication History</Label>
         </span>
         </div>
          </CardText>
          <hr/>
          <div className="btn-all">
          <Button className="btn-edit" 
            id={props.drug.id}
            type="button"
            onClick={props.getIdOfDrug}
            >
            Edit
        </Button>
      
          <Link to={`/medication/detail/${props.drug.id}`}>
          <Button className="btn-expand">Expand</Button>
          </Link> 
          <Button className="btn-delete" color="danger" onClick={() => props.removeDrug(props.drug.id)}>Permanently Remove</Button>
         
        </div>
        
        </CardBody>
          <div className="btn-rxDetails-container">
        {props.drug.rxNumber === "" && props.drug.dateFilled === "" && props.drug.daysSupply === "" ? 
        <Button 
          disabled
          className="btn-rx-details"
          color="secondary" 
          id={`drug${props.drug.id}`} 
          >
          Rx Details
        </Button> :
        <Button
          className="btn-rx-details"
          color="primary" 
          id={`drug${props.drug.id}`} 
          >
          Rx Details
        </Button>
      }
      </div>
    </div> 
  </div>

      {props.drug.rxNumber === "" && props.drug.dateFilled === "" && props.drug.daysSupply === "" ? null : 
      <div className="card-toggle-style-group">
      <div className="card-toggle-style">
      
      
      <UncontrolledCollapse toggler={`#drug${props.drug.id}`} >
    
        <CardBody> 
          <CardTitle><strong>Prescription Details</strong></CardTitle>
              <CardText>
              <ul className="list-group list-group">
              <li className="list-group-item"><strong>RxNumber:</strong> {props.drug.rxNumber}</li>
              <li className="list-group-item"><strong>Last time this was filled:</strong> {props.drug.dateFilled}</li>     
              <li className="list-group-item"><strong>How long is this going to last me?</strong> {props.drug.daysSupply} days</li>     
              <li className="list-group-item"><strong>When is my next renewal or refill date?</strong> {props.drug.nextRefillDate}</li>     
              </ul> 
              </CardText>
              <hr/>
              <div className="btn-all">
              <Button 
                className="btn-edit" 
                id={props.drug.id}
                type="button"
                onClick={props.getIdOfDrug}
                >
                Edit
              </Button>
      
              <Link to={`/medication/detail/${props.drug.id}`}>
              <Button className="btn-expand">Expand</Button>
              </Link>
              </div>
        </CardBody>
      </UncontrolledCollapse>
      </div>
      </div>
     
     
    }
      
      </div>
   
  }
  
  </>
    

     
    )
}
export default MedicationCard;