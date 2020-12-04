import React from "react";
import { FormText, Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup } from "reactstrap";
import "./styles/MedicationFormModal.css"

const MedicationFormModal = ({ imageDesc, renderWidget, imageName, drug, handlePharmacyDropdown, pharmacyList, handleFieldChange, handleDrugForm, toggle, modal, toggleNested, toggleAll, nestedModal, closeAll }) => {
    const numberRefillArray = ["No refills", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader className="modal-header-mainPage" toggle={toggle}><strong>What does your medication bottle tell you?</strong>
                    <FormText>*required</FormText>
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Button className="uploadDrugImage" outline onClick={renderWidget}>Upload Image</Button> <p className="imageNameSizing">{imageDesc}</p>
                        </FormGroup>

                        <Label htmlFor="name"><strong>Medication Name*</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            value={drug.name}
                            onChange={handleFieldChange}
                            type="text"
                            name="name"
                            defaultValue=""
                            id="name"
                            required=""
                        />

                        <Label htmlFor="strength"><strong>Medication Strength*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.strength}
                            onChange={handleFieldChange}
                            type="text"
                            name="strength"
                            id="strength"
                            required=""
                            placeholder="ie 5 mg, 100 mcg, 1 g, 5mL, etc"
                        />
                        <Label htmlFor="dosageForm"><strong>Medication Type*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.dosageForm}
                            onChange={handleFieldChange}
                            type="text"
                            name="dosageForm"
                            id="dosageForm"
                            required=""
                            placeholder="ie tablet, capsule, solution, etc"
                        />

                        <Label htmlFor="directions"><strong>Medication Directions*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.directions}
                            onChange={handleFieldChange}
                            type="text"
                            name="directions"
                            id="directions"
                            required=""
                            placeholder="ie 'take 1 tablet by mouth...'"
                        />


                        <Label htmlFor="indication"><strong>Purpose of Medication*</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.indication}
                            onChange={handleFieldChange}
                            type="text"
                            name="indication"
                            id="indication"
                            required=""
                            placeholder="What did your doctor or pharmacist say this drug is for?"
                        />


                        <Label htmlFor="notes"><strong>Medication Notes</strong></Label>
                        <Input className="p-2 bd-highlight"
                            value={drug.notes}
                            onChange={handleFieldChange}
                            type="textarea"
                            name="notes"
                            id="notes"
                            placeholder="Questions? Side effects?"
                        />

                    </Form>

                    <Button className="btn-rxDetails" color="success" onClick={toggleNested}>Refill Details</Button>
                    <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
                        <ModalHeader className="modal-header-prescriptionDetails">Prescription Details
                        <FormText>*required</FormText></ModalHeader>
                        <ModalBody>
                            {/* start of nested form */}

                            <Label htmlFor="pharmacyId"><strong>Pharmacy*</strong></Label>
                            <Input className="p-2 bd-highlight justify-content-center"
                                value={parseInt(drug.pharmacyId)}
                                onChange={handlePharmacyDropdown}
                                type="select"
                                name="pharmacyId"
                                id="pharmacyId"

                            >
                                <option>Please Choose an Option</option>
                                {
                                    pharmacyList.map(pharmacy =>
                                        pharmacy.id === 0 ? null : !pharmacy.hidden &&
                                            <option key={pharmacy.id} value={pharmacy.id}>{pharmacy.name}: {pharmacy.address}</option>

                                    )}

                            </Input>


                            <Label htmlFor="rxNumber"><strong>Prescription Number</strong></Label>
                            <Input className="p-2 bd-highlight justify-content-center"
                                value={drug.rxNumber}
                                onChange={handleFieldChange}
                                type="text"
                                name="rxNumber"
                                id="rxNumber"

                            />


                            <Label htmlFor="refills"><strong>Number of Refills Left</strong></Label>
                            <Input className="p-2 bd-highlight justify-content-center"
                                value={drug.refills}
                                onChange={handleFieldChange}
                                type="select"
                                name="refills"
                                id="refills"
                            >
                                {numberRefillArray.map(refill => {
                                    return <option value={drug.refill}>{refill}</option>
                                })}
                            </Input>


                            <Label htmlFor="dateFilled"><strong>Last Date Filled*</strong></Label>
                            <Input className="p-2 bd-highlight justify-content-center"
                                value={drug.dateFilled}
                                onChange={handleFieldChange}
                                type="date"
                                name="dateFilled"
                                id="dateFilled"
                                required=""
                            />


                            <Label htmlFor="daysSupply"><strong>Days Supply*</strong></Label>
                            <FormText>Can be an approximate number if OTC</FormText>
                            <Input className="p-2 bd-highlight justify-content-center"
                                value={drug.daysSupply}
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
                    <Button className="btn-addMedication" type="button" color="success" onClick={handleDrugForm}>
                        {'Save'}
                    </Button>

                    <Button className="btn-cancelAdd" type="button" color="danger" onClick={toggle}>
                        {'Cancel'}
                    </Button>

                </ModalFooter>

            </Modal>

        </>
    )
}

export default MedicationFormModal