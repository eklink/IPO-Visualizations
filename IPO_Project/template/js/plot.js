var trace1 = {
    x: [17.0],
    y: [-61.3],
    mode: 'markers',
    type: 'scatter',
    name: 'Basic Materials',
    text: ['Livent'],
    marker: { size: 12 }
  };
  
  var trace2 = {
    x: [65.8, 35.0, 21.1, 22.4, 10.0, 17.0],
    y: [517.4, 19.5, -78.2, 12.2, -22.7, 57.9],
    mode: 'markers',
    type: 'scatter',
    name: 'Consumer Goods',
    text: ['Beyond Meat', 'Chewy', 'Greenlane Holdings', 'Levi Strauss & Co', 'Mohawk Group Holdings', 'Yeti Holdings'],
    marker: { size: 12 }
  };
  
  var trace3 = {
    x: [25.8, 25.08, 11.3, 8.5],
    y: [-11.2, 41.2, -2.9, -58.1],
    mode: 'markers',
    type: 'scatter',
    name: 'Consumer Services',
    text: ['Peloton Interactive', 'Phreesia', 'Sunnova Energy International', 'Super League Gaming'],
    marker: { size: 12 }
  };

  var trace4 = {
    x: [22.0, 18.0, 20.2, 9.4, 16.2, 17.0, 17.1, 50.3],
    y: [4.1, -5.8, 1.7, -58.7, 7.8, -8.7, 32.1, -4.2],
    mode: 'markers',
    type: 'scatter',
    name: 'Financial Services',
    text: ['Alerus Financial', 'Bain Capital Specialty Finance', 'BlackRock Science and Technology Trust', 'Medalist Diversified REIT', 'Oportun Financial', 'Postal Realty Trust', 'ProSight Global', 'Red iver Bancshares'],
    marker: { size: 12 }
  };

  var trace5 = {
    x: [52.8, 40.3, 18.3, 18.0, 25.0, 9.4, 16.1, 18.1, 14.5, 12.3, 13.8,15.0,27.6,21.4, 32.9, 28.0, 14.0, 6.3, 18.6, 13.5, 32.2,3.7, 13.5, 32.2, 14.0, 8.5, 11.2, 24.3, 14.2, 20.0, 10.2, 38.1, 11.5, 18.6, 18.0, 19.9, 8.2, 0.0, 5.0, 13.6, 30.5, 20.1, 36.2, 16.7, 22.6, 12.6, 15.1, 22.4, 7.9, 28.9, 14.0, 16.0 ],
    y: [28.2, 61.0, 31.9, -20.5, 49.8, 2.7, 47.1, -23.5, -1.1, 71.9, -73.5, 81.9, 24.9, 24.5, 44.7, 25.8, -72.9, 5.5, 4.1, -51.9, 233.7, -81.5, 1.5, -44.6, -19.8, -3.0, 13.3, -47.3, 1.4, 42.1, -36.1, -6.7, -29.0, 24.7, 137.9, -43.4, -8.7, -9.0, -27.5, -91.9, 0.0, 87.0, 24.3, 66.9, -43.7, 4.4, 74.6, 11.2, 45.9, -58.0, 109.7, 73.9, -34.5],
    mode: 'markers',
    type: 'scatter',
    name: 'Healthcare',
    text: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','AA', 'BB', 'CC', 'DD', 'EE', 'FF', 'GG', 'HH','II','JJ','KK','LL','MM','NN','OO','PP','QQ','RR','SS','TT','UU','VV','WW','XX','YY','ZZ','AAA'],
    marker: { size: 12 }
  };
  var data = [ trace1, trace2, trace3, trace4, trace5 ];
  
  var layout = {
    xaxis: {
      range: [0, 100.0 ]
    },
    yaxis: {
      range: [-100.0, 550.0]
    },
    title:'2019 IPO Closing Price vs. Closing Return'
  };
  
  Plotly.newPlot('plot', data, layout);