import React, { useState } from "react";
import MedicationCard from "../medication/MedicationCard";
import { Input, Row, Col } from "reactstrap"
import "./styles/SearchBar.css"


const SearchBar = (props) => {
    const { drugs } = props
    const [filteredDrugsArray, setFilteredDrugsArray] = useState([])

    const getMatchingCards = (e) => {
        let searchTerm = e.target.value
        let filteringDrugsArray = drugs.filter(drug => {
            let drugValues = Object.values(drug)
            for (let i = 0; i < drugValues.length; i++) {
                return drugValues.join().toLowerCase().includes(searchTerm.toLowerCase())
            }
        })
        if (searchTerm === "") {
            filteringDrugsArray = [];
        }
        setFilteredDrugsArray(filteringDrugsArray)
    }

    return (
        <>
            <div className="searchBar-container">
                <Input className="form-control searchBar-position" name="keywordSearch" id="keywordSearch" onChange={getMatchingCards}
                    type="text" placeholder="Search for keywords"
                    aria-label="Search" />
            </div>

            <div className="searchBar-result-overlay">
                {filteredDrugsArray && filteredDrugsArray.map(drug => {
                    return (

                        <Row className="div-medicationCard-searchResult">
                            <Col>
                                <MedicationCard drugId={drug.id} {...props} drug={drug} />
                            </Col>
                        </Row>
                    )
                })}
            </div>

        </>
    )

}

export default SearchBar
