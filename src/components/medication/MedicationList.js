import React, { useState, useEffect } from "react";
import MedicationCard from "./MedicationCard";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";

const MedicationList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [drugs, setDrugs] = useState([]);
    console.log(drugs)

    const getDrugs = () => {
        return ApplicationManager.getDrugsForUser(sessionUser.id).then(drugsFromAPI => {
            setDrugs(drugsFromAPI)
        }).then(drugs.sort((date1, date2)=> setDrugs(new Date(date1.dateInput) - new Date(date2.dateInput)))
    )}

     useEffect(() => {
        getDrugs()
    }, []);


    return (
        <>
        <NavBar {...props} />
        <section className="">
        <div className="">
            <div className="">
                {drugs && drugs.map(drug => 
                    <MedicationCard 
                        key={drug.id}
                        drug={drug}
                        {...props} 
                    /> )} 
            </div>
        </div>
        </section> 
        </>
       
    )
}

export default MedicationList;