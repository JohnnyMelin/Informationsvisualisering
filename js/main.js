/**
 * @Created Feb 18, 2020
 * @LastUpdate
 * @author Johnny Melin, Oscar Ullberg, Martin Marklund
 */

//import {create_parallelCoordinates} from './pc.js';
//import {create_parallelSet} from './pss.js';

queue()
  .defer(d3.csv,'data/ks-projects-201612.csv')
  .defer(d3.csv,'data/ks-projects-201801.csv')
  .defer(d3.csv, 'data/world_data.csv')
  .defer(d3.csv,'data/test.csv')
  .await(draw);

var pss, pc, world_map, points;

function draw(error, data1, data2, world_data, data4) {
  if (error) throw error;
  console.log("Code Starts");
  var arr = [];
  var map_data = [];
  for(var i = 0; i < world_data.length; ++i)
  {
    map_data.push(world_data[i]);
  }
  for(var i = 0; i < 100; ++i){
    arr.push(data2[i]);
  }

  //console.log(arr);
  var parsed_map = parseMap(map_data);
  var parsedData = parseData(arr); // parse the data so we have no incomplete items.
  var pssData = getPssData(parsedData); // Format data so the pss can display it
  //Test different data at the end!

  //create_parallelCoordinates(parseData);
  //create_parallelSet(parseData);

  //pc = new pc(parsedData);
  pss = new pss(pssData);
  map = new world_map(parsed_map);
  console.log("Code Ends");
}

function rangeDays(d){
    var ymd = d.launched.substring(0,10);
    var launched = ymd.split('-');
    var deadline = d.deadline.split('-');
    var startDate = new Date(launched[0], launched[1], launched[2]);
    var endDate = new Date(deadline[0], deadline[1], deadline[2])


    return Math.round((endDate - startDate)/(1000*60*60*24));
}

function getSuccess(d){
    var test = Math.round((d.usd_pledged_real/d.usd_goal_real)*(100));
    return test;
}

function parseData(data){

  var arr = [];
  for (var i in data){
    var bool = true;
    var item = data[i];
    for (var j in item){
      // If an object is missing a property, exclude it.
      if(item[j] === "" || typeof item[j] === "undefined"){
        bool = false;
      }
    }
    if(bool){
          var test = 0;
          test = getSuccess(item);
      arr.push({
        backers: item.backers == 0 ? 1 : item.backers, // Must not be zero for log scale to work
        category: item.category,
        country: item.country,
        currency: item.currency,
        deadline: item.deadline,
        goal: item.goal,
        ID: item.ID,
        launched: item.launched,
        main_category: item.main_category,
        name: item.name,
        pledged: item.pledged == 0 ? 1 : item.pledged,  // Must not be zero for log scale to work
        state: item.state,
        usd_pledged: item["usd pledged"],
        usd_goal_real: item.usd_goal_real,
        usd_pledged_real: item.usd_pledged_real,
        dateRange : rangeDays(item),
        successRate : test == 0 ? 1 : test, // Must not be zero for log scale to work
      });
    }
  }
  //console.log(`Number of invalid objects = ${data.length - arr.length}`);
  return arr;
}

//Function to see if we already have a connection from that specific
//from to to.
function contains(array, object){
      //We wanna know where the connection already exists so that we
      //can increment that connections' value.
      var positionInList = 0;
      array.forEach(item => {
            if(item.from == object.from && item.to == object.to)
                  return positionInList;

            positionInList++;
      })
      return undefined;
}

function getPssData(data){

      var wantedCategories = ['country', 'currency', 'state'];
      var sankeyData = [];
      data.forEach(entry => {
            if(sankeyData.length == 0){
                  sankeyData.push(
                        {
                              backers: entry.backers, // Must not be zero for log scale to work
                              category: entry.category,
                              country: entry.country,
                              currency: entry.currency,
                              deadline: entry.deadline,
                              goal: entry.goal,
                              ID: entry.ID,
                              launched: entry.launched,
                              main_category: entry.main_category,
                              name: entry.name,
                              pledged: entry.pledged,  // Must not be zero for log scale to work
                              state: entry.state,
                              usd_pledged: entry.usd_pledged,
                              usd_goal_real: entry.usd_goal_real,
                              usd_pledged_real: entry.usd_pledged_real,
                              dateRange : entry.dateRange,
                              successRate : entry.successRate, // Must not be zero for log scale to work
                              value: 1,
                        }
                  )
            }
            else{
                  var bool = false;
                  for(i = 0; i < sankeyData.length; ++i)
                  {
                        console.log("===============================");
                        console.log(sankeyData[i][wantedCategories[0]]);
                        console.log(sankeyData[i][wantedCategories[1]]);
                        console.log(sankeyData[i][wantedCategories[2]]);
                        console.log("===============================");

                        if(entry[wantedCategories[0]] == sankeyData[i][wantedCategories[0]] && entry[wantedCategories[1]] == sankeyData[i][wantedCategories[1]] && entry[wantedCategories[2]] == sankeyData[i][wantedCategories[2]] )
                        {
                              sankeyData[i].value += 1;
                              bool = true;
                              break;
                        }
                  }
                  if(bool == false){
                        sankeyData.push(
                              {
                                    backers: entry.backers, // Must not be zero for log scale to work
                                    category: entry.category,
                                    country: entry.country,
                                    currency: entry.currency,
                                    deadline: entry.deadline,
                                    goal: entry.goal,
                                    ID: entry.ID,
                                    launched: entry.launched,
                                    main_category: entry.main_category,
                                    name: entry.name,
                                    pledged: entry.pledged,  // Must not be zero for log scale to work
                                    state: entry.state,
                                    usd_pledged: entry.usd_pledged,
                                    usd_goal_real: entry.usd_goal_real,
                                    usd_pledged_real: entry.usd_pledged_real,
                                    dateRange : entry.dateRange,
                                    successRate : entry.successRate, // Must not be zero for log scale to work
                                    value: 1,
                              });
                  }
            }
      });
      console.log(sankeyData)
      var arr = [];
      let id_start = 0;
      sankeyData.forEach( item => {

            let id_section = 0;
            var boolean = 0;
            // First path
            var path_first = {
                  from: item.country,
                  to: item.currency,
                  value : item.value,
                  id: item.ID + "-" + id_section,
            }

            arr.push(path_first)
            id_section++;

            // Second path
            var path_second = {
                  from: item.currency,
                  to: item.state,
                  value :item.value,
                  id: item.ID + "-" + id_section,
            }
            arr.push(path_second)
            id_section++;

            // Third path
            /*var path_third = {
                  from: item.category,
                  to: item.state,
                  value : 1,
                  id: id_start + "-" + id_section
            }/*
            /*boolean = contains(arr,path_third)
            if(boolean != undefined)
            {
                  //increment value on that id
                  arr[boolean].value += 1;
            }
            else
            {*/
                  //arr.push(path_third)
            //}
            id_start++;
      }); // end of for loop
      //console.log(arr)
      return arr;
} // end of function pssData

function parseMap(data) {
  var arr = [];
  for(var i in data) {
    var valid = true;
    var item = data[i];
    // Filter out invalid objects
    for (var j in item) {
      if(item[j] === "" || typeof item[j] === "undefined") {
        valid = false;
      }
    }
    if(valid) {
      arr.push({
        country : item.country_3,
        //country_3  : item.country_3,
        state : item.state,
        state_value : item.state_value
      });
    }
  }

  return arr;

}
