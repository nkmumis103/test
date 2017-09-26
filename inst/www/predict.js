$(document).ready(function(){
		$("#submit").on("click", function(){ 
        //disable the button to prevent multiple clicks
        $("#submit").attr("disabled", "disabled");
        
        //read the value for 'myname'
        var StoreId = $("StoreId").val();
		var DayOfWeek = $("DayOfWeek").val();
		var Date = $("Date").val();
		var Promo = $("Promo").val();
		var StateHoliday = $("StateHoliday").val();
		var SchoolHoliday = $("SchoolHoliday").val();
		var StoreType = $("StoreType").val();
		var Assortment = $("Assortment").val();
		var CompetitionDistance = $("CompetitionDistance").val();
		var CompetitionOpenSinceYear = $("CompetitionOpenSinceYear").val();
		var CompetitionOpenSinceMonth = $("CompetitionOpenSinceMonth").val();
		var Promo2 = $("Promo2").val();
		var Promo2SinceYear = $("Promo2SinceYear").val();
		var Promo2SinceWeek = $("Promo2SinceWeek").val();
		var PromoInterval = $("PromoInterval").val();
        
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