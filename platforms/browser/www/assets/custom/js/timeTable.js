function createDatabaseStudent(tablename){
  alasql.promise('CREATE LOCALSTORAGE DATABASE IF NOT EXISTS student')
  .then(function() {
    return alasql.promise('ATTACH LOCALSTORAGE DATABASE student');
  })
  .then(function() {
    return alasql.promise('USE DATABASE student');
  })
  .then(function() {
    return alasql.promise(`CREATE TABLE IF NOT EXISTS ${tablename} (cell INT PRIMARY KEY, time INT, day INT, subject STRING, venue STRING, colour STRING )`);
  })
  .then(function() {

      populateTimeTable(tablename);

  })
  .catch(function(error) {
    console.log(error);
  });
};

function populateTimeTable(tablename){
  var i;
  var j;
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
alasql(`INSERT INTO ${tablename} (cell, time, day, subject, venue, colour) VALUES (?, ?, ?, ?, ?, ?)`, [31,0, 0,"Time","",""]);
for (i = 1; i < 7; i++){
  for (j = 1; j < 6; j++){


   alasql(`INSERT INTO ${tablename} (cell,time,day, subject, venue, colour) VALUES (?, ?, ?, ?, ?, ?)`, [5*(i-1)+j,i, j,"","",""]);

}}


  for (i = 32; i < 37; i++){
   alasql(`INSERT INTO ${tablename} (cell,time,day,subject, venue, colour) VALUES (?, ?, ?, ?, ?, ?,?)`, [i,0, i-31,DAYS[i-32],"",""]);
}


  for (i = 37; i < 43; i++){
  alasql(`INSERT INTO ${tablename} (cell,time,day,subject, venue, colour) VALUES (?, ?, ?, ?, ?, ?)`, [i,i-36, 0,TIMES[i-37],"",""]);

}

};


function populateDatabaseTimeTable(tablename,subjectlist){
  var self = this;
  alasql('ATTACH LOCALSTORAGE DATABASE student');
  alasql('USE DATABASE student');
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
  var cell;
   num=0;
  var TIMES = [
    "7:30 - 9:15",
    "9:30 - 10:45",
    "11:00 - 12:45",
    "13:00 - 14:15",
    "14:30 - 15:45",
    "16:00 - 17:45"

  ];
  var DAYS = [
      "Mo",
      "Tu",
      "We",
      "Th",
      "Fr"

  ];


   var subjectTable = JSON.parse(localStorage.getItem(subjectlist));


for (var subject of subjectTable){
  for (var day in DAYS){
    for (var numb of subject[DAYS[day]]){
      var subTime;
      switch(numb.Time) {
        case "07:30":
          subTime = 1;
          break;
        case "08:00":
          subTime = 1;
          break;
        case "09:30":
          subTime = 2;
          break;
          case "11:00":
            subTime = 3;
            break;
          case "12:15":
            subTime = 3;
            break;
          case "13:00":
            subTime = 4;
            break;
          case "14:30":
            subTime = 5;
            break;
          case "16:00":
            subTime = 6;
            break;
          case "17:15":
            subTime = 6;
            break;
        default:
          subTime = 0;
      }
      if(subTime!=0){
        cell=(5*(subTime-1))+(parseInt(day)+1);
        //alasql(`UPDATE ${tablename} SET subject=? WHERE cell=?`, [(subject.subject.trim()),cell]);
        alasql(`UPDATE ${tablename} SET time=?,day=?,subject=?, venue=?, colour=?  WHERE cell=?`, [parseInt(subTime), parseInt(day)+1, subject.subject.trim(), numb.Venue.trim(), BACKGROUNDS[num], cell]);
      }

    }}
  num++;
}
alasql.promise('DETACH DATABASE student')
.then(function() {
  console.log("detached");
})
.catch(function(error) {
  console.log(error);
});
};

