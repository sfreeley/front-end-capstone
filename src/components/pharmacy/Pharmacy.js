import React, { useState, useEffect } from "react";
import { Card, CardText, ListGroup, ListGroupItem } from "reactstrap";

const Pharmacy = ({ pharmacy }) => {
    return (
        <Card>
            <CardText>
                <ListGroup className="list-group list-group">

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Name:</strong> {pharmacy.name}</ListGroupItem>

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Address:</strong> {pharmacy.address} </ListGroupItem>

                    <ListGroupItem className="list-group-item"><strong>Pharmacy Contact Info:</strong> {pharmacy.phone}</ListGroupItem>

                </ListGroup>
            </CardText>
        </Card>
    )

}
export default Pharmacy;