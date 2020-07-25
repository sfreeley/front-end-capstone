import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Jumbotron, Container } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";


const Registration = (props) => {
    let findUsername;
    const setUser = props.setUser;

    const [newUser, setNewUser] = useState({ username: "", email: "", password: "", image: "" })
    const [isLoading, setIsLoading] = useState(false);

    const handleFieldChange = event => {
        const stateToChange = { ...newUser };
        stateToChange[event.target.id] = event.target.value;
        setNewUser(stateToChange);
    };

    const registerNewUser = event => {
        event.preventDefault();
        let confirmPassword = document.querySelector("#confirmPassword").value;

        ApplicationManager.getUsers()
            .then(usersFromAPI => {
            findUsername = usersFromAPI.find(userObj => {
               return userObj.username === newUser.username  
            })
            if (findUsername) {
                alert("Username already exists");
                document.getElementById("registerForm").reset()
            } else if (newUser.username === "" || newUser.email === "" || newUser.password === "") {
                alert("Please fill out each field")
            } else if (newUser.password !== confirmPassword) {
                alert("Your passwords do not match. Please try again")
            } else {
                // user.image = 
                setIsLoading(true);
                sessionStorage.setItem("user", JSON.stringify(newUser))
                setUser(newUser)
                ApplicationManager.postNewUser(newUser)
                    .then(() => props.history.push("/"));
            }
            
        })
    

       
    };

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
                    <input
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
                    <input
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
                    <input
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
                    <input
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