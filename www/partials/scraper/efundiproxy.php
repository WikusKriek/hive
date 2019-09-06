<?php

include "simple_html_dom.php";


$urlefundilogin = "https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer";






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
$fields = [
  'username'=> '25917498',
  'password'=> 'Anamax@4',
  'execution'=> 'e1s1',
  '_eventId'=> 'submit',
  'submit'=> 'LOGIN',
  'lt'=>$ltvalue
];
$fields_string = http_build_query($fields);
//post request to login
curl_setopt($ch, CURLOPT_HTTPHEADER, 'User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36');
curl_setopt($ch,CURLOPT_URL, $urlefundilogin);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_POST, true);
curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$result1 = curl_exec($ch);
//logged in now get announcement url

$html->load($result1);

$anounurl=$html->find('a[title=Announcements - For posting current, time-critical information]',0)->href;




// found anouncement url now go there and scrape boy
$fields = [
  'eventSubmit_doChange_pagesize'=> 'changepagesize',
'selectPageSize'=> 100
];
$fields_string = http_build_query($fields);
$anounurl=$anounurl;
curl_setopt($ch,CURLOPT_URL, $anounurl);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_POST, false);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$result3 = curl_exec($ch);
$html->load($result3);

$fields2=$html->find('tr');
echo '[';
foreach(array_slice($fields2,1) as $row){
  echo '{';
$k=1;
   echo $k.':'.$row->find('th',0)->find('span',0)->plaintext.',';
   $k++;
  foreach($row->find('td') as $cell) {
        // push the cell's text to the array
        echo $k.':'.$cell->plaintext.',';
$k++;
    }
echo '},';
}

echo ']';

curl_close($ch);




?>
