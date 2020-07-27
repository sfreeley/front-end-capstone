import React, { useState, useEffect } from "react";
import MedicationHistoryCard from "./MedicationHistoryCard";
import MedicationCard from "../medication/MedicationCard";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";

const MedicationHistoryList = (props) => {
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

    //edit taking to true to bring it back to medication list   
    const handleChange = (drugToEdit) => {
        setIsChecked(true)
        setIsLoading(true)
        ApplicationManager.editDrug(drugToEdit)
        .then(() => {
            ApplicationManager.getDrugsForUser(sessionUser.id).then((drugFromAPI) => {
                setDrugs(drugFromAPI)
                props.history.push("/medication/list")
    
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
        <section className="">
            <div className="">
            <h3>Medication History</h3>
                 <div className="">
                    {drugs && drugs.map(drug => !drug.taking && <MedicationHistoryCard 
                    key={drug.id}
                    drug={drug}
                    handleChange={handleChange}
                    isLoading={isLoading}
                    ischecked={isChecked}
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