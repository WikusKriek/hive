<?php



$user="25917498";
$pass="Anamax@4";
$urlefundilogin = "https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer";
$cookie1='';
echo("hello");

$student=array();


//open connection
$ch = curl_init();
echo($ch);
//get the lt value in order to login
curl_setopt($ch,CURLOPT_URL, $urlefundilogin);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_COOKIEFILE, $cookie1);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$result3 = curl_exec($ch);
$html= new simple_html_dom();
$html->load($result3);
$ltvalue=$html->find('input[name=lt]',0)->value;
echo($ltvalue);
$html->load($result1);


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

//logged in now get announcement url

$html->load($result1);
if(curl_exec($ch) === false)
{
    echo 'Curl error: ' . curl_error($ch);
}
else
{
    echo 'Operation completed without any errors';
}
echo($html);



?>
