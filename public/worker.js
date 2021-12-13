onmessage = function(message) {
  if(message.data.slice(0,7)=="example") {
    console.log("run exmple")
    var instance;
    AMRprediction().then(module => {
      instance = module;
      if(message.data[7]==1){
        var result=  module.make_prediction("files/fa_examples/6999_3#3.fa.gz"); //make predictions for examplefile1
      } else if(message.data[7]==2){
        var result=  module.make_prediction("files/fa_examples/6999_3#5.fa.gz"); //make predictions for examplefile2
      }
      self.postMessage(result); //return result
    });
  } else {
    var instance;
      
    AMRprediction().then(module => {
      instance = module;
      var f = message.data;
      
      module.FS.mkdir('/working');
      module.FS.mount(module.FS.filesystems.WORKERFS, { files: [f]}, '/working'); //put file in FS

      var result=  module.make_prediction("/working/" + f.name); //make predictions for file
      
      self.postMessage(result); //return result
      
    });
  }
};
  
self.importScripts('./web_amr_prediction.js');