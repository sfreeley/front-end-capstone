import React, { useState, useEffect } from "react";
import MedicationCard from "./MedicationCard";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";

const MedicationList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [drugs, setDrugs] = useState([]);
    const [editedDrug, setEditedDrug] = useState({
        id: props.match.params.drugId,
        name: drugs.name,
        userId: sessionUser.id,
        strength: drugs.strength,
        dosageForm: drugs.dosageForm,
        directions: drugs.directions,
        indication: drugs.indication,
        notes: drugs.notes,
        rxNumber: drugs.rxNumber,
        dateFilled: drugs.dateFilled,
        daysSupply: drugs.daysSupply,
        nextRefillDate: drugs.nextRefillDate,
        dateInput: drugs.dateInput,
        taking: true
    })
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
    const editCurrentDrug = () => {
        
        const currentDrugTaking = {
           ...editedDrug,
            taking: false
        }
        ApplicationManager.editDrug(currentDrugTaking)
        .then(() => {
            setEditedDrug(currentDrugTaking)
            getDrugs()
        })
        
        
            
        }


    return (
        <>
        <NavBar {...props} />
        <section className="">
        <div className="">
            <div className="">
                {drugs && drugs.map(drug => drug.taking &&
                    <MedicationCard 
                        key={drug.id}
                        drug={drug}
                        removeDrug={removeDrug}
                        editCurrentDrug={editCurrentDrug}  
                        {...props} 
                    /> )} 
            </div>
        </div>
        </section> 
        </>
       
    )
}

export default MedicationList;