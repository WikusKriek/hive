'use strict';
function generatetimetable(){
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
	app.request.json(
					'assets/custom/dataset/timetable.json',
					function(data) {
						if (data) {

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
                  for (const subject of data){

                    if(subject[day]===time) {
                      cel1.innerHTML = subject.title.trim()+"\n";
                      cel1.innerHTML += subject.venue.trim();
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

							}
						}

				);



};