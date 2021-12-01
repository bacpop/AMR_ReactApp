
onmessage = function(message) {
    console.log("Message received");
    
    
    var instance;
    
    AMRprediction().then(module => {
      instance = module;
      const f = message.data[0];
      console.log(f.name);
        
      module.FS.mkdir('/working');
      module.FS.mount(module.FS.filesystems.WORKERFS, { files: [f] }, '/working');
      const result= module.make_prediction("/working/" + f.name);
      
      console.log(result);

      /*let antibiotics = ["Penicillin","Chloramphenicol","Erythromycin","Tetracycline", "Trim_sulfa"];
        for (const antibiotic of antibiotics){
        console.log(result.get(antibiotic));
      }

      //let mySerialMap = JSON.stringify(Array.from(result.entries()))
      //console.log(mySerialMap)
      */

      self.postMessage(result);
    });
};
  

self.importScripts('./web_amr_prediction.js');