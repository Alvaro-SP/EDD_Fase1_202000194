
function cargaVendedor(){
    
        var upload = document.getElementById('upload-json');
        // var result;
        // Make sure the DOM element exists
        if (upload) 
        {
        //   upload.addEventListener('change', function() {
            // Make sure a file was selected
            if (upload.files.length > 0) 
            {
                console.log("result");
              var reader = new FileReader(); // File reader to read the file 
              
              // This event listener will happen when the reader has read the file
              reader.addEventListener('load', function() {
                var result = JSON.parse(reader.result); // Parse the result into an object 
                
                console.log(result);
              });
              
              reader.readAsText(upload.files[0]); // Read the uploaded file
            }
        //   });
        }
      
}