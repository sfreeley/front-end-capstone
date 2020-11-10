import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import { Button } from "reactstrap";
import Pharmacy from "../pharmacy/Pharmacy";

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
        <div>
            <Button onClick={() => props.history.push("/medication/pharmacy/add")}>Add New Pharmacy</Button>

            {
                pharmacies && pharmacies.map(pharmacy => {

                    return <Pharmacy key={pharmacy.id} pharmacy={pharmacy} props={props} />
                })
            }
        </div>
    )

}
export default PharmacyList;
