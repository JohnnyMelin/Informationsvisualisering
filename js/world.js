var map = new Datamap(
  {
    scope: 'world',
    element: document.getElementById('map-container'),
    // Fills define the range of data, they will have to be mapped to our data.
    fills: {
      HIGH: '#fee8c8',
      LOW: '#fee8c8',
      MEDIUM: '#fdbb84',
      UNKNOWN: 'rgb(0,0,0)',
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
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      AUT: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      BEL: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      CAN: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      DNK: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      FRA: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      DEU: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      HKG: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      IRL: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      ITA: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      JPN: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      LUX: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      MEX: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      NZL: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      NOR: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      ESP: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      SWE: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      CHE: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      NLD: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      GBR: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      },
      USA: {
        fillKey: 'MEDIUM',
        numberOfThings: 10381
      }
    },
    geographyConfig: {
      popupTemplate: function(geo,data) {
        return ['<div class="hoverinfo"><strong>',
                'Number of things in ' + geo.properties.name,
                ': ' + data.numberOfThings,
                '</strong></div>'].join('');
      }
    }
  }
);