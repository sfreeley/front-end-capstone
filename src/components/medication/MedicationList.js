import React, { useState, useEffect } from "react";
import MedicationCard from "./MedicationCard";
import SearchBar from "../search/SearchBar";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";

const MedicationList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [drugs, setDrugs] = useState([]);
    // const [editDrug, setEditDrug] = useState({
    //         id: "",
    //         name: "",
    //         userId: "", 
    //         strength: "",
    //         dosageForm: "", 
    //         directions: "",
    //         indication: "",
    //         notes: "",
    //         rxNumber: "", 
    //         dateFilled: "", 
    //         daysSupply: "", 
    //         nextRefillDate: "", 
    //         dateInput: "",
    //         taking: true
    // })
    const [isChecked, setIsChecked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    console.log(drugs)

    //get drugs based on user
    const getDrugs = () => {
        return ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
            setDrugs(drugsFromAPI)
        }).then(drugs.sort((date1, date2)=> setDrugs(new Date(date1.dateInput) - new Date(date2.dateInput)))
    )}

     useEffect(() => {
        getDrugs()
    }, []);

    //delete drugs from medication list
    const removeDrug = (id) => {
        ApplicationManager.deleteDrug(id)
        .then(() => {
            ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
                return setDrugs(drugsFromAPI)
            });
        });
    };

    // let drugToEdit = {...editDrug, taking: false}
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


    return (
        <>
        <NavBar {...props} />
        <span>
        <SearchBar {...props}/>
        </span>
        <section className="">
        <div className="">
            <h3>Current Medication List</h3>
            <div className="">
                {drugs && drugs.map(drug => drug.taking &&
                    <MedicationCard 
                        key={drug.id}
                        drug={drug}
                        // editDrug={editDrug}
                        // drugToEdit={drugToEdit}
                        isChecked={isChecked}
                        isLoading={isLoading}
                        removeDrug={removeDrug}
                        handleChange={handleChange} 
                        {...props} 
                    /> )} 
            </div>
        </div>
        </section> 
        </>
       
    )
}

export default MedicationList;