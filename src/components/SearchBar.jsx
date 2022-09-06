import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {

    const [categories, setCategories] = useState([]);
    const [searchCat, setSearchCat] = useState('people');
    const [IDList, setIDList] = useState([]);
    const [searchID, setSearchID] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get(`https://swapi.dev/api/`)
        .then(response => {
            setCategories(response.data)
        })
        .then(
            axios.get(`https://swapi.dev/api/${searchCat}`)
            .then(response => {
                setIDList(Array.from(Array(response.data.count).keys(), n=>n+1));
            })
        )
    }, [])

    const getIDList = (v) => {
        axios.get(categories[v])
            .then(response => {
                setIDList(Array.from(Array(response.data.count).keys(), n=>n+1));
        })
    }

    const handleChange = (e, setV) => {
        setV(e.target.value);
        if(setV === setSearchCat) getIDList(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/${searchCat}/${searchID}`);
    }

    return(
        <form onSubmit={handleSearch}>
            <label htmlFor="searchType">Search for:</label>
            <select id="searchType" onChange={ (e) => handleChange(e, setSearchCat) }>
                {Object.keys(categories).map( (c, i) =>
                    <option key={i} value={c}>{c}</option>
                )}
            </select>
            <select id="searchID" onChange={ (e) => handleChange(e, setSearchID) }>
                {Object.keys(IDList).map( (i) =>
                    <option key={i} value={IDList[i]}>{IDList[i]}</option>
                )}
            </select>
            <input type='submit' value='Search'/>
        </form>
    )
};

export default SearchBar;