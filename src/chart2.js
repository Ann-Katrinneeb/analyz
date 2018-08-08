import dataKPI from './data/kpis.csv';

export function initKPIDash() {

var chart2 = d3.select("#chart2");


var widthHelper2 = parseInt(chart2.style("width"));

var marginKPI = {
    top: 50,
    right: widthHelper2 > 350 ? 65 : 35,
    bottom: 10,
    left: widthHelper2 > 350 ? 160 : 15
  },
  widthKPI = widthHelper2 - marginKPI.left - marginKPI.right,
  heightKPI;
var barHeightKPI = 30;

var formKPI = d3.format(".1f")

var KPI = "Business benefits";

function keys(d) {
  return d.vendor;
}

  var KPIselect = KPI;
  var peerSelect = "All products"

  $('#KPIfilter').selectpicker('val', 10);
  $('#KPIfilter').selectpicker('refresh');

  $('#PGfilter').selectpicker('val', 10);
  $('#PGfilter').selectpicker('refresh');

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

  var answersNum2 = popData.length;

  heightKPI = (answersNum2 + 2) * barHeightKPI - marginKPI.top + marginKPI.bottom;

  heightKPI = heightKPI < 350 ? 350 : heightKPI;

  var svg1 = chart2.append("svg")
    .attr("id", "KPIDashID")
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
      if (widthHelper2 > 350) {
        return xScale2(d.value) + 8
      } else {
        return xScale2(d.value) + 4
      }
    })

    .attr("y", function(d, i) {
      if (widthHelper2 > 350) {
          return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
      } else {
          return (barHeightKPI * i) + barHeightKPI / 2.5 - 3
      }
    })
    .text(function(d) {
      return formKPI(d.value)
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "start")
    .attr("font-size", widthHelper2 > 350 ? 14 : 10);






  var vendorlabels = svgKPI.append("g")
    .selectAll("text")
    .data(popData, keys)
    .enter().append("text")
    .attr("class", "labels")
    .attr("x", widthHelper2 > 350 ? -12 : -0)
    .attr("y", function(d, i) {

      if (widthHelper2 > 350) {
        return barHeightKPI * i + barHeightKPI / 2.5 - 1;
      } else {
        return barHeightKPI * i + barHeightKPI / 2.5 - 16;
      }
    })
    .text(function(d) {
      return d.vendor
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", widthHelper2 > 350 ? "end" : "start")
    .attr("font-size", widthHelper2 > 350 ? 14 : 10);

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

    var widthHelper2 = parseInt(chart2.style("width"));

    var marginKPI = {
        top: 50,
        right: widthHelper2 > 350 ? 65 : 35,
        bottom: 10,
        left: widthHelper2 > 350 ? 160 : 15
      },
      widthKPI = widthHelper2 - marginKPI.left - marginKPI.right,
      heightKPI;

      var answersNum2 = popData.length;

      heightKPI = (answersNum2 + 2) * barHeightKPI - marginKPI.top + marginKPI.bottom;

      heightKPI = heightKPI < 350 ? 350 : heightKPI;



    d3.select("#chart2")
      .selectAll("svg")
      .transition()
      .duration(350)
    .attr("height", heightKPI + marginKPI.top + marginKPI.bottom);

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
      .attr("height", barHeightKPI / 2.5)
      .attr("width", function(d) {
        return xScale2(0);
      })
      .transition()

      .duration(700)
      .attr("width", function(d) {
        return xScale2(d.value);
      })


    barsupdateKPI.exit()
      .remove();

    var valuesupdate = svgKPI.selectAll("text.values")
      .data(popData);

    valuesupdate.transition()
      .duration(700)
      .attr("x", function(d) {
        if (widthHelper2 > 350) {
          return xScale2(d.value) + 8
        } else {
          return xScale2(d.value) + 4
        }
      })
      .attr("y", function(d, i) {
        if (widthHelper2 > 350) {
            return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
        } else {
            return (barHeightKPI * i) + barHeightKPI / 2.5 - 3
        }
      })
        .tween("text", function(d) {
          var node = this;
          var currentVal = this.textContent;
          var i = d3.interpolate(currentVal, d.value);
          return function(t) {
            node.textContent = formKPI(i(t));
          };
        });





    valuesupdate.enter()
      .append("text")
      .attr("class", "values")
      .attr("x", function(d) {
        if (widthHelper2 > 350) {
          return xScale2(0) + 8
        } else {
          return xScale2(0) + 4
        }
      })
      .attr("y", function(d, i) {
        if (widthHelper2 > 350) {
            return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
        } else {
            return (barHeightKPI * i) + barHeightKPI / 2.5 - 3
        }
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", "start")
      .attr("font-size", widthHelper2 > 350 ? 14 : 10)
      .transition()
      .duration(700)
      .attr("x", function(d) {
        if (widthHelper2 > 350) {
          return xScale2(d.value) + 8
        } else {
          return xScale2(d.value) + 4
        }
      })
      .tween("text", function(d) {
        var node = this;
        var currentVal = this.textContent;
        var i = d3.interpolate(currentVal, d.value);
        return function(t) {
          node.textContent = formKPI(i(t));
        };
      });






    valuesupdate.exit().remove();

    var vendorlabelsupdate = svgKPI.selectAll("text.labels")
      .data(popData);

    vendorlabelsupdate
    .transition()
    .duration(300)
    .style("opacity", 0);

      vendorlabelsupdate.exit().remove();

      setTimeout(function() {
      vendorlabelsupdate
      .attr("y", function(d, i) {

        if (widthHelper2 > 350) {
          return barHeightKPI * i + barHeightKPI / 2.5 - 1;
        } else {
          return barHeightKPI * i + barHeightKPI / 2.5 - 16;
        }
      })
      .text(function(d) {
        return d.vendor
      });
    }, 300);



  setTimeout(function() {
    vendorlabelsupdate.enter()
      .append("text")
      .attr("class", "labels")
      .attr("x", widthHelper2 > 350 ? -12 : -0)
      .attr("y", function(d, i) {

        if (widthHelper2 > 350) {
          return barHeightKPI * i + barHeightKPI / 2.5 - 1;
        } else {
          return barHeightKPI * i + barHeightKPI / 2.5 - 16;
        }
      })
      .text(function(d) {
        return d.vendor
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", widthHelper2 > 350 ? "end" : "start")
      .attr("font-size", widthHelper2 > 350 ? 14 : 10)
      .style("opacity", 0)
      .transition()
      .duration(350)
      .style("opacity", 1);

      vendorlabelsupdate
      .transition()
      .duration(300)
      .style("opacity", 1);


    }, 350);

    var popValues = popData.map(function(d, i) {
      return d.value
    });

  };

  function resizeKPIDash() {


    var widthHelper2 = parseInt(d3.select("#chart2").style("width"));

    var marginKPI = {
        top: 50,
        right: widthHelper2 > 350 ? 65 : 35,
        bottom: 10,
        left: widthHelper2 > 350 ? 160 : 15
      },
      widthKPI = widthHelper2 - marginKPI.left - marginKPI.right,
      heightKPI;

      var answersNum2 = popData.length;

      heightKPI = (answersNum2 + 2) * barHeightKPI - marginKPI.top + marginKPI.bottom;

      heightKPI = heightKPI < 350 ? 350 : heightKPI;



    d3.select("#chart2").select("svg")
      .attr("width", widthKPI + marginKPI.left + marginKPI.right)

      d3.select("#chart2").select("svg").select("g").attr("transform", "translate(" + marginKPI.left + "," + marginKPI.top + ")");


      xScale2.range([0, widthKPI]);

      d3.select("#KPIDashID").selectAll("rect")
        .attr("width", function(d) {
          return xScale2(d.value);
        });


        d3.select("#KPIDashID").selectAll(".values")
          .attr("x", function(d) {
            if (widthHelper2 > 350) {
              return xScale2(d.value) + 8
            } else {
              return xScale2(d.value) + 4
            }
          })
          .attr("y", function(d, i) {
            if (widthHelper2 > 350) {
                return (barHeightKPI * i) + barHeightKPI / 2.5 - 1
            } else {
                return (barHeightKPI * i) + barHeightKPI / 2.5 - 3
            }
          })
          .attr("font-size", widthHelper2 > 350 ? 14 : 10);


          d3.select("#KPIDashID").selectAll(".labels")
          .attr("x", widthHelper2 > 350 ? -12 : 0)
          .attr("y", function(d, i) {

            if (widthHelper2 > 350) {
              return barHeightKPI * i + barHeightKPI / 2.5 - 1;
            } else {
              return barHeightKPI * i + barHeightKPI / 2.5 - 16;
            }
          })
        .style("text-anchor", widthHelper2 > 350 ? "end" : "start")
        .attr("font-size", widthHelper2 > 350 ? 14 : 10);




  }

  window.addEventListener('resize', function() {
    resizeKPIDash();

});

}
