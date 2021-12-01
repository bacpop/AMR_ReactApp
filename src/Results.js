import React from "react";

function Results(props){


    const results = props.resObj;
    const antibiotics = Object.keys(results);
    const prob = results["Penicillin"]
    console.log(prob);

    const listItems = antibiotics.map((antibiotic) =>  
        <li key={antibiotic}>Probability of resistance to {antibiotic}: {results[antibiotic]}</li>
    );

    return(
        <div>
            <ul>{listItems}</ul>
        </div>
    )
}


export default Results;