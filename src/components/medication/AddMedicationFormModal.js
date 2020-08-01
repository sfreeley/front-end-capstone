import React from "react";
import { Form, FormGroup, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";


const AddMedicationFormModal = ({props, isLoading, handleFieldChange, handleNewDrug, handleAddNewDrug, newDrug, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll}) => {
    
    return (
        <>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>What does your medication bottle tell you?</ModalHeader>
                <ModalBody>
                        <Label htmlFor="name"><strong>Medication Name</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={newDrug.name}
                            onChange={handleFieldChange}
                            type="text"
                            name="name"
                            id="name"
                            required=""
                        />
                    
                    
                        <Label htmlFor="strength"><strong>Medication Strength</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={newDrug.strength}
                            onChange={handleFieldChange}
                            type="text"
                            name="strength"
                            id="strength"
                            required=""
                            placeholder="ie 5 mg, 100 mcg, 1 g, 5mL, etc"
                        />
                    
                   
                        <Label htmlFor="dosageForm"><strong>Medication Type</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={newDrug.dosageForm}
                            onChange={handleFieldChange}
                            type="text"
                            name="dosageForm"
                            id="dosageForm"
                            required=""
                            placeholder="ie tablet, capsule, solution, etc"
                        />
                   
                   
                        <Label htmlFor="directions"><strong>Medication Directions</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={newDrug.directions}
                            onChange={handleFieldChange}
                            type="text"
                            name="directions"
                            id="directions"
                            required=""
                            placeholder="ie 'take 1 tablet by mouth...'"
                        />
                    
                    
                        <Label htmlFor="indication"><strong>Purpose of Medication</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={newDrug.indication}
                            onChange={handleFieldChange}
                            type="text"
                            name="indication"
                            id="indication"
                            required=""
                            placeholder="What did your doctor or pharmacist say this drug is for?"
                        />
                   
                    
                        <Label htmlFor="notes"><strong>Medication Notes</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={newDrug.notes}
                            onChange={handleFieldChange}
                            type="text"
                            name="notes"
                            id="notes"
                            placeholder="Questions? Side effects?"
                        />
                   
                <div>
                <Button color="success" onClick={toggleNested}><strong>Refill Details</strong></Button>
                </div>
                <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Prescription Details (not required)</ModalHeader>
            <ModalBody>
            {/* start of nested form */}
            <Form className="form-group d-lg-inline-flex flex-column bd-highlight">
                   
                        <Label htmlFor="rxNumber"><strong>Prescription Number</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={newDrug.rxNumber}
                            onChange={handleFieldChange}
                            type="text"
                            name="rxNumber"
                            id="rxNumber"
                            required=""
                        />
                   
                    
                        <Label htmlFor="dateFilled"><strong>Last Date Filled</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={newDrug.dateFilled}
                            onChange={handleFieldChange}
                            type="date"
                            name="dateFilled"
                            id="dateFilled"
                            required=""
                        />
                    
                    
                        <Label htmlFor="daysSupply"><strong>Days Supply</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={newDrug.daysSupply}
                            onChange={handleFieldChange}
                            type="text"
                            name="daysSupply"
                            id="daysSupply"
                            required=""
                            placeholder="How many days will this medication last you?"
                        />
                   
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