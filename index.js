
///// GET COMPETITIONS TRIGGER //////

function getCompetitions() {
  var apigClient = apigClientFactory.newClient({ apiKey: "YGYREcyKsh2vbajRUEkBa7I8OTnjDFUh8hNiKSze" });
    var body = { };
    var params = { };
    var additionalParams = {headers:{
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
    window.location.href='companies_page.html?competition='+competiton;
  }

  function fetchCompetitionDetails(){
    var params = new URLSearchParams(document.location.search);
    var competiton = params.get("competition");
    const access_token = localStorage.getItem("access_token");
    console.log(access_token);
    var apigClient = apigClientFactory.newClient({ apiKey: "YGYREcyKsh2vbajRUEkBa7I8OTnjDFUh8hNiKSze" });
    var body = {
      "competition":competiton,
      "token":access_token
    };
    var params = {};
    var additionalParams = {headers: {
    'Content-Type':"application/json"
    }};
    apigClient.competitionDetailsPost(params, body , additionalParams).then(function(res){
        showCompetitionDetails(res.data)
      }).catch(function(result){
          console.log(result);
          console.log("NO RESULT");
      });
  }


function showCompetitionDetails(res) {
  if (res.length == 0) {
    var newContent = document.createTextNode("No Companies to display");
    newDiv.appendChild(newContent);
    console.log("HERE I AM NOT COMPLETE")
  }
  else {
    results=res.body;

    var toAdd = document.createDocumentFragment();
    //create a form
    var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute('class', 'form_company')

    //create a loop to input companies in the form
    for (var i = 0; i < 11; i++) {

        var slot=document.createElement("div");
        slot.setAttribute('class', 'company_name')

        var company=document.createElement('div');
        company.innerHTML+=results[i]

        var companySlot = document.createElement("INPUT");
        companySlot.setAttribute("type", "checkbox");
        companySlot.setAttribute("id", "company"+i.toString());
        companySlot.setAttribute("class", results[i]);
        company.appendChild(companySlot)

        slot.appendChild(company)
        form.append(slot)
    }
    var s = document.createElement('div');
       s.className = 'SubmitButton';
       s.innerHTML = "SUBMIT"
       s.setAttribute('onclick', "submitFormelements();")

    // var s = document.createElement("input");
    // s.setAttribute("type", "submit");
    // s.setAttribute("value", "Submit");
    // s.setAttribute("class", "SubmitButton");
    form.append(s); 

    toAdd.appendChild(form)
    document.getElementById("company_list").appendChild(toAdd);

    }
  }



//// GET THE USER INFORMATION ONTO THE DASHBOARD ///////////

  function getUserInformation(userName){
    var apigClient = apigClientFactory.newClient({ apiKey: "YGYREcyKsh2vbajRUEkBa7I8OTnjDFUh8hNiKSze" });
    var body = {};
    var params = {};
    var additionalParams = {headers: {
    'Content-Type':"application/json"
    }};
    apigClient.userDetailsUserGet(params, body , additionalParams).then(function(res){
        console.log("success");
        showCompetitions(res.data)
      }).catch(function(result){
          console.log(result);
          console.log("NO RESULT");
      });
  }



  ///////// SUBMIT ALL THE FORM ELEMENTS ///////////
  
  function submitFormelements(){
    company=[]
    console.log("HERE I AMMMMIN SELECTION")
    for (var i = 0; i < 11; i++) {
        if(document.getElementById('company'+i.toString()).checked){
          company.push(document.getElementById('company'+i.toString()).className)
        }
    }
    
    var apigClient = apigClientFactory.newClient({ apiKey: "YGYREcyKsh2vbajRUEkBa7I8OTnjDFUh8hNiKSze" });
    var body = {
      "companies":company
    };
    var params = {};
    var additionalParams = {headers: {
    'Content-Type':"application/json"
    }};
    apigClient.competitionEntryPost(params, body , additionalParams).then(function(res){
        alert("Congratulations! You just registered to the competition!!");
        window.location.href='home.html';
      }).catch(function(result){
          console.log(result);
          console.log("NO RESULT");
      });

  }
