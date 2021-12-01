import React from "react";
import {useDropzone} from "react-dropzone";

function DropZone({onDrop}) {

  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept:'.fa, .fasta', onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <div className="dragdrop">
          Drop the files here ...
        </div> :
        <div className="dragdrop">
          <p>Drag 'n' drop file here, or click to select file.</p>
          <p> .fa and .fasta formats are supported.</p>
        </div>
      }
    </div>
  )
}

export default DropZone;