import React from "react";

function verbal_prob(prob, antibiotic){
//Translate probabilities into words based on accuracy on Maela test dataset
var word = prob;
    if(antibiotic==="Penicillin"){ 
        if(prob>=0.9){word="Highly likely";}
        else if (prob>=0.75){word="Very good chance";}        
        else if (prob>=0.5){word="Probably";}
        else if (prob>=0.4){word="Probably not";}
        else if (prob>=0.2){word="Unlikely";}
        else {word="Highly unlikely";}
    }
    else if(antibiotic==="Chloramphenicol"){ 
        if(prob>=0.55){word="Probably";}
        else if (prob>=0.5){word="Maybe";}
        else {word="Highly unlikely";}
    }
    else if(antibiotic==="Erythromycin"){
        if(prob>=0.5){word="Almost certainly";}
        else if (prob>=0.2){word="Probably not";}
        else {word="Highly unlikely";}
    }
    else if(antibiotic==="Tetracycline"){ 
        if(prob>=0.5){word="Almost certainly";}
        else {word="Highly unlikely";}
    }
    else if(antibiotic==="Trim_sulfa"){ 
        if(prob>0.8){word="Almost certainly";}
        else if (prob>0.7){word="Highly likely";}
        else if (prob>0.5){word="Very good chance";}
        else if (prob>0.2){word="Probably not";}
        else {word="Unlikely";}
    }
    return(word)
}


function getRGB(prob, antibiotic){
//generate rgb number for diverging colormap based on probability
    let r=248; // background colour to give to filenames
    let g=248;
    let b=248;
    
    if(prob<0.5){ // shades for sensitive samples
        prob*=2; prob=1-prob;
        if(antibiotic==="Penicillin"||antibiotic==="Trim_sulfa"){prob*=prob;}  //square prob to achieve more colourchanges towards the extremes 0&1
        else if (antibiotic==="Chloramphenicol"||antibiotic==="Tetracycline"){prob=Math.sqrt(prob);} //squareroot of prob to achieve more changes around .5
        else if (antibiotic==="Erythromycin"){} //linear 
        r=255-(prob*(255-78)); ///set last number in each line to rgb values of targeted colour
        g=255-(prob*(255-161));
        b=255-(prob*(255-124));
    }
    else if(prob>0.5){ //red shades for resistant samples
        prob-=0.5;prob*=2;
        if(antibiotic==="Penicillin"||antibiotic==="Trim_sulfa"){prob*=prob;}
        else if (antibiotic==="Chloramphenicol"||antibiotic==="Tetracycline"){prob=Math.sqrt(prob);}
        else if (antibiotic==="Erythromycin"){}
        r=255-(prob*(255-164));
        g=255-(prob*(255-11));
        b=255-(prob*(255-71));
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
        <th key={antibiotic}><div className="tooltip" >{antibiotic}<span className='tooltiptext' id="headerrow">{text[antibiotic]}</span></div></th>
    )]

    //create table content
    const tableItems =[];
    for(let i = 0; i <results.length; i++){
        var newStrain = [
        <td key={antibiotics[0]}>{results[i][antibiotics[0]]+(results[i]["length"] ? '' : ' \u2757')}</td> , //do filename sepearetly to not include tooltip
        antibiotics.slice(1,-1).map((antibiotic) =>  
            <td style= {{background:getRGB(results[i][antibiotic],[antibiotic]) }} key={antibiotic}><div className="tooltip" >{verbal_prob(results[i][antibiotic],antibiotic)}<span className='tooltiptext' id="headerrow">{results[i][antibiotic]}</span></div></td> 
        )]
        if(results[i]["length"]===true){ 
            tableItems.push(<tr key = {results[i]["filename"]}>{newStrain}</tr>);
        }//make row red only  if length is false (i.e. length of sequence <1.5Mb/>3Mb)
        else{tableItems.push(<tr style={{"color":"rgb(160, 17, 46)"}} key = {results[i]["filename"]}>{newStrain}</tr>);}
    }

    return(
        <table className="center">
            <thead>
            <tr>
                <td></td>
                <th colSpan="5" scope="colgroup" style={{fontSize: 22, padding:0}}>Probability of resistance to</th>
            </tr>
                <tr className="CellWithComment">{head}</tr></thead>
            <tbody>{tableItems}</tbody>
        </table>
    )
}

export default Results;