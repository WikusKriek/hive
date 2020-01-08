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
console.log(alasql(`SELECT * FROM ${tablename}`));

};


function populateDatabaseTimeTable(tablename){
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


   var subjectTable = JSON.parse(localStorage.getItem('defaultsubjects'));


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
console.log(alasql(`SELECT * FROM ${tablename}`));
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
      cel1.innerHTML = cellObject[0].subject.trim()+"<br />" ;
      cel1.innerHTML +=cellObject[0].venue.trim() ;
      cel1.style.backgroundColor=cellObject[0].colour;
    }
  }}
  alasql('DETACH DATABASE student');

};

function cellClicked(tablename){
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
        document.getElementById("colourInput").setAttribute("value",cellObject[0].colour.trim());
console.log("here");
      },
      closed: function() {

          alasql(`UPDATE ${tablename} SET subject=?, venue=?, colour=?  WHERE cell=?`, [document.getElementById("subjectNameInput").value, document.getElementById("venueInput").value, document.getElementById("colourInput").value, parseInt(localStorage.getItem("cellid"))]);
        console.log(alasql(`SELECT * FROM ${tablename}`));
        alasql('DETACH DATABASE student');
      }
    }
  });
  popup.open();


};
