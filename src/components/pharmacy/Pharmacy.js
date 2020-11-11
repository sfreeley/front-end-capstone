import React from "react";
import { Card, CardText, ListGroup, ListGroupItem, Button } from "reactstrap";

const Pharmacy = ({ pharmacy, props, removePharmacy }) => {
    return (
        <Card>
            <CardText>
                <ListGroup className="list-group list-group">

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Name:</strong> {pharmacy.name}</ListGroupItem>

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Address:</strong> {pharmacy.address} </ListGroupItem>

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Contact Info:</strong> {pharmacy.phone}</ListGroupItem>

                </ListGroup>
            </CardText>
            <Button onClick={() => props.history.push("/medication/pharmacy/edit")}>Edit</Button>
            <Button id={pharmacy.id} onClick={() => removePharmacy(pharmacy.id)}>Delete</Button>
        </Card>
    )

}
export default Pharmacy;