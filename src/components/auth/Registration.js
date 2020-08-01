import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";




const Registration = (props) => {
    const setUser = props.setUser;
    const [newUser, setNewUser] = useState({username: "", email: "", password: "", image: "" })
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    

    const handleFieldChange = event => {
        const stateToChange = { ...newUser };
        stateToChange[event.target.id] = event.target.value;
        setNewUser(stateToChange);
    };

    const getUsers = () => {
        ApplicationManager.getUsers().then(usersFromAPI => {
            setAllUsers(usersFromAPI)
        })
    }
    
    useEffect(() => {
        getUsers()
    },[]);

    
        const toggle = () => setModal(!modal);
    
    
    
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
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                        {/* <h1 className="display-4"></h1> */}
                        <img src={require("../../images/trackrx-logo.png")} alt="logo" />
                    </Container>
                </Jumbotron>
            </div>

            <span className="registerHeader">
                New Account
            </span>
            <Form className="form-fields" id="registerForm">
                <FormGroup>
                    {/* <label htmlFor="email"></label> */}
                    <Input
                        onChange={handleFieldChange}
                        type="username"
                        name="username"
                        id="username"
                        required=""
                        placeholder="Username"
                    />
                </FormGroup>
                <FormGroup>
                    {/* <label htmlFor="email"></label> */}
                    <Input
                        onChange={handleFieldChange}
                        type="email"
                        name="email"
                        id="email"
                        required=""
                        placeholder="Email address"
                    />
                </FormGroup>
                <FormGroup>
                    {/* <label htmlFor="password"></label> */}
                    <Input
                        onChange={handleFieldChange}
                        type="password"
                        name="password"
                        id="password"
                        required=""
                        placeholder="Password"
                    />
                </FormGroup>
                <FormGroup>
                    {/* <label htmlFor="password"></label> */}
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required=""
                        placeholder="Confirm Password"
                    />
                </FormGroup>    
            </Form>
            <Button
                type="submit"
                className="register-form-btn" disabled={isLoading}
                onClick={registerNewUser}>
                Create Account
            </Button>
        
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


            <div className="registerAcct">
                <span className="registerAcct__text">
                    Already have an account?
              </span>
                <Link to="/login">
                    Sign In
                </Link>
            </div>

        </>        
         
  );
}

export default Registration