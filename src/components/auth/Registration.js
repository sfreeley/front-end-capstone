import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";

const Registration = (props) => {
    // let resourceChosenId;
    // let checkedBoxes;
    const setUser = props.setUser;
    const [newUser, setNewUser] = useState({username: "", email: "", password: ""})
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    //trial code for checkboxes
   
    const [resources, setResources] = useState([])
    console.log(resources)

   
    
    const handleFieldChange = event => {
        const stateToChange = { ...newUser};
        stateToChange[event.target.id] = event.target.value;
        setNewUser(stateToChange);
    };

    const getUsers = () => {
        ApplicationManager.getUsers().then(usersFromAPI => {
            setAllUsers(usersFromAPI)
        })
    }

    //resources
    const getResources = () => {
        ApplicationManager.getAllResources().then(resources => {
            setResources(resources)
        })
    }
    
    useEffect(() => {
        getUsers();
        getResources();
    },[]);

    
    
    const registerNewUser = event => {
        event.preventDefault();
        let confirmPassword = document.querySelector("#confirmPassword").value;
            let findUserEmail = allUsers.find(userObj => {
                return userObj.email === newUser.email 
             })
            let findUsername = allUsers.find(userObj => {
               return userObj.username === newUser.username  
            })
            if (findUsername && findUserEmail ) {
                alert("User email and username already exists")
               document.getElementById("registerForm").reset()
            } else if (findUserEmail) {
                alert("User email already exists")
            } else if (findUsername) {
                alert("Username already exists");
            } else if (newUser.username === "" || newUser.email === "" || newUser.password === "") {
                alert("Please fill out each field")
            } else if (newUser.password !== confirmPassword) {
                alert("Your passwords do not match. Please try again")
            } else {
                // user.image = 
                setIsLoading(true)
                ApplicationManager.postNewUser(newUser).then(() => {
                    ApplicationManager.getUsers().then(result => {
                        result.find(user => {
                            if (user.username === newUser.username) {
                                newUser.id = user.id
                                setUser(newUser)
                                props.history.push("/")
                            }
                        })
                        
                    })
                    
                })
               
            }
        
    }  

 

   return (
        <>
         <div className="content-container">
          <div className="image-logo">
            <img src={require("../../images/circle-logo.png")} alt="trackRx-logo" />
          </div>
          <span className="registerHeader">
                New Account
            </span>
          <div className="form-container">
            <div className="form-group">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        onChange={handleFieldChange}
                        type="username"
                        name="username"
                        id="username"
                        required=""
                        
                    />
                    </div>
               
                    <div className="form-group">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        onChange={handleFieldChange}
                        type="email"
                        name="email"
                        id="email"
                        required=""
                        
                    />
               {/* start of checkboxes */}
               </div>
               <Label>Would you like any additional information on the following topics? (Please check all that apply)</Label>
                {resources.map(resource => {
                    return (<div className="form-group" key={resource.id}>
                   
                    <Input
                        onChange={""}
                        type="checkbox"
                        name={resources.id}
                        id={resource.id}
                        
                 
                    />
                     <Label htmlFor={resource.id}>{resource.title}</Label>
                    </div>)
                })
                }
                   
               
               
                    
               <div className="form-group">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        onChange={handleFieldChange}
                        type="password"
                        name="password"
                        id="password"
                        required=""
                        
                    />
                </div>
                <div className="form-group">
                    <Label htmlFor="password">Confirm Password</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required=""
                  />      
           
            <div className="btn-login">
            <Button
                type="submit"
                outline color="info"
                className="register-form-btn" disabled={isLoading}
                onClick={registerNewUser}>
                Create Account
            </Button>
            </div>

                <div className="message-loginAcct">
                <span className="loginAcct__text">
                    Already have an account?
              
                <Link to="/login">
                    Sign In
                </Link>
                </span>
                </div>
            </div>
            </div>
            </div>
        
            <div>
            
                {/* <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Alert</ModalHeader>
                    <ModalBody>
                    User email and username already exist
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                           {'Try again'}
                        </Button>
                    </ModalFooter>
                </Modal>*/}
            </div> 


        </>        
         
  );
}

export default Registration