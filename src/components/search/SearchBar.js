import React from "react";

const SearchBar = () => {
    return (
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Search for keywords" aria-label="Search"/>
            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
    )
}

export default SearchBar