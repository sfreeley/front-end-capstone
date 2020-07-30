import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import MedicationHistoryCard from "../history/MedicationHistoryCard";
import MedicationCard from "../medication/MedicationCard";


const SearchBar = (props) => {
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
     const stateToChange = {...searchTerm}
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
            filteringDrugsArray = drugsArray.filter(drug => {
                console.log(Object.values(drug))
                let drugValues = Object.values(drug)
                for (const drugSearch of drugValues) {
                    
                    return drugValues.join().toLowerCase().includes(searchTerm.keywordSearch.toLowerCase())
                }
            })
        ).then(() => {
            setFilteredDrugsArray(filteringDrugsArray)
            // document.getElementById("keywordSearch").value = ""
        
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
        {filteredDrugsArray && filteredDrugsArray.map(drug => {
            return drug.taking ? <MedicationCard {...props} drug={drug} /> : <MedicationHistoryCard {...props} drug={drug} />
            
        })}
        </div>
        </>
    )
}
 
export default SearchBar
