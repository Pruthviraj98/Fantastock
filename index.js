
///// GET COMPETITIONS TRIGGER //////

function getCompetitions() {
  var apigClient = apigClientFactory.newClient({ apiKey: "YGYREcyKsh2vbajRUEkBa7I8OTnjDFUh8hNiKSze" });
    var body = { };
    var params = { };
    var additionalParams = {headers: {
    'Content-Type':"application/json"
    }};
    apigClient.competitionsGet(params, body , additionalParams).then(function(res){
        console.log("success");
        showCompetitions(res.data)
      }).catch(function(result){
          console.log(result);
          console.log("NO RESULT");
      });
}


/////// SHOW COMPETITIONS BY SEARCH //////

function showCompetitions(res) {
  if (res.length == 0) {
    var newContent = document.createTextNode("No competitions to display");
    newDiv.appendChild(newContent);
  }
  else {

//     CompetitionId: "Competition_2"
// attributes: Object
          // enddate: "Feb 1 2022"
          // entryfee: "5"
          // poolsize: "5"
          // startdate: "Jan 1 2022"
          // totalamount: "100"
          // winners: "4"
// distribution: {1: 50, 2: 30, 3: 20}
// rankings: {}
// status: "YET TO START"
// type: "Max"

    results=res.body;
    var toAdd = document.createDocumentFragment();
    for (var i = 0; i < results.length; i++) {
       console.log(results[i])
       var newDiv = document.createElement('div');
       newDiv.id = results[i]['CompetitionId'];
       // newDiv.innerHTML += results[i]['CompetitionId']+"--->"+results[i]['status'];
       newDiv.className = 'competition_class';
       //setting onclick
       newDiv.setAttribute('onclick', "getCompetitionDetails(this.id);")

       //setting the competition name
       var competion_name=document.createElement('div');
       competion_name.className='competion_name';
       competion_name.innerHTML+=results[i]['CompetitionId']
       newDiv.appendChild(competion_name)
       
       //setting the pool size
       var poolSize=document.createElement('div');
       poolSize.className='pool_size';
       poolSize.innerHTML+="Pool size : "+results[i]['attributes'].poolsize
       newDiv.appendChild(poolSize)

       // setting total winners
       var winners=document.createElement('div');
       winners.className='winners_size';
       winners.innerHTML+="Winners to be: top - "+results[i]['attributes'].winners
       newDiv.appendChild(winners)
       
       // //setting total money that can be won
       var t_amt=document.createElement('div');
       t_amt.className='amount_to_win';
       t_amt.innerHTML+=results[i]['type']+" -- "+results[i]['attributes'].totalamount
       newDiv.appendChild(t_amt)
       
       //setting status
       var status=document.createElement('div');
       status.className='status';
       status.innerHTML+= "Status: "+results[i]['status']
       if(results[i]['status']==='LIVE'){
        status.setAttribute("style", "background-color: green;")
       }else{
        status.setAttribute("style", "background-color: red;")
       }
       newDiv.appendChild(status)


       //adding everything to toAdd frame
       toAdd.appendChild(newDiv);

    }
    document.getElementById("competitions_list").appendChild(toAdd);
  }
}


///// SHOW THE COMPETITION WITH COMPANIES TO SELECT TO BE RETRIEVED AFTER LF4 is created ///////

  function getCompetitionDetails(competiton){
    alert("HERE I AM TO GET '"+competiton+ "' competition's details");
  }