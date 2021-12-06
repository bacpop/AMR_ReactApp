import React, {useState, useCallback} from 'react'
import DropZone from './DropZone'
import Results from './Results'
import { CSVLink } from "react-csv";
import { SpinnerCircular } from 'spinners-react';

function App (){

  const [predictionResult, setPrediction] = useState(null); //state to store results
  const [formatCheck, setFormat] = useState(null);
  const [lengthCheck, setLength] = useState(0);
  const [loading, setLoading] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setLoading(true);
    setPrediction(null);
    console.log(acceptedFiles.length);
    if(acceptedFiles.length !==0){
      setFormat(true);
      window.Worker[0].postMessage(acceptedFiles);
      window.Worker[0].onmessage = function(event){
          const result = event.data;
          console.log(result);
          if(result.length!==0){
          setPrediction(makeArrayOfObj(result));
          } 
          setLength(acceptedFiles.length-result.length);

          setLoading(false);
    }
    }
    else {setFormat(0);}
    
  })

  function makeArrayOfObj(props){
    const aoo = props.map((prop) =>  
      JSON.parse(prop)
    );
    return(aoo)
  }

  return (
      <main className='App'>
        <h1>AMR prediction tool for <em>S.pneumoniae</em></h1>
        <p>Maybe some text here.</p>
        <DropZone onDrop={onDrop}/>
        {(lengthCheck!==0 && loading=== false) && <h4>Length of {lengthCheck} sequence(s) out of range (1.5Mb-3Mb)!</h4>}
        {loading===true && <SpinnerCircular id = "spinner" size={58} thickness={180} speed={132} color="rgba(0, 62, 116, 1)" secondaryColor="rgba(158, 175, 190, 1)" />}
        {(predictionResult !== null &&  formatCheck===true && loading===false) &&  
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