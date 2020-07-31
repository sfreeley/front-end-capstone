import React, { useState, useEffect } from "react";
import { Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";


const EditMedicationFormModal = ({drug, handleEditFieldChange, isLoading, handleEditChange, toggleEdit, editModal, toggleNested, toggleAll, nestedModal, closeAll,  props }) => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  

    return (
        <>
        {drug &&
        <Modal isOpen={editModal} toggleEdit={toggleEdit}>
            <ModalHeader toggleEdit={toggleEdit}>What does your medication bottle tell you?</ModalHeader>
                <ModalBody>
                    <Form className="form-group d-lg-inline-flex flex-column bd-highlight">
                    <FormGroup>
                        <label htmlFor="name">Medication Name</label>
                        <input className="p-2 bd-highlight"
                            onChange={handleEditFieldChange}
                            value={drug.name}
                            type="text"
                            name="name"
                            id="name"
                            required=""
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="strength">Medication Strength</label>
                        <input className="p-2 bd-highlight"
                            value={drug.strength}
                            onChange={handleEditFieldChange}
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
                            value={drug.dosageForm}
                            onChange={handleEditFieldChange}
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
                            value={drug.directions}
                            onChange={handleEditFieldChange}
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
                            value={drug.indication}
                            onChange={handleEditFieldChange}
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
                            value={drug.notes}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="notes"
                            id="notes"
                            placeholder="Questions? Side effects?"
                        />
                    </FormGroup>
                </Form>
                <Button color="success" onClick={toggleNested}>Refill Details</Button>
                <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggleEdit : undefined}>
            <ModalHeader>Prescription Details (can leave blank if over the counter)</ModalHeader>
            <ModalBody>
            {/* start of nested form */}
            <Form className="form-group d-lg-inline-flex flex-column bd-highlight">
                    <FormGroup>
                        <label htmlFor="rxNumber">Prescription Number</label>
                        <input className="p-2 bd-highlight justify-content-center"
                            value={drug.rxNumber}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="rxNumber"
                            id="rxNumber"
                            required=""
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="dateFilled">Last Date Filled</label>
                        <input className="p-2 bd-highlight justify-content-center"
                            value={drug.dateFilled}
                            onChange={handleEditFieldChange}
                            type="date"
                            name="dateFilled"
                            id="dateFilled"
                            required=""
                            placeholder="Most recent fill date (Format: MM/DD/YYYY)"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="daysSupply">Days Supply</label>
                        <input className="p-2 bd-highlight justify-content-center"
                            value={drug.daysSupply}
                            onChange={handleEditFieldChange}
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
              <Button color="primary" onClick={toggleNested}>Cancel</Button>{' '}
              <Button color="secondary" onClick={toggleAll}>Cancel All</Button>
            </ModalFooter>
          </Modal>
                </ModalBody>
                            <ModalFooter>
                                <Button color="primary" isLoading={isLoading} onClick={() => handleEditChange()}>
                                    {'Save Edited Medication'}
                                </Button>
                                
                                <Button color="primary" onClick={toggleEdit}>
                                    {'Cancel'}
                                </Button>
                            
                    </ModalFooter>
                </Modal>
            }
    </>
    )

}
    
export default EditMedicationFormModal

