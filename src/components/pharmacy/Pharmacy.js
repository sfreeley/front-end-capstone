import React from "react";
import { Card, ListGroup, ListGroupItem, Button, CardFooter, CardBody } from "reactstrap";
import ConfirmDelete from "./ConfirmDeleteModal";
import "./styles/Pharmacy.css";

const Pharmacy = ({ pharmacy, props, removePharmacy, toggle, modal }) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))

    const currentPharmacyEntry = {
        id: pharmacy.id,
        userId: sessionUser.id,
        name: "No pharmacy selected",
        address: "No pharmacy selected",
        phone: "No pharmacy selected",
        hidden: true
    }

    return (
        <>
            <ConfirmDelete removePharmacy={removePharmacy} toggle={toggle} modal={modal} pharmacy={pharmacy} currentPharmacyEntry={currentPharmacyEntry} />
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
                        <Button outline className="removePharmacy--button" id={pharmacy.id} onClick={toggle}>Delete</Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )

}
export default Pharmacy;