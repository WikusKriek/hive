<?php

header('Content-type:application/x-www-form-urlencoded');

$c=$_GET['a'];
    if($c=='1'){
      $url="http://curioustherapy.com";
      $handle=fopen($url,"r");
      if($handle){
        while(!feof($handle)){
          $buffer=fgets($handle,4096);
          echo $buffer;
        }
        fclose($handle);
      }
    }else{
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
