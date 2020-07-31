import React from "react";
import { Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";


const AddMedicationFormModal = ({props, isLoading, handleFieldChange, handleNewDrug, handleAddNewDrug, newDrug, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll}) => {
    
    return (
        <>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>What does your medication bottle tell you?</ModalHeader>
                <ModalBody>
                    <Form id="addDrug" className="form-group d-lg-inline-flex flex-column bd-highlight">
                    <FormGroup>
                        <label htmlFor="name"><strong>Medication Name</strong></label>
                        <input className="p-2 bd-highlight justify-content-center"
                            value={newDrug.name}
                            onChange={handleFieldChange}
                            type="text"
                            name="name"
                            id="name"
                            required=""
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="strength"><strong>Medication Strength</strong></label>
                        <input className="p-2 bd-highlight"
                            value={newDrug.strength}
                            onChange={handleFieldChange}
                            type="text"
                            name="strength"
                            id="strength"
                            required=""
                            placeholder="ie 5 mg, 100 mcg, 1 g, 5mL, etc"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="dosageForm"><strong>Medication Type</strong></label>
                        <input className="p-2 bd-highlight"
                            value={newDrug.dosageForm}
                            onChange={handleFieldChange}
                            type="text"
                            name="dosageForm"
                            id="dosageForm"
                            required=""
                            placeholder="ie tablet, capsule, solution, etc"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="directions"><strong>Medication Directions</strong></label>
                        <input className="p-2 bd-highlight"
                            value={newDrug.directions}
                            onChange={handleFieldChange}
                            type="text"
                            name="directions"
                            id="directions"
                            required=""
                            placeholder="ie 'take 1 tablet by mouth...'"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="indication"><strong></strong>Purpose of Medication</label>
                        <input className="p-2 bd-highlight"
                            value={newDrug.indication}
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
                            value={newDrug.notes}
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
            <ModalHeader>Prescription Details (leave blank if over the counter)</ModalHeader>
            <ModalBody>
            {/* start of nested form */}
            <Form className="form-group d-lg-inline-flex flex-column bd-highlight">
                    <FormGroup>
                        <label htmlFor="rxNumber">Prescription Number</label>
                        <input className="p-2 bd-highlight justify-content-center"
                            value={newDrug.rxNumber}
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
                            value={newDrug.dateFilled}
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
                            value={newDrug.daysSupply}
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
              <Button color="primary" onClick={toggleNested}>Done</Button>
              <Button color="primary" onClick={toggleNested}>Cancel</Button>
              <Button color="secondary" onClick={toggleAll}>Cancel All</Button>
            </ModalFooter>
          </Modal>
                </ModalBody>
                            <ModalFooter>
                                <Button type="button" color="primary" isLoading={isLoading} onClick={handleAddNewDrug}>
                                    {'Add Medication'}
                                </Button>
                                
                                <Button type="button" color="primary" onClick={toggle}>
                                    {'Cancel'}
                                </Button>
                            
                    </ModalFooter>
                </Modal>
    </>
    )
}

export default AddMedicationFormModal