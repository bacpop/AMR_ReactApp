
onmessage = function(message) {
    console.log("Message received");
    
    var instance;
    
    AMRprediction().then(module => {
      instance = module;
      const f = message.data[0];
      console.log(f.name);
      const g = message.data[1];
      console.log(g.name);
        
      module.FS.mkdir('/working');
      module.FS.mount(module.FS.filesystems.WORKERFS, { files: [f] }, '/working');
      const result= module.make_prediction("/working/" + f.name);
      
      console.log(result);

      self.postMessage(result);
    });
};
  

self.importScripts('./web_amr_prediction.js');