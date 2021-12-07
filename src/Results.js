import React from "react";

function Results(props){

    let results = props.resArr;
    const antibiotics = Object.keys(results[0]);
    
    const tableItems =[];

    for(let i = 0; i <results.length; i++){
        //remove length from array
        const status = results[i]["length"];
        //console.log(status);
        var newStrain = antibiotics.slice(0,-1).map((antibiotic) =>  
            <td key={antibiotic}>{results[i][antibiotic]}<span className="CellComment">This sequence is of unusual length for S.pneumoniae</span></td>
        );
        //make row red only  if length was false! <tr style="background-color:#FF0000" ...
        if(status===true){
            tableItems.push(<tr key = {results[i]["filename"]}>{newStrain}</tr>);
        }
        else{tableItems.push(<tr className="CellWithComment" key = {results[i]["filename"]}>{newStrain}</tr>);}

    }

    const head = antibiotics.slice(0,-1).map((antibiotic) =>  
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