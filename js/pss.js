function pss(dota) {

      /*class entry {
            constructor(height, width) {
            this.height = height;
            this.width = width;
            }
      }*/

      
      var pssdata  = generateData(dota);
      
      am4core.ready(function() {
      // Themes begin
      //am4core.useTheme(am4themes_spiritedaway);
      //am4core.useTheme(am4themes_animated);
      // Themes end

      var chart = am4core.create("parallel-sets-container", am4charts.SankeyDiagram);
      

      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      chart.data = pssdata;
/*
 chart.data = [
         
         { from: "A", to: "E", value: 10, id:"A0-0" },
         { from: "A", to: "F", value: 10, id:"A1-0" },
         { from: "A", to: "G", value: 10, id:"A2-0" },

         { from: "B", to: "E", value: 10, id:"B0-0" },
         { from: "B", to: "F", value: 10, id:"B1-0" },



         { from: "C", to: "G", value: 1, id:"C1-0" },
         { from: "C", to: "H", value: 1, id:"C2-0" },

         { from: "D", to: "E", value: 1, id:"D0-0" },
         { from: "D", to: "F", value: 1, id:"D1-0" },
         { from: "D", to: "G", value: 1, id:"D2-0" },
         { from: "D", to: "H", value: 1, id:"D3-0" },
         { from: "C", to: "F", value: 1, id:"C0-0" },
         { from: "B", to: "G", value: 10, id:"B2-0" },
         { from: "F", to: "M", value: 1, id:"B1-1" },

         { from: "E", to: "I", value: 10, id:"A0-1" },
         { from: "E", to: "I", value: 10, id:"B0-1" },
         { from: "E", to: "L", value: 10, id:"D0-1" },

         { from: "F", to: "I", value: 1, id:"A1-1" },
         { from: "F", to: "I", value: 1, id:"C0-1" },
         { from: "F", to: "I", value: 1, id:"D1-1" },


         { from: "G", to: "I", value: 1, id:"A2-1" },
         { from: "G", to: "I", value: 1, id:"B2-1" },
         { from: "G", to: "J", value: 1, id:"C1-1" },
         { from: "G", to: "N", value: 1, id:"D2-1" },

         { from: "H", to: "K", value: 1, id:"C2-1" },
         { from: "H", to: "N", value: 1, id:"D3-1" },

         { from: "I", to: "O", value: 1, id:"A0-2" },
         { from: "I", to: "O", value: 1, id:"B2-2" },
         { from: "I", to: "Q", value: 1, id:"A1-2" },
         { from: "I", to: "R", value: 1, id:"A2-2" },
         { from: "I", to: "S", value: 1, id:"D1-2" },
         { from: "I", to: "T", value: 1, id:"B0-2" },
         { from: "I", to: "Q", value: 1, id:"C0-2" },

         { from: "J", to: "U", value: 1, id:"C1-2" },

         { from: "K", to: "V", value: 1, id:"C2-2" },
         { from: "M", to: "U", value: 1, id:"B1-2" },

         { from: "N", to: "Q", value: 1, id:"D2-2" },
         { from: "N", to: "Q", value: 1, id:"D3-2" },

         { from: "L", to: "W", value: 1, id:"D0-2" }
  ];

  */
      let hoverState = chart.links.template.states.create("hover");
      hoverState.properties.fillOpacity = 0.6;

      chart.dataFields.fromName = "from";
      chart.dataFields.toName = "to";
      chart.dataFields.value = "value";

      chart.links.template.propertyFields.id = "id";
      chart.links.template.colorMode = "solid";
      chart.links.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
      chart.links.template.fillOpacity = 0.1;
      chart.links.template.tooltipText = "";

      // highlight all links with the same id beginning
      chart.links.template.events.on("over", function(event){
        let link = event.target;
        let id = link.id.split("-")[0];

        chart.links.each(function(link){
          if(link.id.indexOf(id) != -1){
            link.isHover = true;
          }
        })
      })

      chart.links.template.events.on("out", function(event){
        chart.links.each(function(link){
          link.isHover = false;
        })
      })

      // for right-most label to fit
      chart.paddingRight = 30;

      // make nodes draggable
      var nodeTemplate = chart.nodes.template;
      nodeTemplate.inert = true;
      nodeTemplate.readerTitle = "Drag me!";
      nodeTemplate.showSystemTooltip = true;
      nodeTemplate.width = 20;

      // make nodes draggable
      var nodeTemplate = chart.nodes.template;
      nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
      nodeTemplate.showSystemTooltip = true;
      nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer

      }); // end am4core.ready()


      

      //Function to see if we already have a connection from that specific
      //from to to.
      function contains(array, object){
            //We wanna know where the connection already exists so that we
            //can increment that connections' value.
            var positionInList = 0;
            array.forEach(item => {
                  if(item.from === object.from && item.to === object.to) 
                        return positionInList;
                  
                  positionInList++;
            })
            return undefined;
      }

      function generateData(data){

            let id_start = 0;
            
            var arr = [];
            data.forEach( item => {
                  
                  let id_section = 0;
                  var boolean = false;
                  // First path
                  var path_first = {
                        from: item.country,
                        to: item.state,
                        value : 1,
                        //id: id_start + "-" + id_section
                  }
                  // Does a path like this already exist?
                  /*boolean = contains(arr,path_first)  
                  if(boolean != undefined)      // Path already exist, add to existing
                  {
                        //Skriv om
                        arr[boolean].value += 1;
                  }
                  else                         // Path does not exist, create new
                  {*/
                        arr.push(path_first)
                        id_section++;
                  //}
                  // Second path
                  var path_second = {
                        from: item.state,
                        to: item.category,
                        value : 1,
                        //id: id_start + "-" + id_section
                  }
                  /*boolean = contains(arr,path_second)
                  if(boolean != undefined)
                  {
                        //increment value on that id
                        arr[boolean].value += 1;
                  }
                  else
                  {*/
                        arr.push(path_second)
                        id_section++;
                  //}
                  // Third path
                  var path_third = {
                        from: item.category,
                        to: item.main_category,
                        value : 1,
                        //id: id_start + "-" + id_section
                  }
                  /*boolean = contains(arr,path_third)
                  if(boolean != undefined)
                  {
                        //increment value on that id
                        arr[boolean].value += 1;
                  }
                  else
                  {*/
                        arr.push(path_third)
                  //}
                  id_start++;
            }) // end of for loop
            //console.log(arr)
            return arr;
      } // end of function generateData
} // end of pss