function drawTimeTable(tablename,timetableid){
  var self = this;
  var cellObject;
  var div;
  alasql('ATTACH LOCALSTORAGE DATABASE student');
  alasql('USE DATABASE student');
  document.getElementById(timetableid).innerHTML ="";
let timetable = document.getElementById(timetableid);
for (i = 6; i >= 1; i--){
  var row = timetable.insertRow(0);
  for (j = 5; j >= 0; j--){
    var cel1 = row.insertCell(0);
    cellObject=alasql(`SELECT subject,venue,colour,cell FROM ${tablename} WHERE time=? AND day=?`, [i,j]);
    cel1.setAttribute('id', cellObject[0].cell);
    cel1.addEventListener('click',  function(){
      localStorage.setItem('cellid', this.id);
      if(tablename!=="timetabledefault"){
        cellClicked(tablename);
      }
});
    //append cel1 as client coz needs to be appended every time
    if (cellObject.length) {
      cel1.innerHTML = "<b>"+cellObject[0].subject.trim()+"</b><br />" ;
      cel1.innerHTML +=cellObject[0].venue.trim() ;
      cel1.style.backgroundColor=cellObject[0].colour;
    }
  }}
  alasql('DETACH DATABASE student');

};

function cellClicked(tablename){
  localStorage.setItem("currenttable",tablename);
  var popup = app.popup.create({
    el: '.popup-timeTable',
    on: {
      opened: function() {
        alasql('ATTACH LOCALSTORAGE DATABASE student');
        alasql('USE DATABASE student');
        cellObject=alasql(`SELECT subject,venue,colour FROM ${tablename} WHERE cell=?`, [parseInt(localStorage.getItem("cellid"))]);
        console.log(cellObject);
        document.getElementById("subjectNameInput").setAttribute("value",cellObject[0].subject.trim());
        document.getElementById("venueInput").setAttribute("value",cellObject[0].venue.trim());
        document.getElementById("evenbutton").setAttribute("style","background:#ced4da");
        document.getElementById("oddbutton").setAttribute("style","background:#a2b9bc;");
        document.getElementById("previousbutton").setAttribute("style",`background: ${localStorage.getItem("previouscolor")}`);
        if(cellObject[0].colour.trim()!=""){
        document.getElementById("colourInput").setAttribute("value",cellObject[0].colour.trim());
        document.getElementById("fromcellbutton").setAttribute("style",`background: ${cellObject[0].colour.trim()}`);

}else{
  document.getElementById("fromcellbutton").setAttribute("value","#d92d2d");
}
},
      closed: function() {


      }
    }
  });
  popup.open();


};

function setcolour(colour){
var tablename=localStorage.getItem("currenttable");
  if(colour==="even"){
    localStorage.setItem("savecolor",'#ced4da');
  document.getElementById("colorbutton").setAttribute("style","background:#ced4da;");
  }else if(colour==="odd"){
    localStorage.setItem("savecolor",'#a2b9bc');
    document.getElementById("colorbutton").setAttribute("style","background:#a2b9bc;");
  }else if (colour==="previous"){
  localStorage.setItem("savecolor",localStorage.getItem("previouscolor"));
  document.getElementById("colorbutton").setAttribute("style",`background: ${localStorage.getItem("previouscolor")}`);
}else if(colour==="fromcell"){
  alasql('ATTACH LOCALSTORAGE DATABASE student');
  alasql('USE DATABASE student');
    var cellObject=alasql(`SELECT subject,venue,colour FROM ${tablename} WHERE cell=?`, [parseInt(localStorage.getItem("cellid"))]);

    document.getElementById("colorbutton").setAttribute("style",`background: ${cellObject[0].colour.trim()}`);
localStorage.setItem("savecolor",cellObject[0].colour.trim());
    alasql('DETACH DATABASE student');
  } else if(colour==="customcolor"){
    localStorage.setItem("savecolor",document.getElementById("colourInput").value);
document.getElementById("colorbutton").setAttribute("style",`background: ${document.getElementById("colourInput").value}`);
  }

};

