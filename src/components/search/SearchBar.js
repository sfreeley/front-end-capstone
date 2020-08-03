import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import MedicationHistoryCard from "../history/MedicationHistoryCard";
import MedicationCard from "../medication/MedicationCard";
import "./styles/SearchBar.css"


const SearchBar = (props) => {
    
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
//put searchTerm into state
const [searchTerm, setSearchTerm ] = useState({
    keywordSearch: ""
})
const [drugsArray, setDrugsArray] = useState([])
const [filteredDrugsArray, setFilteredDrugsArray ] = useState([])
console.log(filteredDrugsArray)

// const handleFieldChange = (event) => {
//      const stateToChange = {...searchTerm}
//     stateToChange[event.target.id] = event.target.value
//     setSearchTerm(stateToChange)
//     console.log(event.target.value)
//     getMatchingCards() 
   
    
// }

const getMatchingCards = (event) => {
    let searchEvent = event.target.value
    let filteringDrugsArray = drugsArray.filter(drug => {
        let drugValues = Object.values(drug)
        for (const drugEntry of drugValues) {
            return drugValues.join().toLowerCase().includes(searchEvent.toLowerCase())
        }
    })
    if (searchEvent === "") {
        
        filteringDrugsArray = []
    }
    console.log(searchEvent)
    setFilteredDrugsArray(filteringDrugsArray)  
}


                
useEffect(() => {
    ApplicationManager.getDrugsForUser(sessionUser.id)
        .then(drugsFromAPI => {
            setDrugsArray(drugsFromAPI)
            // setSearchTerm(searchTerm.keywordSearch)
    
            console.log(drugsFromAPI)
            console.log(drugsArray)
            console.log(searchTerm.keywordSearch)  
  
        })
},[])


    return (
        <>
        <div className="searchBar-container">
        {/* <form class="form-inline my-2 my-lg-0"> */}
            <input className="form-control searchBar-position" name="keywordSearch" id="keywordSearch" onChange={getMatchingCards} 
            type="text" placeholder="Search for keywords" 
            aria-label="Search"/>
           
        {/* </form> */}
        </div>

        <div>
        {filteredDrugsArray && filteredDrugsArray.map(drug => {
            return drug.taking ? <MedicationCard drugId={parseInt(props.match.params.drugId)} {...props} drug={drug} /> : <MedicationHistoryCard drugId={parseInt(props.match.params.drugId)} {...props} drug={drug} />
            
        })}
        </div>
        </>
    )
}
 
export default SearchBar
