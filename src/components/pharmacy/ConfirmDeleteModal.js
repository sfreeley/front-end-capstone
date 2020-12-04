import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


const ConfirmDelete = ({ toggle, modal, removePharmacy, pharmacy, currentPharmacyEntry }) => {



    return (
        <>
            <div>
                <Modal isOpen={modal} toggle={toggle} className="deletePharmacy">
                    <ModalHeader toggle={toggle}>Please Confirm Delete</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this pharmacy?
                    </ModalBody>
                    <ModalFooter>
                        <Button id={pharmacy.id} color="primary" onClick={() => removePharmacy(currentPharmacyEntry)}>Delete</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        </>
    )

};

export default ConfirmDelete;