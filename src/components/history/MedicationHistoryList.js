import React, { useState, useEffect } from "react";
import MedicationHistoryCard from "./MedicationHistoryCard";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";
import SearchBar from "../search/SearchBar";
import { calculateNextRefill } from "../modules/helperFunctions";
import EditMedicationFormModal from "../medication/EditMedicationFormModal";
import { Container, CardDeck } from "reactstrap";
import "./styles/MedicationHistoryList.css";

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
    //controls showing of upload image button (will not be able to edit if in med hx list)
    const [movingToHx, setMovingToHx] = useState(false);
    const [pharmacyList, setPharmacyList] = useState([]);
    const [pharmaciesWithDrugs, setPharmacies] = useState([]);

    //get drugs based on user
    const getDrugs = () => {

        return ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsFromAPI => {
            const sortHistoryDrugs = drugsFromAPI.sort((date1, date2) => new Date(date1.dateInput) - new Date(date2.dateInput))
            setPharmacies(sortHistoryDrugs)
        })
    }

    useEffect(() => {
        getDrugs();
        getPharmaciesForForm();
    }, []);

    //edit taking to true to bring it back to medication list   
    const handleChange = (drugToEdit) => {
        setIsChecked(true)
        setIsLoading(true)
        ApplicationManager.editDrug(drugToEdit)
            .then(() => {
                ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then((drugsFromAPI) => {
                    setPharmacies(drugsFromAPI)
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
        refills: parseInt(drug.refills),
        taking: drug.taking

    }

    //getting the drug object by id of drug that will be edited in modal
    const getIdOfDrug = (event) => {
        ApplicationManager.getDrugById(event.target.id)
            .then((result) => {
                setDrug(result)
                setIsLoading(false)
            })
        toggleEdit()
        setMovingToHx(true)
    }


    //editing in modal
    const handleEditChange = () => {
        setIsLoading(true)
        toggleEdit()
        ApplicationManager.editDrug(editingDrug)
            .then(() => {
                ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then((drugsFromAPI) => {
                    const sortHistoryDrugs = drugsFromAPI.sort((date1, date2) => new Date(date1.dateInput) - new Date(date2.dateInput))
                    setPharmacies(sortHistoryDrugs)
                    editingDrug.taking && props.history.push("/medication/list")

                })
            })
    }

    //end edit whole drug in modal


    //delete drugs from medication hx list
    const removeDrugFromHxList = (id) => {
        ApplicationManager.deleteDrug(id)
            .then(() => {
                ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsFromAPI => {
                    const sortHistoryDrugs = drugsFromAPI.sort((date1, date2) => new Date(date1.dateInput) - new Date(date2.dateInput))
                    setPharmacies(sortHistoryDrugs)
                });
            });
    };

    //delete drugs from medication list from search result
    const removeDrug = (id) => {
        ApplicationManager.deleteDrug(id)
            .then(() => {
                ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsFromAPI => {
                    const sortDrugsByDate = drugsFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
                    setPharmacies(sortDrugsByDate)
                    props.history.push("/medication/list")

                });
            });
    };

    //get drug with pharmacy
    const getPharmaciesForForm = () => {
        ApplicationManager.getAllPharmaciesForUser(sessionUser.id).then(dataFromAPI => setPharmacyList(dataFromAPI))
    }

    return (
        <>
            <NavBar {...props} />
            <EditMedicationFormModal pharmacyList={pharmacyList} movingToHx={movingToHx} drug={drug} getIdOfDrug={getIdOfDrug} isLoading={isLoading} setIsLoading={setIsLoading} handleEditFieldChange={handleEditFieldChange} handleEditChange={handleEditChange}
                nestedModal={nestedModal} toggleEdit={toggleEdit} editModal={editModal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll} />

            <h3>Medication History</h3>
            <SearchBar {...props} handleChange={handleChange} handleEditChange={handleEditChange} getIdOfDrug={getIdOfDrug} removeDrug={removeDrug} removeDrugFromHxList={removeDrugFromHxList} editingDrug={editingDrug} drug={drug} getDrugs={getDrugs} />

            <Container className="section-historicalMedicationList--container">
                <CardDeck xs="4">
                    {pharmaciesWithDrugs && pharmaciesWithDrugs.map(drug => !drug.taking && <MedicationHistoryCard
                        key={drug.id}
                        drug={drug}
                        handleChange={handleChange}
                        isLoading={isLoading}
                        isChecked={isChecked}
                        getIdOfDrug={getIdOfDrug}
                        removeDrugFromHxList={removeDrugFromHxList}
                        {...props}
                    />
                    )}
                </CardDeck>
            </Container>
        </>

    )
}
export default MedicationHistoryList