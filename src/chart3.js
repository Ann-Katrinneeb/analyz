import peerdata from './data/peergroups.csv';
import data3 from './data/all.csv';


var product = "Yellowfin";
var yLegend = 225;
var tranx = -135;
var tranx2 = 92;
var tranx3 = 112;
var labely = 20;
var lineLenght = 270;
var xValueLabels = 150;
var valueHead = 165;
var xRankpeer = -50;
var ySpace = 22.5;
var labelxSpac = -140;
var SpaceLine = 22.5;
var xLine = 280;
var xLine2 = xLine -8;
var peerGroupDummy = "All products",
  productDummy = "Yellowfin",
  peerSelectDataUp, prodSelectDataUp, productSelect, peerSelectUp;
var legend = {
  left: -70,
  top: 0
};
		var countRank = 0;

var formatValue = d3.format(".1f");

var margin = {
  top: 50,
  right: 40,
  bottom: 20,
  left: 300
};

var w = 600 - margin.left - margin.right;
var h = 850 - margin.top - margin.bottom;

var widthRanks = 165;
var barHeight5 = 12;
var spacing = 14.5;
var barHeight4 = 4;
var productSelecter = "Yellowfin";
var peerSelecter = "All products";
var prodSelectData;

var svg3 = d3.select("#chart3")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    data3.forEach(function(d) {
      d.Code = +d.Code;
    });

    // Peer Group Data Filter

    var data = data3.filter(function(d, i) {
      return d.peer == peerGroupDummy;
    })

    prodSelectData = peerdata.filter(function(d) {
      return d.Peergroup == "All products"
    });

    var dropProd = d3.select("#Productfilter")
      .selectAll("a")
      .data(prodSelectData)
      .enter()
      .append("a")
      .attr("class", "dropdown-item")
      .text(function(d) {
        return d.Product;
      })
      .on("click", function() {
        var selText = $(this).text();
        $(this).parents('.dropdown').find('.dropdown-toggle').html(selText);
        productDummy = $(this).text();
        updateFilterPG(productDummy);
        updateProd(productDummy);
      });

    var peerSelection = d3.set(peerdata.map(function(d) {
      return d.Peergroup;
    })).values();

    var dropPG = d3.select("#pgfilter")
      .selectAll("a")
      .data(peerSelection)
      .enter()
      .append("a")
      .attr("class", "dropdown-item")
      .text(function(d) {
        return d;
      })
      .on("click", function() {
        var selText = $(this).text();
        $(this).parents('.dropdown').find('.dropdown-toggle').html(selText);
        peerGroupDummy = $(this).text();
        updateFilterProduct(peerGroupDummy);
        updatePeer(peerGroupDummy);
      });

    function updateFilterPG(filterValue) {

      peerSelectDataUp = peerdata.filter(function(d) {
        return d.Product == filterValue
      });

      peerSelection = d3.set(peerSelectDataUp.map(function(d) {
        return d.Peergroup;
      })).values();

      d3.select("#pgfilter").selectAll(".dropdown-item").remove();
      d3.select("#pgfilter").selectAll("a")
        .data(peerSelection)
        .enter().append("a")
        .attr("class", "dropdown-item")
        .text(function(d) {
          return d;
        })
        .on("click", function() {
          var selText = $(this).text();
          $(this).parents('.dropdown').find('.dropdown-toggle').html(selText);
          peerGroupDummy = $(this).text();
          updateFilterProduct(peerGroupDummy);
          updatePeer(peerGroupDummy);
        });;

    }

    function updateFilterProduct(filterValue) {

      prodSelectDataUp = peerdata.filter(function(d) {
        return d.Peergroup == filterValue
      });

      prodSelectData = d3.set(prodSelectDataUp.map(function(d) {
        return d.Product;
      })).values();

      d3.select("#Productfilter").selectAll(".dropdown-item").remove();
      d3.select("#Productfilter").selectAll("a")
        .data(prodSelectData)
        .enter().append("a")
        .attr("class", "dropdown-item")
        .text(function(d) {
          return d;
        })
        .on("click", function() {
          var selText = $(this).text();
          $(this).parents('.dropdown').find('.dropdown-toggle').html(selText);
          productDummy = $(this).text();
          updateFilterPG(productDummy);
          updateProd(productDummy);
        });

    }

    updateFilterPG(productDummy);

    data.forEach(function(d) {
      d.Code = +d.Code;
    });

    var KPInest = d3.nest()
      .key(function(d) {
        return d.KPI;
      })
      .rollup(function(v) {
        return d3.mean(v, function(d) {
          return d.group;
        });
      })
      .entries(data);

    var KPInest2 = d3.nest()
      .key(function(d) {
        return d.KPI;
      })
      .entries(data);

    var KPIaverage = d3.nest()
      .key(function(d) {
        return d.KPI;
      })
      .rollup(function(v) {
        return d3.mean(v, function(d) {
          return d.average;
        });
      })
      .entries(data);

    var KPIlabels = KPInest.map(function(d) {
      return d.key;
    });

    svg3.selectAll("line.table")
      .data(KPInest)
      .enter()
      .append("line")
      .attr("class", "table")
      .attr("x1", function(d) {
        return labelxSpac - 125;
      })
      .attr("y1", function(d, i) {
        return 28 + (ySpace * i)
      })
      .attr("x2", lineLenght)
      .attr("y2", function(d, i) {
        return 28 + (ySpace * i)
      })
      .attr("stroke", "grey")
      .attr("stroke-width", "0.15");

    // KPI Labels

    var KPIs = svg3.selectAll("text.KPI")
      .data(KPInest)
      .enter()
      .append("text")
      .attr("class", "KPI")
      .attr("x", function(d) {
        if (d.value == 2 || d.value == 4) return labelxSpac - 125;
        if (d.value == 3) return labelxSpac - 115;
        else return labelxSpac - 150;
      })
      .attr("y", function(d, i) {
        return (barHeight5 / 2) + 14.5 + (i * ySpace)
      })
      .text(function(d) {
        return d.key
      })
      .attr("font-weight", function(d) {
        if (d.value == 1) return "bold";
      });

    // New groups

    var prodCountHelp = d3.set(data.map(function(d) {
      return d.Product;
    })).values();

    var prodCount = prodCountHelp.length;

    var barWidth = widthRanks / prodCount;

    var KPInest3 = KPInest2.map(function(d,i) {

          var valuesHelp=d.values;

          for(var e=0;e<d.values.length;e++){
            countRank=0;
          for(var j=0;j<d.values.length;j++){

              if (d.values[j].Rank  !== "n/a") {
                  countRank+=1;
              }
          }
          valuesHelp[e]["counter"] = countRank;
        }

      return {
        key:d.key,
        count:countRank,
        values:valuesHelp
      }
    });

    var KPInest4 = KPInest3.map(function(d,i) {
      var placeholderObj =[];
      for (var j=0;j<d.count;j++) {
      placeholderObj[j]=j
     }
      return {
        key:d.key,
        placeHolder:placeholderObj
      }
    })


    var KPIgroups2 = svg3.selectAll("g.KPIs")
      .data(KPInest4)
      .enter()
      .append("g")
      .attr("class", "KPIs2")
      .attr("transform", function(d, i) {
        return "translate(" + tranx3 + "," + i * ySpace + ")"
      });
    
    var blocksInd = KPIgroups2.selectAll("rect.blocksInd")
      .data(function(d) {
        return d.placeHolder
      })
      .enter()
      .append("rect")
      .attr("class", "blocksInd")
      .attr("x", function(d, i) {
        return (i + 1) * (-barWidth);
      })
      .attr("y", 10.5)
      .attr("width", (prodCount < 18) ? barWidth - 3 : barWidth - 2)
      .attr("height", barHeight5)
      .attr("fill", function(d, i) {
        return "#ffffff";
      });



      var KPIgroups = svg3.selectAll("g.KPIs")
        .data(KPInest2)
        .enter()
        .append("g")
        .attr("class", "KPIs")
        .attr("transform", function(d, i) {
          return "translate(" + tranx3 + "," + i * ySpace + ")"
        });


    var KPIind = KPIgroups.selectAll("rect.KPIind")
      .data(function(d) {
        return d.values
      })
      .enter()
      .append("rect")
      .attr("class", "KPIind")
      .attr("x", function(d, i) {
        if (d.Rank == "n/a") return 0;
        else return d.Rank * (-barWidth);
      })
      .attr("y", 10.5)
      .attr("width", (prodCount < 18) ? barWidth - 3 : barWidth - 2)
      .attr("height", barHeight5)
      .attr("display", function(d, i) {
        if (d.Rank == "n/a") {
          return "none";
        }
      })
      .attr("fill", function(d, i) {
        if (d.Product == product) {
          if (d.Rank == 1) {
            return "#42b648";
          } else if (d.Rank / prodCount < 0.3) {
            return "#adc537";
          } else if (d.Rank / prodCount == 1) {
            return "#f2686f";
          } else if (d.Rank / prodCount > 0.7) {
            return "#f79154";
          } else {
            return "#ffbf00";
          }
        } else {
          return "#ffffff";
        }
      })
      .attr("visibility", function(d, i) {
        if (d.Product != product) {
          return "hidden";
        } else {
          return "visible"
        }
      });


    var productRank = data.filter(function(element) {
      return element.Product == product
    });

    var KPIrank = svg3.selectAll("text.KPItext")
      .data(productRank)
      .enter().append("text")
      .attr("class", "KPItext")
      .attr("x", tranx3 - 180)
      .attr("y", function(d, i) {
        return (barHeight5 / 2) + spacing + (ySpace * i)
      })
      .attr("text-anchor", "end")
      .text(function(d) {
        if (d.Rank == "n/a") {
          return "n/a";
        } else {
          return d.Rank;
        };
      });


    var valuesproduct = svg3.selectAll("text.values")
      .data(productRank)
      .enter().append("text")
      .attr("class", "values")
      .attr("x", xValueLabels)
      .attr("y", function(d, i) {
        return (barHeight5 / 2) + spacing + (ySpace * i)
      })
      .attr("text-anchor", "end")
      .text(function(d) {
        if (d.Value == "n/a") {
          return "n/a";
        } else {
          return formatValue(d.Value);
        };
      });

    // Values bar

    var bar = svg3.selectAll("rect.valu")
      .data(productRank)
      .enter()
      .append("rect")
      .attr("class", "valu rank")
      .attr("transform", "translate(" + tranx2 + ",-6.5)")
      .attr("x", 70)
      .attr("y", function(d, i) {
        return (barHeight5 / 2) + 14.5 + (i * ySpace)
      })
      .attr("width", function(d) {
        if (d.Value == "n/a") {
          return 0;
        } else {
          return d.Value * 10;
        }
      })
      .attr("height", barHeight4)
      .attr("fill", "#416ba4");

    // Average bar

    var barAv = svg3.selectAll("rect.average")
      .data(KPIaverage)
      .enter()
      .append("rect")
      .attr("class", "average")
      .attr("transform", "translate(" + tranx2 + ",-11)")
      .attr("x", function(d) {
        return 70 + d.value * 10;
      })
      .attr("y", function(d, i) {
        return (barHeight5 / 2) + 16.5 + (i * ySpace)
      })
      .attr("width", 1.5)
      .attr("height", 9)
      .style("fill", "#a3aeb7");

    dropProd.on("click", function() {
      var selText = $(this).text();
      $(this).parents('.dropdown').find('.dropdown-toggle').html(selText);
      productDummy = $(this).text();
      updateFilterPG(productDummy);
      updateProd(productDummy);
    });

    function updateProd(updateProduct) {

      svg3.selectAll(".KPIind")
        .transition()
        .duration(500)
        .attr("fill", function(d, i) {
          if (d.Rank == "n/a") {
            return "#ffffff";
          } else {
            if (d.Product == updateProduct) {
              if (d.Rank == 1) {
                return "#42b648";
              } else if (d.Rank / prodCount < 0.3) {
                return "#adc537";
              } else if (d.Rank / prodCount == 1) {
                return "#f2686f";
              } else if (d.Rank / prodCount > 0.7) {
                return "#f79154";
              } else {
                return "#ffbf00";
              }
            } else {
              return "#ffffff";
            }
          }
        })
        .attr("visibility", function(d, i) {
          if (d.Product != updateProduct) {
            return "hidden";
          } else {
            return "visible"
          }
        });

      // Values Update

      productRank = data.filter(function(element) {
        return element.Product == updateProduct
      });

      var bbiValueup = svg3.selectAll(".values")
        .data(productRank)
        .transition()
        .duration(1000)
        .text(function(d) {
          if (d.Value == "n/a") {
            return "n/a";
          } else {
            return formatValue(d.Value);
          };
        });

      var barUp = svg3.selectAll(".valu")
        .data(productRank)
        .transition()
        .duration(1000)
        .attr("width", function(d) {
          if (d.Value == "n/a") {
            return 0;
          } else {
            return d.Value * 10;
          }
        })
        .style("fill", "#416ba4");

      var KPIrankUp = svg3.selectAll("text.KPItext")
        .data(productRank)
        .text(function(d) {
          if (d.Rank == "n/a") {
            return "n/a";
          } else {
            return d.Rank;
          };
        });

    }

    function updatePeer(updatePeerDummy) {

      data = data3.filter(function(d, i) {
        return d.peer == updatePeerDummy;
      })

      data.forEach(function(d) {
        d.Code = +d.Code;
      });

      prodCountHelp = d3.set(data.map(function(d) {
        return d.Product;
      })).values();

      prodCount = prodCountHelp.length;

      barWidth = widthRanks / prodCount;

      productRank = data.filter(function(element) {
        return element.Product == productDummy
      });

      var bbiValueup = svg3.selectAll(".values")
        .data(productRank)
        .transition()
        .duration(1000)
        .text(function(d) {
          if (d.Value == "n/a") {
            return "n/a";
          } else {
            return formatValue(d.Value);
          };
        });

      var barUp = svg3.selectAll(".valu")
        .data(productRank)
        .transition()
        .duration(1000)
        .attr("width", function(d) {
          if (d.Value == "n/a") {
            return 0;
          } else {
            return d.Value * 10;
          }
        })
        .style("fill", "#416ba4");

      // Average bar update

      var KPIaverageUp = d3.nest()
        .key(function(d) {
          return d.KPI;
        })
        .rollup(function(v) {
          return d3.mean(v, function(d) {
            return d.average;
          });
        })
        .entries(data);

      var barUP = svg3.selectAll("rect.average")
        .data(KPIaverageUp)
        .attr("x", function(d) {
          return 80 + d.value * 10;
        });

      var KPInest2 = d3.nest()
        .key(function(d) {
          return d.KPI;
        })
        .entries(data);

      var KPIrankUp = svg3.selectAll("text.KPItext")
        .data(productRank)
        .text(function(d) {
          if (d.Rank == "n/a") {
            return "n/a";
          } else {
            return d.Rank;
          };
        });

      var KPIgroupsUp = svg3.selectAll("g.KPIs")
        .data(KPInest2);

      KPIgroups.selectAll("rect.blocksInd").remove()

      var blocksIndUp = KPIgroups.selectAll("rect.blocksInd").
      data(function(d) {
          return d.values
        })
        .enter()
        .append("rect")
        .attr("class", "blocksInd")
        .attr("x", function(d, i) {
          return (i + 1) * (-barWidth);
        })
        .attr("y", 10.5)
        .attr("width", (prodCount < 18) ? barWidth - 3 : barWidth - 2)
        .attr("height", barHeight5)
        .attr("fill", function(d, i) {
          return "#ffffff";
        });

      KPIgroupsUp.selectAll("rect.KPIind").remove();

      var KPIindUp = KPIgroupsUp.selectAll("rect.KPIind")
        .data(function(d) {
          return d.values
        })
        .enter()
        .append("rect")
        .attr("class", "KPIind")
        .attr("x", function(d, i) {
          if (d.Rank == "n/a") return 0;
          else return d.Rank * (-barWidth);
        })
        .attr("y", 10.5)
        .attr("width", (prodCount < 18) ? barWidth - 3 : barWidth - 2)
        .attr("height", barHeight5)
        .attr("display", function(d, i) {
          if (d.Rank == "n/a") {
            return "none";
          }
        })
        .attr("fill", function(d, i) {
          if (d.Product == productDummy) {
            if (d.Rank == 1) {
              return "#42b648";
            } else if (d.Rank / prodCount < 0.3) {
              return "#adc537";
            } else if (d.Rank / prodCount == 1) {
              return "#f2686f";
            } else if (d.Rank / prodCount > 0.7) {
              return "#f79154";
            } else {
              return "#ffbf00";
            }
          } else {
            return "#ffffff";
          }
        })
        .attr("visibility", function(d, i) {
          if (d.Product != productDummy) {
            return "hidden";
          } else {
            return "visible"
          }
        });
    }


