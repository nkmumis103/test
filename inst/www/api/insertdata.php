<?php
	header("Access-Control-Allow-Origin: *");
	header('Content-Type: text/html; charset=utf-8');
	require_once($_SERVER['DOCUMENT_ROOT'].'/db/connect.php');
	//require $_SERVER['DOCUMENT_ROOT'].'/db/connect.php';//https://nkmumistop103.000webhostapp.com/db/connect.php
	
	$Store=$_POST['Store'];
	$DayOfWeek=$_POST['DayOfWeek'];
	$Date=$_POST['Date'];
	$Promo=$_POST['Promo'];
	$Open=$_POST['Open'];
	$SchoolHoliday=$_POST['SchoolHoliday'];
	$StoreType=$_POST['StoreType'];
	$Assortment=$_POST['Assortment'];
	$CompetitionDistance=$_POST['CompetitionDistance'];
	$CompetitionOpenSinceYear=$_POST['CompetitionOpenSinceYear'];
	$CompetitionOpenSinceMonth=$_POST['CompetitionOpenSinceMonth'];
	$Promo2=$_POST['Promo2'];
	$Promo2SinceYear=$_POST['Promo2SinceYear'];
	$Promo2SinceWeek=$_POST['Promo2SinceWeek'];
	$PromoInterval=$_POST['PromoInterval'];
	$Sales=$_POST['Sales'];
	
	$demo = new Demo;
	$value = $demo->insertData($Store,$DayOfWeek,$Date,$Promo,$Open,$SchoolHoliday,$StoreType,$Assortment,$CompetitionDistance,$CompetitionOpenSinceYear,$CompetitionOpenSinceMonth,$Promo2,$Promo2SinceYear,$Promo2SinceWeek,$PromoInterval,$Sales);
	
?>