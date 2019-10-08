
'use strict';
function checkbox(){
  app.request.json(
    'assets/custom/dataset/Potch_Final.json',
    function(data) {

        var checkboxes = document.getElementsByName('subjectin');
        var checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxes.length; i++) {
           // And stick the checked ones onto an array...
           if (checkboxes[i].checked) {
              checkboxesChecked.push(checkboxes[i].value);
           }
        }
        var obj=[]
        for (i=0;i<checkboxesChecked.length;i++){
        obj.push(data[checkboxesChecked[i]]);

  }
  if(localStorage.getItem('buttonclicked')==1){
    if(localStorage.getItem('custom1')==null){
      localStorage.setItem('custom1', JSON.stringify(obj));
    }else{
      localStorage.removeItem('custom1');
      localStorage.setItem('custom1', JSON.stringify(obj));
    }
  }else{
    if(localStorage.getItem('custom2')==null){
      localStorage.setItem('custom2', JSON.stringify(obj));
    }else{
      localStorage.removeItem('custom2');
      localStorage.setItem('custom2', JSON.stringify(obj));
    }
  }
var cus1 = JSON.parse(localStorage.getItem('custom1'));
var cus2 = JSON.parse(localStorage.getItem('custom2'));


}
);};

function generatetimetablelocal(){
console.log("here");
  var self = this;
  const BACKGROUNDS = [
      "#FF0099",
      "#f3f315",
      "#83f52c",
      "#FF6600",
      "#6e0dd0",
      "#00fff8",
      "#00ff4e",
      "#FFFFFF",
      "#ff4922",
      "#ccff6a",
      '#9B9AFF',
      '#61ff91',
      '#e2fe4d',
      '#B2585C',
      '#e1fde9',
      '#83dcf5'
  ];

  if(localStorage.getItem('radio1')=='1'){
   var subjectTable = JSON.parse(localStorage.getItem('defaultsubjects'));
}else if(localStorage.getItem('radio1')=='2'){
   var subjectTable = JSON.parse(localStorage.getItem('custom1'));
} else {
     var subjectTable = JSON.parse(localStorage.getItem('custom2'));
}


              var TIMES = [
                "7:30 - 9:15",
                "9:30 - 10:45",
                "11:00 - 12:45",
                "13:00 - 14:15",
                "14:30 - 15:45",
                "16:00 - 17:45",

              ];
              var DAYS = [
                  "Mo",
                  "Tu",
                  "We",
                  "Th",
                  "Fr",

              ];
              DAYS.reverse();
              TIMES.reverse();
              let flag = 0;
              var num=0;




              let timetable = document.getElementById("timetable");



              for (const time of TIMES){

                var row = timetable.insertRow(0);




                for (const day of DAYS){
                  var cel1 = row.insertCell(0);
                  cel1.innerHTML = " ";
                   flag = 0;

                   num=0;
                  for (var subject of subjectTable){
                    for (var numb of subject[day]){
                      console.log(numb);

                    var subTime;
                    switch(numb.Time) {
                      case "07:30":
                        subTime = "7:30 - 9:15";
                        break;
                      case "08:00":
                        subTime = "7:30 - 9:15";
                        break;
                      case "09:30":
                        subTime = "9:30 - 10:45";
                        break;
                        case "11:00":
                          subTime = "11:00 - 12:45";
                          break;
                        case "12:15":
                          subTime = "11:00 - 12:45";
                          break;
                        case "13:00":
                          subTime = "13:00 - 14:15";
                          break;
                        case "14:30":
                          subTime = "14:30 - 15:45";
                          break;
                        case "16:00":
                          subTime = "16:00 - 17:45";
                          break;
                        case "17:15":
                          subTime = "16:00 - 17:45";
                          break;
                      default:
                        subTime = "";
                    }

                    if(subTime===time) {
                      cel1.innerHTML = subject.subject.trim()+"\n";
                      cel1.innerHTML += subject[day].Venue.trim();
                      cel1.style.backgroundColor=BACKGROUNDS[num];

                      flag=1;

                    }
                    num+=1;
                  }
                  }

                  if(flag===0){




                }
                }
                var cell1 = row.insertCell(0);


                // Add some text to the new cells:
                cell1.innerHTML = time.trim();

              }






  };
  function buttonnum(num){
    localStorage.removeItem('buttonclicked')
    localStorage.setItem('buttonclicked',num)

  };

  function scraper(){
    var self = this;
    var pass=JSON.parse(localStorage.getItem('credentials')).password;
    var username=JSON.parse(localStorage.getItem('credentials')).username;
    app.request.get(`partials/scraper/proxy.php?a=${username}&b=${pass} `

   ,function(login,response,data){
        // The full html of the authenticated page
        var login=JSON.parse(login);
        if(login.status==='true'){
          var nwuAppData=JSON.parse(data.responseText);
          if(localStorage.getItem('studentBalance')==null){
            localStorage.setItem('studentBalance', nwuAppData.balance);
          }

          if(localStorage.getItem('examResults')==null){
            localStorage.setItem('examResults', JSON.stringify(nwuAppData.exam));
          }else{
          localStorage.removeItem('examResults');
          localStorage.setItem('examResults', JSON.stringify(nwuAppData.exam));
          }


      }else{
        alert('Could not login');
      }
    });
    app.request.get(`partials/scraper/efundiproxy.php?a=${username}&b=${pass}`

   ,function(login,response,data){
        // The full html of the authenticated page

        var login=JSON.parse(login);
        if(login[0].login==='true'){
          var nwuAppData=JSON.parse(data.responseText);

        if(localStorage.getItem('subjects')==null){
            localStorage.setItem('subjects', JSON.stringify(nwuAppData[2].subjects));
          }else{
          localStorage.removeItem('subjects');
          localStorage.setItem('subjects', JSON.stringify(nwuAppData[2].subjects));
          }
        if(localStorage.getItem('assignments')==null){
            localStorage.setItem('assignments', JSON.stringify(nwuAppData[1].assignments));
          }else{
          localStorage.removeItem('assignments');
          localStorage.setItem('assignments', JSON.stringify(nwuAppData[1].assignments));
          }
        if(localStorage.getItem('announcements')==null){
            localStorage.setItem('announcements', JSON.stringify(nwuAppData[3].announcements));
          }else{
          localStorage.removeItem('announcements');
          localStorage.setItem('announcements', JSON.stringify(nwuAppData[3].announcements));
          }
        if(localStorage.getItem('user')==null){
            localStorage.setItem('user', JSON.stringify(nwuAppData[4].user));
          }else{
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(nwuAppData[4].user));
          }
      }else{
        alert('Could not login');
      }
    });
  };
