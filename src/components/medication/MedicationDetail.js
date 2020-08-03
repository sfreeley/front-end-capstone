import React, { useState, useEffect } from "react";
import NavBar from "../nav/NavBar";
import { Link } from "react-router-dom"
import SearchBar from "../search/SearchBar";
import ApplicationManager from "../modules/ApplicationManager";
import {
    Card, Button, CardImg, CardTitle, CardText, CardDeck, CardBody, UncontrolledCollapse, Container, Row, Col } from 'reactstrap';
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
            taking: true
        
    })
    
    const isMedCurrentlyTaking = drug.taking ? true : false

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
  daysSupply: drug.daysSupply,
  nextRefillDate: calculateNextRefill(drug.dateFilled, parseInt(drug.daysSupply)),
  dateInput: drug.dateInput,
  taking: drug.taking

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
  console.log(event.target.value) 
};

//editing in modal
const handleEditChange = () => {
  setIsLoading(true)
  toggleEdit()
  ApplicationManager.editDrug(editingDrug)
  .then(() => {
      ApplicationManager.getDrugById(editingDrug.id).then((drugFromAPI) => {  
         
                  setDrug(drugFromAPI) 
         
      })

   }) 
}    


    return (
    
    <>
     <EditMedicationFormModal drug={drug} getIdOfDrug={getIdOfDrug} isLoading={isLoading} setIsLoading={setIsLoading} handleEditFieldChange={handleEditFieldChange} handleEditChange={handleEditChange}
            nestedModal={nestedModal} toggleEdit={toggleEdit} editModal={editModal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} /> 
    <NavBar {...props} />
   <h3>Individual Medication View</h3>
      <span><SearchBar {...props} handleChange={handleChange} drugId={drug.id} /> </span>
    
    <Container fluid className="medication-cards d-flex flex-row">
    <CardDeck className="card-style">
    <Col>
        <Row>
        <>
      <Card className="card-item-style-details" >
        <span className="span-medicationDetail">
          <input id="checkbox" type="checkbox" className="checkbox" checked={isChecked} value={drug.taking} onClick={() => handleChange(currentDrugDetail)}
          /> 
          <label for="checkbox">Save to Medication History</label>
         </span>
       
        <CardImg className="img-thumbnail" src={require("../../images/smiling-bottle.png")} alt="medicationBottle" />
        <CardBody>
          <CardTitle>
          <span><strong>Date Entered:</strong> {drug.dateInput}</span>

          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>Medication Name:</strong> {drug.name}</li>
          <li className="list-group-item"><strong>Medication Strength:</strong> {drug.strength}</li>
          <li className="list-group-item"><strong>Medication Type:</strong> {drug.dosageForm}</li>
          </ul>

          <div className="btn-rxID-container">
          <Button className="btn-rxID" onClick={() => window.open("https://www.drugs.com/imprints.php/", "_blank")} type="button">Pill Identifier</Button>
          </div>
          
          </CardTitle>

          <CardText>
          <ul className="list-group list-group flex">
          <li className="list-group-item"><strong>How I Should Take My Medication?</strong> {drug.directions}</li>
          <li className="list-group-item"><strong>Why am I taking this?</strong> {drug.indication}</li>
          
          {drug.notes === "" ? null : 
          <li className="list-group-item"><strong>Notes for me:</strong>: {drug.notes} </li>     
          }
          </ul>
          </CardText>
          <hr/>
          <div className="btn-all">
          <Button className="btn-edit" 
            id={drug.id}
            type="button"
            onClick={getIdOfDrug}
            >
            Edit
        </Button>
          {/* <Link to={`/medication/${drug.id}/edit`}>
                            <Button
                                className="btn-edit"
                                id="editMedication"
                                type="button"
                                >
                                Edit
                            </Button>
                        </Link> */}
          <Button className="btn-delete" onClick={() => removeDrug(drug.id)}>Permanently Remove</Button>
          </div>

        </CardBody>
        {drug.rxNumber === "" && drug.dateFilled === "" && drug.daysSupply === "" ? 
     
        <Button 
          disabled
          className="btn-rx-details"
          color="secondary" 
          id={`drug${drug.id}`} 
          >
          Rx Details
        </Button> :
        <Button
          className="btn-rx-details"
          color="primary" 
          id={`drug${drug.id}`} 
          >
          Rx Details
        </Button>
        } 
      </Card>
        </>
      {drug.rxNumber === "" && drug.dateFilled === "" && drug.daysSupply === "" ? null : 
     <>
      <UncontrolledCollapse toggler={`#drug${drug.id}`}>
      <Card className="card-toggle-style" >
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
        
        <div className="btn-all">
        <Link to={`/medication/${drug.id}/edit`}>
                            <Button 
                                className="editMedication" 
                                id="editMedication"
                                type="button"
                                >
                                Edit
                            </Button>
                        </Link>
        </div>
          {/* <Button onClick={() => removeDrug(drug.id)}>Permanently Remove</Button> */}
          </CardBody>
      </Card>
      </UncontrolledCollapse>
      </>
    }
      </Row>
      
      </Col>
     
    </CardDeck> 
    

  </Container> 
  </>
  
    )
}
export default MedicationDetail
