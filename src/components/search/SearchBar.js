import React, { useState, useEffect } from "react";
import ApplicationManager from "../modules/ApplicationManager";
import MedicationCard from "../medication/MedicationCard";
import { Input, Row, Col } from "reactstrap"
import "./styles/SearchBar.css"


const SearchBar = (props) => {
    const { filteredDrugsArray, getMatchingCards } = props

    return (
        <>
            <div className="searchBar-container">
                <Input className="form-control searchBar-position" name="keywordSearch" id="keywordSearch" onChange={getMatchingCards}
                    type="text" placeholder="Search for keywords"
                    aria-label="Search" />
            </div>

            <div className="searchBar-result-overlay">
                {(window.location.pathname === "/" && filteredDrugsArray) && filteredDrugsArray.map(drug => {
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
