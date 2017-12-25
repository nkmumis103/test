$(document).ready(function(){
	var Store,DayOfWeek,today,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,CompetitionOpenSinceMonth,Promo2,Promo2SinceYear,Promo2SinceWeek,PromoInterval,Sales;
	$("#push").on("click", function(){ 
		$("#push").attr("disabled", "disabled");
		get_val();
		if((Store=="")||(DayOfWeek=="")||(today=="")||(Promo=="")||(Open=="")||(SchoolHoliday=="")||(StoreType=="")||(Assortment=="")||(CompetitionDistance=="")||(CompetitionOpenSinceYear<1911)||(CompetitionOpenSinceMonth=="")||(CompetitionOpenSinceMonth>9)||(Promo2=="")||(Sales=="")){
			alert("資料格式錯誤，請填入完整資料!!");
			//console.log(Store,DayOfWeek,today,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,CompetitionOpenSinceMonth,Promo2,Sales);
			$("#push").removeAttr("disabled");
		}
		else{
			//console.log(Store,DayOfWeek,today,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,CompetitionOpenSinceMonth,Promo2,Promo2SinceYear,Promo2SinceWeek,PromoInterval,Sales);
			$.ajax({
				type: 'POST',
				url: 'https://nkmumistop103.000webhostapp.com/api/insertdata.php',//api/insertdata.php
				data: {
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
					PromoInterval : PromoInterval,
					Sales : Sales
				},
				//dataType: json,
				success: function(resp) {
					//console.log(resp);
					alert("傳送成功！");
					$("#push").removeAttr("disabled");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					//console.log(jqXHR);
					//console.log(textStatus);
					//console.log(errorThrown);
					$("#push").removeAttr("disabled");
				},
			});
		}
	});
	
	function get_val(){
		Store = Number($("#Store_push").val());
		//DayOfWeek = Number($("#DayOfWeek").val());
		today = String($("#Date_push").val());
		DayOfWeek=new Date(today);
		DayOfWeek=Number(DayOfWeek.getDay());
		Promo = Number($("#Promo_push").val());
		Open = Number($("#Open_push").val());
		SchoolHoliday = Number($("#SchoolHoliday_push").val());
		StoreType = Number($("#StoreType_push").val());
		Assortment = Number($("#Assortment_push").val());
		CompetitionDistance = Number($("#CompetitionDistance_push").val());
		CompetitionOpenSinceYear = Number($("#CompetitionOpenSinceYear_push").val());
		CompetitionOpenSinceMonth = Number($("#CompetitionOpenSinceMonth_push").val());
		Promo2 = Number($("#Promo2_push").val());
		Promo2SinceYear = Number(0);
		Promo2SinceWeek = Number(0);
		PromoInterval = Number(0);
		Sales = Number($("#Sales").val());
		//console.log(Store,DayOfWeek,today,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,CompetitionOpenSinceMonth,Promo2,Promo2SinceYear,Promo2SinceWeek,PromoInterval,Sales);
	}
});