import React, {useState, useCallback} from 'react'
import DropZone from './DropZone'
import Results from './Results'
import { CSVLink } from "react-csv";
import { SpinnerCircular } from 'spinners-react';

function App (){

  const [predictionResult, setPrediction] = useState([]); //state to store results
  const [formatCheck, setFormat] = useState(null);
  const [lengthCheck, setLength] = useState(0);
  const [loading, setLoading] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setLoading(true);
    setPrediction([]);
    console.log(acceptedFiles[0])
    if(acceptedFiles.length !==0){
      setFormat(true);
      for(var i = 0; i < acceptedFiles.length; i++){
        window.Worker[0].postMessage(acceptedFiles[i]);
      }
    }
    else {setFormat(0);setLoading(false);}

    window.Worker[0].onmessage = function(event){
        const result = JSON.parse(event.data);
        console.log(result);
        setPrediction(predictionResult => [...predictionResult, result]);
        console.log(predictionResult);
        setLoading(false);
    }
  },[])

  return (
      <main className='App'>
        <h1>AMR prediction tool for <em>S.pneumoniae</em></h1>
        <p>Maybe some text here.</p>
        <DropZone onDrop={onDrop}/>
        {(predictionResult !== [] &&  formatCheck===true && loading===false) &&  
          <div>
            <button id="download"><CSVLink data={predictionResult}>Download Results as CSV</CSVLink></button>
            <Results resArr={predictionResult}/>
          </div>    
        }
        {(formatCheck===0 && loading===false)&& <h1>Wrong format!</h1>}
        
        
      </main> 
  )
}

export default App;