svg3.append("text")
  .attr("x", labelxSpac - 150)
  .attr("y", -20)
  .text("KPI");

svg3.append("text")
  .attr("x", valueHead)
  .attr("y", -20)
  .text("Value");

svg3.append("text")
  .attr("x", xRankpeer)
  .attr("y", -20)
  .text("Rank in peer group");

svg3.append("line")
  .attr("class", "head")
  .attr("x1", labelxSpac - 150)
  .attr("y1", -10)
  .attr("x2", lineLenght)
  .attr("y2", -10)
  .attr("stroke", "grey")
  .attr("stroke-width", "0.4")

// KPI Group 1 Lines

var count5 = 0;
var LineGroupBegin5 = 27;

   svg3.append("line")
     .attr("class", "head")
     .attr("x1", -xLine)
     .attr("y1", LineGroupBegin5)
     .attr("x2", -xLine)
     .attr("y2", LineGroupBegin5+10+(2*SpaceLine))
     .attr("stroke", "grey")
     .attr("stroke-width", "0.3");

   for (count5=0; count5<3;count5++) {

     svg3.append("line")
       .attr("class", "head")
       .attr("x1", -xLine)
       .attr("y1", LineGroupBegin5 +10 + (SpaceLine*count5))
       .attr("x2", -xLine2)
       .attr("y2", LineGroupBegin5 +10 + (SpaceLine*count5))
       .attr("stroke", "grey")
       .attr("stroke-width", "0.3");
   }

