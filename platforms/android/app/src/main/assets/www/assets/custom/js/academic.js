function defaultsubjectlist(){
  if(localStorage.getItem('campus')==="Potchefstroom"){
    var subjectJson="assets/custom/dataset/Potch_Final.json";
  }else if(localStorage.getItem('campus')==="Mafikeng"){
    var subjectJson="assets/custom/dataset/Mafikeng_Final.json";
  }else{
  var subjectJson="assets/custom/dataset/Vaal_Final.json";
  }
  if(localStorage.getItem("subjects")!=null){
  app.request.json(
    subjectJson,
    function(data) {
      var cleaned='';
      var obj=[];

        var scrapedSubjects = JSON.parse(localStorage.getItem("subjects"));
        //console.log(scrapedSubjects)
        // loop over them all
        for (var k=0; k<scrapedSubjects.length; k++) {
           // And stick the checked ones onto an array...

           cleaned=scrapedSubjects[k].replace(/\s/g, '').slice(0,7);

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
    return new Date(a.due).getTime() - new Date(b.due).getTime();
}


    var	assign= JSON.parse(localStorage.getItem('assignments'));
    assign=assign.sort(comp);
    var i=0;
    var k=0;
    var obj=[];
    var colour=LightenDarkenColor(window.config.colors.md[app.utils.theme.getColor()], 10);
    var colour1=LightenDarkenColor(window.config.colors.md[app.utils.theme.getColor()], 60);
    document.getElementById("assignDone").innerHTML ='';
    document.getElementById("assignStillDue").innerHTML ='';
      document.getElementById("assignDueToday").innerHTML ="";
    for (ass in assign){
      var date= new Date(assign[ass].due);
      var today= new Date();

      if((((date.getDate()>today.getDate())&&(date.getMonth()==today.getMonth()))||(date.getMonth()>today.getMonth()) )&&
      (assign[ass].status.includes("Not")) &&
      (date.getFullYear()==today.getFullYear())){
        document.getElementById("assignStillDue").innerHTML += `
        <div onclick="assignmentInfo(${ass})" class="card card-outline" style="background-image:linear-gradient(135deg, ${colour} 0%,${colour1} 100%);" >
          <div  class=" card-header">${assign[ass].subject}</div>
            <div class="card-content card-content-padding">
            <div class=" item-inner item-cell">
              <div class="item-row  ">
                <div class="item-cell">${assign[ass].title}</div>

              </div>
              <div class="item-row ">
                <div class="item-cell">
                  <div class="item-row">Due</div>
                  <div class="item-row">${assign[ass].due}</div>
                </div>
                <div class="item-cell">
                  <div class="item-row">Status</div>
                  <div class="item-row">${assign[ass].status}</div>
                </div>


              </div>
              </div>


            </div>


          </div>
        `
        i++;
      }
      else if(((date.getDate()==today.getDate())&&(date.getMonth()==today.getMonth()))&&
      (assign[ass].status.includes("Not")) &&
      (date.getFullYear()==today.getFullYear())){
        document.getElementById("assignDueToday").innerHTML += `
          <div onclick="assignmentInfo(${ass})" class="card card-outline" style="background-image:linear-gradient(135deg, ${colour} 0%,${colour1} 100%);">
          <div class=" card-header" >${assign[ass].subject}</div>
          <div class="card-content card-content-padding">
            <div class="item-inner item-cell">
              <div class="item-row ">
                <div class="item-cell">${assign[ass].title}</div>

              </div>
              <div class="item-row ">
                <div class="item-cell">
                  <div class="item-row">Due</div>
                  <div class="item-row">${assign[ass].due}</div>
                </div>
                <div class="item-cell">
                  <div class="item-row">Status</div>
                  <div class="item-row">${assign[ass].status}</div>
                </div>


              </div>

              </div>
            </div>

          </div>
        `
        k++;
      }
      else{
        //style="background-color:${app.utils.theme.getColor()}

        document.getElementById("assignDone").innerHTML += `



        <div onclick="assignmentInfo(${ass})" class="card card-outline " style="background-image:linear-gradient(135deg, ${colour} 0%,${colour1} 100%);" >
          <div class=" card-header" >${assign[ass].subject} </div>
          <div class="card-content card-content-padding">
          <div class=" item-inner item-cell">
              <div class="item-row ">
                <div class="item-cell">${assign[ass].title}</div>

              </div>
              <div class="item-row ">
                  <div class="item-cell">
                    <div class="item-row">Due</div>
                    <div class="item-row">${assign[ass].due}</div>
                  </div>
                  <div class="item-cell">
                    <div class="item-row">Status</div>
                    <div class="item-row">${assign[ass].status}</div>
                  </div>



              </div>
            </div>
            </div>
            </div>
          </div>

        `
      }

    }
    if(k>=1){
        document.getElementById("assignmentduetoday").innerHTML = `<i class="icon f7-icons ios-only">bell<span class="badge color-red">5</span></i>
        <i class="fas fa-bell md-only"><span class="badge color-red">${k}</span></i>`;
        document.getElementById("assignmentsduetodaypopup").innerHTML = `<p>${k} Assignments Due Today</p>`;

    }else{
        document.getElementById("assignmentduetoday").innerHTML = `<i class="icon f7-icons ios-only">bell</i> <i class="fas fa-bell md-only">`;
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

var colour=LightenDarkenColor(window.config.colors.md[app.utils.theme.getColor()], 10);
var colour1=LightenDarkenColor(window.config.colors.md[app.utils.theme.getColor()], 60);
document.getElementById("examtimeline").innerHTML="";


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
           cleaned=scrapedSubjects[k].replace(/\s/g, '').slice(0,7);

           for (i=1; i<Object.keys(data).length;i++){

           if (cleaned==data[i].module.replace(/\s/g, '')) {
             data[i]['fulldate']=data[i].date+' '+data[i].time;
             //console.log(data[i].fulldate);
            obj.push(data[i]);

           }
         }
        }
        obj=obj.sort(comp);
        for(i in obj){

          var date= new Date(obj[i].date+' '+obj[i].time);
          document.getElementById("examtimeline").innerHTML+=`<div class="timeline-item" >
            <div class="timeline-item-date" >${days[date.getDay()]}  ${date.getDate()} <small>${months[date.getMonth()]}</small></div>
            <div class="timeline-item-divider" style="background-color: ${colour};"></div>
            <div class="timeline-item-content" >
              <div class="timeline-item-inner" style="background-image:linear-gradient(135deg, ${colour} 0%,${colour1} 100%);">
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

function scrape(){
  var self = this;
  var pass=JSON.parse(localStorage.getItem('credentials')).password;
  var username=JSON.parse(localStorage.getItem('credentials')).username;

  app.request.post('http://localhost:8000/balanceresults/', { "studentNumber":username, "password":pass}

				,function(response,status,data){
					
						// The full html of the authenticated page
						
						
						if(status===200){
							self.walkthrough.slideNext();
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


              setBalance();
            }else{
              alert('Could not login, Make sure your password has not changed');
              updatelogin();
            }
				});
				app.request.post('http://localhost:8000/assignments/', { "studentNumber":username, "password":pass}

				,function(response,status,data){
						// The full html of the authenticated page
						
						if(status===200){
						var nwuAppData=JSON.parse(data.responseText);
						console.log(nwuAppData.assignments)
						if(localStorage.getItem('assignments')==null){
								localStorage.setItem('assignments', JSON.stringify(nwuAppData.assignments));
							}else{
							localStorage.removeItem('assignments');
							localStorage.setItem('assignments', JSON.stringify(nwuAppData.assignments));
							}
							if(localStorage.getItem('subjects')==null){
								localStorage.setItem('subjects', JSON.stringify(nwuAppData.subjects));
							}else{
							localStorage.removeItem('subjects');
							localStorage.setItem('subjects', JSON.stringify(nwuAppData.subjects));

							}
						
							defaultsubjectlist();
							assignmentsDue();
						}
				});
				app.request.post('http://localhost:8000/userdetails/',{ "studentNumber":username, "password":pass}

				,function(response,status,data){
						// The full html of the authenticated page
						
						
						var nwuAppData=JSON.parse(data.responseText);
						localStorage.setItem("radio1","1")

						if(status===200){
							var nwuAppData=JSON.parse(response);
							if(localStorage.getItem('user')==null){
								localStorage.setItem('user', JSON.stringify(nwuAppData.user));
							}else{
							localStorage.removeItem('user');
							localStorage.setItem('user', JSON.stringify(nwuAppData.user));
							}
						
							
						}
				});
				app.request.post('http://localhost:8000/announcements/', { "studentNumber":username, "password":pass}

				,function(response,status,data){
						// The full html of the authenticated page
						console.log(status)
						if(status===200){
							var nwuAppData=JSON.parse(data.responseText);
							if(localStorage.getItem('announcements')==null){
								localStorage.setItem('announcements', JSON.stringify(nwuAppData.announcements));
							}else{
							localStorage.removeItem('announcements');
							localStorage.setItem('announcements', JSON.stringify(nwuAppData.announcements));
							}
						
							
							setAnnouncements();
					
						}
				});



  
 
};
 function setGrades(){
document.getElementById("examlist").innerHTML="";
   var colour=LightenDarkenColor(window.config.colors.md[app.utils.theme.getColor()], 10);
   var colour1=LightenDarkenColor(window.config.colors.md[app.utils.theme.getColor()], 60);
   	var	examresults= JSON.parse(localStorage.getItem('examResults'));
    for(res in examresults){
      document.getElementById("examlist").innerHTML+=`
      <div class="card card-outline " style="background-image:linear-gradient(135deg, ${colour} 0%,${colour1} 100%);" >
        <div class="card-header">${examresults[res].moduleName}</div>
        <div class="card-content card-content-padding">
          <div class="item-inner item-cell">
            <div class="item-row ">
              <div class="item-cell">Participation Mark</div>
              <div class="item-cell-data">${examresults[res].participationMark}</div>

            </div>
            <div class="item-row ">
              <div class="item-cell">Exam Mark</div>
              <div class="item-cell-data">${examresults[res].examMark}</div>
            </div>
            <div class="item-row ">
              <div class="item-cell">Module Mark</div>
              <div class="item-cell-data">${examresults[res].finalMark}</div>
            </div>
            <div class="item-row ">
              <div class="item-cell-data">${examresults[res].finalMarkComment}</div>

            </div>
          </div>
        </div>
      </div>`
    }
 };

 function setBalance(){
   document.getElementById("studentbalancedisplay").innerHTML = 'R'+localStorage.getItem('studentBalance');
 };

 function setAnnouncements(){
   document.getElementById("announlist").innerHTML="";
   	var	anoun= JSON.parse(localStorage.getItem('announcements'));
    var colour=LightenDarkenColor(window.config.colors.md[app.utils.theme.getColor()], 10);
    var colour1=LightenDarkenColor(window.config.colors.md[app.utils.theme.getColor()], 60);
    var anouninfo='';
   for(i in anoun){
    anouninfo=anoun[i].InfoUrl;
     document.getElementById("announlist").innerHTML+=`

     <div onclick="announcementInfo(${i})" class="card card-outline"  style="background-image:linear-gradient(135deg, ${colour} 0%,${colour1} 100%);" >
       <div class="card-header">${anoun[i].module}</div>
       <div class="card-content card-content-padding">
         <div class="item-inner item-cell">
           <div class="item-row ">
             <div class="item-cell">${anoun[i].author}</div>
             <div class="item-cell-data">${anoun[i].date}</div>
           </div>
           <div class="item-row ">
             <div class="item-cell">${anoun[i].title}</div>

           </div>


         </div>
       </div>
     </div>

    `
};
   }
 ;

 function updatelogin(){
   app.dialog.login(
     'Enter your university number and password',
     window.config.app.title,
     function(username, password) {
       credentials={"username":username,"password":password};
       localStorage.setItem('credentials', JSON.stringify(credentials));
       app.toast.show({
         text: 'Changes updated!',
         position:'bottom',
         cssClass: 'toast-round bg-color-green'
       });
     }
   );
 }
 function cookieTest(){
   var pass=JSON.parse(localStorage.getItem('credentials')).password;
   var username=JSON.parse(localStorage.getItem('credentials')).username;
   app.request.get(`partials/scraper/login.php?a=${username}&b=${pass}`

  ,function(login,response,data){
       // The full html of the authenticated page

       var login=JSON.parse(login);
       if(login[0].login==='true'){
         var nwuAppData=JSON.parse(data.responseText);
         var cookie =JSON.stringify(nwuAppData[1].cookie);
         alert(cookie);
         app.request.get(`partials/scraper/announcements.php?a=${cookie}`

        ,function(login1,response1,data1){
             // The full html of the authenticated page

             var login1=JSON.parse(login1);
             if(login1[0].login==='true'){
               alert("final Result");
               var nwuAppData1=JSON.parse(data1.responseText);
               alert("final Result");
               alert(nwuAppData1);
           }else{
             alert('Could not login');
           }
         });
     }else{
       alert('Could not login');
     }
   });
 }
function announcementInfo(url){
  var	anoun= JSON.parse(localStorage.getItem('announcements'));
  var pass=JSON.parse(localStorage.getItem('credentials')).password;
  var username=JSON.parse(localStorage.getItem('credentials')).username;
  app.views.current.router.navigate('/academic/announcementinfo');
  app.progressbar.show('multi');
  var infourl=anoun[url].InfoUrl;
  //infourl=infourl.slice(infourl.indexOf("tool/")+5,infourl.indexOf("?item"));
  app.request.get(`partials/scraper/announcementInfo.php?a=${username}&b=${pass}&c=${encodeURIComponent(infourl)}`
  ,function(login1,response1,data1){
    app.progressbar.hide();
      // The full html of the authenticated page

      var login1=JSON.parse(login1);
      if(login1[0].login==='true'){
        var nwuAppData1=JSON.parse(data1.responseText);
        document.getElementById("heading").innerHTML+=nwuAppData1[0].heading;
        document.getElementById("anouninfoform").innerHTML+=nwuAppData1[0].form;
        document.getElementById("anouninfomessage").innerHTML+=nwuAppData1[0].message;

    }else{
      alert('Could not access the data!');
    }
  });
}

function assignmentInfo(url){
  var	assign= JSON.parse(localStorage.getItem('assignments'));
  var pass=JSON.parse(localStorage.getItem('credentials')).password;
  var username=JSON.parse(localStorage.getItem('credentials')).username;
  app.views.current.router.navigate('/academic/assignmentinfo');
  app.progressbar.show('multi');
  var infourl=assign[url].InfoUrl;
  //infourl=infourl.slice(infourl.indexOf("tool/")+5,infourl.indexOf("?item"));
  app.request.get(`partials/scraper/assignmentInfo.php?a=${username}&c=${encodeURIComponent(infourl)}&b=${pass}`
  ,function(login1,response1,data1){
    app.progressbar.hide();
      // The full html of the authenticated page

      var login1=JSON.parse(login1);
      if(login1[0].login==='true'){
        var nwuAppData1=JSON.parse(data1.responseText);
        document.getElementById("heading").innerHTML+=nwuAppData1[0].heading;
        document.getElementById("infomessage").innerHTML+=nwuAppData1[0].instructions;

    }else{
      alert('Could not access the data!');
    }
  });
}
