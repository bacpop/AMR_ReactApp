import React from "react";

function Results(props){

    //console.log(JSON.parse(result[0]));

    const results = props.resArr;
    const antibiotics = Object.keys(JSON.parse(results[0]));
    

    const tableItems =[];

    for(var i = 0; i <results.length; i++){
        //const strain = JSON.parse(results[i])
        
        const newStrain = antibiotics.map((antibiotic) =>  
            <td>{JSON.parse(results[i])[antibiotic]}</td>
        );
        tableItems.push(<tr>{newStrain}</tr>);
    }

    /*
    const tableItems = results.map( function(result){
        return(
            <tr>
                result.map(function(item){return(<td>"text"</td>)}) 
            </tr>
        )
    }   
    );
*/

    const head = antibiotics.map((antibiotic) =>  
        <th key={antibiotic}>{antibiotic}</th>
    );

    return(
        <table>
            <thead><tr>{head}</tr></thead>
            <tbody>{tableItems}</tbody>
        </table>
    )
}


export default Results;
//<tbody>{tableItems}</tbody>