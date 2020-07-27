import React, { useState, useEffect } from "react";
import MedicationCard from "./MedicationCard";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";

const MedicationList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [drugs, setDrugs] = useState([]);
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

     //edit taking to false   
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
        <NavBar {...props} drugs={drugs} />
        <section className="">
        <div className="">
            <h3>Current Medication List</h3>
            <div className="">
                {drugs && drugs.map(drug => drug.taking &&
                    <MedicationCard 
                        key={drug.id}
                        drug={drug}
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