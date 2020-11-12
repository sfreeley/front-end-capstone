import React from "react";
import { Card, CardText, ListGroup, ListGroupItem, Button, CardFooter, CardBody } from "reactstrap";
import "./styles/Pharmacy.css";

const Pharmacy = ({ pharmacy, props, removePharmacy }) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))

    const currentPharmacyEntry = {
        id: pharmacy.id,
        userId: sessionUser.id,
        name: "no pharmacy selected",
        address: "no pharmacy selected",
        phone: "no pharmacy selected",
        hidden: true
    }

    return (
        <Card className="pharmacyIndividualCard--container">
            <CardBody>
                <ListGroup className="list-group list-group">

                    <ListGroupItem className={"background-grey"}><strong>Pharmacy Name:</strong> <em>{pharmacy.name}</em></ListGroupItem>

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Address:</strong> {pharmacy.address} </ListGroupItem>

                    <ListGroupItem className={"background-grey"}><strong>Pharmacy Contact Info:</strong> {pharmacy.phone}</ListGroupItem>

                </ListGroup>
            </CardBody>
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