// KPI Group 2 Lines

  var count = 0;
  var LineGroupBegin = 118;

     svg3.append("line")
       .attr("class", "head")
       .attr("x1", -xLine)
       .attr("y1", LineGroupBegin)
       .attr("x2", -xLine)
       .attr("y2", LineGroupBegin+10+(4*SpaceLine))
       .attr("stroke", "grey")
       .attr("stroke-width", "0.3");

     for (count=0; count<5;count++) {

       svg3.append("line")
         .attr("class", "head")
         .attr("x1", -xLine)
         .attr("y1", LineGroupBegin +10 + (SpaceLine*count))
         .attr("x2", -xLine2)
         .attr("y2", LineGroupBegin +10 + (SpaceLine*count))
         .attr("stroke", "grey")
         .attr("stroke-width", "0.3");
     }


// KPI Group 3 Lines

  var count1 = 0;
  var LineGroupBegin2 = 253;

     svg3.append("line")
       .attr("class", "head")
       .attr("x1", -xLine)
       .attr("y1", LineGroupBegin2)
       .attr("x2", -xLine)
       .attr("y2", LineGroupBegin2+10+(6*SpaceLine))
       .attr("stroke", "grey")
       .attr("stroke-width", "0.3");

     for (count1=0; count1<7;count1++) {

       svg3.append("line")
         .attr("class", "head")
         .attr("x1", -xLine)
         .attr("y1", LineGroupBegin2 +10 + (SpaceLine*count1))
         .attr("x2", -xLine2)
         .attr("y2", LineGroupBegin2 +10 + (SpaceLine*count1))
         .attr("stroke", "grey")
         .attr("stroke-width", "0.3");
     }


