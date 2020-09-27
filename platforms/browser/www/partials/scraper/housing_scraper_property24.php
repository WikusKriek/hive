<?php

include "simple_html_dom.php";

$url = "https://www.property24.com/apartments-to-rent/potchefstroom/north-west/125?sp=pf%3d1500%26pt%3d9000";



$homes=array();


//open connection
$ch = curl_init();
$heaer=[
  'User-Agent'=>'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
   'Cookie: '=>$cookie1
];
//get the lt value in order to login
//curl_setopt($ch, CURLOPT_HTTPHEADER, $heaer);
curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_POST, false);
curl_setopt ($ch, CURLOPT_COOKIEFILE, $cookie1);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$result3 = curl_exec($ch);
$html= new simple_html_dom();
$html->load($result3);



//got the lt value now pass it with post request

//logged in now get announcement url



$houselist=$html->find('div[class=js_listingResultsContainer]',0);
//if logged in crape
$houses=$houselist->find('div[class=p24_regularTile js_rollover_container]');
foreach($houses as $house) {
  echo ($house);
$price= $house->find('span[class=p24_price]',0);
$title= $house->find('span[class=p24_title]',0);
$location= $house->find('span[class=p24_location]',0);
$excerpt= $house->find('span[class=p24_excerpt]',0);
$imageUrl= $house->find('span[class=js_listingTileImageHolder p24_image]',0)->find('img',0)->src;
echo ($title);
echo ($price);
echo ($location);
echo ($excerpt);
echo ($imageUrl);
};




?>
