import React from "react";

function getRGB(prob){
//generate rgb number for diverging colormap based on probability
    let r=248; // background colour to give to filenames
    let g=248;
    let b=248;
    if(prob<0.5){ // shades for sensitive samples
        prob*=2;
        r=0+(prob*255); //set first numbers to aimed rgb colour, second number to rest until 255
        g=153+(prob*102);
        b=153+(prob*102);
    }
    else if(prob>0.5){ //red shades for resistant samples
        prob-=0.5;prob*=2;
        r=255;
        g=(1-prob)*255;
        b=(1-prob)*255;
    }
    return("rgb("+r+","+g+","+b+")")
}

function Results(props){
//create table to display results
    let results = props.resArr;
    const antibiotics = Object.keys(results[0]);
    
     //texts for tooltips on antibiotics
     const text=[];
    text["Penicillin"] ="Balanced Accuracy on test datasets: Massachusetts: 0.933 Maela: 0.836";
    text["Chloramphenicol"] ="Balanced Accuracy on test dataset: Maela: 0.819";
    text["Tetracycline"] ="Balanced Accuracy on test datasets: Massachusetts: 0.953 Maela: 0.940";
    text["Trim_sulfa"] ="Balanced Accuracy on test datasets: Massachusetts: 0.954 Maela: 0.837";
    text["Erythromycin"] ="Balanced Accuracy on test datasets: Massachusetts: 0.959 Maela: 0.961";

    //create head of table
    const head = [
        <th key={antibiotics[0]}>{antibiotics[0]}</th>, //do 'filename' seperately to not include tooltip
        antibiotics.slice(1,-1).map((antibiotic) =>  
        <th key={antibiotic}><div className="tooltip" >{antibiotic}<span className='tooltiptext'>{text[antibiotic]}</span></div></th>
    )]

    //create table content
    const tableItems =[];
    for(let i = 0; i <results.length; i++){
        var newStrain = antibiotics.slice(0,-1).map((antibiotic) =>  
            <td style= {{background:getRGB(results[i][antibiotic]) }} key={antibiotic}>{results[i][antibiotic]}<span className='CellComment'><p className="red">This sequence has an unusual length for S. pneumoniae</p></span></td> //this comment is only printed for rows with className="CellWithComment"
        );
        if(results[i]["length"]===true){ 
            tableItems.push(<tr key = {results[i]["filename"]}>{newStrain}</tr>);
        }//make row CellWithCommen only  if length is false (i.e. length of sequence <1.5Mb/>3Mb)
        else{tableItems.push(<tr className="CellWithComment" key = {results[i]["filename"]}>{newStrain}</tr>);}
    }

    return(
        <table className="center">
            <thead><tr className="CellWithComment">{head}</tr></thead>
            <tbody>{tableItems}</tbody>
        </table>
    )
}

export default Results;