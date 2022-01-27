import React from "react";
import {useDropzone} from "react-dropzone";

function DropZone({onDrop}) {

  const {getRootProps, getInputProps, isDragActive} = useDropzone({accept:'.fa, .fasta, .fna', onDrop, maxFiles:30})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <div className="dragdrop">
          <p className="dragdrop_text">Drop the files here</p>
        </div> :
        <div className="dragdrop">
          <p className="dragdrop_text">Drag 'n' drop up to 30 files here, or click to select files.</p>
          <p className="dragdrop_text"> .fa, .fasta and .fna formats are supported.</p>
        </div>
      }
    </div>
  )
}

export default DropZone;