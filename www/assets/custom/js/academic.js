function defaultsubjectlist(){
  if(localStorage.getItem("subjects")!=null){
  app.request.json(
    'assets/custom/dataset/Potch_Final.json',
    function(data) {
      var cleaned='';
      var obj=[];

        var scrapedSubjects = JSON.parse(localStorage.getItem("subjects"));
        // loop over them all
        for (var k=0; k<scrapedSubjects.length; k++) {
           // And stick the checked ones onto an array...

           cleaned=scrapedSubjects[k].subject.replace(/\s/g, '').slice(0,7);

           for (i=1; i<Object.keys(data).length;i++){
           if (cleaned==data[i].subject.slice(0,7)) {
            obj.push(data[i]);
           }
         }
        }




      localStorage.removeItem('defaultsubjects');
      localStorage.setItem('defaultsubjects', JSON.stringify(obj));

var def = JSON.parse(localStorage.getItem('defaultsubjects'));



});}};




function dashtablegen(){

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
                      cel1.innerHTML += numb.Venue.trim();
                      cel1.style.backgroundColor=BACKGROUNDS[num];

                      flag=1;

                    }

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

  function assignmentsDue(){
    function comp(b, a) {
    return new Date(a.assignment.due).getTime() - new Date(b.assignment.due).getTime();
}


    var	assign= JSON.parse(localStorage.getItem('assignments'));
    assign=assign.sort(comp);
    var i=0;
    var k=0;
    var obj=[];
    for (ass in assign){
      var date= new Date(assign[ass].assignment.due);
      var today= new Date();

      if((((date.getDate()>today.getDate())&&(date.getMonth()==today.getMonth()))||(date.getMonth()>today.getMonth()) )&&
      (assign[ass].assignment.status.includes("Not")) &&
      (date.getFullYear()==today.getFullYear())){
        document.getElementById("assignStillDue").innerHTML += `<li style="background-color:${app.utils.theme.getColor()}">
          <div  class="block-title">${assign[ass].assignment.subject}</div>
          <div class="item-content" >
            <div class="item-inner item-cell">
              <div class="item-row  ">
                <div class="item-cell">${assign[ass].assignment.title}</div>

              </div>
              <div class="item-row ">
                <div class="item-cell">
                  <div class="item-row">Due</div>
                  <div class="item-row">${assign[ass].assignment.due}</div>
                </div>
                <div class="item-cell">
                  <div class="item-row">Status</div>
                  <div class="item-row">${assign[ass].assignment.status}</div>
                </div>


              </div>


            </div>
          </div>
        </li>`
        i++;
      }
      else if(((date.getDate()==today.getDate())&&(date.getMonth()==today.getMonth()))&&
      (assign[ass].assignment.status.includes("Not")) &&
      (date.getFullYear()==today.getFullYear())){
        document.getElementById("assignDueToday").innerHTML += `<li style="background-color:${app.utils.theme.getColor()}">
          <div class="block-title">${assign[ass].assignment.subject}</div>
          <div class="item-content">
            <div class="item-inner item-cell">
              <div class="item-row ">
                <div class="item-cell">${assign[ass].assignment.title}</div>

              </div>
              <div class="item-row ">
                <div class="item-cell">
                  <div class="item-row">Due</div>
                  <div class="item-row">${assign[ass].assignment.due}</div>
                </div>
                <div class="item-cell">
                  <div class="item-row">Status</div>
                  <div class="item-row">${assign[ass].assignment.status}</div>
                </div>


              </div>


            </div>
          </div>
        </li>`
        k++;
      }
      else{
        document.getElementById("assignDone").innerHTML += `<li style="background-color:${app.utils.theme.getColor()}">
          <div class="block-title">${assign[ass].assignment.subject}</div>
          <div class="item-content">
            <div class="item-inner item-cell">
              <div class="item-row ">
                <div class="item-cell">${assign[ass].assignment.title}</div>

              </div>
              <div class="item-row ">
                <div class="item-cell">
                  <div class="item-row">Due</div>
                  <div class="item-row">${assign[ass].assignment.due}</div>
                </div>
                <div class="item-cell">
                  <div class="item-row">Status</div>
                  <div class="item-row">${assign[ass].assignment.status}</div>
                </div>


              </div>


            </div>
          </div>
        </li>`
      }

    }
    if(k>=1){
        document.getElementById("assignmentduetoday").innerHTML = `<i class="icon f7-icons ios-only">bell<span class="badge color-red">5</span></i>
        <i class="icon material-icons md-only">notifications<span class="badge color-red">${k}</span></i>`;
        document.getElementById("assignmentsduetodaypopup").innerHTML = `<p>${k} Assignments Due Today</p>`;

    }else{
        document.getElementById("assignmentduetoday").innerHTML = `<i class="icon f7-icons ios-only">bell</i> <i class="icon material-icons md-only">notifications</i>`;
        document.getElementById("assignmentsduetodaypopup").innerHTML = `<p>${k} Assignments Due Today</p>`;

    }
    localStorage.removeItem('assignduetoday');
    localStorage.setItem('assignduetoday', JSON.stringify(obj));
    document.getElementById("assignmentsdue").innerHTML = i;
  };

function examtimeline(){
  function comp(a, b) {
  return new Date(a.fulldate).getTime() - new Date(b.fulldate).getTime();
}





  if(localStorage.getItem("subjects")!=null){
  app.request.json(
    'assets/custom/dataset/examtimes.json',
    function(data) {
      var cleaned='';
      var obj=[];
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        var scrapedSubjects = JSON.parse(localStorage.getItem("subjects"));
        // loop over them all
        for (var k=0; k<scrapedSubjects.length; k++) {
           // And stick the checked ones onto an array...
           cleaned=scrapedSubjects[k].subject.replace(/\s/g, '').slice(0,7);

           for (i=1; i<Object.keys(data).length;i++){

           if (cleaned==data[i].module.replace(/\s/g, '')) {
             data[i]['fulldate']=data[i].date+' '+data[i].time;
             console.log(data[i].fulldate);
            obj.push(data[i]);

           }
         }
        }
        obj=obj.sort(comp);
        for(i in obj){

          var date= new Date(obj[i].date+' '+obj[i].time);
          document.getElementById("examtimeline").innerHTML+=`<div class="timeline-item">
            <div class="timeline-item-date">${days[date.getDay()]}  ${date.getDate()} <small>${months[date.getMonth()]}</small></div>
            <div class="timeline-item-divider"></div>
            <div class="timeline-item-content">
              <div class="timeline-item-inner">
                <div class="timeline-item-time">${obj[i].time}</div>
                <div class="timeline-item-title">${obj[i].module.replace(/\s/g, '')}</div>
                <div class="timeline-item-subtitle">${obj[i].duration}</div>
              </div>
            </div>
          </div>`;
        }




      localStorage.removeItem('examtime');
      localStorage.setItem('examtime', JSON.stringify(obj));

var def = JSON.parse(localStorage.getItem('defaultsubjects'));



});}
};
function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

};
