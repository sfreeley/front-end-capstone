import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResult";
import ApplicationManager from "../modules/ApplicationManager";
import MedicationHistoryCard from "../history/MedicationHistoryCard";
import MedicationCard from "../medication/MedicationCard";


const SearchBar = (props) => {
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
    
   ApplicationManager.getSearchResults(sessionUser.id, searchTerm.keywordSearch)
        .then(drugsFromAPI => {
            setDrugsArray(drugsFromAPI)
            
            console.log(drugsFromAPI)
            console.log(drugsArray)
            console.log(searchTerm.keywordSearch)  
             
        }).then(() => {
            if (drugsArray.length === 0) {
                return (
                    <div> No matches exist for your search term </div>
                )
            }
        })
           
}
                 
useEffect(() => {
    getMatchingCards();
},[])

    return (
        <>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" name="keywordSearch" id="keywordSearch" onChange={handleFieldChange} 
            type="text" placeholder="Search for keywords" value={searchTerm.keywordSearch}
            aria-label="Search"/>
            <button class="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={() => getMatchingCards()}>Search</button>
        </form>

        <div>
        
        {drugsArray && drugsArray.map(drug => {
            if(drugsArray.length === 0) {
                alert("No matches exist for your search term")
            } else {
               return <MedicationCard {...props} drug={drug} />
            }
            
        })}
        
           
        </div>
        </>
    )
}
 
export default SearchBar