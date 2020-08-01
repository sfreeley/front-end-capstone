import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Input, FormFeedback, FormText } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";
import "./styles/Login.css"



const Login = (props) => {
    const setUser = props.setUser;
    const [modal, setModal] = useState(false);
    const [credentials, setCredentials] = useState({email: "", password: ""});

    
    const toggle = () => setModal(!modal);


    const handleFieldChange = (event) => {
        const stateToChange = {...credentials};
        stateToChange[event.target.id] = event.target.value;
        console.log(event.target.value)
        setCredentials(stateToChange);
        
    };

    const handleLogin = (event) => {
        event.preventDefault();
        let emailValue = document.querySelector("#email").value
        let passwordValue = document.querySelector("#password").value

        ApplicationManager.getUsers()
            .then(usersFromAPI => {
                usersFromAPI.find(user => {
                    if (user.email === emailValue && user.password === passwordValue) {
                        sessionStorage.setItem('user', JSON.stringify(user))
                        setUser(user); 
                        props.history.push("/");
                    } else {
                        toggle()
                        
                    }
                })
            })
    }
 

    return (
       <>
        <div className="base-container" >
        <div className="content">
          <div className="image">
            {/* <img src={loginImg} /> */}
          </div>
          <div className="form">
            <div className="form-group">
            <Label for="exampleEmail">Email Address</Label>
            <Input className="p-2 bd-highlight justify-content-center email"
                    onChange={handleFieldChange}
                    type="email"
                    name="email"
                    id="email"
                    required=""
                    placeholder="Email address"
                />
            </div>
            <div className="form-group">
            <Label for="exampleEmail">Password</Label>
             <Input className="p-2 bd-highlight"
                    onChange={handleFieldChange}
                    type="password"
                    name="password"
                    id="password"
                    required=""
                    placeholder="Password"
                />
            </div>
          </div>
        </div>
        <div className="footer">
        <div border="1px solid" className="d-flex p-2 bd-highlight">
                <Button className="login-form-btn" outline color="info" onClick={handleLogin}>
                   Login
                </Button>
            </div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Alert</ModalHeader>
                    <ModalBody>
                        Login information does not match existing user
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                           Try again
                        </Button>
                    </ModalFooter>
                </Modal>
     
    <div className="registerAcct">
        <span className="registerAcct__text">
        New User?
        <Link to="/register">
                Register
        </Link>
        </span>
                
    </div>
    </div>


        </div>
     
     </>
    
    
        
    )
        
}
export default Login 



