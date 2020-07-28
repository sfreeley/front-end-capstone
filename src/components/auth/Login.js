import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";


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
           
    <div>
      <Jumbotron fluid>
        <Container fluid className="d-inline-flex flex-column bd-highlight border">
          {/* <h1 className="display-4"></h1> */}
          <img src={require("../../images/trackrx-logo.png")} alt="logo" className="rounded"/>
        </Container>
      </Jumbotron>
    </div>
        
        <Form id="form" className="form-group d-lg-inline-flex flex-column bd-highlight border">
            <FormGroup>
                {/* <label htmlFor="email"></label> */}
                <input className="p-2 bd-highlight justify-content-center"
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
                <input className="p-2 bd-highlight"
                    onChange={handleFieldChange}
                    type="password"
                    name="password"
                    id="password"
                    required=""
                    placeholder="Password"
                />
            </FormGroup>
               
                <div>
                <Button color="primary" onClick={handleLogin}>
                    {'Login'}
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Alert</ModalHeader>
                    <ModalBody>
                        Login information does not match existing user
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>
                           {'Try again'}
                        </Button>
                    </ModalFooter>
                </Modal>
                </div>
        </Form>
       
        <div className="registerAcct">
              <span className="registerAcct__text">
                New User?
                </span>
                <Link to="/register">
                Register
                </Link>
        </div>
        </>
        
    )
        
}
export default Login 



