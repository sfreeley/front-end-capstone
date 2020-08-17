import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card, Button, CardImg, CardTitle, CardText, CardBody, UncontrolledPopover, PopoverHeader, PopoverBody, Col, ListGroup, ListGroupItem, Input, Label
} from 'reactstrap';
import "./styles/MedicationCard.css"

const MedicationCard = (props) => {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const oneRefillRemaining = props.drug.refills === 1 ? true : false

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
    refills: props.drug.refills,
    taking: false
  }

  const calculateTimeLeftUntilRefill = () => {
    let dt1 = new Date(props.drug.nextRefillDate);
    let dt2 = new Date();

    let difference = +dt1 - +dt2
    let timeLeftUntilDate = {}

    if (difference > 0) {
      timeLeftUntilDate = {
        days: Math.ceil(difference / (1000 * 60 * 60 * 24)), 
      }
    }
    return timeLeftUntilDate

  }

  const [timeLeftUntilDate, setTimeLeftUntilDate] = useState(calculateTimeLeftUntilRefill());
  const sevenDaysUntilRefill = timeLeftUntilDate.days <= 7 ? true : false
  const dayOfRefill = timeLeftUntilDate.days === undefined
  const timerInDays = [];

  //every time timeLeftUntilDate is updated in state, useEffect will fire
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeftUntilDate(calculateTimeLeftUntilRefill());
    }, 1000);
    // runs every time useEffect runs except first run and will clear the timer if component is not mounted
    return () => clearTimeout(timer);
  });

  //iterate through the keys of the timeLeftUntilDate object (ie days)
  //if the property of days in the timeLeftUntilDate does not have valid value, return, else push the following jsx
  //into timerInDays array 'value of days property' 'days' 'until refill or renewal'
  Object.keys(timeLeftUntilDate).forEach((interval) => {
    if (!timeLeftUntilDate[interval]) {
      return
    }

    timerInDays.push(
      <span>
        <h5 className={sevenDaysUntilRefill ? 'background-yellow' : 'background-neutral'}> <strong>{timeLeftUntilDate[interval]}</strong> {interval} {`until refill or renewal`} </h5>
      </span>
    )
  })


  return (
    <>
      <Col xs="6">
        <Card className="shadow-lg medicationCard h-100" >
          <CardImg className="img-thumbnail-medicationCard" src={"https://img.icons8.com/windows/32/000000/prescription.png"} alt="medicationRx-symbol" />

          <CardBody>
            <div className="div-date-medicationCard">
              <span><strong>Date Entered:</strong> {props.drug.dateInput} </span>
            </div>

            <CardTitle>
              {props.drug.dateFilled === "" ? null :
                <div className="div-countdownToRefill">
                  {timerInDays.length ? timerInDays :
                    <h4 className="dueForRefill"> <span> Due for Refill </span> </h4>}
                </div>
              }

              <ListGroup className="list-group list-group flex">
                <ListGroupItem className="item-medicationCard"><strong>{props.drug.name} {props.drug.strength} {props.drug.dosageForm}</strong> </ListGroupItem>
              </ListGroup>
            </CardTitle>

            <CardText>
              <ListGroup className="list-group list-group flex">
                <ListGroupItem className="list-group"><strong>How Should I Take My Medication?</strong> {props.drug.directions}</ListGroupItem>
                <ListGroupItem className="list-group"><strong>Why am I taking this? </strong> {props.drug.indication}</ListGroupItem>

                {props.drug.notes === "" ? null :
                  <ListGroupItem className="list-group-item-notes"><strong>Notes:</strong> {props.drug.notes}</ListGroupItem>
                }
              </ListGroup>
              <div className="checkbox-alignment">
                <span>
                  <Input id="checkbox" type="checkbox" className="checkbox" checked={props.isChecked} value={props.drug.taking} onClick={() => props.handleChange(currentDrugTaking)}
                  />
                  <Label className="checkbox-saveToMedHx" htmlFor="checkbox">Save to Medication History</Label>
                </span>
              </div>
              <hr />
              <div className="btn-all-medicationCard">
                <Button className="btn-edit-medList"
                  id={props.drug.id}
                  type="button"
                  color="success"
                  onClick={props.getIdOfDrug}
                >
                  Edit
                </Button>

                <Link to={`/medication/detail/${props.drug.id}`}>
                  <Button color="success" className="btn-expand-medList">Expand</Button>
                </Link>
                <Button color="danger" className="btn-delete-medList" onClick={() => props.removeDrug(props.drug.id)}>Permanently Remove</Button>

              </div>
            </CardText>
            <div className="btn-rxDetails-container">
              {props.drug.rxNumber === "" && props.drug.dateFilled === "" && props.drug.daysSupply === null && props.drug.nextRefillDate === "undefined NaN, NaN" ?
                <Button
                  disabled
                  className="btn-rx-details-medList"
                  type="button"
                  id="PopoverLegacy"
                >
                  Rx Details
              </Button> :
                <Button
                  className="btn-rx-details-medList"
                  type="button"
                  color="primary"
                  id={`drug${props.drug.id}`}
                >
                  Rx Details
              </Button>

              }

            </div>

          </CardBody>

        </Card>


        <UncontrolledPopover trigger="legacy" placement="top" target={`drug${props.drug.id}`}  >
          <PopoverHeader><strong>Prescription Details</strong></PopoverHeader>
          <PopoverBody>
            <Card>
              <CardText>
                <ListGroup className="list-group list-group">
                  {props.drug.rxNumber === "" ? null :
                    <ListGroupItem className="list-group-item"><strong>RxNumber:</strong> {props.drug.rxNumber}</ListGroupItem>}
                  {props.drug.rxNumber === "" ? null :
                    <>
                      {props.drug.refills === null ?
                      <ListGroupItem className={'background-red'}><strong>Refills Remaining:</strong> No refills </ListGroupItem> :
                      <ListGroupItem className={oneRefillRemaining && 'background-yellow'}><strong>Refills Remaining:</strong> {props.drug.refills}</ListGroupItem>} </>}
                      <ListGroupItem className="list-group-item"><strong>Last time this was filled:</strong> {props.drug.dateFilled}</ListGroupItem>
                      <ListGroupItem className="list-group-item"><strong>How long is this going to last me?</strong> {props.drug.daysSupply} days</ListGroupItem>
                      <ListGroupItem className={sevenDaysUntilRefill || dayOfRefill ? 'background-red' : null}><strong>When is my next renewal or refill date?</strong> {props.drug.nextRefillDate}</ListGroupItem>
                </ListGroup>
              </CardText>

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
            </Card>
          </PopoverBody>
        </UncontrolledPopover>
      </Col>



    </>



  )
}
export default MedicationCard;