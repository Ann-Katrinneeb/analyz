import data11 from './data/kpis2.csv';

export function initProdComp() {



  var valueID, prodId = ["Bissantz", "BOARD", "CALUMO"],
    KPIID = ["Business benefits", "Project success"];
  var KPIComp = "Business benefits",
    KPICompDataFil, peerSelect5, prodSelection5, KPISelection5, svg5Up, vendors, peerSelectHelper = 0, sorting=0;
  var initDisable = 0;

  var chart5 = d3.select("#chart5");
  var formKPI = d3.format(".1f")


  $('#peergroupID').selectpicker('val', '5');
  $('#peergroupID').selectpicker('refresh');

  $("#KPIID").attr('disabled', true);
  $('#KPIID').selectpicker('deselectAll');
  $('#KPIID').selectpicker('refresh');
  $('#ProductID').selectpicker('deselectAll');
  $("#ProductID").attr('disabled', true);
  $('#ProductID').selectpicker('refresh');

  d3.select("#chartHelpText")
    .html("Select the peer group you want to compare")
    .style("display", "block");

    d3.select("#buttonComp")
      .style("display", "none");


    var sortingVal = d3.select("#valSort")
      .on("click", function() {

        valueSort();
        sorting=1;

      });

      var sortingName = d3.select("#nameSort")
        .on("click", function() {

          nameSort();
          sorting=0;
        });


  var widthHelper5 = parseInt(chart5.style("width"));

  var margin5 = {
      top: 70,
      right: widthHelper5 > 350 ? 65 : 35,
      bottom: 30,
      left: widthHelper5 > 350 ? 160 : 15
    },
    width5 = widthHelper5 - margin5.left - margin5.right,
    height5;

  var barHeightKPIComp = 30;
  var formKPIComp = d3.format(".1f")

  var data10 = data11.filter(function(element) {
    return element.vendor != "Peer Group Average"
  });

  var KPICompselect = KPIComp;
  var peerCompSelect = "All products"

  var xScale5 = d3.scaleLinear()
    .range([0, width5]);

  var maxVal5 = 10;

  xScale5.domain([0, maxVal5]);

  var KPICompData = data10.filter(function(element) {
    return element.Peer == peerCompSelect
  });

  var KPICompData2 = data10.filter(function(element) {
    return element.Peer == peerCompSelect & prodId.includes(element.vendor)
  });

  var KPInest3 = d3.nest()
    .key(function(d) {
      return d.KPI;
    })
    .entries(KPICompData2);

  vendors = d3.set(KPICompData2.map(function(d) {
    return d.vendor;
  })).values();

  var vendorNum = vendors.length;

  height5 = ((vendorNum + 2) * barHeightKPIComp);

  var svg5 = d3.select("#chart5")
    .append("div")
    .attr("id", "proddiv")
    .selectAll("svg")
    .data(KPInest3)
    .enter()
    .append("svg")
    .style("display", "none")
    .attr("width", width5 + margin5.left + margin5.right)
    .attr("height", height5 + margin5.top + margin5.bottom)
    .append("g")
    .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");

  svg5.append("text")
    .text(function(d, i) {
      return d.key
    })
    .attr("class", "KPItext")
    .attr("x", (widthHelper5 > 700) ? (700 / 2) - margin5.left : (widthHelper5 / 2) - margin5.left)
    .attr("text-anchor", "middle")
    .attr("y", -32);

  svg5.append("line")
    .attr("class", "KPIline")
    .attr("x1", -margin5.left)
    .attr("y1", height5 - margin5.top)
    .attr("x2", width5 + margin5.right)
    .attr("y2", height5 - margin5.top)
    .attr("stroke", "grey")
    .attr("stroke-width", "0.4")

  var barsKPI5 = svg5.selectAll("rect")
    .data(function(d) {
      return d.values
    })
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", function(d, i) {
      return barHeightKPIComp * i
    })
    .attr("width", function(d) {
      return xScale5(d.value);
    })
    .attr("height", barHeightKPIComp / 2.5)
    .attr("fill", "#2f72b0");

  var vendorlabels5 = svg5.selectAll("text.prodText")
    .data(function(d) {
      return d.values
    })
    .enter().append("text")
    .attr("class", "prodText")
    .attr("x", widthHelper5 > 350 ? -12 : 0)
    .attr("y", function(d, i) {

      if (widthHelper5 > 350) {
        return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 1;
      } else {
        return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 16;
      }
    })
    .text(function(d) {
      return d.vendor
    })
    .attr("fill", "rgb(102, 102, 102)")
  .style("text-anchor", widthHelper5 > 350 ? "end" : "start")
  .attr("font-size", widthHelper5 > 350 ? 14 : 10);


  var values5 = svg5.selectAll("text.values")
    .data(function(d) {
      return d.values
    })
    .enter().append("text")
    .attr("class", "values")
    .attr("x", function(d) {
      return xScale5(d.value) + 8
    })
    .attr("y", function(d, i) {
      return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
    })
    .text(function(d) {
      return formKPI(d.value)
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "start")
    .attr("font-size", 14);


  $('#KPIID').change(function(e, i) {


    $('#ProductID').removeAttr('disabled');
    $('#ProductID').selectpicker('refresh');

    d3.select("#chartHelpText")
      .html("Select the products you want to compare.");

    KPIID = $(e.target).val();

    var svg5 = d3.select("#chart5").selectAll("svg")
      .style("display", "none")

    if (initDisable == 2) {

      d3.select("#chart5").selectAll("svg")
        .each(function(d, i) {

          for (var j = 0; j < KPIID.length; j++) {
            if (d.key == KPIID[j]) {
              if (d3.select(this).style("display") === "none") {
                d3.select(this).style("display", "block");
              }
            }
          }
        });
    }


  })

  $('#ProductID').change(function(e, i) {

    var widthHelper5 = parseInt(d3.select("#chart5").style("width"));

    var margin5 = {
        top: 70,
        right: widthHelper5 > 350 ? 65 : 35,
        bottom: 30,
        left: widthHelper5 > 350 ? 160 : 15
      },
      width5 = widthHelper5 - margin5.left - margin5.right;


    d3.select("#chart5").selectAll("svg")
      .each(function(d, i) {

        for (var j = 0; j < KPIID.length; j++) {
          if (d.key == KPIID[j]) {
            if (d3.select(this).style("display") === "none") {
              d3.select(this).style("display", "block");
            }
          }
        }
      });

    d3.select("#chartHelpText")
      .html("")
      .style("display", "none");

      d3.select("#buttonComp")
        .style("display", "flex");

    var oldValue = prodId;

    prodId = $(e.target).val();

    var newProductData = KPICompData.filter(function(d) {
      return prodId.includes(d.vendor)
    });


    KPInest3 = d3.nest()
      .key(function(d) {
        return d.KPI;
      })
      .entries(newProductData);

    if (sorting==1) {

      for (var j = 0; j < KPInest3.length; j++) {

      KPInest3[j].values.sort(function(a, b) {
          return b.value - a.value;
          });

        }

    } else if (sorting==0) {

      for (var j = 0; j < KPInest3.length; j++) {

      KPInest3[j].values.sort(function(a, b) {
        var nameA=a.vendor.toLowerCase(), nameB=b.vendor.toLowerCase();
           if (nameA < nameB) //sort string ascending
            return -1;
           if (nameA > nameB)
            return 1;
           return 0;
          });

        }

    }

    vendors = d3.set(newProductData.map(function(d) {
      return d.vendor;
    })).values();

    var vendorNumUp = vendors.length;

    height5 = vendorNumUp * barHeightKPIComp;


    d3.select("#chart5").selectAll("rect")
      .remove();

    d3.select("#chart5").selectAll(".prodText")
      .remove();

    d3.select("#chart5").selectAll(".values")
      .remove();

    d3.select("#chart5").selectAll(".KPIline")
      .remove();

    d3.select("#chart5").selectAll("g")
      .remove();


     svg5Up = d3.select("#chart5").selectAll("svg")
      .data(KPInest3)
      .attr("height", height5 + margin5.top + margin5.bottom)
      .append("g")
      .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");

    svg5Up.append("line")
      .attr("class", "KPIline")
      .attr("x1", -margin5.left)
      .attr("y1", height5 + margin5.bottom)
      .attr("x2", width5 + margin5.right)
      .attr("y2", height5 + margin5.bottom)
      .attr("stroke", "#8eb4d9")
      .attr("stroke-width", "1")

    svg5Up.append("text")
      .text(function(d, i) {
        return d.key
      })
      .attr("class", "KPItext")
      .attr("x", (widthHelper5 > 700) ? (700 / 2) - margin5.left : (widthHelper5 / 2) - margin5.left)
      .attr("text-anchor", "middle")
      .attr("y", -25);

    var barsKPI5 = svg5Up.selectAll("rect")
      .data(function(d) {
        return d.values
      });




    barsKPI5.enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", function(d, i) {
        return barHeightKPIComp * i
      })
      .attr("width", function(d) {
        return xScale5(d.value);
      })
      .attr("height", barHeightKPIComp / 2.5)
      .attr("fill", "#2f72b0");


    var vendorlabels5up = svg5Up.selectAll(".prodText")
      .data(function(d) {
        return d.values
      });

    vendorlabels5up.enter()
      .append("text")
      .attr("class", "prodText")
      .attr("x", widthHelper5 > 350 ? -12 : 0)
      .attr("y", function(d, i) {

        if (widthHelper5 > 350) {
          return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 1;
        } else {
          return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 16;
        }
      })

      .text(function(d) {
        return d.vendor
      })
      .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", widthHelper5 > 350 ? "end" : "start")
    .attr("font-size", widthHelper5 > 350 ? 14 : 10);


    var values5up = svg5Up.selectAll(".values")
      .data(function(d) {
        return d.values
      });

    values5up.enter()
      .append("text")
      .attr("class", "values")
      .attr("x", function(d) {
        if (widthHelper5 > 350) {
          return xScale5(d.value) + 8
        } else {
          return xScale5(d.value) + 4
        }
      })
      .attr("y", function(d, i) {
        if (widthHelper5 > 350) {
            return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
        } else {
            return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 3
        }
      })
      .text(function(d) {
        return formKPI(d.value)
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", "start")
    .attr("font-size", widthHelper5 > 350 ? 14 : 10);

    initDisable = 2;

  });

  $('#peergroupID').change(function(e, i) {

    d3.select("#ProductID").attr('disabled', true);

    d3.select("#KPIID").selectAll("option").remove()
    $('#KPIID').removeAttr('disabled');
    $('#KPIID').selectpicker('refresh');


    d3.select("#chart5").selectAll("svg")
      .style("display", "none");

    peerSelect5 = $("#peergroupID option:selected").text();

    initDisable = 1;


    KPICompData = data10.filter(function(element) {
      return element.Peer == peerSelect5
    });

    prodSelection5 = d3.set(KPICompData.map(function(d) {
      return d.vendor;
    })).values();

    KPISelection5 = d3.set(KPICompData.map(function(d) {
      return d.KPI;
    })).values();

    d3.select("#ProductID").selectAll("option").remove()

    d3.select("select#ProductID").selectAll("option")
      .data(prodSelection5)
      .enter().append("option")
      .text(function(d) {
        return d;
      });
    $('#ProductID').selectpicker('refresh');

    d3.select("select#KPIID").selectAll("option")
      .data(KPISelection5)
      .enter().append("option")
      .text(function(d) {
        return d;
      });
    $('#KPIID').selectpicker('refresh');


    d3.select("#chart5").selectAll("svg")
      .style("display", "none");

    d3.select("#chartHelpText")
      .html("Select the KPIs you want to compare")
      .style("display", "flex");;

      d3.select("#buttonComp")
        .style("display", "none");

  })


  function resizeKPIComp() {

    var widthHelper5 = parseInt(d3.select("#chart5").style("width"));

    var margin5 = {
        top: 70,
        right: widthHelper5 > 350 ? 65 : 35,
        bottom: 30,
        left: widthHelper5 > 350 ? 160 : 15
      },
      width5 = widthHelper5 - margin5.left - margin5.right;


      var vendorNum = vendors.length;

      height5 = ((vendorNum + 2) * barHeightKPIComp);

      d3.select("#chart5").selectAll("svg")
         .attr("width", width5 + margin5.left + margin5.right)

      d3.select("#chart5").selectAll("svg").select("g")
             .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");


      xScale5.range([0, width5]);


      d3.select("#proddiv").selectAll("rect")
          .attr("width", function(d) {
            return xScale5(d.value);
          })

    d3.select("#proddiv").selectAll("svg").selectAll(".values")
      .attr("x", function(d) {
        if (widthHelper5 > 350) {
          return xScale5(d.value) + 8
        } else {
          return xScale5(d.value) + 4
        }
      })
      .attr("y", function(d, i) {
        if (widthHelper5 > 350) {
            return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
        } else {
            return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 3
        }
      })
      .attr("font-size", widthHelper5 > 350 ? 14 : 10);


      d3.select("#proddiv").selectAll("svg").selectAll(".KPItext")
        .attr("x", (widthHelper5 > 700) ? (700 / 2) - margin5.left : (widthHelper5 / 2) - margin5.left);


      d3.select("#proddiv").selectAll("svg").selectAll(".KPIline")
        .attr("x1", -margin5.left)
        .attr("x2", width5 + margin5.right);


        d3.select("#proddiv").selectAll("svg").selectAll(".prodText")
        .attr("x", widthHelper5 > 350 ? -12 : 0)
        .attr("y", function(d, i) {

          if (widthHelper5 > 350) {
            return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 1;
          } else {
            return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 16;
          }
        })
      .style("text-anchor", widthHelper5 > 350 ? "end" : "start")
      .attr("font-size", widthHelper5 > 350 ? 14 : 10);




  }

  window.addEventListener('resize', function() {
    resizeKPIComp();

  });

  function valueSort() {

      for (var j = 0; j < KPInest3.length; j++) {

      KPInest3[j].values.sort(function(a, b) {
          return b.value - a.value;
          });

        }

    var svg5Up = d3.select("#chart5").selectAll("svg")
     .data(KPInest3);


    var barsKPI5 = svg5Up.selectAll("rect")
      .data(function(d) {
        return d.values
      });

    barsKPI5.attr("y", function(d, i) {
        return barHeightKPIComp * i
      })
      .attr("width", function(d) {
        return xScale5(d.value);
      });


      var vendorlabels5up = svg5Up.selectAll(".prodText")
        .data(function(d,i) {
          return d.values
        });

      vendorlabels5up.attr("y", function(d, i) {

          if (widthHelper5 > 350) {
            return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 1;
          } else {
            return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 16;
          }
        })
        .text(function(d) {
          return d.vendor
        });

        var values5up = svg5Up.selectAll(".values")
          .data(function(d) {
            return d.values
          });

        values5up
          .attr("x", function(d) {
            if (widthHelper5 > 350) {
              return xScale5(d.value) + 8
            } else {
              return xScale5(d.value) + 4
            }
          })
          .attr("y", function(d, i) {
            if (widthHelper5 > 350) {
                return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
            } else {
                return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 3
            }
          })
          .text(function(d) {
            return formKPI(d.value)
          });

          sorting=1;

  }


  function nameSort() {

      for (var j = 0; j < KPInest3.length; j++) {

      KPInest3[j].values.sort(function(a, b) {
        var nameA=a.vendor.toLowerCase(), nameB=b.vendor.toLowerCase();
           if (nameA < nameB) //sort string ascending
            return -1;
           if (nameA > nameB)
            return 1;
           return 0;
          });

        }



    var svg5Up = d3.select("#chart5").selectAll("svg")
     .data(KPInest3);


    var barsKPI5 = svg5Up.selectAll("rect")
      .data(function(d) {
        return d.values
      });

    barsKPI5.attr("y", function(d, i) {
        return barHeightKPIComp * i
      })
      .attr("width", function(d) {
        return xScale5(d.value);
      });


      var vendorlabels5up = svg5Up.selectAll(".prodText")
        .data(function(d,i) {
          return d.values
        });

      vendorlabels5up.attr("y", function(d, i) {

          if (widthHelper5 > 350) {
            return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 1;
          } else {
            return barHeightKPIComp * i + barHeightKPIComp / 2.5 - 16;
          }
        })
        .text(function(d) {
          return d.vendor
        });

        var values5up = svg5Up.selectAll(".values")
          .data(function(d) {
            return d.values
          });

        values5up
          .attr("x", function(d) {
            if (widthHelper5 > 350) {
              return xScale5(d.value) + 8
            } else {
              return xScale5(d.value) + 4
            }
          })
          .attr("y", function(d, i) {
            if (widthHelper5 > 350) {
                return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
            } else {
                return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 3
            }
          })
          .text(function(d) {
            return formKPI(d.value)
          });

      sorting=0;

  }


}
