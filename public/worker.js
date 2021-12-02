
onmessage = function(message) {
    console.log("Message received");
    
    var instance;
    
    AMRprediction().then(module => {
      instance = module;
      console.log(message.data.length);

      var allFiles = []; //array to store all files that should be put in FS

      for(var i = 0; i < message.data.length; i++) { //read in all files as f0, f1, f2... and store them in allFiles
        eval('var f' + i + '=  message.data[' + i + '];');
        eval('allFiles.push(f' + i + ');');
      }
      
      module.FS.mkdir('/working');
      module.FS.mount(module.FS.filesystems.WORKERFS, { files: allFiles }, '/working'); //put files in FS

      var allResults = [];
      for(var i = 0; i < message.data.length; i++) {
        eval('var result' + i + '=  module.make_prediction("/working/" + f'+i+'.name);'); //make predictions for all files
        eval('allResults.push(result' + i + ');');
      }
      
      
      console.log(allResults)
      self.postMessage(allResults);
      
    });
};
  

self.importScripts('./web_amr_prediction.js');