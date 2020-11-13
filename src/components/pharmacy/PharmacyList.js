import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import { Button } from "reactstrap";
import Pharmacy from "../pharmacy/Pharmacy";
import NavBar from "../nav/NavBar";
import "./styles/PharmacyList.css";

const PharmacyList = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [pharmacies, setPharmacies] = useState([]);
    const [drugsWithPharmacy, setDrugsWithPharmacy] = useState([]);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


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
        toggle();
    }

    return (
        <>

            <NavBar {...props} />
            <div className="addPharmacyButton--container">
                <Button className="addPharmacy--button" onClick={() => props.history.push("/medication/pharmacy/add")}>Add New Pharmacy</Button>
            </div>
            <div className="pharmacy--container">


                {
                    pharmacies && pharmacies.map(pharmacy => !pharmacy.hidden &&

                        <Pharmacy key={pharmacy.id} pharmacy={pharmacy} props={props} removePharmacy={removePharmacy} toggle={toggle} modal={modal} />
                    )
                }
            </div>
        </>
    )

}
export default PharmacyList;
