$(document).ready(function(){
	var Store,DayOfWeek,today,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,CompetitionOpenSinceMonth,Promo2,Promo2SinceYear,Promo2SinceWeek,PromoInterval,best_Promo,best_SchoolHoliday,best_Promo2;
	/* $(".pred").css("display", "none"); */
	$("#submit").on("click", function(){ 
	//disable the button to prevent multiple clicks
		get_val();
		$("#submit").attr("disabled", "disabled");
		$("#submit_fut").attr("disabled", "disabled");
		/* if(Open==0){
			alert("當日店休!!");
			$("#output_sale").html(today+" 的預測銷售額為："+output.message+"(USD)");
		}
		else{ */
			/* $(".pred").css('height','100px'); */	
		if((Store=="")||(DayOfWeek=="")||(today=="")||(Promo=="")||(Open=="")||(SchoolHoliday=="")||(StoreType=="")||(Assortment=="")||(CompetitionDistance=="")||(CompetitionOpenSinceYear<1911)||(CompetitionOpenSinceMonth=="")||(CompetitionOpenSinceMonth>9)||(Promo2=="")){
			alert("資料格式錯誤，請填入完整資料!!");
			//console.log(Store,DayOfWeek,today,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,CompetitionOpenSinceMonth,Promo2);
			$("#submit").removeAttr("disabled");
			$("#submit_fut").removeAttr("disabled");
		}
		else{
			var req = ocpu.rpc("rossmann", {
			  Store : Store,
			  DayOfWeek : DayOfWeek,
			  Date : today,
			  Promo : Promo,
			  Open : Open,
			  SchoolHoliday : SchoolHoliday,
			  StoreType : StoreType,
			  Assortment : Assortment,
			  CompetitionDistance : CompetitionDistance,
			  CompetitionOpenSinceYear : CompetitionOpenSinceYear,
			  CompetitionOpenSinceMonth : CompetitionOpenSinceMonth,
			  Promo2 : Promo2,
			  Promo2SinceYear : Promo2SinceYear,
			  Promo2SinceWeek : Promo2SinceWeek,
			  PromoInterval : PromoInterval
			}, function(output){
				$(".preddiv").css('height','170px');
				$(".pred").css("display", "none");
				$("#output_sale").css("display", "block");
				if(output.best_pair_Promo==0){
					best_Promo="否";
				}
				else if(output.best_pair_Promo==1){
					best_Promo="是";
				}
				if(output.best_pair_SchoolHoliday==0){
					best_SchoolHoliday="否";
				}
				else if(output.best_pair_SchoolHoliday==1){
					best_SchoolHoliday="是";
				}
				if(output.best_pair_Promo2==0){
					best_Promo2="否";
				}
				else if(output.best_pair_Promo2==1){
					best_Promo2="是";
				}
				$("#output_sale").html(today+" 的預測銷售額為："+output.message+"(USD)<hr>最佳配置：促銷為『"+best_Promo+"』，學校休假日為『"+best_SchoolHoliday+"』，持續促銷為『"+best_Promo2+"』<br><div style='color:red;'>最佳銷售額為："+output.best_sales+"(USD)</div>");
				//alert(output.message);
			});
			
			//if R returns an error, alert the error message
			req.fail(function(err){
				alert("資料格式錯誤，請填入完整資料!!");
				//alert("Server error: " + req.responseText + "error：" + JSON.stringify(err));
			});
			
			//after request complete, re-enable the button 
			req.always(function(){
				$("#submit").removeAttr("disabled");
				$("#submit_fut").removeAttr("disabled");
			});
		}
		//}
	});
	
	$("#submit_fut").on("click", function(){ 
		$("#submit").attr("disabled", "disabled");
		$("#submit_fut").attr("disabled", "disabled");
		get_val();
		
		if((Store=="")||(DayOfWeek=="")||(today=="")||(Promo=="")||(Open=="")||(SchoolHoliday=="")||(StoreType=="")||(Assortment=="")||(CompetitionDistance=="")||(CompetitionOpenSinceYear<1911)||(CompetitionOpenSinceMonth=="")||(CompetitionOpenSinceMonth>9)||(Promo2=="")){
			alert("資料格式錯誤，請填入完整資料!!");
			//console.log(Store,DayOfWeek,today,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,CompetitionOpenSinceMonth,Promo2);
			$("#submit").removeAttr("disabled");
			$("#submit_fut").removeAttr("disabled");
		}
		else{
			$(".preddiv").css('height','530px');
			$(".pred").css("display", "none");
			$("#output_plot").css("display", "block");
			var req = $("#output_plot").rplot("rossmann_fut", {
			  Store : Store,
			  DayOfWeek : DayOfWeek,
			  Date : today,
			  Promo : Promo,
			  Open : Open,
			  SchoolHoliday : SchoolHoliday,
			  StoreType : StoreType,
			  Assortment : Assortment,
			  CompetitionDistance : CompetitionDistance,
			  CompetitionOpenSinceYear : CompetitionOpenSinceYear,
			  CompetitionOpenSinceMonth : CompetitionOpenSinceMonth,
			  Promo2 : Promo2,
			  Promo2SinceYear : Promo2SinceYear,
			  Promo2SinceWeek : Promo2SinceWeek,
			  PromoInterval : PromoInterval
			 }).always(function(){
				 $("#submit").removeAttr("disabled");
				$("#submit_fut").removeAttr("disabled");
			}).fail(function(err){
				alert("資料格式錯誤，請填入完整資料!!");
				//alert("Server error: " + req.responseText + "error：" + JSON.stringify(err));
			});
		}
	});
	
	function get_val(){
		Store = Number($("#Store").val());
		//DayOfWeek = Number($("#DayOfWeek").val());
		today = String($("#Date").val());
		DayOfWeek=new Date(today);
		DayOfWeek=Number(DayOfWeek.getDay());
		Promo = Number($("#Promo").val());
		Open = Number($("#Open").val());
		SchoolHoliday = Number($("#SchoolHoliday").val());
		StoreType = Number($("#StoreType").val());
		Assortment = Number($("#Assortment").val());
		CompetitionDistance = Number($("#CompetitionDistance").val());
		CompetitionOpenSinceYear = Number($("#CompetitionOpenSinceYear").val());
		CompetitionOpenSinceMonth = Number($("#CompetitionOpenSinceMonth").val());
		Promo2 = Number($("#Promo2").val());
		Promo2SinceYear = Number(0);
		Promo2SinceWeek = Number(0);
		PromoInterval = Number(0);
	}
});