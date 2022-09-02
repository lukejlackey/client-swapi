import React, {useState, useEffect} from 'react';
import axios from 'axios';

const SearchBar = (props) => {

    const [categories, setCategories] = useState([]);
    const [searchCat, setSearchCat] = useState('');
    const [IDList, setIDList] = useState([]);

    useEffect(() => {
      axios.get(`https://swapi.dev/api/`)
        .then(response => {
            setCategories(response.data)
        })
    }, [])

    const getIDList = (v) => {
        console.log(categories[v])
        axios.get(categories[v])
        .then(response => {
            console.log(response)
            setIDList(response.data)
        })
    }

    const handleChange = async (e, setV) => {
        console.log(e.target.value)
        setV(e.target.value);
        getIDList(e.target.value);

    }
    

    return(
        <form>
            <label htmlFor="searchType">Search for:</label>
            <select id="searchType" onChange={ (e) => handleChange(e, setSearchCat)}>
                {Object.keys(categories).map( (c, i) =>
                    <option key={i} value={c}>{c}</option>
                )}
            </select>
            <input></input>
        </form>
    )
};

export default SearchBar;