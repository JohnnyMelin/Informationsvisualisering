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
  for(var i = 0; i < 5; ++i){
    arr.push(data2[i]);
  }

  //console.log(arr);
  var parsed_map = parseMap(map_data);
  var parsedData = parseData(arr); // parse the data so we have no incomplete items.
  
  //Test different data at the end!
  
  //create_parallelCoordinates(parseData);
  //create_parallelSet(parseData);
  
  //pc = new pc(parsedData);
  pss = new pss(parsedData);
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
