import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";

const PharmacyList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))

    const [pharmacies, setPharmacies] = useState([])
    console.log(pharmacies)

    const getPharmaciesForDrugs = () => {
        const uniquePharmacies = []
        return ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(drugsWithPharmacyFromAPI => {
            drugsWithPharmacyFromAPI.forEach((drug) => {
                if (!uniquePharmacies.includes(drug.pharmacy)) {
                    uniquePharmacies.push(drug.pharmacy)
                }

            })
            setPharmacies(uniquePharmacies)




        })

    }

    useEffect(() => {

        getPharmaciesForDrugs()
    }, [])


    return (
        <div>{
            pharmacies.map(pharmacy => {

                return <p key={pharmacy.id} pharmacy={pharmacy}>{pharmacy.name}</p>
            }

            )}</div>
    )

}
export default PharmacyList;
