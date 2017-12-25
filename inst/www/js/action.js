$(document).ready(function(){
	$(window).scrollTop("0");
	var bot=$(document).height()-$(window).height();
	$(".gotop").on("click", function(){ 
		//$(".gotop").css('display','none');
		jQuery("html,body").animate({
			scrollTop:0
		},1000);
	});
	$(".gobottom").on("click", function(){ 
		$(".gobottom").css('display','none');
		jQuery("html,body").animate({
			scrollTop:bot
		},1000);
	});
	$(window).scroll(function(){
		var ScrollTop=$(this).scrollTop();  
		//console.log(ScrollTop,$(window).height(),$(document).height());
		if(ScrollTop==0){
			$(".gotop").css('display','none');
			$(".gobottom").css('display','block');
		}
		else{
			$(".gobottom").css('display','none');
			$(".gotop").css('display','block');
		}
	});
});