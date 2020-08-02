import React from "react";
import { Link } from "react-router-dom";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck, Row, Col,
    CardSubtitle, CardBody, UncontrolledCollapse, Container
  } from 'reactstrap';
import "./styles/MedicationHistoryCard.css";

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
     
   <Container fluid className="medication-cards d-flex flex-row">
   
    {props.drug &&
      <CardDeck className="card-style">
       <Col>
    <Row>
    
   
      <Card body className="card-item-style-history">
       
        <span>
        <input id="checkbox" type="checkbox" className="checkbox" checked={props.isChecked} value={props.drug.taking} onClick={() => props.handleChange(currentDrugNotTaking)}
        /> 
         <label className="checkbox-saveToMedList" htmlFor="checkbox">Save back into Medication List</label>
         </span>
       
        <CardImg className="img-thumbnail"src={"https://img.icons8.com/dusk/64/000000/prescription-pill-bottle.png/"} alt="medicationBottle" />

        <CardBody>
          <CardTitle>
          <span className="span-date-history"><strong>Date Entered:</strong> {props.drug.dateInput} </span>

          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>Medication Name:</strong> {props.drug.name}</li>
          <li className="list-group-item"><strong>Medication Strength:</strong> {props.drug.strength}</li>
          <li className="list-group-item"><strong>Medication Type:</strong> {props.drug.dosageForm}</li>
          </ul>
          </CardTitle>
          
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
          <Button className="btn-delete" onClick={() => props.removeDrug(props.drug.id)}>Permanently Remove</Button>
          </div>
        
        </CardBody>
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
        
      </Card>
          
      {props.drug.rxNumber === "" && props.drug.dateFilled === "" && props.drug.daysSupply === "" ? null : 
     
      <>
      <UncontrolledCollapse toggler={`#drug${props.drug.id}`}>
      <Card className="card-toggle-style">
      
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
        <div className="btn-all-rxDetails">
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
          </div>
          </CardBody>
      </Card>
      </UncontrolledCollapse>
      </>
      }
      
      
      
  
    </Row>
    </Col>
    </CardDeck>
    
     
  }

  </Container>
   
    
    
   
 
   
    )
}
export default MedicationHistoryCard