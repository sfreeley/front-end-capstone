import React from "react";
import { Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";


const AddMedicationFormModal = ({handleFieldChange, handleAddNewDrug, newDrug, toggle, modal, ...props}) => {
    
    return (
        <>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>What does your medication bottle tell you?</ModalHeader>
                <ModalBody>
                    <Form className="form-group d-lg-inline-flex flex-column bd-highlight">
                    <FormGroup>
                        <label htmlFor="name">Medication Name</label>
                        <input className="p-2 bd-highlight justify-content-center"
                            onChange={handleFieldChange}
                            type="text"
                            name="name"
                            id="name"
                            required=""
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="strength">Medication Strength</label>
                        <input className="p-2 bd-highlight"
                            onChange={handleFieldChange}
                            type="text"
                            name="strength"
                            id="strength"
                            required=""
                            placeholder="ie mg, mcg, g, mL, etc"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="dosageForm">Medication Type</label>
                        <input className="p-2 bd-highlight"
                            onChange={handleFieldChange}
                            type="text"
                            name="dosageForm"
                            id="dosageForm"
                            required=""
                            placeholder="ie tablet, capsule, solution, etc"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="directions">Medication Directions</label>
                        <input className="p-2 bd-highlight"
                            onChange={handleFieldChange}
                            type="text"
                            name="directions"
                            id="directions"
                            required=""
                            placeholder="ie 'take 1 tablet by mouth...'"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="indication">Purpose of Medication</label>
                        <input className="p-2 bd-highlight"
                            onChange={handleFieldChange}
                            type="text"
                            name="indication"
                            id="indication"
                            required=""
                            placeholder="What did your doctor or pharmacist say this drug is for?"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="notes">Medication Notes</label>
                        <textarea className="p-2 bd-highlight"
                            onChange={handleFieldChange}
                            type="text"
                            name="notes"
                            id="notes"
                            required=""
                            placeholder="Questions? Side effects?"
                        />
                    </FormGroup>
                </Form>
                </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={handleAddNewDrug}>
                                    {'Add Medication'}
                                </Button>
                                
                                <Button color="primary" onClick={toggle}>
                                    {'Cancel'}
                                </Button>
                            
                    </ModalFooter>
                </Modal>
    </>
    )
}

export default AddMedicationFormModal