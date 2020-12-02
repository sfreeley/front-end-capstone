import React, { useState, useEffect } from "react";
import { Label } from "reactstrap";
import NavBar from "../nav/NavBar";
import MedicationFormModal from "../medication/MedicationFormModal";
import ApplicationManager from "../modules/ApplicationManager";
import { currentDateTime } from "../modules/helperFunctions";
import { calculateNextRefill } from "../modules/helperFunctions";
import SearchBar from "../search/SearchBar";

const Home = (props) => {
    // const { drug, handlePharmacyDropdown, pharmacyList, uploadImage, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll } = props;
    const hasUser = props.hasUser
    const clearUser = props.clearUser
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))

    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    //modal states
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [closeAll, setCloseAll] = useState(false);
    const toggle = () => {
        setDrug({
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
            "http://api.cloudinary.com/v1_1/digj43ynr/image/upload", {
            method: "POST",
            body: data
        })

        const file = await res.json()
        setDrugImage(file.secure_url)
        setIsLoading(false)
    }


    //display medication cards state
    const [drugs, setDrugs] = useState([])
    const [pharmacyList, setPharmacyList] = useState([]);

    //get drugs based on user to display in medication list and sort by earliest upcoming refill date
    const getDrugs = () => {
        return ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsFromAPI => {
            const sortDrugsByDate = drugsFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
            setDrugs(sortDrugsByDate)

        })

    }

    useEffect(() => {
        getDrugs()
        getPharmaciesForForm()
    }, []);


    const getPharmaciesForForm = () => {
        ApplicationManager.getAllPharmaciesForUser(sessionUser.id).then(dataFromAPI => setPharmacyList(dataFromAPI))
    }

    //handling pharmacy dropdown state
    const handlePharmacyDropdown = (e) => {
        const stateToChange = { ...drug };
        stateToChange[e.target.id] = e.target.value;
        setDrug(stateToChange);
        console.log(e.target.value)
    };

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
        taking: true
    })

    //this is the whole drug entry that will be edited
    const editingDrug = {
        id: drug.id,
        name: drug.name,
        userId: sessionUser.id,
        pharmacyId: drug.pharmacyId,
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
        refills: parseInt(drug.refills),
        taking: drug.taking

    }

    //edit med hx checkbox 
    const handleChange = (drugToEdit) => {
        setIsChecked(true)
        setIsLoading(true)

        ApplicationManager.editDrug(drugToEdit)
            .then(() => {
                ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then((drugsFromAPI) => {
                    setDrugs(drugsFromAPI)
                    setIsChecked(false)
                    drugToEdit.taking ? props.history.push("/medication/list") : props.history.push("/medication/history")
                })
            })
    }

    //getting the drug object by id of drug that will be edited in modal
    const getIdOfDrug = (event) => {
        ApplicationManager.getDrugById(event.target.id)
            .then((result) => {
                setDrug(result)
                setIsLoading(false)
            })
        toggle()
    }

    const handleFieldChange = (event) => {
        const stateToChange = { ...drug };
        stateToChange[event.target.id] = event.target.value;
        setDrug(stateToChange);
    };

    const handleDrugForm = (event) => {
        event.preventDefault();
        if (drug.name === "" || drug.strength === "" || drug.dosageForm === ""
            || drug.directions === "" || drug.indication === "") {
            alert("Please fill out required fields")
        }
        else if (getIdOfDrug) {
            ApplicationManager.editDrug(editingDrug)
                .then(() => {
                    ApplicationManager.getDrugById(editingDrug.id).then((drugFromAPI) => {
                        setDrug(drugFromAPI)
                        drugFromAPI.taking ? props.history.push("/medication/list") : props.history.push("medication/history")
                    })

                })
        }
        else {
            setIsLoading(true);
            const timestamp = Date.now()
            const newMed = {
                userId: sessionUser.id,
                name: drug.name,
                pharmacyId: drug.pharmacyId,
                strength: drug.strength,
                dosageForm: drug.dosageForm,
                directions: drug.directions,
                indication: drug.indication,
                notes: drug.notes,
                rxNumber: drug.rxNumber,
                dateFilled: drug.dateFilled,
                daysSupply: parseInt(drug.daysSupply),
                nextRefillDate: calculateNextRefill(drug.dateFilled, parseInt(drug.daysSupply)),
                taking: true,
                dateInput: currentDateTime(timestamp),
                refills: parseInt(drug.refills),
                image: drugImage
            }

            ApplicationManager.postNewDrug(newMed).then(() => {
                ApplicationManager.getAllDrugs();
                props.history.push("/medication/list")
            })
        }
    }

    //delete drugs from medication list upon search for medication card
    const removeDrug = (id) => {
        ApplicationManager.deleteDrug(id)
            .then(() => {
                ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsFromAPI => {
                    setDrugs(drugsFromAPI)
                    props.history.push("/medication/list")
                });
            });
    };


    //delete drugs from medication hx list upon search for medication hx card
    const removeDrugFromHxList = (id) => {
        ApplicationManager.deleteDrug(id)
            .then(() => {
                ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsFromAPI => {
                    setDrugs(drugsFromAPI)
                    props.history.push("/medication/history")
                });
            });
    };

    return (
        <>
            <NavBar hasUser={hasUser} clearUser={clearUser} />
            <div>
                <span className="span-addDrug-container">
                    <img role="button" onClick={toggle} className="img-addDrug" src="https://img.icons8.com/dotty/80/000000/doctors-folder.png" alt="addDrug" />
                </span>
                <div className="addMedication-image--label">
                    <Label htmlFor="addMedication-image"><h5>Add New Medication</h5></Label>
                </div>

                <SearchBar setDrugs={setDrugs} removeDrug={removeDrug} removeDrugFromHxList={removeDrugFromHxList} getIdOfDrug={getIdOfDrug} handleChange={handleChange} setIsChecked={setIsChecked} isChecked={isChecked} />
                <MedicationFormModal handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} uploadImage={uploadImage} isLoading={isLoading} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm} drug={drug}
                    getIdOfDrug={getIdOfDrug} nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />
            </div>
        </>
    )
}
export default Home