function savecolor() {
  var tablename=localStorage.getItem("currenttable");
  alasql('ATTACH LOCALSTORAGE DATABASE student');
  alasql('USE DATABASE student');
    alasql(`UPDATE ${tablename} SET subject=?, venue=?, colour=?  WHERE cell=?`, [document.getElementById("subjectNameInput").value, document.getElementById("venueInput").value, localStorage.getItem("savecolor"), parseInt(localStorage.getItem("cellid"))]);
  localStorage.setItem("previouscolor",document.getElementById("colourInput").value);
  alasql('DETACH DATABASE student');
  drawTimeTable("timetabledefault","timetable1");
  drawTimeTable("timetablecustom1","timetable2");
  drawTimeTable("timetablecustom2","timetable3");
  app.toast.show({
    icon: '<i class="icon fas fa-lg fa-check"></i>',
    text: 'Changes Saved',
    position: 'bottom',
    cssClass: 'toast-round bg-color-green'
  });

}

function addsubjects(num){
  console.log("here");
  if(num==1){
  cleantable("timetablecustom1");
  populateDatabaseTimeTable("timetablecustom1",'custom1');
  drawTimeTable("timetablecustom1","timetable2");
  }
  else if(num==2){

    cleantable("timetablecustom2");
    populateDatabaseTimeTable("timetablecustom2",'custom2');
    drawTimeTable("timetablecustom2","timetable3");
  }

};

function drawTimeTableDash(){
  var self = this;
  var cellObject;
  var div;
  var tablename;
  var subjectlist;
  if(localStorage.getItem('radio1')=='1'){
    tablename='timetabledefault';
    subjectlist='defaultsubjects';
}else if(localStorage.getItem('radio1')=='2'){
   tablename="timetablecustom1";
   subjectlist='custom1';
} else {
     tablename="timetablecustom2";
     subjectlist='custom2';
}
populateDatabaseTimeTable(tablename,subjectlist);
  alasql('ATTACH LOCALSTORAGE DATABASE student');
  alasql('USE DATABASE student');
  document.getElementById('timetable').innerHTML ="";
let timetable = document.getElementById('timetable');
for (i = 6; i >= 1; i--){
  var row = timetable.insertRow(0);
  for (j = 5; j >= 0; j--){
    var cel1 = row.insertCell(0);
    cellObject=alasql(`SELECT subject,venue,colour,cell FROM ${tablename} WHERE time=? AND day=?`, [i,j]);
    cel1.setAttribute('id', cellObject[0].cell);
    cel1.addEventListener('click',  function(){
      localStorage.setItem('cellid', this.id);

});
    //append cel1 as client coz needs to be appended every time
    if (cellObject.length) {
      cel1.innerHTML = "<b>"+cellObject[0].subject.trim()+"</b><br />" ;
      cel1.innerHTML +=cellObject[0].venue.trim() ;
      cel1.style.backgroundColor=cellObject[0].colour;
    }
  }}
  alasql('DETACH DATABASE student');

};
 function cleantable(tablename){
   alasql('ATTACH LOCALSTORAGE DATABASE student');
   alasql('USE DATABASE student');
   var i;
   var j;
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
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   alasql(`UPDATE ${tablename} SET time=?, day=?, subject=?, venue=?, colour=?  WHERE cell=?`, [0, 0,"Time","","",31]);
   for (i = 1; i < 7; i++){
   for (j = 1; j < 6; j++){


    alasql(`UPDATE ${tablename} SET subject=?, venue=?, colour=?  WHERE cell=?`, ["","","",5*(i-1)+j]);

   }}


   for (i = 32; i < 37; i++){
    alasql(`UPDATE ${tablename} SET subject=?, venue=?, colour=?  WHERE cell=?`, [DAYS[i-32],"","",i]);
   }


   for (i = 37; i < 43; i++){
   alasql(`UPDATE ${tablename} SET subject=?, venue=?, colour=?  WHERE cell=?`, [TIMES[i-37],"","",i]);

   }
   alasql('DETACH DATABASE student');


 };
