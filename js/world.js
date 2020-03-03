
function world_map(data) {

  // AUS, AUT, BEL, CAN, DNK, FRA, DEU, HKH, IRL, ITA, JPN, LUX, MEX, NZL, NOR, SGP, ESP, SWE, CHE, NLD, GBR, USA
  // This array will hold the total sum for each country
  var sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // This array will hold the fill for each country
  var fills = ['UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN',
               'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN',
               'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN',
               'UNKNOWN', 'UNKNOWN', 'UNKNOWN', 'UNKNOWN'];
  
  calcSums();
  decideFill();  


  console.log(sums);
  console.log(fills);

  var map = new Datamap(
    {
      scope: 'world',
      element: document.getElementById('map-container'),
      // Fills define the range of data, they will have to be mapped to our data.
      fills: {
        HIGH: 'green',
        LOW: 'red',
        MEDIUM: 'yellow',
        UNKNOWN: 'yellow',
        defaultFill: 'gray'
      },
      data: {
        /*
          AUS: Australia
          AUT: Austria
          BEL: Belgium
          CAN: Canada
          DNK: Denmark
          FRA: France
          DEU: Germany
          HKG: Hong Kong
          IRL: Ireland
          ITA: Italy
          JPN: Japan
          LUX: Luxembourg
          MEX: Mexico
          NZL: New Zealand
          NOR: Norway
          ESP: Spain
          SWE: Sweden
          CHE: Switzerland
          NLD: the Netherlands
          GBR: the United Kingdom
          USA: the United States
        */
        AUS: {
          fillKey: fills[0],
          numberOfThings: sums[0]
        },
        AUT: {
          fillKey: fills[1],
          numberOfThings: sums[1]
        },
        BEL: {
          fillKey: fills[2],
          numberOfThings: sums[2]
        },
        CAN: {
          fillKey: fills[3],
          numberOfThings: sums[3]
        },
        DNK: {
          fillKey: fills[4],
          numberOfThings: sums[4]
        },
        FRA: {
          fillKey: fills[5],
          numberOfThings: sums[5]
        },
        DEU: {
          fillKey: fills[6],
          numberOfThings: sums[6]
        },
        HKG: {
          fillKey: fills[7],
          numberOfThings: sums[7]
        },
        IRL: {
          fillKey: fills[8],
          numberOfThings: sums[8]
        },
        ITA: {
          fillKey: fills[9],
          numberOfThings: sums[9]
        },
        JPN: {
          fillKey: fills[10],
          numberOfThings: sums[10]
        },
        LUX: {
          fillKey: fills[11],
          numberOfThings: sums[11]
        },
        MEX: {
          fillKey: fills[12],
          numberOfThings: sums[12]
        },
        NZL: {
          fillKey: fills[13],
          numberOfThings: sums[13]
        },
        NOR: {
          fillKey: fills[14],
          numberOfThings: sums[14]
        },
        SGP: {
          fillKey: fills[15],
          numberOfThings: sums[15]
        },
        ESP: {
          fillKey: fills[16],
          numberOfThings: sums[16]
        },
        SWE: {
          fillKey: fills[17],
          numberOfThings: sums[17]
        },
        CHE: {
          fillKey: fills[18],
          numberOfThings: sums[18]
        },
        NLD: {
          fillKey: fills[19],
          numberOfThings: sums[19]
        },
        GBR: {
          fillKey: fills[20],
          numberOfThings: sums[20]
        },
        USA: {
          fillKey: fills[21],
          numberOfThings: sums[21]
        }
      },
      geographyConfig: {
        popupTemplate: function(geo,data) {
          return ['<div class="detailOnDemand"><strong>',
                  'Number of things in ' + geo.properties.name,
                  ': ' + data.numberOfThings,
                  '</strong></div>'].join('');
        }
      }
    }
  );

  // Loop over all data and update sums array accordingly
  function calcSums() {
    for(var i in data) {
      var item = data[i];
      //console.log(item.country)
        // AUS, AUT, BEL, CAN, DNK, FRA, DEU, HKH, IRL, ITA, JPN, LUX, MEX, NZL, NOR, SGP, ESP, SWE, CHE, NLD, GBR, USA
        switch(item.country) {
          case "AUS":
            sums[0] += parseInt(item.state_value);
            break;
          case "AUT":
            sums[1] += parseInt(item.state_value);
            break;
          case "BEL":
            sums[2] += parseInt(item.state_value);
            break;
          case "CAN":
            sums[3] += parseInt(item.state_value);
            break;
          case "DNK":
            sums[4] += parseInt(item.state_value);
            break;
          case "FRA":
            sums[5] += parseInt(item.state_value);
            break;
          case "DEU":
            sums[6] += parseInt(item.state_value);
            break;
          case "HKG":
            sums[7] += parseInt(item.state_value);
            break;
          case "IRL":
            sums[8] += parseInt(item.state_value);
            break;
          case "ITA":
            sums[9] += parseInt(item.state_value);
            break;
          case "JPN":
            sums[10] += parseInt(item.state_value);
            break;
          case "LUX":
            sums[11] += parseInt(item.state_value);
            break;
          case "MEX":
            sums[12] += parseInt(item.state_value);
            break;
          case "NZL":
            sums[13] += parseInt(item.state_value);
            break;
          case "NOR":
            sums[14] += parseInt(item.state_value);
            break;
          case "SGP":
            sums[15] += parseInt(item.state_value);
            break;
          case "ESP":
            sums[16] += parseInt(item.state_value);
            break;
          case "SWE":
            sums[17] += parseInt(item.state_value);
            break;
          case "CHE":
            sums[18] += parseInt(item.state_value);
            break;
          case "NLD":
            sums[19] += parseInt(item.state_value);
            break;
          case "GBR":
            sums[20] += parseInt(item.state_value);
            break;
          case "USA":
            sums[21] += parseInt(item.state_value);
            break;
        
      }
    }
  }
  // Looks at the values of sums array and maps to correct fill
  function decideFill() {
    for(let i = 0; i < sums.length; i++) {
      if(sums[i] > 0)
        fills[i] = "HIGH";
      else if(sums[i] < 0)
        fills[i] = "LOW";
    }
  }
}








