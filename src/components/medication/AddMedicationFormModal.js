import React from "react";
import { Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";


const AddMedicationFormModal = ({isLoading, handleFieldChange, handleAddNewDrug, newDrug, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll, ...props}) => {
    
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
                            placeholder="ie 5 mg, 100 mcg, 1 g, 5mL, etc"
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
                            placeholder="Questions? Side effects?"
                        />
                    </FormGroup>
                </Form>
                <Button color="success" onClick={toggleNested}>Refill Details</Button>
                <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Prescription Details</ModalHeader>
            <ModalBody>
            {/* start of nested form */}
            <Form className="form-group d-lg-inline-flex flex-column bd-highlight">
                    <FormGroup>
                        <label htmlFor="rxNumber">Prescription Number</label>
                        <input className="p-2 bd-highlight justify-content-center"
                            onChange={handleFieldChange}
                            type="text"
                            name="rxNumber"
                            id="rxNumber"
                            required=""
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="dateFilled">Last Date Filled</label>
                        <input className="p-2 bd-highlight justify-content-center"
                            onChange={handleFieldChange}
                            type="text"
                            name="dateFilled"
                            id="dateFilled"
                            required=""
                            placeholder="Most recent fill date (Format: MM/DD/YYYY)"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="daysSupply">Days Supply</label>
                        <input className="p-2 bd-highlight justify-content-center"
                            onChange={handleFieldChange}
                            type="text"
                            name="daysSupply"
                            id="daysSupply"
                            required=""
                            placeholder="How many days will this medication last you?"
                        />
                    </FormGroup>
                </Form>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
              <Button color="secondary" onClick={toggleAll}>All Done</Button>
            </ModalFooter>
          </Modal>
                </ModalBody>
                            <ModalFooter>
                                <Button color="primary" isLoading={false}onClick={handleAddNewDrug}>
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