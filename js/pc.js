/**
* @Created Feb 18, 2020
* @LastUpdate ...
* @author Johnny Melin, Oscar Ullberg, Martin Marklund
*/
// Code done with help of:
// rearrangeable paralell coordinates: https://bl.ocks.org/jasondavies/1341281
// Webpage for documentation: https://d3indepth.com/
// Data set: https://www.kaggle.com/kemical/kickstarter-projects/data#ks-projects-201801.csv

// http://bl.ocks.org/piwodlaiwo/cbce7d163349da5c615a08b6e7a12d69

function pc(data) {

      var excludedDims = ['ID', 'category', 'pledged', 'currency','usd_pledged' , 'goal', ,'name',''];
      var happyDims = ['main_category','launched','deadline','state','backers','country', 'usd_goal_real', 'usd_pledged_real'];

      var margin = {top: 50, right: 50, bottom: 50, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      console.log(data);
      // Create dimensions for each axis
      var dimensions = [
            {
                  name: "number_of_days",
                  scale: d3.scale.linear().range([height,0]),
                  type: "number",
            },
            {
                  name: "success_rate",
                  scale: d3.scale.log().range([height,0]),
                  type: "number",
            },
            {
                  name: "pledged",
                  scale: d3.scale.log().range([height, 0]),
                  type: "number"
            },
            {
                  name: "backers",
                  scale: d3.scale.log().range([height, 0]),
                  type: "number"
            },
            {
                  name: "usd_goal_real",
                  scale: d3.scale.linear().range([height, 0]),
                  type: "number"
            }
      ];

      var x = d3.scale.ordinal().domain(dimensions.map(function(d) { return d.name; })).rangePoints([0, width]),
      //y = {},
      dragging = {};

      var line = d3.svg.line(),
      axis = d3.svg.axis().orient("left"),
      background,
      foreground;

      // Important to select our container
      var svg = d3.select("#parallel-coordinates")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //Create the dimensions depending on attribute "type" (number|string)
      //The x-scale calculates the position by attribute dimensions[x].name
      dimensions.forEach(function(dimension) {
            dimension.scale.domain(d3.extent(data, function(d) { return +d[dimension.name]; }));
      });

      // Add grey background lines for context.
      background = svg.append("g")
            .attr("class", "background")
            .style("stroke", "lightgray")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("d", path);

      // Add blue foreground lines for focus.
      foreground = svg.append("g")
            .attr("class", "foreground")
            .style("stroke", "steelblue")
            .style("stroke-width", "1px")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("d", path);

      var details = d3.select(".detailOnDemand")
            .attr("class", "detailOnDemand")
            .attr("width", 100)
            .attr("height", 100)
            .attr("font-weight", 3)
            .attr("id", "detailbox")


      var detailOnCommand = svg.selectAll(".foreground path")
      .on("mouseover", function() {
            var self = d3.select(this)
            var c = self.attr("class", "hover")
                        .style("stroke","red")
                        .style("stroke-width", "2px")

            })
      .on("mouseout", function() {
            var self = d3.select(this)
            var c = self.attr("class", "path")
                        .style("stroke","steelblue")
                        .style("stroke-width", "1px")
            })
      .on("click", function() {
            var self = d3.select(this)
            var dede = self[0][0].__data__ // This is an array containting the clicked elements data entry
            var textbox = document.getElementById('detailbox');
            console.log(dede.usd_goal_real)
            console.log(dede)
            textbox.innerHTML = "Name:              " + dede.name + "<br />"
                              + "Country of Origin: " + dede.country + "<br />"
                              + "Main Category:     " + dede.main_category + "<br />"
                              + "Sub Category:      " + dede.category + "<br />"
                              + "Launch date:       " + dede.launched + "<br />"
                              + "Deadline:          " + dede.deadline + "<br />"
                              + "Days active:       " + dede.number_of_days + " days" + "<br />"
                              + "Current State:     " + dede.state + "<br />"
                              + "Backers:           " + dede.backers + "<br />"
                              + "Pledged:           " + dede.usd_pledged_real + "$" + "<br />"
                              + "Goal:              " + dede.usd_goal_real + "$" + "<br />"
                              + "Success Rate:      " + dede.success_rate + "%";
            })


      // Add a group element for each dimension.
      var g = svg.selectAll(".dimension")
      .data(dimensions)
      .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; })
      .call(d3.behavior.drag()
            .origin(function(d) { return {x: x(d.name)}; })
            .on("dragstart", function(d) {
                  dragging[d.name] = x(d.name);
                  background.attr("visibility", "hidden");
            })
            .on("drag", function(d) {
                  dragging[d.name] = Math.min(width, Math.max(0, d3.event.x));
                  foreground.attr("d", path);
                  dimensions.sort(function(a, b) { return position(a) - position(b); });
                  x.domain(dimensions.map(function(d) { return d.name; }));
                  g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
            })
            .on("dragend", function(d) {
                  delete dragging[d.name];
                  transition(d3.select(this)).attr("transform", "translate(" + x(d.name) + ")");
                  transition(foreground).attr("d", path);
                  background
                  .attr("d", path)
                  .transition()
                  .delay(500)
                  .duration(0)
                  .attr("visibility", null);
            })
      );

      // Add an axis and title.
      g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(d.scale)); })
            .append("text")
            .style("text-anchor", "middle")
            .attr("class", "axis-label")
            .attr("y", -19)
            .text(function(d) { return d.name; });
            // Add and store a brush for each axis.
            g.append("g")
            .attr("class", "brush")
            .each(function(d) {
                  d3.select(this).call(d.scale.brush = d3.svg.brush().y(d.scale).on("brushstart", brushstart).on("brush", brush));
            })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);



      // ====================== FUNCTIONS ====================================

      function position(d) {
            var v = dragging[d.name];
            return v == null ? x(d.name) : v;
      }

      function transition(g) {
            return g.transition().duration(500);
      }

      // Returns the path for a given data point.
      function path(d) {
            //console.log(d)
            //return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
            return line(dimensions.map(function(dimension) {
                  var v = dragging[dimension.name];
                  var tx = v == null ? x(dimension.name) : v;
                  return [tx, dimension.scale(d[dimension.name])];
            }));
      }

      function brushstart() {
            d3.event.sourceEvent.stopPropagation();
      }

      // Handles a brush event, toggling the display of foreground lines.
      function brush() {
            var actives = dimensions.filter(function(p) { return !p.scale.brush.empty(); }),
            extents = actives.map(function(p) { return p.scale.brush.extent(); });

            foreground.style("display", function(d) {
                  return actives.every(function(p, i) {
                        if(p.type==="number"){
                              return extents[i][0] <= parseFloat(d[p.name]) && parseFloat(d[p.name]) <= extents[i][1];
                        }else{
                              return extents[i][0] <= p.scale(d[p.name]) && p.scale(d[p.name]) <= extents[i][1];
                        }
                  }) ? null : "none";
            });
      }

} // end of pc
