onmessage = function(message) {
    var instance;
    
    AMRprediction().then(module => {
      instance = module;
      var f = message.data;
      
      module.FS.mkdir('/working');
      module.FS.mount(module.FS.filesystems.WORKERFS, { files: [f]}, '/working'); //put file in FS

      var result=  module.make_prediction("/working/" + f.name); //make predictions for file
      
      self.postMessage(result); //return result
      
    });
};
  
self.importScripts('./web_amr_prediction.js');