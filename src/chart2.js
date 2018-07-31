import dataKPI from './data/kpis.csv';

var chart2 = d3.select("#chart2");
var sectionWidth = d3.select(".sectionsContainer");

var widthHelper2 = (parseInt(sectionWidth.style("width"))>800) ? 700 : parseInt(sectionWidth.style("width")) - 100;


var marginKPI = {
    top: widthHelper2 > 380 ? 50 : 50,
    right: 65,
    bottom: 40,
    left: widthHelper2 > 380 ? 160 : 5
  },
  widthKPI = widthHelper2 - marginKPI.left - marginKPI.right,
  heightKPI = widthHelper2 > 380 ? (1450 - marginKPI.top - marginKPI.bottom) : (1450 - marginKPI.top - marginKPI.bottom);
var barHeightKPI = 30;

var formKPI = d3.format(".1f")

var KPI = "Business benefits";

function keys(d) {
  return d.vendor;
}

  var KPIselect = KPI;
  var peerSelect = "All products"

  var popData2 = dataKPI.filter(function(element) {
    return element.Peer == peerSelect
  });

  var popData = popData2.filter(function(element) {
    return element.KPI == KPI
  });

  var xScale2 = d3.scaleLinear()
    .range([0, widthKPI]);

  var maxVal2 = 10;

  xScale2.domain([0, maxVal2]);


  var svg1 = chart2.append("svg")
    .attr("width", widthKPI + marginKPI.left + marginKPI.right)
    .attr("height", heightKPI + marginKPI.top + marginKPI.bottom);

  var svgKPI = svg1.append("g")
    .attr("transform", "translate(" + marginKPI.left + "," + marginKPI.top + ")");

  var barGroup = svgKPI.append("g")
    .attr("class", "bar");

  popData.sort(function(a, b) {
    return b.value - a.value
  });

  var barsKPI = barGroup.selectAll("rect")
    .data(popData)
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", function(d, i) {
      return barHeightKPI * i
    })
    .attr("width", function(d) {
      return xScale2(d.value);
    })
    .attr("height", barHeightKPI / 2.5)
    .attr("fill", function(d) {
      if (d.vendor == "Peer Group Average") {
        return "rgb(102, 102, 102)";
      } else {
        return "#2f72b0";
      }
    });

  var values = barGroup.selectAll("text")
    .data(popData)
    .enter().append("text")
    .attr("class", "values")
    .attr("x", function(d) {
      return xScale2(d.value) + 8
    })
    .attr("y", function(d, i) {
      return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
    })
    .text(function(d) {
      return formKPI(d.value)
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "start")
    .attr("font-size", 14);

  var vendorlabels = svgKPI.append("g")
    .selectAll("text")
    .data(popData, keys)
    .enter().append("text")
    .attr("class", "labels")
    .attr("x", widthHelper2 > 380 ? -12 : 0)
    .attr("y", function(d, i) {
      return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
    })
    .text(function(d) {
      return d.vendor
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "end")
    .attr("font-size", 14)

  var popValues = popData.map(function(d, i) {
    return d.value
  });


  $('#KPIfilter').change(function(e, i) {
    KPI = $("#KPIfilter option:selected").text();

    update(KPI, peerSelect);
  })

  $('#PGfilter').change(function(e, i) {
    peerSelect = $("#PGfilter option:selected").text();

    update(KPI, peerSelect);
  })



  function update(updateKPI,updatePeer) {

    popData2 = dataKPI.filter(function(element) {
      return element.Peer == updatePeer
    });

    popData = popData2.filter(function(element) {
      return element.KPI == updateKPI
    });

    popData.sort(function(a, b) {
      return b.value - a.value
    })

    var barsupdateKPI = svgKPI.selectAll("rect")
      .data(popData);

    barsupdateKPI
      .attr("fill", function(d) {
        if (d.vendor == "Peer Group Average") {
          return "rgb(102, 102, 102)";
        } else {
          return "#2f72b0";
        }
      })
      .transition()
      .duration(700)
      .attr("width", function(d) {
        return xScale2(d.value);
      })


    barsupdateKPI.enter()
      .append("rect")
      .attr("fill", function(d) {
        if (d.vendor == "Peer Group Average") {
          return "rgb(102, 102, 102)";
        } else {
          return "#2f72b0";
        }
      })
      .attr("x", 0)
      .attr("y", function(d, i) {
        return barHeightKPI * i
      })
      .attr("width", function(d) {
        return xScale2(d.value);
      })
      .attr("height", barHeightKPI / 2.5)

    barsupdateKPI.exit()
      .remove();

    var valuesupdate = svgKPI.selectAll("text.values")
      .data(popData);

    valuesupdate.transition()
      .duration(700)
      .attr("x", function(d) {
          return xScale2(d.value) + 8
        })
        .attr("y", function(d, i) {
          return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
        })
      .text(function(d) {
        return formKPI(d.value)
      });

    valuesupdate.enter()
      .append("text")
      .attr("class", "values")
      .attr("x", function(d) {
        return xScale2(d.value) + 8
      })
      .attr("y", function(d, i) {
        return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
      })
      .text(function(d) {
        return formKPI(d.value)
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", "start")
      .attr("font-size", 14);

    valuesupdate.exit().remove();

    var vendorlabelsupdate = svgKPI.selectAll("text.labels")
      .data(popData);

    vendorlabelsupdate.transition()
      .duration(700)
      .attr("y", function(d, i) {
        return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
      })
      .text(function(d) {
        return d.vendor
      });

    vendorlabelsupdate.enter()
      .append("text")
      .attr("class", "labels")
      .attr("x", widthHelper2 > 380 ? -12 : 0)
      .attr("y", function(d, i) {
        return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
      })
      .text(function(d) {
        return d.vendor
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", "end")
      .attr("font-size", 14);

    vendorlabelsupdate.exit().remove();

    var popValues = popData.map(function(d, i) {
      return d.value
    });

  };
