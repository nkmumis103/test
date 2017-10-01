
$(document).ready(function(){
	$.get("plot.html",function(data){
		$(".historyPlot").html(data);
	});
});  