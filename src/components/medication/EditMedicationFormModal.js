import React from "react";
import { Label, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import "./styles/EditMedicationFormModal.css";
import { Route } from "react-router-dom";


const EditMedicationFormModal = ({movingToHx, uploadImage, drug, handleEditFieldChange, isLoading, handleEditChange, toggleEdit, editModal, toggleNested, toggleAll, nestedModal, closeAll,  props }) => {
    const numberRefillArray = ["No refills", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return (
        <>
        
        <Modal isOpen={editModal} toggleEdit={toggleEdit}>
            <ModalHeader><strong>What does your medication bottle tell you?</strong>
            <FormText>*required</FormText></ModalHeader>
                <ModalBody>
                
                        <Input type="file"
                                name="file"
                                placeholder="Upload an image"
                                disabled={movingToHx}
                                onChange={uploadImage}/>
                                {isLoading ? (
                                <h3> Loading ...</h3>
                                ): ""}
                                
                                          
                        <Label htmlFor="name"><strong>Medication Name*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            onChange={handleEditFieldChange}
                            value={drug.name}
                            type="text"
                            name="name"
                            id="name"
                            required=""
                        />
                   
                   
                        <Label htmlFor="strength"><strong>Medication Strength*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.strength}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="strength"
                            id="strength"
                            required=""
                            placeholder="ie 5 mg, 100 mcg, 1 g, 5mL, etc"
                        />
                   
                    
                        <Label htmlFor="dosageForm"><strong>Medication Type*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.dosageForm}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="dosageForm"
                            id="dosageForm"
                            required=""
                            placeholder="ie tablet, capsule, solution, etc"
                        />
                   
                    
                        <Label htmlFor="directions"><strong>Medication Directions*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.directions}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="directions"
                            id="directions"
                            required=""
                            placeholder="ie 'take 1 tablet by mouth...'"
                        />
                    
                   
                        <Label htmlFor="indication"><strong>Purpose of Medication*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.indication}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="indication"
                            id="indication"
                            required=""
                            placeholder="What did your doctor or pharmacist say this drug is for?"
                        />
                   
                        <Label htmlFor="notes"><strong>Medication Notes</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.notes}
                            onChange={handleEditFieldChange}
                            type="textarea"
                            name="notes"
                            id="notes"
                            placeholder="Questions? Side effects?"
                        />
                    
                <Button className="btn-rxDetails" color="success" onClick={toggleNested}>Refill Details</Button>
                <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggleEdit : undefined}>
            <ModalHeader
            className="modal-header-prescriptionDetails">Prescription Details</ModalHeader>
            <FormText>*required</FormText>
            <ModalBody>

            {/* start of nested form modal */}
            
                        <Label htmlFor="rxNumber"><strong>Prescription Number</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={drug.rxNumber}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="rxNumber"
                            id="rxNumber"
                           
                        />

                        <Label htmlFor="refills"><strong>Number of Refills Left</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            onChange={handleEditFieldChange}
                            value={drug.refills}
                            type="select"
                            name="refills"
                            id="refills">
                            {numberRefillArray.map(refill => {
                                return <option key={drug.id} value={refill}>{refill}</option>
                            })}
                            </Input>
                   
                        <Label htmlFor="dateFilled"><strong>Last Date Filled*</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={drug.dateFilled}
                            onChange={handleEditFieldChange}
                            type="date"
                            name="dateFilled"
                            id="dateFilled"
                            required=""
                        />
                    
                   
                        <Label htmlFor="daysSupply"><strong>Days Supply*</strong></Label>
                        <FormText>Can be an approximate number if OTC</FormText>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={drug.daysSupply}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="daysSupply"
                            id="daysSupply"
                            required=""
                            placeholder="How many days will this medication last you?"
                        />
                    
            </ModalBody>
            <ModalFooter>
              <Button className="btn-rxDetails-done" color="primary" onClick={toggleNested}>Done</Button>
              <Button className="btn-rxDetails-cancel" color="warning" onClick={toggleNested}>Cancel</Button>
              <Button className="btn-rxDetails-cancelAll" color="danger" onClick={toggleAll}>Cancel All</Button>
            </ModalFooter>
          </Modal>
                </ModalBody>
                            <ModalFooter>
                                <Button className="btn-saveEditMedication" color="primary" isLoading={isLoading} onClick={() => handleEditChange()}>
                                    {'Save Edited Medication'}
                                </Button>
                                
                                <Button className="btn-cancelEdit" color="danger" onClick={toggleEdit}>
                                    {'Cancel'}
                                </Button>
                            
                    </ModalFooter>
                </Modal>
            
    </>
    )

}
    
export default EditMedicationFormModal

