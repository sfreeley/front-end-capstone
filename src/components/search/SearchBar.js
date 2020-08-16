import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import MedicationHistoryCard from "../history/MedicationHistoryCard";
import MedicationCard from "../medication/MedicationCard";
import { Input, Row, Col } from "reactstrap"
import "./styles/SearchBar.css"


const SearchBar = (props) => {

    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    //put searchTerm into state
    // const [searchTerm, setSearchTerm ] = useState({
    //     keywordSearch: ""
    // })
    const [drugsArray, setDrugsArray] = useState([])
    const [filteredDrugsArray, setFilteredDrugsArray] = useState([])

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
        setFilteredDrugsArray(filteringDrugsArray)
    }

    useEffect(() => {
        ApplicationManager.getDrugsForUser(sessionUser.id)
            .then(drugsFromAPI => {
                setDrugsArray(drugsFromAPI)
            })
    }, [])


    return (
        <>
            <div className="searchBar-container">
                {/* <form class="form-inline my-2 my-lg-0"> */}
                <Input className="form-control searchBar-position" name="keywordSearch" id="keywordSearch" onChange={getMatchingCards}
                    type="text" placeholder="Search for keywords"
                    aria-label="Search" />

                {/* </form> */}
            </div>


            <div className="searchBar-result-overlay">
                {filteredDrugsArray && filteredDrugsArray.map(drug => {
                    return drug.taking ?

                        
                        <Row className="div-medicationCard-searchResult">
                            <Col>
                                <MedicationCard {...drugsArray} drugId={parseInt(props.match.params.drugId)} {...props} drug={drug} />
                            </Col>
                        </Row> :

                        <Row className="div-medicationHxCard-searchResult">
                            <Col>
                                <MedicationHistoryCard {...drugsArray} drugId={parseInt(props.match.params.drugId)} {...props} drug={drug} />
                            </Col>
                        </Row>
                        

                })}
            </div>

        </>
    )
}

export default SearchBar
