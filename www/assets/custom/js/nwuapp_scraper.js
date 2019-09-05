const request=require("request");
const cheerio=require("cheerio");
var $ = require('jquery');
var data = new Object();
       data.loginName = "25917498";
       data.password = "Anamax@4";
       $Shttp({
           method: 'POST',
           url: '/mdot/services/authentication/login.json',

           data: data,
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
       }).success(function(data, status, headers, config) {
         console.log(data.authenticationResponse.didAuthenticate);
       });
