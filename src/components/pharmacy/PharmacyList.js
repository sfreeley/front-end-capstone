import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";

const PharmacyList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [pharmacies, setPharmacies] = useState([]);
    console.log(pharmacies)

    const getPharmacies = () => {

        ApplicationManager.getAllPharmaciesForUser(sessionUser.id).then(data => setPharmacies(data))
    }


    useEffect(() => {
        getPharmacies();

    }, [])



    return (
        <div>{
            pharmacies && pharmacies.map(pharmacy => {

                return <p key={pharmacy.id} pharmacy={pharmacy}>{pharmacy.name} </p>
            }

            )}
        </div>
    )

}
export default PharmacyList;
