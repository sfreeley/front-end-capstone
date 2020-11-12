import React from "react";
import { Card, CardText, ListGroup, ListGroupItem, Button, CardFooter } from "reactstrap";
import "./styles/Pharmacy.css";

const Pharmacy = ({ pharmacy, props, removePharmacy }) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))

    const currentPharmacyEntry = {
        id: pharmacy.id,
        userId: sessionUser.id,
        name: pharmacy.name,
        phone: pharmacy.phone,
        hidden: true
    }

    return (
        <Card className="pharmacyIndividualCard--container">
            <CardText>
                <ListGroup className="list-group list-group">

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Name:</strong> {pharmacy.name}</ListGroupItem>

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Address:</strong> {pharmacy.address} </ListGroupItem>

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Contact Info:</strong> {pharmacy.phone}</ListGroupItem>

                </ListGroup>
            </CardText>
            <CardFooter>
                <div className="pharmacyButtons--container">
                    <Button outline className="editPharmacy--button" onClick={() => props.history.push(`/medication/pharmacy/edit/${pharmacy.id}`)}>Edit</Button>
                    <Button outline className="removePharmacy--button" id={pharmacy.id} onClick={() => removePharmacy(currentPharmacyEntry)}>Delete</Button>
                </div>
            </CardFooter>
        </Card>
    )

}
export default Pharmacy;