// KPI Group 4 Lines

    var count2 = 0;
    var LineGroupBegin3 = 433;

       svg3.append("line")
         .attr("class", "head")
         .attr("x1", -xLine)
         .attr("y1", LineGroupBegin3)
         .attr("x2", -xLine)
         .attr("y2", LineGroupBegin3+10+(6*SpaceLine))
         .attr("stroke", "grey")
         .attr("stroke-width", "0.3");

       for (count2=0; count2<7;count2++) {

         svg3.append("line")
           .attr("class", "head")
           .attr("x1", -xLine)
           .attr("y1", LineGroupBegin3 +10 + (SpaceLine*count2))
           .attr("x2", -xLine2)
           .attr("y2", LineGroupBegin3 +10 + (SpaceLine*count2))
           .attr("stroke", "grey")
           .attr("stroke-width", "0.3");
       }


// KPI Group 5 Lines

  var count3 = 0;
  var LineGroupBegin4 = 612;

     svg3.append("line")
       .attr("class", "head")
       .attr("x1", -xLine)
       .attr("y1", LineGroupBegin4)
       .attr("x2", -xLine)
       .attr("y2", LineGroupBegin4+10+(1*SpaceLine))
       .attr("stroke", "grey")
       .attr("stroke-width", "0.3");

     for (count3=0; count3<2;count3++) {

       svg3.append("line")
         .attr("class", "head")
         .attr("x1", -xLine)
         .attr("y1", LineGroupBegin4 +10 + (SpaceLine*count3))
         .attr("x2", -xLine2)
         .attr("y2", LineGroupBegin4 +10 + (SpaceLine*count3))
         .attr("stroke", "grey")
         .attr("stroke-width", "0.3");
     }

