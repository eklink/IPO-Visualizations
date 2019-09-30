d3.select(window).on("resize", handleResize);

// When the browser loads, loadChart() is called
loadChart();

function handleResize() {
  var svgArea = d3.select("svg");

  // If there is already an svg container on the page, remove it and reload the chart
  if (!svgArea.empty()) {
    svgArea.remove();
    loadChart();
  }
}

function loadChart() {

// SVG wrapper dimensions are determined by the current width
// and height of the browser window.
  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;
  // var svgWidth = 960;
  // var svgHeight = 660;

  // Define the chart's margins as an object
  var margin = {
      top: 40,
      right: 40,
      bottom: 120,
      left: 140
  };

  //calculate chart area minus margins
  var width = svgWidth - margin.right - margin.left;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Initial Params
  var chosenXAxis = "volume_sum";
  var chosenYAxis = "company_count";

  // function used for updating x-scale var upon click on axis label
  function xScale(inputData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(inputData, d => d[chosenXAxis]) * 0, //0.8,
        d3.max(inputData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);

    return xLinearScale;

  }
 
  // function used for updating xAxis var upon click on axis label
  function renderAxesX(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);

    return xAxis;
  } 

  // function used for updating y-scale var upon click on axis label
  function yScale(inputData, chosenYAxis) {
    //create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(inputData, d => d[chosenYAxis]) * 0, //0.8,
            d3.max(inputData, d => d[chosenYAxis]) * 1.2 //1.2
        ])
        .range([height, 0]);

    return yLinearScale;
  }

  // function used for updating yAxis var upon click on axis label
  function renderAxesY(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
  }

  // function used for updating circles group with a transition to
  // new circles for change in x axis or y axis
  function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]))
        .attr("cy", d => newYScale(d[chosenYAxis]));

    return circlesGroup;
  }

  //function used for updating state labels with a transition to new 
  function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    textGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]))
        .attr("y", d => newYScale(d[chosenYAxis]));

    return textGroup;
  }

  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
    // x label
    // Total volume
    if (chosenXAxis === "volume_sum") {
      var xLabel = "Volume:";
    }
    // Total Shares
    else if (chosenXAxis === "shares_sum") {
      var xLabel = "Shares";
    }
    // Median Shares
    else if (chosenXAxis === "shares_mean") {
      var xLabel = "Median Shares";
    }
    // Median Price
    else {
      var xLabel = "Median Price:";
    }

    // y label
    // Total number of companies
    if (chosenYAxis === "company_count") {
      var yLabel = "Company Count:";
    }
    // Average income
    else if (chosenYAxis === "income") {
        var yLabel = "Median Income:";
    }
    // Poverty percentage
    else if (chosenYAxis === "poverty") {
      var yLabel = "Median Poverty:";
    }
    // Median age
    else {
        var yLabel = "Median Age:";
    }
    
    //create tooltip
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([-8, 0])
      .html(function(d) {
        return (`${d.state}<br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
      });

    circlesGroup.call(toolTip);

    // add event
    circlesGroup
    // onmouseover event
      .on("mouseover", function(d, index) {
        toolTip.show(d);
      })
    // onmouseout event
      .on("mouseout", function(d, index) {
        toolTip.hide(d);
      });

    return circlesGroup;
  }

  // Retrieve data from the CSV file and group it by State
  d3.csv("../data/IPOdataStateComplete.csv", function(err, inputData) {
    if (err) throw err;

    console.log(inputData);

    // parse data
    inputData.forEach(function(d) {
      d.voleme_sum = +d.voleme_sum;
      d.shares_sum = +d.shares_sum;
      d.shares_mean = +d.shares_mean;
      d.price_mean = +d.price_mean;
      d.company_count = +d.company_count;
      d.income = +d.income;
      d.age = +d.age;
      d.poverty = +d.poverty;

      console.log(d.voleme_sum);
      console.log(d.shares_sum);
      console.log(d.shares_mean);
      console.log(d.price_mean);
      console.log(d.company_count);
      console.log(d.income);
      console.log(d.age);
      console.log(d.poverty);
    });
    
    // xLinearScale and yLinearScale functions above csv import
    var xLinearScale = xScale(inputData, chosenXAxis);
    var yLinearScale = yScale(inputData, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(inputData)
      .enter()
      .append("circle")
      .classed("stateCircle", true)
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d[chosenYAxis]))
      .attr("r", 15)
      .attr("fill", "blue")
      .attr("opacity", ".5");

    //append initial text
    var textGroup = chartGroup
      .selectAll(".stateText")
      .data(inputData)
      .enter()
      .append("text")
      .classed("stateText", true)
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d[chosenYAxis]))
      .attr("dy", 3)
      .attr("font-size", "10px")
      .text(function(d){return d.abbr});
      
    // Create group for 3 x-axis labels
    var xlabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);
    
    var volumeLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "volume_sum") // value to grab for event listener
      .classed("active", true)
      .text("Est. Volume (mil)");

    var sharesLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "shares_sum") // value to grab for event listener
      .classed("inactive", true)
      .text("Shares (mil)");

    var sharesMeanLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "shares_mean") // value to grab for event listener
      .classed("inactive", true)
      .text("Median Shares (mil)");

      var priceLabel = xlabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 80)
      .attr("value", "price_mean") // value to grab for event listener
      .classed("inactive", true)
      .text("Price (Median)");

    //create group for 3 y-axis labels
    var yLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${0 - margin.left/4}, ${(height/2)})`);

    var quantityLabel = yLabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0)
      .attr("y", 0 - 40)
      .attr("dy", "1em")
      .attr("value", "company_count")
      .classed("axis-text", true)
      .classed("active", true)
      .text("Company count");

    var incomeLabel = yLabelsGroup.append("text") 
      .attr("transform", "rotate(-90)")
      .attr("x", 0)
      .attr("y", 0 -60)
      .attr("dy", "1em")
      .attr("value", "income")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("Household Income (Median)");

    var povertyLabel = yLabelsGroup.append("text")
      .attr("transform", "rotate(-90)")   
      .attr("x", 0)
      .attr("y", 0 - 80)
      .attr("dy", "1em")
      .attr("value", "poverty")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("In Poverty (%)");
 
      var ageLabel = yLabelsGroup.append("text")
      .attr("transform", "rotate(-90)")   
      .attr("x", 0)
      .attr("y", 0 - 100)
      .attr("dy", "1em")
      .attr("value", "age")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("Median Age");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {

          // replaces chosenXAxis with value
          chosenXAxis = value;

          console.log(chosenXAxis)

          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(inputData, chosenXAxis);

          // updates x axis with transition
          xAxis = renderAxesX(xLinearScale, xAxis);

          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

          //update text with new x values
          textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          // changes classes to change bold text
          if (chosenXAxis === "volume_sum") {
            volumeLabel
              .classed("active", true)
              .classed("inactive", false);
            sharesLabel
              .classed("active", false)
              .classed("inactive", true);
            sharesMeanLabel
              .classed("active", false)
              .classed("inactive", true);              
            priceLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "shares_sum") {
            volumeLabel
              .classed("active", false)
              .classed("inactive", true);
            sharesLabel
              .classed("active", true)
              .classed("inactive", false);
            sharesMeanLabel
              .classed("active", false)
              .classed("inactive", true);  
            priceLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "shares_mean") {
            volumeLabel
              .classed("active", false)
              .classed("inactive", true);
            sharesLabel
              .classed("active", false)
              .classed("inactive", true);
            sharesMeanLabel
              .classed("active", true)
              .classed("inactive", false); 
            priceLabel
              .classed("active", false)
              .classed("inactive", true);
          }          
          else {
            volumeLabel
              .classed("active", false)
              .classed("inactive", true);
            sharesLabel
              .classed("active", false)
              .classed("inactive", true);
            sharesMeanLabel
              .classed("active", false)
              .classed("inactive", true);               
            priceLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });

    //y axis labels event listener
    yLabelsGroup.selectAll("text")
      .on("click", function() {
        //get value of selection
        var value = d3.select(this).attr("value");
        if (value != chosenYAxis) {

          //replace chosenYAxis with value
          chosenYAxis = value;

          console.log(chosenYAxis)

          // functions here found above csv import
          //update y scale for new data
          yLinearScale = yScale(inputData, chosenYAxis);

          //update y axis with transition
          yAxis = renderAxesY(yLinearScale, yAxis);

          //update circles with new y values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

          //update text with new y values
          textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)

          //update tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

          //change classes to change bold text
          if (chosenYAxis === "income") {
            incomeLabel
              .classed("active", true)
              .classed("inactive", false);  
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);          
            quantityLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
              }
          else if (chosenYAxis === "poverty") {
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);  
            povertyLabel
              .classed("active", true)
              .classed("inactive", false);          
            quantityLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);
              }
          else if (chosenYAxis === "company_count") {
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);  
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);          
            quantityLabel
              .classed("active", true)
              .classed("inactive", false);
            ageLabel
              .classed("active", false)
              .classed("inactive", true);              
              }              
          else {
            incomeLabel
              .classed("active", false)
              .classed("inactive", true);  
            povertyLabel
              .classed("active", false)
              .classed("inactive", true);          
            quantityLabel
              .classed("active", false)
              .classed("inactive", true);
            ageLabel
              .classed("active", true)
              .classed("inactive", false);               
          }
        }
      });
  });
}