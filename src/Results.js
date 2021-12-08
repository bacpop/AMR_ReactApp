import React from "react";

function Results(props){

    let results = props.resArr;
    const antibiotics = Object.keys(results[0]);
    
    const tableItems =[];

    for(let i = 0; i <results.length; i++){
        //remove length from array
        const status = results[i]["length"];
        const blue = 100;
        var newStrain = antibiotics.slice(0,-1).map((antibiotic) =>  
            <td style= {{background:"rgb(255,"+(1-results[i][antibiotic])*255+","+(1-results[i][antibiotic])*255+")" }} key={antibiotic}>{results[i][antibiotic]}<span className='CellComment'>This sequence has an unusual length for S. pneumoniae</span></td> //this comment is only printed for rows with className="CellWithComment"
        );
        //make row red only  if length is false
        if(status===true){
            tableItems.push(<tr key = {results[i]["filename"]}>{newStrain}</tr>);
        }
        else{tableItems.push(<tr className="CellWithComment" key = {results[i]["filename"]}>{newStrain}</tr>);}

    }

    //texts for tooltips
    let text_Penicillin ="Balanced Accuracy on test datasets: Massachusetts: 0.933 Maela: 0.836";
    let text_Chloramphenicol ="Balanced Accuracy on test dataset: Maela: 0.819";
    let text_Tetracycline ="Balanced Accuracy on test datasets: Massachusetts: 0.953 Maela: 0.940";
    let text_Trim_sulfa ="Balanced Accuracy on test datasets: Massachusetts: 0.706 Maela: 0.740";
    let text_Erythromycin ="Balanced Accuracy on test datasets: Massachusetts: 0.959 Maela: 0.961";

    const head = [
        <th key={antibiotics[0]}>{antibiotics[0]}</th>, //do 'filename' seperately to not include tooltip
        antibiotics.slice(1,-1).map((antibiotic) =>  
        <th key={antibiotic}><div className="tooltip" >{antibiotic}<span className='tooltiptext'>{eval("text_"+antibiotic)}</span></div></th>
    )]

    return(
        <table className="center">
            <thead><tr className="CellWithComment">{head}</tr></thead>
            <tbody>{tableItems}</tbody>
        </table>
    )
}

export default Results;