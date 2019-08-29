'use strict';
function generatetimetable(){
  var self = this;
	app.request.json(
					'assets/custom/dataset/timetable.json',
					function(data) {
						if (data) {

              const TIMES = [
                  "8:00 - 9:00",
                  "9:00 - 10:00",
                  "10:00 - 11:00",
                  "11:00 - 12:00",
                  "12:00 - 13:00",
                  "13:00 - 14:00",
                  "14:00 - 15:00",
                  "15:00 - 16:00",
                  "16:00 - 17:00",
                  "17:00 - 18:00",
                  "18:00 - 19:00"
              ];

              const DAYS = [
                  "Mo",
                  "Tu",
                  "We",
                  "Th",
                  "Fr",

              ];
              let flag = 0;
              var num=0;




              let timetable = document.getElementById("timetable");



              for (const time of TIMES.reverse()){

                var row = timetable.insertRow(0);




                for (const day of DAYS.reverse()){
                  var cel1 = row.insertCell(0);
                  cel1.innerHTML = " ";
                   flag = 0;

                  for (const subject of data){

                    if(subject[day]===time) {
                      cel1.innerHTML = subject.title.trim();
                      flag=1;

                    }

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
