import React from "react";

function Results(props){

    const results = props.resArr;
    const antibiotics = Object.keys(results[0]);
    
    const tableItems =[];

    for(let i = 0; i <results.length; i++){
        var newStrain = antibiotics.map((antibiotic) =>  
            <td key={antibiotic}>{results[i][antibiotic]}</td>
        );
        tableItems.push(<tr key = {results[i]["filename"]}>{newStrain}</tr>); // change key to filename later!!
    }

    const head = antibiotics.map((antibiotic) =>  
        <th key={antibiotic}>{antibiotic}</th>
    );

    return(
        <table className="center">
            <thead><tr>{head}</tr></thead>
            <tbody>{tableItems}</tbody>
        </table>
    )
}

export default Results;