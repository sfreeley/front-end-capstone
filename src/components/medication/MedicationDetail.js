import React, { useState, useEffect } from "react";
import NavBar from "../nav/NavBar";
import ApplicationManager from "../modules/ApplicationManager";
import {
    Card, Button, CardImg, CardTitle, CardText, CardBody, Container, Row, Col, ListGroup,
    ListGroupItem, Input, Label } from 'reactstrap';
  import EditMedicationFormModal from "../medication/EditMedicationFormModal";
  import { calculateNextRefill } from "../modules/helperFunctions";
  import "./styles/MedicationDetail.css";

const MedicationDetail = (props) => {
  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
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
            refills: "",
            taking: true
    })

    const [isLoading, setIsLoading] = useState(true)
    const [isChecked, setIsChecked] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    
    const toggleNested = () => {
      setNestedModal(!nestedModal);
      setCloseAll(false);
    }
    const toggleAll = () => {
      setNestedModal(!nestedModal);
      setCloseAll(true);
    }

  //start Cloudinary code
 const [drugImage, setDrugImage] = useState("")

 const uploadImage = async event => {
   const files = event.target.files
   const data = new FormData()
   data.append("file", files[0])
   data.append("upload_preset", "uploadDrugs")
   setIsLoading(true)
   const res = await fetch(
   "http://api.cloudinary.com/v1_1/digj43ynr/image/upload" , {
     method: "POST",
     body: data
   })

   const file = await res.json()
   setDrugImage(file.secure_url)
   setIsLoading(false)
 }
  
  
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

//this is the whole drug entry that will be edited
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
  daysSupply: parseInt(drug.daysSupply),
  nextRefillDate: calculateNextRefill(drug.dateFilled, parseInt(drug.daysSupply)),
  dateInput: drug.dateInput,
  taking: drug.taking,
  refills: parseInt(drug.refills),
  image: drugImage

}

//getting the drug object by id of drug that will be edited in modal
const getIdOfDrug = (event) => {
  ApplicationManager.getDrugById(event.target.id)
      .then( (result) => {
          setDrug(result)
          setIsLoading(false)
      })
  toggleEdit()
}

  //handle field changes for whole drug entry edit functionality
  const handleEditFieldChange = (event) => {
  const stateToChange = {...drug};
  stateToChange[event.target.id] = event.target.value;
  setDrug(stateToChange);  
};

//editing in modal
const handleEditChange = () => {
  setIsLoading(true)
  toggleEdit()
  ApplicationManager.editDrug(editingDrug)
  .then(() => {
      ApplicationManager.getDrugById(editingDrug.id).then((drugFromAPI) => {  
        setDrug(drugFromAPI)
        // editingDrug.taking ? props.history.push("/medication/list") : props.history.push("/medication/history") 
         
      })

   }) 
} 

const calculateTimeLeftUntilRefill = () => {
  let dt1 = new Date(drug.nextRefillDate);
  let dt2 = new Date();
  
  let difference = +dt1 - +dt2
  let timeLeftUntilDate = {}

  if (difference > 0) {
      timeLeftUntilDate= {
          days: Math.ceil(difference / (1000 * 60 * 60 * 24))  
      }
  }
  return timeLeftUntilDate
 
} 

const [timeLeftUntilDate, setTimeLeftUntilDate] = useState(calculateTimeLeftUntilRefill()); 
const oneRefillRemaining = drug.refills === 1 ? true : false
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

