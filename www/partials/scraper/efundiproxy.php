<?php

include "simple_html_dom.php";

$user=$_GET['a'];
$pass=$_GET['b'];
$urlefundilogin = "https://casprd.nwu.ac.za/cas/login?service=http%3A%2F%2Fefundi.nwu.ac.za%2Fsakai-login-tool%2Fcontainer";
$cookie1=[];


$student=array();


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

//logged in now get announcement url

$html->load($result1);

$login=$html->find('head',0)->find('title',0)->plaintext;
//if logged in crape
if(strpos($login, 'Home')){
array_push($student,array('login'=>'true'));
$anounurl=$html->find('a[title=Announcements - For posting current, time-critical information]',0)->href;
$accounturl=$html->find('a[title=Account - View and modify my user profile]',0)->href;
$starsubjects=$html->find('li[class=Mrphs-sitesNav__menuitem]');
//for each subject in stared subjects get anouncement
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_POST, false);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$array=array();
$subjectnames=array();
foreach($starsubjects as $subject) {
      array_push($subjectnames,array('subject'=>$subject->find('span',0)->plaintext));
      // push the cell's text to the array

      $suburl= $subject->find('a',0)->href;

      curl_setopt($ch,CURLOPT_URL, $suburl);
      $result4 = curl_exec($ch);
      $html= new simple_html_dom();
      $html->load($result4);
      $assignmenturl=$html->find('a[title=Assignments - For posting, submitting and grading assignment(s) online]',0)->href;
      curl_setopt($ch,CURLOPT_URL, $assignmenturl);
      $result5 = curl_exec($ch);
      $html= new simple_html_dom();
      $html->load($result5);
      $new=$html->find('tr');
      $array2=array();
      foreach(array_slice($new,1) as $subject1){
        $array2=array('subject'=>trim($subject->find('span',0)->plaintext),
        "title"=> trim($subject1->find('a',0)->title),
        'due'=>trim($subject1->find('td[headers=dueDate]',0)->plaintext),
        'status'=>trim($subject1->find('td[headers=status]',0)->plaintext)
        );
        array_push($array,array("assignment"=>$array2));
      }


  }
array_push($student,array('assignments'=>$array));
array_push($student,array('subjects'=>$subjectnames));

// found anouncement url now go there and scrape boy
$fields = [
  'eventSubmit_doChange_pagesize'=> 'changepagesize',
'selectPageSize'=> 100
];
$fields_string = http_build_query($fields);
curl_setopt($ch,CURLOPT_URL, $anounurl);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_POST, false);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$result3 = curl_exec($ch);
$html->load($result3);

$fields2=$html->find('tr');
$announcements=array();
$announcement=array();
foreach(array_slice($fields2,1) as $row){

   array_push($announcement,array("title"=>trim($row->find('th',0)->find('span',0)->plaintext),
  "author"=>trim($row->find('td[headers=author]',0)->plaintext),
  "date"=>trim($row->find('td[headers=date]',0)->plaintext),
  "module"=>trim($row->find('td[headers=channel]',0)->plaintext)));

}
array_push($student,array("announcements"=>$announcement));
//account details
curl_setopt($ch,CURLOPT_URL, $accounturl);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch,CURLOPT_POST, false);
curl_setopt($ch,CURLOPT_COOKIEJAR, $cookie1);
$result3 = curl_exec($ch);
$html->load($result3);
$fields2=$html->find('div[class=shorttext]');
$userinfo=array();
foreach($fields2 as $row){
  array_push($userinfo,array(trim($row->plaintext)));

}

array_push($student,array("user"=>$userinfo));
echo json_encode($student);
//start assignment scraper


  }else{
  echo '[{"login":"false"}]';
  }
curl_close($ch);




?>
