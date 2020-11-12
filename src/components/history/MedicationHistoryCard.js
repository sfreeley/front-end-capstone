import React from "react";
import { Link } from "react-router-dom";
import {
  Card, Button, CardImg, CardTitle, CardText, Row, Col,
  CardBody, PopoverHeader, PopoverBody, UncontrolledPopover, Label, Input, ListGroup, ListGroupItem,
} from 'reactstrap';
import "./styles/MedicationHistoryCard.css";

const MedicationHistoryCard = (props) => {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))

  const currentDrugNotTaking = {
    id: props.drug.id,
    name: props.drug.name,
    userId: sessionUser.id,
    pharmacyId: props.drug.pharmacyId,
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
    refills: props.drug.refills,
    taking: true
  }

  return (
    <>

      <Col xs="6">
        <Card className="shadow-lg medicationHxCard h-100">
          <Row>
            <Col>
              <CardImg className="img-thumbnail-medicationHx" src="https://img.icons8.com/color/48/000000/warning-shield.png" alt="warning-shield-icon" />
              <CardBody>
                <div className="div-date-medicationCard">
                  <span><strong>Date Entered:</strong> {props.drug.dateInput} </span>
                </div>
                <CardTitle>
                  <ListGroup className="list-group list-group flex">
                    <ListGroupItem className="item-medicationHxCard"><strong> {props.drug.name} {props.drug.strength} {props.drug.dosageForm} </strong> </ListGroupItem>
                  </ListGroup>
                </CardTitle>
                <CardText>
                  <ListGroup className="list-group-group list-group flex">
                    <ListGroupItem className="list-group-item-entry"><strong>How I Should Take My Medication:</strong> {props.drug.directions} </ListGroupItem>
                    <ListGroupItem className="list-group-item-entry"><strong>Why am I taking this?</strong> {props.drug.indication}</ListGroupItem>
                    {props.drug.notes === "" ? null :
                      <ListGroupItem className="list-group-item-notes"><strong>Notes for me</strong>: {props.drug.notes}</ListGroupItem>
                    }
                  </ListGroup>
                  <div className="checkbox-alignment">
                    <span>
                      <Input id="checkbox" type="checkbox" className="checkbox" checked={props.isChecked} value={props.drug.taking} onClick={() => props.handleChange(currentDrugNotTaking)}
                      />
                      <Label className="checkbox-saveToMedList" htmlFor="checkbox">Save back into Medication List</Label>
                    </span>
                  </div>
                  <hr />
                  <div className="btn-all-medicationHx">
                    <Button className="btn-edit"
                      id={props.drug.id}
                      type="button"
                      onClick={props.getIdOfDrug}
                    >
                      Edit
                    </Button>
                    <Button className="btn-delete" onClick={() => props.removeDrugFromHxList(props.drug.id)}>Permanently Remove</Button>
                  </div>
                </CardText>

              </CardBody>
              <div className="btn-rxDetails-container">
                {props.drug.rxNumber === "" && props.drug.dateFilled === "" && props.drug.daysSupply === "" ?
                  <Button
                    disabled
                    className="btn-rx-details"
                    type="button"
                    id="PopoverLegacy"
                  >
                    Rx Details
                  </Button> :
                  <Button
                    className="btn-rx-details"
                    type="button"
                    id={`drug${props.drug.id}`}
                  >
                    Rx Details
                  </Button>
                }
              </div>
            </Col>
          </Row>
        </Card>


        {props.drug.rxNumber === "" && props.drug.dateFilled === "" && props.drug.daysSupply === "" ? null :


          <UncontrolledPopover trigger="legacy" placement="top" target={`drug${props.drug.id}`} >
            <PopoverHeader><strong>Prescription Details</strong></PopoverHeader>
            <PopoverBody>
              <Card>
                <CardText>
                  <ListGroup className="list-group list-group">
                    <ListGroupItem className="list-group-item"><strong>RxNumber:</strong> {props.drug.rxNumber}</ListGroupItem>
                    {props.drug.refills === null ?
                      <ListGroupItem className="list-group-item"><strong>Refills Remaining:</strong> No refills </ListGroupItem> :
                      <ListGroupItem className="list-group-item"><strong>Refills Remaining:</strong> {props.drug.refills}</ListGroupItem>}
                    <ListGroupItem className="list-group-item"><strong>Last time this was filled:</strong> {props.drug.dateFilled}</ListGroupItem>
                    <ListGroupItem className="list-group-item"><strong>How long is this going to last me?</strong> {props.drug.daysSupply} days</ListGroupItem>
                    <ListGroupItem className="list-group-item"><strong>When is my next renewal or refill date?</strong> {props.drug.nextRefillDate}</ListGroupItem>
                  </ListGroup>
                </CardText>

                <div className="btn-all-medicationHx">
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

              </Card>
            </PopoverBody>
          </UncontrolledPopover>

        }

      </Col>
    </>


  )
}
export default MedicationHistoryCard