import React from "react";
import { Route, Redirect } from "react-router-dom";

//login
import Login from "./components/auth/Login";

//register
import Registration from "./components/auth/Registration"

//home
import Home from "./components/home/Home";

//medication
import AddMedicationFormModal from "./components/medication/AddMedicationFormModal";
import MedicationList from "./components/medication/MedicationList";


const ApplicationViews = (props) => {
    const hasUser = props.hasUser
    const setUser = props.setUser
    const clearUser = props.clearUser

 return(
     <>
     <Route path="/login" 
     render = {props => {
         return <Login setUser={setUser} {...props} />
     }}
     />
    <Route path="/register"
    render = {props => {
        return (!hasUser && <Registration {...props} setUser={setUser} />)
    }}
    />

    <Route exact path="/"
    render={props => {
        return (hasUser ? <Home hasUser={hasUser} clearUser={clearUser} {...props}/>  : <Redirect to="/login" />)
    }}
    />

    <Route path="/medication/new"
    render={props => {
        return <AddMedicationFormModal {...props} />
    }}
    />

    <Route path="/medication/list"
    render={props => {
        return (hasUser ? <MedicationList {...props} /> : <Redirect to="/login"/>)
    }}
    /> 
     </>
 )   
 

}
export default ApplicationViews;