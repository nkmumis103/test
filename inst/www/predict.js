$(document).ready(function(){
		$("#submit").on("click", function(){ 
        //disable the button to prevent multiple clicks
        $("#submit").attr("disabled", "disabled");
        
        //read the value for 'myname'
        var StoreId = $("#StoreId").val();
        
        //perform the request
        var req = ocpu.rpc("hello", {
          StoreId : StoreId
        }, function(output){
          $("#output").text(output.message);
        });
        
        //if R returns an error, alert the error message
        req.fail(function(){
          alert("Server error: " + req.responseText);
        });
        
        //after request complete, re-enable the button 
        req.always(function(){
          $("#submit").removeAttr("disabled")
        });
      });
    });