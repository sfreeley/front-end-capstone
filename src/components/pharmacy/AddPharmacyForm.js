import React, { useState } from "react";
import { FormGroup, Button, Label, Input, Form } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";

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

            <Form>
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


                <Button className="btn-addMedication" type="button" color="success" onClick={handleAddNewPharmacy}>
                    {'Add Pharmacy'}
                </Button>

                <Button className="btn-cancelAdd" type="button" color="danger" onClick={() => props.history.goBack()}>
                    {'Cancel'}
                </Button>
            </Form>
        </>
    )


}
export default AddPharmacyForm;