// Legend

var LegTrans = svg3.append("g").attr("class", "legendText")
  .attr("transform", "translate(" + legend.left + "," + legend.top + ")");


LegTrans.append("text")
  .attr("x", 180)
  .attr("y", 470 + yLegend)
  .style("font-style", "italic")
  .style("font-size", 10)
  .text("= Average of peer group");

LegTrans.append("line")
  .attr("x1", 177)
  .attr("y1", 459 + yLegend)
  .attr("x2", 177)
  .attr("y2", 474 + yLegend)
  .style("stroke", "#a3aeb7");

LegTrans.append("text")
  .attr("x", 21)
  .attr("y", 470 + yLegend)
  .style("font-style", "italic")
  .style("font-size", 10)
  .text("1.0");

LegTrans.append("text")
  .attr("x", 133)
  .attr("y", 470 + yLegend)
  .style("font-style", "italic")
  .style("font-size", 10)
  .text("10.0");

LegTrans.append("rect")
  .attr("x", -127)
  .attr("y", 461 + yLegend)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", "#f2686f");

LegTrans.append("text")
  .attr("x", -150)
  .attr("y", 487 + yLegend)
  .style("font-style", "italic")
  .style("font-size", 10)
  .text("Last ranked ")
  .append("tspan")
  .attr("x", -146)
  .attr("y", 499 + yLegend)
  .text("product in ")
  .append("tspan")
  .attr("x", -149)
  .attr("y", 511 + yLegend)
  .text("peer group");

