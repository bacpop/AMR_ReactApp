import React, {useState, useCallback} from 'react'
import DropZone from './DropZone'
import Results from './Results'
import { CSVLink, CSVDownload } from "react-csv";

function App (){

  const [predictionResult, setPrediction] = useState(null); //state to store results
  const [formatCheck, setFormat] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    
    console.log(acceptedFiles.length);
    if(acceptedFiles.length !==0){
      setFormat(true);
      window.Worker[0].postMessage(acceptedFiles);
      window.Worker[0].onmessage = function(event){
          const result = event.data;
          console.log(result);
          
          setPrediction(result);
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
        {(predictionResult !== null &&  formatCheck===true) &&  
          <div>
            <button id="download"><CSVLink data={makeArrayOfObj(predictionResult)}>Download Results as CSV</CSVLink></button>
            <Results resArr={predictionResult}/>
          </div>    
        }
        {formatCheck===0 && <h1>Wrong format!</h1>}
        
      </main> 
  )
}

export default App;