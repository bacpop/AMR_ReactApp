
onmessage = function(message) {
    console.log("Message received");
    
    var instance;
    
    AMRprediction().then(module => {
      instance = module;
      var f = message.data;
      
      module.FS.mkdir('/working');
      module.FS.mount(module.FS.filesystems.WORKERFS, { files: [f]}, '/working'); //put file in FS

      var result=  module.make_prediction("/working/" + f.name); //make predictions for file
      
      console.log(result)
      self.postMessage(result);
      
    });
};
  

self.importScripts('./web_amr_prediction.js');