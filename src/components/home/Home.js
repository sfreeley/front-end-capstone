import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import NavBar from "../nav/NavBar";
import AddMedicationFormModal from "../medication/AddMedicationFormModal";
import ApplicationManager from "../modules/ApplicationManager";
import { currentDateTime } from "../modules/helperFunctions";
import { calculateNextRefill } from "../modules/helperFunctions";
import SearchBar from "../search/SearchBar";
import EditMedicationFormModal from "../medication/EditMedicationFormModal"


const Home = (props) => {
    const hasUser = props.hasUser
    const clearUser = props.clearUser
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const toggle = () => setModal(!modal);
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    }
    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    }

    const toggleEdit = () => setEditModal(!editModal)
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

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
        console.log(newDrug.image)
        console.log(drugImage)
      }

    //add 
    const [newDrug, setNewDrug] = useState({
        id: "",
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
        refills: "",
        dateInput: ""
    }) 

 //display medication cards state
 const [drugs, setDrugs] = useState([])

  //get drugs based on user to display in medication list and sort by earliest upcoming refill date
  const getDrugs = () => {
    return ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
        const sortDrugsByDate = drugsFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
        setDrugs(sortDrugsByDate) 
        // setIsNextRefill(true) 
        
    })
    
}

useEffect(() => {
    getDrugs()
   
    }, []);


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
    refills: "",
    taking: true
})
console.log(drug)

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
    refills: parseInt(drug.refills),
    taking: drug.taking

}

    //editing in modal
const handleEditChange = () => {
    setIsLoading(true)
    toggleEdit()
    ApplicationManager.editDrug(editingDrug)
    .then(() => {
        ApplicationManager.getDrugById(editingDrug.id).then((drugFromAPI) => {  
           
                    setDrug(drugFromAPI) 
                    drugFromAPI.taking ? props.history.push("/medication/list") : props.history.push("medication/history")
                   
           
        })

     }) 

}   

//handle field changes for whole drug entry edit functionality
const handleEditFieldChange = (event) => {
    const stateToChange = {...drug};
    stateToChange[event.target.id] = event.target.value;
    setDrug(stateToChange);  
    console.log(event.target.value) 
};

 //edit med hx  
 const handleChange = (drugToEdit) => {
    setIsChecked(true)
    setIsLoading(true)
   
        ApplicationManager.editDrug(drugToEdit)
        .then(() => {
            ApplicationManager.getDrugsForUser(sessionUser.id).then((drugsFromAPI) => {
                
                setDrugs(drugsFromAPI)
                setIsChecked(false)
                !drugsFromAPI.taking ? props.history.push("/medication/list") : props.history.push("/medication/history")
    
               
            })
         })
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


    const handleFieldChange = (event) => {
        const stateToChange = { ...newDrug };
        stateToChange[event.target.id] = event.target.value;
        console.log(event.target.value)
        setNewDrug(stateToChange);

    };

    const handleAddNewDrug = (event) => {
        event.preventDefault();
        if (newDrug.name === "" || newDrug.strength === "" || newDrug.dosageForm === ""
            || newDrug.directions === "" || newDrug.indication === "") {
            alert("Please fill out required fields")
        } else {
            setIsLoading(true);
            const timestamp = Date.now()
            const newMed = {
                userId: sessionUser.id,
                name: newDrug.name,
                strength: newDrug.strength,
                dosageForm: newDrug.dosageForm,
                directions: newDrug.directions,
                indication: newDrug.indication,
                notes: newDrug.notes,
                rxNumber: newDrug.rxNumber,
                dateFilled: newDrug.dateFilled,
                daysSupply: newDrug.daysSupply,
                nextRefillDate: calculateNextRefill(newDrug.dateFilled, parseInt(newDrug.daysSupply)),
                taking: true,
                dateInput: currentDateTime(timestamp),
                refills: parseInt(newDrug.refills),
                image: drugImage
            } 
            
            // newDrug.dateInput = currentDateTime(timestamp)
            // newDrug.nextRefillDate = calculateNextRefill(newDrug.dateFilled, parseInt(newDrug.daysSupply))
            ApplicationManager.postNewDrug(newMed).then(() => {
                ApplicationManager.getAllDrugs();
                props.history.push("/medication/list")
            })
        }
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
            <NavBar {...props} hasUser={hasUser} clearUser={clearUser} />
            <div> 
            <span className="span-addDrug-container">
                <img className="img-addDrug" src="https://img.icons8.com/office/40/000000/plus-math.png" alt="addDrug"/>
                <Button className="btn-addMedication" onClick={toggle}>
                    {'Add New Medication'}
                </Button>
            </span>

            <SearchBar {...props}  setDrugs={setDrugs} removeDrug={removeDrug} getIdOfDrug={getIdOfDrug} handleChange={handleChange} setIsChecked={setIsChecked} />
            <AddMedicationFormModal uploadImage={uploadImage} isLoading={isLoading} handleFieldChange={handleFieldChange} handleAddNewDrug={handleAddNewDrug} newDrug={newDrug}
                nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} /> 

            <EditMedicationFormModal drugs={drugs} drug={drug} editingDrug={editingDrug} getIdOfDrug={getIdOfDrug} isLoading={isLoading} setIsLoading={setIsLoading} handleEditFieldChange={handleEditFieldChange} handleEditChange={handleEditChange}
            nestedModal={nestedModal} toggleEdit={toggleEdit} editModal={editModal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />
            </div>
        </>
    )
}
export default Home