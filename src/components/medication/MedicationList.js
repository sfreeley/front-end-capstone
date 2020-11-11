import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import MedicationCard from "./MedicationCard";
import SearchBar from "../search/SearchBar";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";
import AddMedicationFormModal from "../medication/AddMedicationFormModal";
import EditMedicationFormModal from "../medication/EditMedicationFormModal";
import { currentDateTime } from "../modules/helperFunctions";
import { calculateNextRefill } from "../modules/helperFunctions";
import { Container, CardDeck, Button } from "reactstrap"
import "./styles/MedicationList.css"

const MedicationList = (props) => {

    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const timestamp = Date.now()

    //modal states
    const [modal, setModal] = useState(false);

    const [editModal, setEditModal] = useState(false)

    const [nestedModal, setNestedModal] = useState(false);

    const [closeAll, setCloseAll] = useState(false);

    const toggle = () => {
        setNewDrug({
            userId: sessionUser.id,
            pharmacyId: null,
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
            dateInput: "",
            refills: "",
            image: drugImage
        })
        setModal(!modal);


    }

    const toggleEdit = () => setEditModal(!editModal)
    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);

    }
    const toggleAll = () => {
        setNestedModal(!nestedModal);

    }


    //edit checkbox value state
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //display medication cards state
    const [drugs, setDrugs] = useState([])

    //start Cloudinary code
    const [drugImage, setDrugImage] = useState("")

    const uploadImage = async event => {
        const files = event.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "uploadDrugs")
        setIsLoading(true)
        const res = await fetch(
            "http://api.cloudinary.com/v1_1/digj43ynr/image/upload", {
            method: "POST",
            body: data
        })

        const file = await res.json()
        setDrugImage(file.secure_url)
        setIsLoading(false)
    }

    // end cloudinary code 

    //put new drug that will be added into state
    const [newDrug, setNewDrug] = useState({
        userId: sessionUser.id,
        pharmacyId: null,
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
        dateInput: "",
        refills: "",
        image: drugImage

    })

    const [pharmaciesWithDrugs, setPharmacies] = useState([]);
    const [pharmacyList, setPharmacyList] = useState([]);


    //get drugs based on user to display in medication list and sort by earliest upcoming refill date
    const getDrugs = () => {
        return ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
            const sortDrugsByDate = drugsFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
            setDrugs(sortDrugsByDate)

        })

    }

    const newMed = {
        userId: sessionUser.id,
        pharmacyId: parseInt(newDrug.pharmacyId),
        name: newDrug.name,
        strength: newDrug.strength,
        dosageForm: newDrug.dosageForm,
        directions: newDrug.directions,
        indication: newDrug.indication,
        notes: newDrug.notes,
        rxNumber: newDrug.rxNumber,
        dateFilled: newDrug.dateFilled,
        daysSupply: parseInt(newDrug.daysSupply),
        nextRefillDate: calculateNextRefill(newDrug.dateFilled, parseInt(newDrug.daysSupply)),
        taking: true,
        refills: parseInt(newDrug.refills),
        dateInput: currentDateTime(timestamp),
        image: drugImage
    }

    // adding new drug 
    const handleAddNewDrug = (event) => {

        event.preventDefault();
        if (newDrug.name === "" || newDrug.strength === "" || newDrug.dosageForm === ""
            || newDrug.directions === "" || newDrug.indication === "" || newDrug.dateFilled === "" ||
            newDrug.daysSupply === "") {
            alert("Please fill out required fields")
        } else {
            setIsLoading(true);

            ApplicationManager.postNewDrug(newMed).then(() => {
                ApplicationManager.getDrugsForUser(sessionUser.id).then(drugs => {
                    const sortDrugsByDate = drugs.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
                    setDrugs(sortDrugsByDate)

                    toggle();

                })
            })


        }
        setIsLoading(false);
    }

    useEffect(() => {
        getDrugs();
        getPharmaciesForForm();
        getPharmaciesWithDrugs();

    }, []);

    //handling input field for posting new drug
    const handleFieldChange = (event) => {
        const stateToChange = { ...newDrug };
        stateToChange[event.target.id] = event.target.value;
        setNewDrug(stateToChange);

    };

    //handling pharmacy dropdown state
    const handlePharmacyDropdown = (e) => {
        const stateToChange = { ...newDrug };
        stateToChange[e.target.id] = e.target.value;
        setNewDrug(stateToChange);
        console.log(e.target.value)
    };

    //handling pharmacy dropdown state
    const handlePharmacyDropdownEdit = (e) => {
        const stateToChange = { ...drug };
        stateToChange[e.target.id] = e.target.value;
        setDrug(stateToChange);
        console.log(e.target.value)
    };


    //edit taking to false and move card to medication hx  
    const handleChange = (drugToEdit) => {
        setIsChecked(true)
        setIsLoading(true)
        ApplicationManager.editDrug(drugToEdit)
            .then(() => {
                ApplicationManager.getDrugsForUser(sessionUser.id).then((drugsFromAPI) => {
                    setDrugs(drugsFromAPI)
                    setIsChecked(false)
                    setIsLoading(false)
                    props.history.push("/medication/history")
                })
            })
    }

    //edit whole drug entry state
    const [drug, setDrug] = useState({
        id: "",
        name: "",
        userId: sessionUser.id,
        pharmacyId: null,
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
        taking: true,
        image: drugImage,

    })

    //handle field changes for whole drug entry edit functionality
    const handleEditFieldChange = (event) => {
        const stateToChange = { ...drug };
        stateToChange[event.target.id] = event.target.value;
        setDrug(stateToChange);
    };

    //this is the whole drug entry that will be edited
    const editingDrug = {
        id: drug.id,
        name: drug.name,
        userId: sessionUser.id,
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
        dateInput: drug.dateInput,
        taking: drug.taking,
        refills: parseInt(drug.refills),
        image: drugImage
    }

    //getting the drug object by id of drug that will be edited in modal
    const getIdOfDrug = (event) => {

        ApplicationManager.getDrugById(event.target.id)
            .then((result) => {
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
                    const sortDrugsByDate = drugsFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
                    setDrugs(sortDrugsByDate);
                    !editingDrug.taking && props.history.push("/medication/history");
                })
            })
    }

    //delete drugs from medication list
    const removeDrug = (id) => {
        ApplicationManager.deleteDrug(id)
            .then(() => {
                ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
                    const sortDrugsByDate = drugsFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
                    setDrugs(sortDrugsByDate)

                });
            });
    };

    //delete drug from medication hx list when searching
    const removeDrugFromHxList = (id) => {
        ApplicationManager.deleteDrug(id)
            .then(() => {
                ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
                    setDrugs(drugsFromAPI)
                    props.history.push("/medication/history")
                });
            });
    };

    //pharmacy section

    const getPharmaciesWithDrugs = () => {
        ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(dataFromAPI => {
            const sortDrugsByDate = dataFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
            setPharmacies([...new Set(sortDrugsByDate)])
        })
    }

    const getPharmaciesForForm = () => {
        ApplicationManager.getAllPharmaciesForUser(sessionUser.id).then(dataFromAPI => setPharmacyList(dataFromAPI))
    }


    return (
        <>
            <NavBar {...props} />
            <div className="headingContainer-medicationList">
                <span className="span-addDrug-container">
                    <img role="button" onClick={toggle} className="img-addDrug" src="https://img.icons8.com/dotty/80/000000/doctors-folder.png" alt="addDrug" />
                </span>
                <div className="addMedication-image--label">
                    <Label htmlFor="addMedication-image"><h5>Add New Medication</h5></Label>
                </div>
                <AddMedicationFormModal handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} drugImage={drugImage} uploadImage={uploadImage} isLoading={isLoading} setIsLoading={setIsLoading} handleFieldChange={handleFieldChange} handleAddNewDrug={handleAddNewDrug} newDrug={newDrug}
                    nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />

                <EditMedicationFormModal handlePharmacyDropdownEdit={handlePharmacyDropdownEdit} pharmacyList={pharmacyList} drugImage={drugImage} uploadImage={uploadImage} drug={drug} getIdOfDrug={getIdOfDrug} isLoading={isLoading} setIsLoading={setIsLoading} handleEditFieldChange={handleEditFieldChange} handleEditChange={handleEditChange}
                    nestedModal={nestedModal} toggleEdit={toggleEdit} editModal={editModal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />

                <h2>Current Medication List</h2>
            </div>

            <SearchBar className="searchBar-medicationList" {...props} getDrugs={getDrugs} removeDrug={removeDrug} removeDrugFromHxList={removeDrugFromHxList} toggleEdit={toggleEdit} drug={drug} getIdOfDrug={getIdOfDrug} handleEditChange={handleEditChange} editingDrug={editingDrug} handleChange={handleChange} isChecked={isChecked} setIsChecked={setIsChecked}
            />
            <Button onClick={() => props.history.push("/medication/pharmacies")}>Pharmacy List</Button>
            <Container className="section-currentMedicationList--container">
                <CardDeck xs="4" >

                    {pharmaciesWithDrugs && pharmaciesWithDrugs.map(drug => drug.taking &&
                        <MedicationCard
                            key={drug.id}
                            drug={drug}
                            handleEditChange={handleEditChange}
                            getIdOfDrug={getIdOfDrug}
                            isChecked={isChecked}
                            isLoading={isLoading}
                            removeDrug={removeDrug}
                            handleChange={handleChange}

                        />)}

                </CardDeck>
            </Container>

        </>

    )
}

export default MedicationList;