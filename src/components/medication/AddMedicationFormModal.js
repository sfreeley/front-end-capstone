import React, { useState } from "react";
import {Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import "./styles/AddMedicationFormModal.css"

const AddMedicationFormModal = ({drugImage, uploadImage, isLoading, handleFieldChange, handleAddNewDrug, newDrug, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll}) => {
    const numberRefillArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    return (
        <>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}><strong>What does your medication bottle tell you?</strong></ModalHeader>
                <ModalBody>
                
                <Input type="file"
                        name="file"
                        placeholder="Upload an image"
                        onChange={uploadImage}/>
                        {isLoading ? (
                        <h3> Loading ... </h3>
                        ): <div><img src={drugImage}/> </div>}
                    
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
                            type="textarea"
                            name="notes"
                            id="notes"
                            placeholder="Questions? Side effects?"
                        />
                   
                
                <Button className="btn-rxDetails" color="success" onClick={toggleNested}>Refill Details</Button>
                <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Prescription Details (not required)</ModalHeader>
            <ModalBody>
            {/* start of nested form */}
                   
                        <Label htmlFor="rxNumber"><strong>Prescription Number</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={newDrug.rxNumber}
                            onChange={handleFieldChange}
                            type="text"
                            name="rxNumber"
                            id="rxNumber"
                            required=""
                        />

                        <Label htmlFor="refills"><strong>Number of Refills Left</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={newDrug.refills}
                            onChange={handleFieldChange}
                            type="select"
                            name="refills"
                            id="refills"
                            >
                            {numberRefillArray.map(refill => {
                                return <option value={newDrug.refill}>{refill}</option>
                            })}
                            </Input>
                   
                    
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
                   
            </ModalBody>
            <ModalFooter>
              <Button className="btn-rxDetails-done" color="primary" onClick={toggleNested}>Done</Button>
              <Button className="btn-rxDetails-cancel" color="warning" onClick={toggleNested}>Cancel</Button>
              <Button className="btn-rxDetails-cancelAll" color="danger" onClick={toggleAll}>Cancel All</Button>
            </ModalFooter>
          </Modal>
                </ModalBody>
                            <ModalFooter>
                                <Button className="btn-addMedication" type="button" color="success" isLoading={isLoading} onClick={handleAddNewDrug}>
                                    {'Add Medication'}
                                </Button>
                                
                                <Button className="btn-cancelAdd" type="button" color="danger" onClick={toggle}>
                                    {'Cancel'}
                                </Button>
                            
                    </ModalFooter>
                </Modal>
    </>
    )
}

export default AddMedicationFormModal