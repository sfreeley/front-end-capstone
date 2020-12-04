import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import MedicationCard from "../medication/MedicationCard";
import { Input, Row, Col } from "reactstrap"
import "./styles/SearchBar.css"


const SearchBar = (props) => {

    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    const [drugsArray, setDrugsArray] = useState([])
    const [filteredDrugsArray, setFilteredDrugsArray] = useState([])


    const getMatchingCards = (event) => {
        let searchEvent = event.target.value
        let filteringDrugsArray = props.drugs.filter(drug => {
            let drugValues = Object.values(drug)
            for (let i = 0; i < drugValues.length; i++) {
                return drugValues.join().toLowerCase().includes(searchEvent.toLowerCase())
            }
        })
        if (searchEvent === "") {
            filteringDrugsArray = []
        }
        setFilteredDrugsArray(filteringDrugsArray)
    }

    useEffect(() => {
        ApplicationManager.getPharmaciesForDrugs(sessionUser.id)
            .then(drugsFromAPI => {
                setDrugsArray(drugsFromAPI)
            })
    }, [sessionUser.id])


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
