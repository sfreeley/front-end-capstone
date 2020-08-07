import React, { useState, useEffect } from "react";
import { Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";
import "./styles/EditMedicationFormModal.css";


const EditMedicationFormModal = ({uploadImage, drug, handleEditFieldChange, isLoading, handleEditChange, toggleEdit, editModal, toggleNested, toggleAll, nestedModal, closeAll,  props }) => {
    const numberRefillArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return (
        <>
        {drug &&
        <Modal isOpen={editModal} toggleEdit={toggleEdit}>
            <ModalHeader toggleEdit={toggleEdit}><strong>What does your medication bottle tell you?</strong></ModalHeader>
                <ModalBody>
                        <Input type="file"
                                name="file"
                                placeholder="Upload an image"
                                onChange={uploadImage}/>
                                {isLoading ? (
                                <h3> Loading ...</h3>
                                ): "" }
                                
                        <Label htmlFor="name">Medication Name</Label>
                        <Input className="p-2 bd-highlight"
                            onChange={handleEditFieldChange}
                            value={drug.name}
                            type="text"
                            name="name"
                            id="name"
                            required=""
                        />
                   
                   
                        <Label htmlFor="strength">Medication Strength</Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.strength}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="strength"
                            id="strength"
                            required=""
                            placeholder="ie 5 mg, 100 mcg, 1 g, 5mL, etc"
                        />
                   
                    
                        <Label htmlFor="dosageForm">Medication Type</Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.dosageForm}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="dosageForm"
                            id="dosageForm"
                            required=""
                            placeholder="ie tablet, capsule, solution, etc"
                        />
                   
                    
                        <Label htmlFor="directions">Medication Directions</Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.directions}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="directions"
                            id="directions"
                            required=""
                            placeholder="ie 'take 1 tablet by mouth...'"
                        />
                    
                   
                        <Label htmlFor="indication">Purpose of Medication</Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.indication}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="indication"
                            id="indication"
                            required=""
                            placeholder="What did your doctor or pharmacist say this drug is for?"
                        />
                   
                        <Label htmlFor="notes">Medication Notes</Label>
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
            <ModalHeader>Prescription Details (not required)</ModalHeader>
            <ModalBody>

            {/* start of nested form modal */}
            
                        <Label htmlFor="rxNumber">Prescription Number</Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={drug.rxNumber}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="rxNumber"
                            id="rxNumber"
                           
                        />

                        <Label htmlFor="refills">Number of Refills Left</Label>
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
                   
                        <Label htmlFor="dateFilled">Last Date Filled</Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={drug.dateFilled}
                            onChange={handleEditFieldChange}
                            type="date"
                            name="dateFilled"
                            id="dateFilled"
                            required=""
                        />
                    
                   
                        <Label htmlFor="daysSupply">Days Supply</Label>
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
            }
    </>
    )

}
    
export default EditMedicationFormModal

