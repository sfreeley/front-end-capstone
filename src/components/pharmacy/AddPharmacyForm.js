import React, { useState } from "react";
import { FormGroup, Button, Label, Input, Form } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";
import "./styles/AddPharmacyForm.css";

const AddPharmacyForm = (props) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [isLoading, setIsLoading] = useState(false);
    const [newPharmacy, setNewPharmacy] = useState({
        userId: sessionUser.Id,
        name: "",
        address: "",
        phone: ""
    });

    //handling input field for posting new drug
    const handleFieldChange = (event) => {
        const stateToChange = { ...newPharmacy };
        stateToChange[event.target.id] = event.target.value;
        setNewPharmacy(stateToChange);

    };

    // adding new pharmacy
    const handleAddNewPharmacy = (e) => {

        e.preventDefault();
        if (newPharmacy.name === "" || newPharmacy.address === "" || newPharmacy.phone === "") {
            alert("Please fill out required fields")
        } else {
            setIsLoading(true);

            const newPharmacyEntry = {
                userId: sessionUser.id,
                name: newPharmacy.name,
                address: newPharmacy.address,
                phone: newPharmacy.phone

            }

            ApplicationManager.postNewPharmacy(newPharmacyEntry).then(() => {
                props.history.push("/medication/pharmacies")
            })


        }
        setIsLoading(false);
    }


    return (
        <>

            <Form className="addPharmacyForm--container">
                <FormGroup>
                    <Label htmlFor="name"><strong>Pharmacy Name*</strong></Label>
                    <Input className="p-2 bd-highlight justify-content-center"
                        value={newPharmacy.name}
                        onChange={handleFieldChange}
                        type="text"
                        name="name"
                        defaultValue=""
                        id="name"
                        required=""
                    />
                </FormGroup>

                <FormGroup>

                    <Label htmlFor="address"><strong>Pharmacy Address*</strong></Label>
                    <Input className="p-2 bd-highlight"
                        value={newPharmacy.address}
                        onChange={handleFieldChange}
                        type="text"
                        name="address"
                        id="address"
                        required=""
                        placeholder="ie 123 Main St"
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="phone"><strong>Pharmacy Contact Information*</strong></Label>
                    <Input className="p-2 bd-highlight"
                        value={newPharmacy.phone}
                        onChange={handleFieldChange}
                        type="text"
                        name="phone"
                        id="phone"
                        required=""
                        placeholder="ie 123-456-7890"
                    />
                </FormGroup>

                <div className="addPharmacyFormButtons--container">
                    <Button outline className="btn-addPharmacy" type="button" onClick={handleAddNewPharmacy}>
                        {'Add Pharmacy'}
                    </Button>

                    <Button outline className="btn-cancelAddPharmacy" type="button" onClick={() => props.history.goBack()}>
                        {'Cancel'}
                    </Button>
                </div>
            </Form>
        </>
    )


}
export default AddPharmacyForm;


