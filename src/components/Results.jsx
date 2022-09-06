import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Results = (props) => {

    const { category } = useParams();
    const { num } = useParams();
    const [results, setResults] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      axios.get(`https://swapi.dev/api/${category}/${num}`)
        .then(response => {
            setHasError(false)
            setResults(response.data);
        })
        .catch( err => {
            setHasError(true)
        } )
    }, [results])


    return(
        <div>
            {
                hasError?
                <h3>These aren't the droids you're looking for...</h3>:
                <div>
                    {'name' in results?
                    <h3>{results.name}</h3>:
                    <h3>{results.title}</h3>}
                    {Object.keys(results).map( (a, i) =>
                        <h4 key={i} value={a}>{a}: {results[a]}</h4>
                    )}
                </div>
            }
        </div>
    )
};

export default Results;