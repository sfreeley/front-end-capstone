// import React, { useState, useEffect } from "react";
// import { Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
// import ApplicationManager from "../modules/ApplicationManager";


// const EditMedicationFormModal = ({getIdOfEdit, idEditDrug, isLoading, toggleEdit, editModal, toggleNested, toggleAll, nestedModal, closeAll, setIsLoading, props }) => {
//     const sessionUser = JSON.parse(sessionStorage.getItem("user"))
  
  
//     return (
//         <>
//         <Modal isOpen={editModal} toggleEdit={toggleEdit}>
//             <ModalHeader toggleEdit={toggleEdit}>What does your medication bottle tell you?</ModalHeader>
//                 <ModalBody>
//                     <Form className="form-group d-lg-inline-flex flex-column bd-highlight">
//                     <FormGroup>
//                         <label htmlFor="name">Medication Name</label>
//                         <input className="p-2 bd-highlight"
//                             onChange={props.handleEditFieldChange}
//                             value={props.drug.name}
//                             type="text"
//                             name="name"
//                             id="name"
//                             required=""
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label htmlFor="strength">Medication Strength</label>
//                         <input className="p-2 bd-highlight"
//                             value={props.drug.strength}
//                             onChange={props.handleEditFieldChange}
//                             type="text"
//                             name="strength"
//                             id="strength"
//                             required=""
//                             placeholder="ie 5 mg, 100 mcg, 1 g, 5mL, etc"
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label htmlFor="dosageForm">Medication Type</label>
//                         <input className="p-2 bd-highlight"
//                             value={props.drug.dosageForm}
//                             onChange={props.handleEditFieldChange}
//                             type="text"
//                             name="dosageForm"
//                             id="dosageForm"
//                             required=""
//                             placeholder="ie tablet, capsule, solution, etc"
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label htmlFor="directions">Medication Directions</label>
//                         <input className="p-2 bd-highlight"
//                             value={props.drug.directions}
//                             onChange={props.handleEditFieldChange}
//                             type="text"
//                             name="directions"
//                             id="directions"
//                             required=""
//                             placeholder="ie 'take 1 tablet by mouth...'"
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label htmlFor="indication">Purpose of Medication</label>
//                         <input className="p-2 bd-highlight"
//                             value={props.drug.indication}
//                             onChange={props.handleEditFieldChange}
//                             type="text"
//                             name="indication"
//                             id="indication"
//                             required=""
//                             placeholder="What did your doctor or pharmacist say this drug is for?"
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label htmlFor="notes">Medication Notes</label>
//                         <textarea className="p-2 bd-highlight"
//                             value={props.drug.notes}
//                             onChange={props.handleEditFieldChange}
//                             type="text"
//                             name="notes"
//                             id="notes"
//                             placeholder="Questions? Side effects?"
//                         />
//                     </FormGroup>
//                 </Form>
//                 <Button color="success" onClick={toggleNested}>Refill Details</Button>
//                 <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggleEdit : undefined}>
//             <ModalHeader>Prescription Details (leave blank if over the counter)</ModalHeader>
//             <ModalBody>
//             {/* start of nested form */}
//             <Form className="form-group d-lg-inline-flex flex-column bd-highlight">
//                     <FormGroup>
//                         <label htmlFor="rxNumber">Prescription Number</label>
//                         <input className="p-2 bd-highlight justify-content-center"
//                             onChange={props.handleEditFieldChange}
//                             type="text"
//                             name="rxNumber"
//                             id="rxNumber"
//                             required=""
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label htmlFor="dateFilled">Last Date Filled</label>
//                         <input className="p-2 bd-highlight justify-content-center"
//                             onChange={props.handleEditFieldChange}
//                             type="text"
//                             name="dateFilled"
//                             id="dateFilled"
//                             required=""
//                             placeholder="Most recent fill date (Format: MM/DD/YYYY)"
//                         />
//                     </FormGroup>
//                     <FormGroup>
//                         <label htmlFor="daysSupply">Days Supply</label>
//                         <input className="p-2 bd-highlight justify-content-center"
//                             onChange={props.handleEditFieldChange}
//                             type="text"
//                             name="daysSupply"
//                             id="daysSupply"
//                             required=""
//                             placeholder="How many days will this medication last you?"
//                         />
//                     </FormGroup>
//                 </Form>

//             </ModalBody>
//             <ModalFooter>
//               <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
//               <Button color="secondary" onClick={toggleAll}>All Done</Button>
//             </ModalFooter>
//           </Modal>
//                 </ModalBody>
//                             <ModalFooter>
//                                 <Button color="primary" isLoading={isLoading} onClick={props.handleEditChange}>
//                                     {'Save Edited Medication'}
//                                 </Button>
                                
//                                 <Button color="primary" onClick={toggleEdit}>
//                                     {'Cancel'}
//                                 </Button>
                            
//                     </ModalFooter>
//                 </Modal>
//     </>
//     )

// }
    
// export default EditMedicationFormModal

