<?php

$user=$_GET['a'];
$pass=$_GET['b'];
$postFields=array(
  'loginName'=> $user,
'password'=> $pass
);

$url = "http://mobile.nwu.ac.za/mdot/services/authentication/login.json";
$url2="http://mobile.nwu.ac.za/mdot/buy/getBalance?";
$url3='http://mobile.nwu.ac.za/mdot/grades/getResults?endDate=2019-12-31&startDate=2019-01-01';
$fields = [
  'loginName'=> $user,
  'password'=> 'Anamax@4'
];

//url-ify the data for the POST
$fields_string = http_build_query($fields);

//open connection
$ch = curl_init();

//set the url, number of POST vars, POST data
curl_setopt($ch,CURLOPT_URL, $url);

//So that curl_exec returns the contents of the cURL; rather than echoing it
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_POST, true);
curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie);
$result1 = curl_exec($ch);
echo '{"status":'.$result1.',';

curl_setopt($ch,CURLOPT_URL, $url2);

//So that curl_exec returns the contents of the cURL; rather than echoing it
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie);
curl_setopt($ch,CURLOPT_POST, false);
$result2= curl_exec($ch);
echo '"balance":'.$result2.',';
curl_setopt($ch,CURLOPT_URL, $url3);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie);
$result3 = curl_exec($ch);
echo '"exam":'.$result3.'}';
curl_close($ch);








$c=$_GET['a'];
    if($c=='2'){
      $url="http://curioustherapy.com";
      $handle=fopen($url,"r");
      if($handle){
        while(!feof($handle)){
          $buffer=fgets($handle,4096);
          echo $buffer;
        }
        fclose($handle);
      }
    }









?>
