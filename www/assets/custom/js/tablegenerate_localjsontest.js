'use strict';
function generatetimetablelocal(){
  var self = this;
  alert("here");
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
  alert("here");
  var subjectTable=null
  if(localStorage.getItem('radio1')=='1'){
   subjectTable = JSON.parse(localStorage.getItem('defaultsubjects'));
}else if(localStorage.getItem('radio1')=='2'){
   subjectTable = JSON.parse(localStorage.getItem('custom1'));
} else {
     subjectTable = JSON.parse(localStorage.getItem('custom2'));
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
                  for (const num of subjectTable ){
                    subject=subjectTable[num]
                    switch(subject.day.Time) {
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
                        subTime = "16:00 - 17:45";
                    }
                    if(subTime===time) {
                      cel1.innerHTML = subject.subject.trim()+"\n";
                      cel1.innerHTML += subject.day.Venue.trim();
                      cel1.style.backgroundColor=BACKGROUNDS[num];

                      flag=1;

                    }
                    num+=1;
                  }

                  if(flag===0){




                }
                }
                var cell1 = row.insertCell(0);


                // Add some text to the new cells:
                cell1.innerHTML = time.trim();

              }






};
