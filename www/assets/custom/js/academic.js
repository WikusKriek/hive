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


                    var subTime;
                    switch(subject[day].Time) {
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

                  if(flag===0){




                }
                }
                var cell1 = row.insertCell(0);


                // Add some text to the new cells:
                cell1.innerHTML = time.trim();

              }






  };

  function assignmentsDue(){
    var	assign= JSON.parse(localStorage.getItem('assignments'));
    var i=0;
    var k=0;
    var obj=[];
    for (ass in assign){
      var date= new Date(assign[ass].assignment.due);
      var today= new Date();

      if((((date.getDate()>=today.getDate())&&(date.getMonth()==today.getMonth()))||(date.getMonth()>today.getMonth()) )&&
      (assign[ass].assignment.status.includes("Not")) &&
      (date.getFullYear()==today.getFullYear())){
        i++;
      }
      if(((date.getDate()==today.getDate())&&(date.getMonth()==today.getMonth()))&&
      (assign[ass].assignment.status.includes("Not")) &&
      (date.getFullYear()==today.getFullYear())){
        k++;
        obj.push(assign[ass]);
      }
      
    }
    if(k>=1){
        document.getElementById("assignmentduetoday").innerHTML = `<i class="icon f7-icons ios-only">bell<span class="badge color-red">5</span></i>
        <i class="icon material-icons md-only">notifications<span class="badge color-red">${k}</span></i>`;
        for(var i=0;i<=3;i++){
        document.getElementById("assignmentsduetodaypopup").innerHTML += `<li>
          <div class="block-title">${assign[3].assignment.subject}</div>
          <div class="item-content">
            <div class="item-inner item-cell">
              <div class="item-row bg-color-blue-1">
                <div class="item-cell">${assign[3].assignment.this.assignment.title}</div>

              </div>
              <div class="item-row bg-color-blue-1">
                <div class="item-cell">
                  <div class="item-row">Due</div>
                  <div class="item-row">${assign[3].assignment.due}</div>
                </div>
                <div class="item-cell">
                  <div class="item-row">Status</div>
                  <div class="item-row">${assign[3].assignment.status}</div>
                </div>


              </div>


            </div>
          </div>
        </li>`
      }
    }else{
        document.getElementById("assignmentduetoday").innerHTML = `<i class="icon f7-icons ios-only">bell</i> <i class="icon material-icons md-only">notifications</i>`;
        document.getElementById("assignmentsduetodaypopup").innerHTML = "<p>No Assignments Due Today</p>";

    }
    localStorage.removeItem('assignduetoday');
    localStorage.setItem('assignduetoday', JSON.stringify(obj));
    document.getElementById("assignmentsdue").innerHTML = i;
  };
