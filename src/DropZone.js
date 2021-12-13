import React from "react";
import {useDropzone} from "react-dropzone";

function DropZone({onDrop}) {

  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept:'.fa, .fasta, .fna', onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <div className="dragdrop">
          <p className="dragdrop_text">Drop the files here</p>
        </div> :
        <div className="dragdrop">
          <p className="dragdrop_text">Drag 'n' drop files here, or click to select files.</p>
          <p className="dragdrop_text"> .fa and .fasta formats are supported.</p>
        </div>
      }
    </div>
  )
}

export default DropZone;