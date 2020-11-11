import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import { Button } from "reactstrap";
import Pharmacy from "../pharmacy/Pharmacy";
import NavBar from "../nav/NavBar";

const PharmacyList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [pharmacies, setPharmacies] = useState([]);
    const [drugsWithPharmacy, setDrugsWithPharmacy] = useState([])


    const getPharmacies = () => {
        ApplicationManager.getAllPharmaciesForUser(sessionUser.id).then(data => setPharmacies(data))
    }

    const getPharmaciesWithDrugs = () => {
        ApplicationManager.getPharmaciesForDrugs(sessionUser.id).then(dataFromAPI => {
            setDrugsWithPharmacy([...new Set(dataFromAPI)])
        })
    }

    useEffect(() => {
        getPharmacies();
        getPharmaciesWithDrugs();
    }, [])


    const removePharmacy = (pharmacyToEdit) => {

        ApplicationManager.editPharmacy(pharmacyToEdit)
            .then(() => {
                ApplicationManager.getAllPharmaciesForUser(sessionUser.id).then(dataFromAPI => {
                    setPharmacies(dataFromAPI)
                });
            });


    }



    return (
        <>
            <NavBar {...props} />
            <div>
                <Button onClick={() => props.history.push("/medication/pharmacy/add")}>Add New Pharmacy</Button>

                {
                    pharmacies && pharmacies.map(pharmacy => !pharmacy.hidden &&

                        <Pharmacy key={pharmacy.id} pharmacy={pharmacy} props={props} removePharmacy={removePharmacy} />
                    )
                }
            </div>
        </>
    )

}
export default PharmacyList;
