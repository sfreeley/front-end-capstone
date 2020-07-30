import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import MedicationCard from "./MedicationCard";
import SearchBar from "../search/SearchBar";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";
import AddMedicationFormModal from "../medication/AddMedicationFormModal";
// import EditMedicationFormModal from "../medication/EditMedicationFormModal";
import { currentDateTime } from "../modules/helperFunctions";
import { calculateNextRefill } from "../modules/helperFunctions";


const MedicationList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))

    //modal states
    const [modal, setModal] = useState(false);

    const [editModal, setEditModal] = useState(false)
    
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    
    const toggle = () => setModal(!modal);

    const toggleEdit = () => setEditModal(!editModal)
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
      }
      const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
      }
    
    //edit checkbox value state
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    //display medication cards state
    const [drugs, setDrugs] = useState([]);
    
    //put new drug that will be added into state
    const [newDrug, setNewDrug] = useState({
        userId: sessionUser.id,
        name: "",
        strength: "",
        dosageForm: "",
        directions: "",
        indication: "",
        notes: "",
        rxNumber: "",
        dateFilled: "",
        daysSupply: "",
        nextRefillDate: "",
        taking: true,
        dateInput: ""
    })
   
    

  
    
   //get drugs based on user to display in medication list
   const getDrugs = () => {
    return ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
        setDrugs(drugsFromAPI)
    }).then(drugs.sort((date1, date2)=> setDrugs(new Date(date1.dateInput) - new Date(date2.dateInput)))
    )}

    useEffect(() => {
    getDrugs()
    }, []);

    // adding new drug 
    const handleNewDrug = (event) => {
        event.preventDefault();
        if (newDrug.name === "" || newDrug.strength === "" || newDrug.dosageForm === ""
        || newDrug.directions === "" || newDrug.indication === "") {
            alert("Please fill out required fields")
        } else {
            setIsLoading(true);
            const timestamp = Date.now()
            newDrug.dateInput = currentDateTime(timestamp)
            newDrug.nextRefillDate = calculateNextRefill(newDrug.dateFilled, parseInt(newDrug.daysSupply))
            ApplicationManager.postNewDrug(newDrug).then(() => {
                ApplicationManager.getAllDrugs();
                setNewDrug(newDrug)
                window.location.reload()
            })
            
        }  

    }

    const handleFieldChange = (event) => {
        const stateToChange = {...newDrug};
        stateToChange[event.target.id] = event.target.value;
        console.log(event.target.value)
        setNewDrug(stateToChange);
        
    };

    //edit taking to false and move card to medication hx  
    const handleChange = (drugToEdit) => {
        setIsChecked(true)
        setIsLoading(true)
       
            ApplicationManager.editDrug(drugToEdit)
            .then(() => {
                ApplicationManager.getDrugsForUser(sessionUser.id).then((drugFromAPI) => {
                    setDrugs(drugFromAPI)
                    props.history.push("/medication/history")
            
                })
             }) 
        }
    
   
    const [idEditDrug, setIdEditDrug] = useState("")

    const getIdOfDrug = (drugCardId) => {
        setIdEditDrug(drugCardId)
        toggle()
    }

      //edit whole drug entry state
  const [drug, setDrug] = useState({
    id: "",
    name: "",
    userId: sessionUser.id, 
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

//handle field changes for whole drug entry edit functionality
const handleEditFieldChange = (event) => {
    const stateToChange = {...drug};
    stateToChange[event.target.id] = event.target.value;
    
    setDrug(stateToChange);  
    console.log(event.target.value) 
};

//this is the drug entry that will be edited
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
    nextRefillDate: drug.nextRefillDate,
    dateInput: drug.dateInput,
    taking: drug.taking

}



    useEffect(() => {
        ApplicationManager.getDrugById(props.match.params.drugId)
            .then( (result) => {
                setDrug(result)
                console.log(result)
                    // {
                    // id: result.id,
                    // name: result.name,
                    // userId: sessionUser.id,
                    // strength: result.strength,
                    // dosageForm: result.dosageForm,
                    // directions: result.directions,
                    // indication: result.indication,
                    // notes: result.notes,
                    // rxNumber: result.rxNumber,
                    // dateFilled: result.dateFilled,
                    // daysSupply: result.daysSupply,
                    // nextRefillDate: result.nextRefillDate,
                    // dateInput: result.dateInput,
                    // taking: result.taking
                // }
                
                setIsLoading(false)
            })
        }, []);
        
 //this will take the editingDrug object and update it in database 
 const handleEditChange = (event) => {
    event.preventDefault()
    setIsLoading(true)

    ApplicationManager.editDrug(editingDrug)
    .then(() => {
        ApplicationManager.getDrugsForUser(sessionUser.id).then((drugsFromAPI) => {
            setDrug(drugsFromAPI)
            
        })
     }) 
}    
 

//delete drugs from medication list
    const removeDrug = (id) => {
        ApplicationManager.deleteDrug(id)
        .then(() => {
            ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
                return setDrugs(drugsFromAPI)
            });
        });
    };

    return (
        <>
        <NavBar {...props} />
        <span>
        <SearchBar {...props}/>
        </span>
        <span>
            <img src="https://img.icons8.com/dusk/64/000000/pills.png" alt="addDrug"/>
            <Button onClick={toggle}>
                {'Add New Medication'}
            </Button>
            <AddMedicationFormModal isLoading={isLoading} handleFieldChange={handleFieldChange} handleNewDrug={handleNewDrug} newDrug={newDrug} 
            nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} /> 
            
            {/* <EditMedicationFormModal getIdOfDrug={getIdOfDrug} isLoading={isLoading} setIsLoading={setIsLoading} idEditDrug={idEditDrug} handleEditChange={handleEditChange}
            nestedModal={nestedModal} toggleEdit={toggleEdit} editModal={editModal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} /> */} 
            </span>

        <section className="">
         <h3>Current Medication List</h3>
            <div className="">
                {drugs && drugs.map(drug => drug.taking &&
                    <MedicationCard 
                        key={drug.id}
                        drug={drug}
                        handleEditChange={handleEditChange}
                        getIdOfDrug={getIdOfDrug}
                        isChecked={isChecked}
                        isLoading={isLoading}
                        removeDrug={removeDrug}
                        handleChange={handleChange} 
                        {...props} 
                    /> )} 
            </div>
        
        </section> 
        </>
       
    )
}

export default MedicationList;