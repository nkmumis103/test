<?php
	require_once("host.php");
	
	class Demo{
		private $dbgo;
		function demo(){
			//$conn = mysql_connect($DB_HOST, $DB_USER, $DB_PW);
			//mysql_select_db($DB_NAME);
			//mysql_set_charset('utf8', $conn);
			
			//$dbconn = DB_ENGINE.':dbname='.DB_NAME.';host='.DB_HOST;
			//$this->dbgo = new PDO("mysql:host=".DB_HOST.";dbname=".DB_NAME.";port=".DB_PORT, DB_USER, DB_PW);
			$this->dbgo = new PDO("mysql:host=localhost;dbname=id3298469_mis_rossmann;charset=utf8", DB_USER, DB_PW);
			//$this->dbgo = new PDO($dbconn, DB_USER , DB_PW );
			$this->dbgo ->exec('SET NAMES utf8');
			$this->dbgo ->exec('SET CHARSET utf8');
		}
		function insertData($Store,$DayOfWeek,$Date,$Promo,$Open,$SchoolHoliday,$StoreType,$Assortment,$CompetitionDistance,$CompetitionOpenSinceYear,$CompetitionOpenSinceMonth,$Promo2,$Promo2SinceYear,$Promo2SinceWeek,$PromoInterval,$Sales){
			try{
				$sql = "INSERT INTO rossmann (Store,DayOfWeek,Date,Promo,Open,SchoolHoliday,StoreType,Assortment,CompetitionDistance,CompetitionOpenSinceYear,CompetitionOpenSinceMonth,Promo2,Promo2SinceYear,Promo2SinceWeek,PromoInterval,Sales) VALUES ('$Store','$DayOfWeek','$Date','$Promo','$Open','$SchoolHoliday','$StoreType','$Assortment','$CompetitionDistance','$CompetitionOpenSinceYear','$CompetitionOpenSinceMonth','$Promo2','$Promo2SinceYear','$Promo2SinceWeek','$PromoInterval','$Sales')";
				$result = $this->dbgo->prepare($sql);
				return $result->execute();
			}
			catch(PDOException $e){
				return false;
				die();
			}
		}
	}
		
?>