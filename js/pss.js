
function pss(dota){
// create data
anychart.onDocumentReady(function () {

    // create data
    var data = [
      {from: "Canada",  to: "France",  weight: 2230000},
      {from: "Canada",  to: "Germany", weight: 1990000},
      {from: "Canada",  to: "Italy",   weight: 1180000},
      {from: "Canada",  to: "Spain",   weight:  990000},
      {from: "USA",     to: "France",  weight:  950000},
      {from: "USA",     to: "Germany", weight: 2020000},
      {from: "USA",     to: "Spain",   weight: 1110000}
    ];

    // create a chart and set the data
    var chart = anychart.sankey(data);

    // set the width of nodes
    chart.nodeWidth("30%");

    // set the padding between nodes
    chart.nodePadding(0);

    // set the chart title
    chart.title("Sankey Diagram: Flows (Padding = 0)");

    // set the container id
    chart.container("container");

    // initiate drawing the chart
    chart.draw();
});
} // end of pss
