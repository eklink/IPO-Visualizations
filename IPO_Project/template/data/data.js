// Retrieve data from the CSV file and execute everything below
// d3.csv("data.csv").then(function(healthCareData) {
//   console.log("Before error check, healthCareData", healthCareData);
// });
d3.csv("IPOcoord.csv").then(function(IPOdata) {
    console.log("Before error check, IPOdata", IPOdata);
});
    // if (err) throw err;
  
    // parse data
    IPOdata.forEach(function(data) { 
      data.Company = +data.Company;
      data.Industry = +data.Industry;
      data.date = +data.Date;
      data.lat = +data.lat;
      data.long = +data.long;
    });

