import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Label } from "reactstrap";
import ApplicationManager from "../modules/ApplicationManager";

const Registration = (props) => {
    let findUsername
    const setUser = props.setUser;
    const [newUser, setNewUser] = useState({username: "", email: "", password: ""})
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    

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

    
    useEffect(() => {
        getUsers();
        
    },[]);

    
    const registerNewUser = event => {
        event.preventDefault();
        let confirmPassword = document.querySelector("#confirmPassword").value;
            let findUserEmail = allUsers.find(userObj => {
                return userObj.email === newUser.email 
             })
            findUsername = allUsers.find(userObj => {
               return userObj.username === newUser.username  
            })
            if (findUsername && findUserEmail ) {
                alert("User email and username already exists")
            } else if (findUserEmail) {
                alert("User email already exists")
            } else if (findUsername) {
                alert("Username already exists");
            } else if (newUser.username === "" || newUser.email === "" || newUser.password === "") {
                alert("Please fill out each field")
            } else if (newUser.password !== confirmPassword) {
                alert("Your passwords do not match. Please try again")
            } else {  
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
                    </div>
                     
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
</div> 


</>        
         
  );
}

export default Registration