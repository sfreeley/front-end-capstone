import React, { useState, useEffect } from "react";
import MedicationHistoryCard from "./MedicationHistoryCard";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";
import SearchBar from "../search/SearchBar";
import { calculateNextRefill } from "../modules/helperFunctions";
import EditMedicationFormModal from "../medication/EditMedicationFormModal";

const MedicationHistoryList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [drugs, setDrugs] = useState([]);
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false);

    const toggleEdit = () => setEditModal(!editModal)
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
      }
      const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
      }

    const [closeAll, setCloseAll] = useState(false);

    //get drugs based on user
    const getDrugs = () => {
        return ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
            const sortHistoryDrugs = drugsFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
            setDrugs(sortHistoryDrugs)  
        })  
    }
   
     useEffect(() => {
        getDrugs()
    }, []);

    //edit taking to true to bring it back to medication list   
    const handleChange = (drugToEdit) => {
        setIsChecked(true)
        setIsLoading(true)
        ApplicationManager.editDrug(drugToEdit)
        .then(() => {
            ApplicationManager.getDrugsForUser(sessionUser.id).then((drugsFromAPI) => {
                setDrugs(drugsFromAPI)
                props.history.push("/medication/list")
    
            })
            
        })
     }

    //  start of edit whole drug with modal
      
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
console.log(drug)

//handle field changes for whole drug entry edit functionality
const handleEditFieldChange = (event) => {
    const stateToChange = {...drug};
    stateToChange[event.target.id] = event.target.value;
    setDrug(stateToChange);  
    console.log(event.target.value) 
};

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
        
 
//editing in modal
const handleEditChange = () => {
    setIsLoading(true)
    toggleEdit()
    ApplicationManager.editDrug(editingDrug)
    .then(() => {
        ApplicationManager.getDrugsForUser(sessionUser.id).then((drugsFromAPI) => {  
           
                    setDrugs(drugsFromAPI) 
           
        })

     }) 
} 

//end edit whole drug


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
        
        <section className="">
        <EditMedicationFormModal drug={drug} getIdOfDrug={getIdOfDrug} isLoading={isLoading} setIsLoading={setIsLoading} handleEditFieldChange={handleEditFieldChange} handleEditChange={handleEditChange}
            nestedModal={nestedModal} toggleEdit={toggleEdit} editModal={editModal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} /> 
            <div className="">
                 <div className="">
                 <h3>Medication History</h3>
                 <span> <SearchBar {...props} handleChange={handleChange} /> </span>
                    {drugs && drugs.map(drug => !drug.taking && <MedicationHistoryCard 
                    key={drug.id}
                    drug={drug}
                    handleChange={handleChange}
                    isLoading={isLoading}
                    isChecked={isChecked}
                    getIdOfDrug={getIdOfDrug}
                    removeDrug={removeDrug}
                    {...props} 
                    />  
                    )}
                 </div>
            </div>
        </section> 
    </>
        
    )
}
export default MedicationHistoryList