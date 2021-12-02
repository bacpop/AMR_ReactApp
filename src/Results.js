import React from "react";

function Results(props){

    const results = props.resArr;
    const antibiotics = Object.keys(JSON.parse(results[0]));
    
    const tableItems =[];

    for(var i = 0; i <results.length; i++){
        const newStrain = antibiotics.map((antibiotic) =>  
            <td key={antibiotic}>{JSON.parse(results[i])[antibiotic]}</td>
        );
        tableItems.push(<tr key = {JSON.parse(results[i])["Penicillin"]}>{newStrain}</tr>); // change key to filename later!!
    }

    const head = antibiotics.map((antibiotic) =>  
        <th key={antibiotic}>{antibiotic}</th>
    );

    return(
        <table class="center">
            <thead><tr>{head}</tr></thead>
            <tbody>{tableItems}</tbody>
        </table>
    )
}

export default Results;