Object.keys(timeLeftUntilDate).forEach((interval) => {
    if(!timeLeftUntilDate[interval]) {
        return
    }

    timerInDays.push(
        <span>
           <h5 className={sevenDaysUntilRefill && 'background-yellow'}> <strong>{timeLeftUntilDate[interval]}</strong> {interval} {`until refill or renewal`} </h5> 
        </span>
    )
})


    return (
    
    <>
     <EditMedicationFormModal uploadImage={uploadImage} drug={drug} getIdOfDrug={getIdOfDrug} isLoading={isLoading} setIsLoading={setIsLoading} handleEditFieldChange={handleEditFieldChange} handleEditChange={handleEditChange}
            nestedModal={nestedModal} toggleEdit={toggleEdit} editModal={editModal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} /> 
    <NavBar {...props} />
    <h3>Individual Medication View</h3> 
      <Container fluid className="medicationDetails--container">
        <Row xs="2">
          <Col>
            <Card className="shadow-lg medicationDetails">
              <CardImg className="img-thumbnail-details" src={drug.image} />
              <CardBody>
              {drug.dateFilled === "" ? null :
              <div className="div-countdownToRefill">
              {timerInDays.length ? timerInDays : <h4 className="dueForRefill"> <span> Due for Refill </span> </h4>} 
              </div>
              }
                <CardTitle>
                <div className="div-date-medicationDetails">
                <span><strong>Date Entered: </strong> {drug.dateInput}</span>
                </div>
                <ListGroup className="list-group list-group flex">
                <ListGroupItem className="list-group-item"><strong>Medication Name:</strong> {drug.name}</ListGroupItem>
                <ListGroupItem className="list-group-item"><strong>Medication Strength:</strong> {drug.strength}</ListGroupItem>
                <ListGroupItem className="list-group-item"><strong>Medication Type:</strong> {drug.dosageForm}</ListGroupItem>
                </ListGroup>

                <div className="btn-rxID-container">
                <img role="button" onClick={() => window.open("https://www.drugs.com/imprints.php/", "_blank")} className="btn-rxID" src="https://img.icons8.com/cotton/64/000000/checkmark.png" alt="checkmark-icon"/>
                <Label htmlFor="checkmark-rxID-label"><strong>Pill Identifier</strong></Label>
                </div>
                
                </CardTitle>

                <CardText>
                <ListGroup className="list-group list-group flex">
                <ListGroupItem className="list-group-item"><strong>How Should I Take My Medication?</strong> {drug.directions}</ListGroupItem>
                <ListGroupItem className="list-group-item"><strong>Why am I taking this?</strong> {drug.indication}</ListGroupItem>
                
                {drug.notes === "" ? null : 
                <ListGroupItem className="list-group-item"><strong>Notes:</strong> {drug.notes} </ListGroupItem>     
                }
                </ListGroup>

                <div className="checkbox-alignment">
                <span className="span-checkbox-medicationDetail">
                <Input id="checkbox" type="checkbox" className="checkbox" checked={isChecked} value={drug.taking} onClick={() => handleChange(currentDrugDetail)}
                /> 
                <Label for="checkbox">Save to Medication History</Label>
              </span>
              </div>

                </CardText>
                <hr/>

                <div className="btn-all">
                <Button className="btn-edit" 
                  id={drug.id}
                  type="button"
                  color="success"
                  onClick={getIdOfDrug}
                  >
                  Edit
              </Button>
                <Button className="btn-delete" onClick={() => removeDrug(drug.id)} color="danger">
                Permanently Remove
                </Button>
                </div>

              </CardBody>
          </Card>
      </Col>
 
      <Col>
        <Card className="shadow-lg medicationDetails">
          <CardBody> 
            <CardTitle className="title-prescriptionDetails"> <strong>Prescription Details</strong> </CardTitle>
            <CardText>
            <ListGroup className="list-group list-group">
            <ListGroupItem className="list-group-item"> <strong>RxNumber:</strong> {drug.rxNumber}</ListGroupItem>
            {drug.refills === null ? 
            <ListGroupItem className={'background-red'}> <strong> Refills Remaining: </strong> No refills </ListGroupItem> :
            <ListGroupItem className={oneRefillRemaining && 'background-yellow'}><strong>Refills Remaining:</strong> {drug.refills} </ListGroupItem>}
            <ListGroupItem className="list-group-item"><strong>Last time this was filled:</strong> {drug.dateFilled} </ListGroupItem>     
            <ListGroupItem className="list-group-item"><strong>How long is this going to last me?</strong> {drug.daysSupply} days </ListGroupItem>     
            <ListGroupItem className={sevenDaysUntilRefill || dayOfRefill ? 'background-red' : null}> <strong> When should I fill or renew next? </strong> {drug.nextRefillDate}</ListGroupItem>     
            </ListGroup> 
            </CardText>
          
          <div className="btn-all">
            <Button className="btn-edit" 
                id={drug.id}
                type="button"
                onClick={getIdOfDrug}
                >
                Edit
            </Button>
          </div>
            </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
    
     
 
 
  </>
  
    )
}
export default MedicationDetail
