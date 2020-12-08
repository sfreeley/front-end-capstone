import React, { useEffect, useState } from "react";
import { calculateNextRefill, currentDateTime } from "../modules/helperFunctions";
import {
  Card, Button, CardImg, CardTitle, CardText, CardBody, UncontrolledPopover, PopoverHeader, PopoverBody, Col, ListGroup, ListGroupItem, Input, Label, Modal, ModalBody
} from 'reactstrap';
import "./styles/MedicationCard.css"

const MedicationCard = (props) => {
  const { sessionUser, removeDrug, handleChange, getIdOfDrug, drug, imageName } = props
  const oneRefillRemaining = drug.refills === 1 ? true : false
  const taking = drug.taking === true;
  const timestamp = Date.now()

  const [imageModal, setImageModal] = useState(false);

  const toggleImage = () => {
    setImageModal(!imageModal);
  }

  const currentDrug = {
    id: drug.id,
    userId: sessionUser.id,
    name: drug.name,
    pharmacyId: parseInt(drug.pharmacyId),
    strength: drug.strength,
    dosageForm: drug.dosageForm,
    directions: drug.directions,
    indication: drug.indication,
    notes: drug.notes,
    rxNumber: drug.rxNumber,
    dateFilled: drug.dateFilled,
    daysSupply: parseInt(drug.daysSupply),
    nextRefillDate: calculateNextRefill(drug.dateFilled, parseInt(drug.daysSupply)),
    taking: drug.taking,
    dateInput: currentDateTime(timestamp),
    refills: parseInt(drug.refills),
    image: imageName
  }

  const calculateTimeLeftUntilRefill = () => {
    let dt1 = new Date(drug.nextRefillDate);
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
      <span key={drug.id}>
        <h5 className={sevenDaysUntilRefill ? 'background-yellow' : 'background-neutral'}> <strong>{timeLeftUntilDate[interval]}</strong> {interval} {`until refill or renewal`} </h5>
      </span>
    )
  })


  return (
    <>
      <Col xs="6">
        <Card className={taking ? 'medicationCard--background-green' : 'medicationCard--background-gradient'} >

          <CardImg className="img-thumbnail-medicationCard" src={"https://img.icons8.com/windows/32/000000/prescription.png"} alt="medicationRx-symbol" />
          <Button
            outline
            className="btn-pharmacy-details-medList"
            type="button"
            id={`drug${drug.pharmacyId}`}
          >
            Pharmacy Details
          </Button>
          <CardBody>
            <div className="div-date-medicationCard">
              <span><strong>Date Entered:</strong> {drug.dateInput} </span>
            </div>

            <CardTitle>
              {drug.dateFilled === "" || !drug.taking ? null :
                <div className="div-countdownToRefill">
                  {timerInDays.length ? timerInDays :
                    <h4 className="dueForRefill"> <span> Due for Refill </span> </h4>}
                </div>
              }

              <ListGroup className="list-group list-group flex">
                <ListGroupItem className="item-medicationCard"><strong>{drug.name} {drug.strength} {drug.dosageForm}</strong> </ListGroupItem>
              </ListGroup>
            </CardTitle>

            <CardText>
              <ListGroup className="list-group list-group flex">
                <ListGroupItem className="list-group"><strong>How Should I Take My Medication?</strong> {drug.directions}</ListGroupItem>
                <ListGroupItem className="list-group"><strong>Why am I taking this? </strong> {drug.indication}</ListGroupItem>

                {drug.notes === "" ? null :
                  <ListGroupItem className="list-group-item-notes"><strong>Notes:</strong> {drug.notes}</ListGroupItem>
                }
              </ListGroup>
              <div className="checkbox-alignment">
                <span>
                  <Input id="checkbox" type="checkbox" className="checkbox" value={drug.taking} onClick={() => handleChange(currentDrug)}
                  />
                  {window.location.pathname === "/medication/list" ?
                    <Label className="checkbox-saveToMedHx" htmlFor="checkbox">Save to Medication History</Label> :
                    <Label className="checkbox-saveToMedHx" htmlFor="checkbox">Save Back to Medication List</Label>
                  }
                </span>
              </div>
              <hr />
              <div className="btn-all-medicationCard">

                <Button className="btn-edit-medList"
                  id={drug.id}
                  type="button"
                  color="success"
                  onClick={getIdOfDrug}
                >
                  Edit
                </Button>
                {!drug.taking ? null :

                  <Button onClick={toggleImage} color="success" className="btn-expand-medList">Image</Button>

                }
                <Button color="danger" className="btn-delete-medList" onClick={() => removeDrug(drug.id)}>Permanently Remove</Button>

              </div>
            </CardText>
            <div className="btn-rxDetails-container">
              {drug.rxNumber === "" && drug.dateFilled === "" && drug.daysSupply === null && drug.nextRefillDate === "undefined NaN, NaN" ?
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
                  id={`drug${drug.id}`}
                >
                  Rx Details
              </Button>
              }

            </div>
          </CardBody>
        </Card>

        <Modal isOpen={imageModal} toggle={toggleImage}>
          <ModalBody>
            {!drug.image ? <p>No image available</p> :
              <img className="imageModal" src={drug.image} alt="medicationRx" />
            }
            <Button onClick={toggleImage} >Close</Button>
          </ModalBody>
        </Modal>

        <UncontrolledPopover trigger="legacy" placement="top" target={`drug${drug.id}`}  >
          <PopoverHeader><strong>Prescription Details</strong></PopoverHeader>
          <PopoverBody>
            <Card>
              <CardText>
                <ListGroup className="list-group list-group">
                  {drug.rxNumber === "" ? null :
                    <ListGroupItem className="list-group-item"><strong>RxNumber:</strong> {drug.rxNumber}</ListGroupItem>}
                  {drug.rxNumber === "" ? null :
                    <>
                      {drug.refills === null ?
                        <ListGroupItem className={'background-red'}><strong>Refills Remaining:</strong> No refills </ListGroupItem> :
                        <ListGroupItem className={oneRefillRemaining && 'background-yellow'}><strong>Refills Remaining:</strong> {drug.refills}</ListGroupItem>} </>}
                  <ListGroupItem className="list-group-item"><strong>Last time this was filled:</strong> {drug.dateFilled}</ListGroupItem>
                  <ListGroupItem className="list-group-item"><strong>How long is this going to last me?</strong> {drug.daysSupply} days</ListGroupItem>
                  <ListGroupItem className={sevenDaysUntilRefill || dayOfRefill ? 'background-red' : null}><strong>When is my next renewal or refill date?</strong> {drug.nextRefillDate}</ListGroupItem>
                </ListGroup>
              </CardText>

              <div className="btn-all">
                <Button
                  className="btn-edit"
                  id={drug.id}
                  type="button"
                  onClick={getIdOfDrug}
                >
                  Edit
              </Button>
              </div>
            </Card>
          </PopoverBody>
        </UncontrolledPopover>

        <UncontrolledPopover trigger="legacy" placement="top" target={`drug${drug.pharmacy.id}`}>
          <PopoverHeader><strong>Prescription Details</strong></PopoverHeader>
          <PopoverBody>
            <Card>
              <CardText>
                <ListGroup className="list-group list-group">
                  <>
                    <ListGroupItem className={'background-yellow'}><strong>Pharmacy Name:</strong> {drug.pharmacy.name}</ListGroupItem>

                    <ListGroupItem className="list-group-item" ><strong>Pharmacy Address:</strong> {drug.pharmacy.address} </ListGroupItem>

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Contact Info:</strong> {drug.pharmacy.phone}</ListGroupItem>
                  </>
                </ListGroup>
              </CardText>
            </Card>
          </PopoverBody>
        </UncontrolledPopover>
      </Col>

    </>

  )
}
export default MedicationCard;