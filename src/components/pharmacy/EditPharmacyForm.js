import React, { useState, useEffect } from "react";
import { FormGroup, Button, Label, Input, Form } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";
import NavBar from "../nav/NavBar";
import "./styles/EditPharmacyForm.css";

const EditPharmacyForm = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [isLoading, setIsLoading] = useState(false);
    const [pharmacy, setPharmacy] = useState({
        userId: sessionUser.Id,
        name: "",
        address: "",
        phone: ""
    });

    //handling input field for posting new drug
    const handleFieldChange = (event) => {
        const stateToChange = { ...pharmacy };
        stateToChange[event.target.id] = event.target.value;
        setPharmacy(stateToChange);

    };

    useEffect(() => {
        ApplicationManager.getPharmacyById(props.match.params.pharmacyId).then(dataFromAPI => setPharmacy(dataFromAPI))
    }, [])


    const handleEditPharmacy = (e) => {

        e.preventDefault();
        setIsLoading(true);

        const editedPharmacyEntry = {
            id: props.match.params.pharmacyId,
            userId: sessionUser.id,
            name: pharmacy.name,
            address: pharmacy.address,
            phone: pharmacy.phone

        }

        ApplicationManager.editPharmacy(editedPharmacyEntry).then(() => {
            props.history.push("/medication/pharmacies")
        })

        setIsLoading(false);
    }




    return (
        <>
            <NavBar />

            <Form className="editPharmacyForm--container">
                <FormGroup>
                    <Label htmlFor="name"><strong>Pharmacy Name</strong></Label>
                    <Input className="p-2 bd-highlight justify-content-center"
                        value={pharmacy.name}
                        onChange={handleFieldChange}
                        type="text"
                        name="name"
                        id="name"

                    />
                </FormGroup>

                <Label htmlFor="address"><strong>Pharmacy Address</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={pharmacy.address}
                    onChange={handleFieldChange}
                    type="text"
                    name="address"
                    id="address"


                />
                <Label htmlFor="phone"><strong>Pharmacy Contact Information</strong></Label>
                <Input className="p-2 bd-highlight"
                    value={pharmacy.phone}
                    onChange={handleFieldChange}
                    type="text"
                    name="phone"
                    id="phone"


                />

                <div className="editPharmacyFormButtons--container">
                    <Button className="btn-editPharmacy" type="button" onClick={handleEditPharmacy}>
                        {'Save'}
                    </Button>

                    <Button className="btn-cancelEditPharmacy" type="button" onClick={() => props.history.goBack()}>
                        {'Cancel'}
                    </Button>
                </div>
            </Form>
        </>
    )


}
export default EditPharmacyForm;


