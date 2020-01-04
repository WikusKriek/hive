<?php

include "simple_html_dom.php";

$user=$_GET['a'];
$pass=$_GET['b'];
$infoURL=$_GET['c'];
$urlefundilogin = "https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer";


$loginArr=array();
$cookie1='';

//open connection
$ch = curl_init();

//get the lt value in order to login
curl_setopt($ch,CURLOPT_URL, $urlefundilogin);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);


$result3 = curl_exec($ch);
$html= new simple_html_dom();
$html->load($result3);
$ltvalue=$html->find('input[name=lt]',0)->value;
//got the lt value now pass it with post request
$heaer=[
  'User-Agent'=>'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
];
$fields = [
  'username'=> $user,
  'password'=> $pass,
  'execution'=> 'e1s1',
  '_eventId'=> 'submit',
  'submit'=> 'LOGIN',
  'lt'=>$ltvalue
];
$fields_string = http_build_query($fields);
//post request to login
curl_setopt($ch, CURLOPT_HTTPHEADER, $heaer);
curl_setopt($ch,CURLOPT_URL, $urlefundilogin);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_POST, true);
curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$result1 = curl_exec($ch);
$html->load($result1);
$login=$html->find('head',0)->find('title',0)->plaintext;
$anounurl=$html->find('a[title=Announcements - For posting current, time-critical information]',0)->href;
$accounturl=$html->find('a[title=Account - View and modify my user profile]',0)->href;
$starsubjects=$html->find('li[class=Mrphs-sitesNav__menuitem]');
$suburl=substr($infoURL,strpos($infoURL,"tool/")+5);
$suburl=substr($suburl,0,strpos($suburl,"?item"));
$suburl1=substr($infoURL,strpos($infoURL,"itemReference")+13);
$suburl1=substr($suburl,0,strpos($suburl,"&"));
$infoURL1='http://efundi.nwu.ac.za/tool/'.$suburl.'?panel=Main';

$infoURL=str_replace("amp;","",$infoURL);
curl_setopt($ch,CURLOPT_URL, $infoURL);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_POST, false);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$result4 = curl_exec($ch);
$html1= new simple_html_dom();
$html1->load($result4);
if(strpos($login, 'Home')){

array_push($loginArr,array('login'=>'true',
  'heading'=>trim($html1->find('div[class=page-header]',0)),
  'form'=>trim($html1->find('div[class=form-horizontal]',0)),
  'message'=>trim($html1->find('div[class=message-body]',0)),
  'attachments'=>trim($html1->find('ul[class=attachList]',0))
));

}else{
array_push($loginArr,array('login'=>'false'));
}
echo json_encode($loginArr);
curl_close($ch);

?>
