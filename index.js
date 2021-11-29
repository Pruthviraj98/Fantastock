
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
    results=res.body;
    var toAdd = document.createDocumentFragment();
    for (var i = 0; i < results.length; i++) {
       var newDiv = document.createElement('div');
       newDiv.id = 'competiton_'+i;
       newDiv.innerHTML += results[i]['CompetitionId']+"--->"+results[i]['status'];
       newDiv.className = 'competition_class';
       toAdd.appendChild(newDiv);

        // console.log(results[i]["CompetitionId"]);
        // var newDiv = document.getElementById("competitions");
        // var btn = document.createElement("BUTTON");
        // btn.innerHTML = results[i]['CompetitionId']+ "->" +results[i]["status"];
        // var competiton_name = results[i]['CompetitionId'];
        // btn.setAttribute('onclick','getCompetitionDetails(competiton_name);');
        // newDiv.appendChild(btn);
        // document.body.appendChild(newDiv);
      // var newDiv = document.getElementById("competitions");
      // const newContent = document.createTextNode(results[i]['CompetitionId']);
      // newDiv.appendChild(newContent);
      // newDiv.setAttribute("onclick", getCompetitionDetails(results[i]["CompetitionId"]))
      // newDiv.appendChild(newimg);
      // var btn = document.createElement("BUTTON");
      // btn.innerHTML = "CLICK ME";
      // document.body.appendChild(btn);

    }
    document.getElementById("competitions_list").appendChild(toAdd);
    // document.body.appendChild(toAdd);
  }
}


///// SHOW THE COMPETITION WITH COMPANIES TO SELECT
  function getCompetitionDetails(competiton){
    console.log("HERE I AM TO GET COMPETITIONS")
  }