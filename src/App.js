import React, {useState, useCallback} from 'react'
import DropZone from './DropZone'
import Results from './Results'
import { CSVLink, CSVDownload } from "react-csv";
import { SpinnerCircular } from 'spinners-react';

function App (){

  const [predictionResult, setPrediction] = useState(null); //state to store results
  const [formatCheck, setFormat] = useState(null);
  const [loading, setLoading] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setLoading(true);
    console.log(acceptedFiles.length);
    if(acceptedFiles.length !==0){
      setFormat(true);
      window.Worker[0].postMessage(acceptedFiles);
      window.Worker[0].onmessage = function(event){
          const result = event.data;
          console.log(result);
          
          setPrediction(result);
          setLoading(false);
    }
    }
    else {setFormat(0);}
    
  })

  function makeArrayOfObj(props){
    const aoo = props.map((prop) =>  
      JSON.parse(prop)
    );
    console.log(aoo);
    return(aoo)
  }

  return (
      <main className='App'>
        <h1>AMR prediction tool for <em>S.pneumoniae</em></h1>
        <DropZone onDrop={onDrop}/>
        {loading==true && <SpinnerCircular id="spinner" size={65} thickness={179} speed={129} color="#36ad47" secondaryColor="rgba(137, 172, 57, 0.44)" />}
        {(predictionResult !== null &&  formatCheck===true && loading==false) &&  
          <div>
            <button id="download"><CSVLink data={makeArrayOfObj(predictionResult)}>Download Results as CSV</CSVLink></button>
            <Results resArr={predictionResult}/>
          </div>    
        }
        {(formatCheck===0 && loading==false)&& <h1>Wrong format!</h1>}
        
      </main> 
  )
}

export default App;