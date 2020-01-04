<?php

include "simple_html_dom.php";

$cookie1=$_GET['a'];
$urlefundilogin = "http://efundi.nwu.ac.za/portal";



$student=array();


//open connection
$ch = curl_init();
$heaer=[
  'User-Agent'=>'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
   'Cookie: '=>$cookie1
];
//get the lt value in order to login
curl_setopt($ch, CURLOPT_HTTPHEADER, $heaer);
curl_setopt($ch,CURLOPT_URL, $urlefundilogin);
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



$login=$html->find('head',0)->find('title',0)->plaintext;
//if logged in crape
if(strpos($login, 'Home')){
echo '[{"login":"true"}]';



  }else{
  echo '[{"login":"false"}]';
  }
curl_close($ch);




?>
