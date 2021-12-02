import React, {useState, useCallback} from 'react'
import DropZone from './DropZone'
import Results from './Results'


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

  return (
      <main className='App'>
        <h1>AMR prediction:</h1>
        <DropZone onDrop={onDrop}/>
        {(predictionResult !== null &&  formatCheck===true) &&      
          <Results resArr={predictionResult}/>     
        }
        {formatCheck===0 && <h1>Wrong format!</h1>}
      </main> 
  )
}

export default App;