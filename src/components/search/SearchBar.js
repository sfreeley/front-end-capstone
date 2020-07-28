import React, { useState, useEffect } from "react";
import MedicationCard from "../medication/MedicationCard";
import ApplicationManager from "../modules/ApplicationManager";


const SearchBar = (props ) => {
    let searchResult;
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
//put searchTerm into state
const [searchTerm, setSearchTerm ] = useState({
    keywordSearch: ""
})
const [drugsArray, setDrugsArray] = useState([])

const handleFieldChange = (event) => {
    const stateToChange = {...searchTerm}
    stateToChange[event.target.id] = event.target.value
    setSearchTerm(stateToChange)
    console.log(event.target.value)
}

const getMatchingCards = () => {
    
   ApplicationManager.getDrugsForUser(sessionUser.id)
        .then(drugsFromAPI => {
           
            setDrugsArray(drugsFromAPI)
            console.log(drugsFromAPI)
        }).then(
            searchResult= drugsArray.filter(drug => {
            console.log(drug)
            let drugValues = Object.values(drug)
            console.log(drugValues)

            return setDrugsArray(drug.name
                .toLowerCase()
                .includes(searchTerm.keywordSearch.toLowerCase()))
                
        }).map((drug) => {
            return <div>{drug}</div>
        })
    )
}
           
            

useEffect(() => {
    getMatchingCards();
},[])

 //what do I want to search?: 
    //how do I get this info? do getall drugs by userId
    //what do you do next? iterate through fetch and get all values of each object
    //set search term to state 
    //if search term matches object value...
    //get medication card data
    //show it in new page with search criteria 

   
    return (
        <>
        <form onSubmit={getMatchingCards} class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" name="keywordSearch" id="keywordSearch" onChange={handleFieldChange} 
            type="text" placeholder="Search for keywords" value={searchTerm.keywordSearch}
            aria-label="Search"/>
            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit" >Search</button>
        </form>

        <div>
       
        
           
        </div>
        </>
    )
}
 
export default SearchBar