LegTrans.append("text")
  .attr("x", -60)
  .attr("y", 487 + yLegend)
  .style("font-style", "italic")
  .style("font-size", 10)
  .text("Best ranked ")
  .append("tspan")
  .attr("x", -56)
  .attr("y", 499 + yLegend)
  .text("product in ")
  .append("tspan")
  .attr("x", -58)
  .attr("y", 511 + yLegend)
  .text("peer group");

LegTrans.append("rect")
  .attr("x", -105)
  .attr("y", 461 + yLegend)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", "#f79154");

LegTrans.append("rect")
  .attr("x", -83)
  .attr("y", 461 + yLegend)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", "#ffbf00");

LegTrans.append("rect")
  .attr("x", -61)
  .attr("y", 461 + yLegend)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", "#adc537");

LegTrans.append("rect")
  .attr("x", -39)
  .attr("y", 461 + yLegend)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", "#42b648");

LegTrans.append("rect")
  .attr("x", 40)
  .attr("y", 463 + yLegend)
  .attr("width", 90)
  .attr("height", barHeight4)
  .style("fill", "#416ba4");

LegTrans.append("text")
  .attr("x", 26)
  .attr("y", 487 + yLegend)
  .style("font-style", "italic")
  .style("font-size", 10)
  .text("Worst")
  .append("tspan")
  .attr("x", 22)
  .attr("y", 499 + yLegend)
  .text("product")
  .append("tspan")
  .attr("x", 19)
  .attr("y", 511 + yLegend)
  .text("(Overall)");

LegTrans.append("text")
  .attr("x", 118)
  .attr("y", 487 + yLegend)
  .style("font-style", "italic")
  .style("font-size", 10)
  .text("Best")
  .append("tspan")
  .attr("x", 110)
  .attr("y", 499 + yLegend)
  .text("product")
  .append("tspan")
  .attr("x", 107)
  .attr("y", 511 + yLegend)
  .text("(Overall)");
