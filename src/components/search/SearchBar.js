import React, { useState, useEffect } from "react";
import SearchResults from "./SearchResult";
import ApplicationManager from "../modules/ApplicationManager";
import MedicationHistoryCard from "../history/MedicationHistoryCard";
import MedicationCard from "../medication/MedicationCard";


const SearchBar = (props) => {
    let stateToChange;
    let filteringDrugsArray
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
//put searchTerm into state
const [searchTerm, setSearchTerm ] = useState({
    keywordSearch: ""
})
const [drugsArray, setDrugsArray] = useState([])
const [filteredDrugsArray, setFilteredDrugsArray ] = useState([])
console.log(filteredDrugsArray)



const handleFieldChange = (event) => {
     stateToChange = {...searchTerm}
    stateToChange[event.target.id] = event.target.value
    setSearchTerm(stateToChange)
    console.log(event.target.value)
}

const getMatchingCards = () => {
    
   ApplicationManager.getDrugsForUser(sessionUser.id)
        .then(drugsFromAPI => {
            setDrugsArray(drugsFromAPI)
            // setSearchTerm(searchTerm.keywordSearch)
    
            console.log(drugsFromAPI)
            console.log(drugsArray)
            console.log(searchTerm.keywordSearch)  


             
        }).then(
            filteringDrugsArray = drugsArray.filter(drug => 
                drug.name.toLowerCase().includes(searchTerm.keywordSearch.toLowerCase()) ? true : false
            )
        ).then(() => {
            setFilteredDrugsArray(filteringDrugsArray)
        })
    
           
}
                 
useEffect(() => {
    getMatchingCards();
},[stateToChange])




    return (
        <>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" name="keywordSearch" id="keywordSearch" onChange={handleFieldChange} 
            type="text" placeholder="Search for keywords" value={searchTerm.keywordSearch}
            aria-label="Search"/>
            <button class="btn btn-outline-primary my-2 my-sm-0" type="button" onClick={() => getMatchingCards()}>Search</button>
        </form>

        <div>
        {filteredDrugsArray && filteredDrugsArray.map(drug => {
            return <MedicationCard {...props} drug={drug} /> 
        })}
        </div>
        </>
    )
}
 
export default SearchBar
