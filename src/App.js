import React, {useState, useCallback} from 'react'
import DropZone from './DropZone'
import Results from './Results'
import { CSVLink } from "react-csv";
import exampleFile from './examples/example1.fa';


function App (){

  const [predictionResult, setPrediction] = useState([]); //state to store results
  const [formatCheck, setFormat] = useState(null); //state to store if format is .fa/.fasta
  const [loading, setLoading] = useState(null); //state to ceck if first result is loading

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    setLoading(true);
    setPrediction([]);
    if(acceptedFiles.length !==0){ //check if files have been accepted (i.e. are right format)
      setFormat(true);
      for(var i = 0; i < acceptedFiles.length; i++){ //send one file at a time to webworker
        window.Worker[0].postMessage(acceptedFiles[i]);
      }
    }
    else {setFormat(0);setLoading(false);}

    window.Worker[0].onmessage = function(event){
        const result = JSON.parse(event.data); 
        setPrediction(predictionResult => [...predictionResult, result]); // add each result to state
        setLoading(false);
    }
  },[])

  function run_examples(){
    console.log(exampleFile);
    fetch(exampleFile)
      .then(response => response.text())
      .then((data) => {
      console.log(data);
      var file = new File([data], "examplefile1.fa");
      setLoading(true);
      setFormat(true);
      setPrediction([]);
      window.Worker[0].postMessage(file);
      window.Worker[0].onmessage = function(event){
        const result = JSON.parse(event.data); 
        setPrediction(predictionResult => [...predictionResult, result]); // add each result to state
        setLoading(false);
    }
    })
    
    
  }

  return (
      <main className='App'>
        <h1>AMR prediction tool for <em>S.pneumoniae</em></h1>
        <h2>
          This tool uses Machine Learning models to predict the probability of resistance to 5 different antibiotics. </h2><p>
          It is based on ElasticNet models trained on data from the USA and South Africa from the <a href="https://www.pneumogen.net/gps/">GPS</a> database. </p><p>
          Submit as many <em>S.pneumoniae</em> sequences in FASTA format as you wish. The results are available for download as CSV.
        </p>
        <DropZone onDrop={onDrop}/>
        <button onClick={run_examples}>Try example sequences</button>
        {(predictionResult !== [] &&  formatCheck===true && loading===false) &&  
          <div>
            <button id="download"><CSVLink data={predictionResult}>Download Results as CSV</CSVLink></button>
            <Results resArr={predictionResult}/>
          </div>    
        }
        {(formatCheck===0)&& <h1>Wrong format!</h1>}
        
        
      </main> 
  )
}

export default App;