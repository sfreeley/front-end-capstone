import React, { useState, useEffect } from 'react';
import ApplicationViews from "./ApplicationViews";
import ApplicationManager from "./components/modules/ApplicationManager";
import { currentDateTime } from "./components/modules/helperFunctions";
import { calculateNextRefill } from "./components/modules/helperFunctions";
import { useHistory } from "react-router-dom";
import NavBar from "../src/components/nav/NavBar";
import Login from "./components/auth/Login";
import './App.css';

const TrackRx = () => {
  const isAuthenticated = () => sessionStorage.getItem("user") !== null;

  const [hasUser, setHasUser] = useState(isAuthenticated());

  const setUser = user => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setHasUser(isAuthenticated());
  };

  const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  const history = useHistory();

  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //start Cloudinary code
  const [imageName, setImageName] = useState("");
  const [imageDesc, setImageDesc] = useState("");

  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === 'success') {
      setImageName(resultEvent.info.secure_url)
      setImageDesc(resultEvent.info.original_filename)
    }
  };

  const renderWidget = () => {
    let widget = window.cloudinary.createUploadWidget({
      cloudName: "digj43ynr",
      uploadPreset: "uploadDrugs"
    },
      (error, result) => { checkUploadResult(result) })

    widget.open();
  };

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
      image: ""
    })
    setModal(!modal);
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  //display medication cards state
  const [drugs, setDrugs] = useState([])
  //individual drug state
  const [drug, setDrug] = useState({
    id: "",
    name: "",
    userId: sessionUser && sessionUser.id,
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
    image: imageName
  })
  //display pharmacy list in dropdown
  const [pharmacyList, setPharmacyList] = useState([]);

  //get drugs based on user to display in medication list and sort by earliest upcoming refill date
  const getDrugs = () => {
    if (sessionUser !== null) {
      return ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsFromAPI => {
        const sortDrugsByDate = drugsFromAPI.sort((date1, date2) => new Date(date1.nextRefillDate) - new Date(date2.nextRefillDate))
        setDrugs(sortDrugsByDate)
      })
    }
  }

  const getPharmaciesForForm = () => {
    if (sessionUser !== null) {
      ApplicationManager.getAllPharmaciesForUser(sessionUser.id).then(dataFromAPI => setPharmacyList(dataFromAPI))
    }
  };

  useEffect(() => {
    getDrugs()
    getPharmaciesForForm()
  }, []);

  //handling pharmacy dropdown state in medication modal
  const handlePharmacyDropdown = (e) => {
    const stateToChange = { ...drug };
    stateToChange[e.target.id] = e.target.value;
    setDrug(stateToChange);
    console.log(e.target.value)
  };

  //getting the drug object by id of drug that will be edited in modal
  const getIdOfDrug = (event) => {
    ApplicationManager.getDrugById(event.target.id)
      .then((result) => {
        setDrug(result)
        setIsLoading(false)
      })
    toggle()
  };

  //medication form field change handler
  const handleFieldChange = (event) => {
    const stateToChange = { ...drug };
    stateToChange[event.target.id] = event.target.value;
    console.log(stateToChange)
    setDrug(stateToChange);
  };

  //this is the whole drug entry that will be edited
  const editingDrug = {
    id: drug.id,
    name: drug.name,
    userId: sessionUser && sessionUser.id,
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
    taking: drug.taking,
    image: imageName
  };

  //once 'save' button clicked on medication card, function handles whether it adds or edits
  const handleDrugForm = (event) => {
    event.preventDefault();
    if (drug.name === "" || drug.strength === "" || drug.dosageForm === ""
      || drug.directions === "" || drug.indication === "") {
      alert("Please fill out required fields")
    }
    else {
      if (drug.id !== undefined) {
        ApplicationManager.editDrug(editingDrug)
          .then(() => {
            ApplicationManager.getDrugByIdWithPharmacy(editingDrug.id).then((drugFromAPI) => {
              toggle();
              setDrug(drugFromAPI)
              if (window.location.pathname === "/") {
                getDrugs();
                drugFromAPI.taking ? history.push("/medication/list") : history.push("medication/history")
              }
              else if (window.location.pathname === "/medication/list" || window.location.pathname === "/medication/history") {
                getDrugs();
              }
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
          image: imageName
        }
        ApplicationManager.postNewDrug(newMed).then(() => {
          getDrugs();
          toggle();
          if (window.location.pathname === "/") history.push("/medication/list")

        })
      }
    }
  };

  //edit taking to false if true and vice versa and move card back and forth from med hx to med list
  const handleChange = (drugToEdit) => {
    setIsChecked(true)
    setIsLoading(true)
    if (drugToEdit.taking === true) {
      drugToEdit.taking = false
    }
    else {
      drugToEdit.taking = true
    }
    ApplicationManager.editDrug(drugToEdit)
      .then(() => {
        getDrugs();
        setIsChecked(false)
        setIsLoading(false)
        drugToEdit.taking ? history.push("/medication/list") : history.push("/medication/history")
      })
  };

  //delete drugs from medication list upon search for medication card
  const removeDrug = (id) => {
    ApplicationManager.deleteDrug(id)
      .then(() => {
        ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsFromAPI => {
          setDrugs(drugsFromAPI)
          history.push("/medication/list")
        });
      });
  };


  return (

    <div className="applicationViews">
      <ApplicationViews
        hasUser={hasUser}
        setUser={setUser}
        drug={drug} drugs={drugs}
        handlePharmacyDropdown={handlePharmacyDropdown} pharmacyList={pharmacyList} handleFieldChange={handleFieldChange} handleDrugForm={handleDrugForm}
        nestedModal={nestedModal} toggle={toggle} modal={modal} toggleNested={toggleNested} toggleAll={toggleAll} closeAll={closeAll}
        handleChange={handleChange} getIdOfDrug={getIdOfDrug} removeDrug={removeDrug} isChecked={isChecked}
        imageName={imageName} imageDesc={imageDesc} renderWidget={renderWidget}
      />

    </div>

  )

}


export default TrackRx;
