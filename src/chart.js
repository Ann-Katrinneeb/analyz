export function initAnaly() {

  $("#region").selectpicker("selectAll");
  $("#industry").selectpicker("selectAll");
  $("#itbus").selectpicker("selectAll");
  $("#employee").selectpicker("selectAll");

  $("#country").selectpicker("selectAll");
  $("#products").selectpicker("selectAll");

  $('#question').selectpicker('val', 901);
  $('#question').selectpicker('refresh');

  // var form = d3.format(",%");
  var formUnder1 = d3.format(",.2%")
  var checkStartQuest = 0;
  var form1 = d3.format(".0f");
  var id = 901,
    classID = "single",
    sortID,
    valID,
    dataOhnTyp,
    answerTyp,
    qestionLong,
    selectedRegLength,
    selectedIndLength,
    questionText,
    selectedITBULength,
    selectedEmpLength,
    selectedRevLength,
    selectedProdLength,
    filterData,
    filterData3,
    filterData5,
    filterData7,
    filterData9,
    filterData11,
    filterData13,
    selectedConLength,
    helperIn = 0,
    selectedProd = [
      "Bissantz",
      "BOARD",
      "CALUMO",
      "Carriots Analytics",
      "Cubeware",
      "cubus",
      "Cyberscience",
      "Dimensional Insight",
      "Domo",
      "Dundas",
      "IBM Cog Analytics",
      "IBM Plan Analytics",
      "Infor BI",
      "Information Builders",
      "Jedox",
      "Longview Analytics",
      "Looker",
      "MS Excel",
      "MS Power BI",
      "MS SSRS",
      "MicroStrategy",
      "Oracle BI",
      "Phocas",
      "Pyramid Analytics",
      "Qlik Sense",
      "QlikView",
      "sales-i",
      "SAP Analytics Cloud",
      "SAP BO Analysis",
      "SAP BO WebI",
      "SAS Enterprise BI",
      "Sisense",
      "Tableau",
      "TARGIT",
      "Yellowfin",
      "Unit4 prevero",
      "Other",
      "Did not respond"
    ],
    selectedReg = [
      "Europe",
      "Asia and Pacific",
      "North America",
      "South America",
      "Rest of the world",
      "Did not respond"
    ],
    selectedInd = [
      "Manufacturing",
      "Services",
      "Retail/Wholesale",
      "Financial Services",
      "IT",
      "Public sector and Education",
      "Utilities",
      "Telecommunications",
      "Transport",
      "Other",
      "Did not respond"
    ],
    selectedEmp = [
      "Less than 150",
      "150 - 500",
      "500 - 1500",
      "1500 - 6000",
      "More than 6000",
      "Did not respond"
    ],
    selectedRev = [
      "Less than $100m",
      "$100m to $1bn",
      "$1bn to $15bn",
      "More than $15bn",
      "Did not respond"
    ],
    selectedITBU = ["IT", "Business", "Did not respond"],
    selectedCon = [
      "Algeria",
      "Andorra",
      "Argentina",
      "Australia",
      "Austria",
      "Belarus",
      "Belgium",
      "Brazil",
      "Canada",
      "China",
      "Colombia",
      "Czech Republic",
      "Denmark",
      "Ecuador",
      "Estonia",
      "France",
      "Germany",
      "Greece",
      "Hong Kong",
      "Hungary",
      "India",
      "Indonesia",
      "Ireland",
      "Israel",
      "Italy",
      "Japan",
      "Liechtenstein",
      "Luxembourg",
      "Malaysia",
      "Mexico",
      "Morocco",
      "Netherlands",
      "New Zealand",
      "Norway",
      "Panama",
      "Peru",
      "Poland",
      "Portugal",
      "Republic of Korea",
      "Romania",
      "Russian Federation",
      "Saudi Arabia",
      "Serbia",
      "Singapore",
      "Slovenia",
      "South Africa",
      "Spain",
      "Sweden",
      "Switzerland",
      "Thailand",
      "Trinidad and Tobago",
      "Turkey",
      "United Arab Emirates",
      "United Kingdom",
      "United States of America",
      "United States Virgin Islands",
      "Uruguay",
      "Viet Nam",
      "New Caledonia",
      "Kenya",
      "Bulgaria",
      "Somalia",
      "Bolivia (Plurinational State of)",
      "Senegal",
      "Dominican Republic",
      "Lithuania",
      "Pakistan",
      "Latvia",
      "Iceland",
      "Costa Rica",
      "American Samoa",
      "Bahrain",
      "Nepal",
      "Kuwait",
      "Egypt",
      "Angola",
      "Isle of Man",
      "Chile",
      "Malta",
      "El Salvador",
      "Democratic Republic of the Congo",
      "Côte d'Ivoire",
      "Réunion",
      "Bermuda",
      "Paraguay",
      "Barbados",
      "Guatemala",
      "Croatia",
      "Venezuela (Bolivarian Republic of)",
      "Did not respond"
    ],
    templateReg = "Regionfilter",
    templateInd = "Industryfilter",
    templateITBU = "IT-Business filter",
    templateEmp = "Employee filter",
    templateRev = "Revenue filter",
    templateCon = "Country filter",
    templateProd = "Product filter",
    filterData3 = [];

  d3.csv("src/data/analyzer8.csv").then(function(data) {
    d3.csv("src/data/sorting1.csv").then(function(dataSort) {
      d3.csv("src/data/codebook1.csv").then(function(data2) {
        var filterData = data;
        var resultAryObj = [];

        dataSort.forEach(function(d) {
          d.id = +d.id;
        });

        calcul(901);

        var chart = d3.select("#chart");


        var widthHelper =
          parseInt(chart.style("width"));

        var margin = {
            top: 20,
            right: 45,
            bottom: 40,
            left: widthHelper > 450 ? 310 : 5
          },
          width = widthHelper - margin.left - margin.right,
          height = 700 - margin.top - margin.bottom,
          height2,
          barHeight = 30;

        var form = d3.format(".0%");

        var xScale = d3.scaleLinear().range([0, width]);

        var maxVal = d3.max(resultAryObj, function(d) {
          return d.answerVal;
        });

        xScale.domain([0, maxVal]);

        var answers = d3
          .set(
            resultAryObj.map(function(d) {
              return d.answerOpt;
            })
          )
          .values();

        var answersNum = answers.length;

        height2 = (answersNum + 2) * barHeight - margin.top - margin.bottom;

        height = height2 < 350 ? 350 : height2;

        var svg = d3
          .select("#chart")
          .append("svg")
          .attr("id", "analyID")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        resultAryObj.sort(function(a, b) {
          return b.answerVal - a.answerVal;
        });


        var bars = svg
          .selectAll("rect.bars")
          .data(resultAryObj)
          .enter()
          .append("rect")
          .attr("class", "bars")
          .attr("x", 0)
          .attr("y", function(d, i) {
            return barHeight * i;
          })
          .attr("width", function(d) {
            return xScale(d.answerVal);
          })
          .attr("height", barHeight / 2.5)
          .attr("fill", "#2f72b0");

        var answerLabels = svg
          .selectAll("text.Answerlabel")
          .data(resultAryObj)
          .enter()
          .append("text")
          .attr("class", "Answerlabel")
          .attr("x", widthHelper > 450 ? -12 : 0)
          .attr("y", function(d, i) {

            if (widthHelper > 450) {
              return barHeight * i + barHeight / 2.5 - 1;
            } else {
              return barHeight * i + barHeight / 2.5 - 16;
            }
          })
          .text(function(d, i) {
            return d.answerOpt;
          })
          .attr("fill", "rgb(102, 102, 102)")
          .style("text-anchor", widthHelper > 450 ? "end" : "start")
          .attr("font-size", widthHelper > 450 ? 14 : 10);

        svg
          .selectAll("text.valueLabel")
          .data(resultAryObj)
          .enter()
          .append("text")
          .attr("class", "valueLabel")
          .attr("x", function(d) {
            if (widthHelper > 450) {
              return xScale(d.answerVal) + 8;
            } else {
              return xScale(d.answerVal) + 4;
            }

          })
          .attr("y", function(d, i) {

            if (widthHelper > 450) {
              return barHeight * i + barHeight / 2.5 - 1;
            } else {
              return barHeight * i + barHeight / 2.5 - 3;
            }


          })
          .text(function(d, i) {
            return (d.answerVal >= 0.005) ? form(d.answerVal) : formUnder1(d.answerVal);
          })
          .attr("fill", "rgb(102, 102, 102)")
          .style("text-anchor", "start")
          .attr("font-size", widthHelper > 450 ? 14 : 10);

        helperIn = 1;

        function updateData(dataUpd) {

          sortID = $('select[name="question"] option:selected').attr("data-sort");
          valID = $('select[name="question"] option:selected').attr("value");


          if (sortID == 1) {

            dataUpd.sort(function(a, b) {
              return b.answerVal - a.answerVal;
            });

          } else if (sortID == 2) {
            var dataSortFil = dataSort.filter(function(d) {
              return d.id == valID;
            })

            var dataSortMap = dataSortFil.map(function(d, i) {
              return d.answer
            })

            dataUpd = dataUpd.sort(function(a, b) {
              return dataSortMap.indexOf(a.answerOpt) - dataSortMap.indexOf(b.answerOpt);
            });



          }



          var widthHelper = parseInt(chart.style("width"));
          var margin = {
              top: 20,
              right: 45,
              bottom: 40,
              left: widthHelper > 450 ? 310 : 5
            },
            width = widthHelper - margin.left - margin.right,
            height = 700 - margin.top - margin.bottom;

          maxVal = d3.max(dataUpd, function(d) {
            return d.answerVal;
          });

          xScale.domain([0, maxVal]);

          var answers = d3
            .set(
              dataUpd.map(function(d) {
                return d.answerOpt;
              })
            )
            .values();

          var answersNum = answers.length;

          height2 = (answersNum + 2) * barHeight - margin.top - margin.bottom;

          height = height2 < 350 ? 350 : height2;

          d3.select("#chart")
            .selectAll("svg")
            .transition()
            .duration(350)
            .attr("height", height + margin.top + margin.bottom);

          var answerLabelsUpdate = svg.selectAll("text.Answerlabel").data(dataUpd);

          answerLabelsUpdate
            .transition()
            .duration(350)
            .style("opacity", 0);

          answerLabelsUpdate.exit().remove();

          setTimeout(function() {
            answerLabelsUpdate
              .attr("y", function(d, i) {

                if (widthHelper > 450) {
                  return barHeight * i + barHeight / 2.5 - 1;
                } else {
                  return barHeight * i + barHeight / 2.5 - 16;
                }
              })
              .text(function(d, i) {
                return d.answerOpt;
              });
          }, 300);

          setTimeout(function() {
            answerLabelsUpdate
              .enter()
              .append("text")
              .attr("class", "Answerlabel")
              .attr("x", widthHelper > 450 ? -12 : 0)
              .attr("y", function(d, i) {

                if (widthHelper > 450) {
                  return barHeight * i + barHeight / 2.5 - 1;
                } else {
                  return barHeight * i + barHeight / 2.5 - 16;
                }
              })
              .text(function(d, i) {
                return d.answerOpt;
              })
              .attr("fill", "rgb(102, 102, 102)")
              .style("text-anchor", widthHelper > 450 ? "end" : "start")
              .attr("font-size", widthHelper > 450 ? 14 : 10)
              .style("opacity", 0)
              .transition()
              .duration(350)
              .style("opacity", 1);

            answerLabelsUpdate
              .transition()
              .duration(350)
              .style("opacity", 1);
          }, 350);

          var valueLabelsUpdate = svg.selectAll("text.valueLabel").data(dataUpd);

          valueLabelsUpdate
            .transition()
            .attr("y", function(d, i) {
              if (widthHelper > 450) {
                return barHeight * i + barHeight / 2.5 - 1;
              } else {
                return barHeight * i + barHeight / 2.5 - 3;
              }
            })
            .transition()
            .duration(700)
            .attr("x", function(d) {
              if (widthHelper > 450) {
                return xScale(d.answerVal) + 8;
              } else {
                return xScale(d.answerVal) + 4;
              }
            })
            .tween("text", function(d) {
              var node = this;
              var currentVal = this.textContent;
              var currentPer = currentVal.replace("%", "") / 100;
              var i = d3.interpolate(currentPer, d.answerVal);
              return function(t) {
                node.textContent = (i(t) >= 0.005) ? form(i(t)) : formUnder1(i(t));
              };
            });

          valueLabelsUpdate.exit().remove();

          valueLabelsUpdate
            .enter()
            .append("text")
            .attr("class", "valueLabel")
            .attr("x", function(d) {
              if (widthHelper > 450) {
                return xScale(0) + 8;
              } else {
                return xScale(0) + 4;
              }
            })
            .attr("y", function(d, i) {
              if (widthHelper > 450) {
                return barHeight * i + barHeight / 2.5 - 1;
              } else {
                return barHeight * i + barHeight / 2.5 - 3;
              }
            })
            .text(function(d, i) {
              return form(0);
            })
            .attr("fill", "rgb(102, 102, 102)")
            .style("text-anchor", "start")
            .attr("font-size", widthHelper > 450 ? 14 : 10)
            .transition()
            .duration(700)
            .attr("x", function(d) {
              if (widthHelper > 450) {
                return xScale(d.answerVal) + 8;
              } else {
                return xScale(d.answerVal) + 4;
              }
            })
            .tween("text", function(d) {
              var node = this;
              var currentVal = this.textContent;
              var currentPer = currentVal.replace("%", "") / 100;
              var i = d3.interpolate(currentPer, d.answerVal);
              return function(t) {
                node.textContent = (i(t) >= 0.005) ? form(i(t)) : formUnder1(i(t));
              };
            });

          var barsUpdate = svg.selectAll("rect.bars").data(dataUpd);

          barsUpdate
            .transition()
            .attr("y", function(d, i) {
              return barHeight * i;
            })
            .transition()
            .duration(700)
            .attr("width", function(d) {
              return xScale(d.answerVal);
            });

          barsUpdate.exit().remove();

          barsUpdate
            .enter()
            .append("rect")
            .attr("class", "bars")
            .attr("x", 0)
            .attr("y", function(d, i) {
              return barHeight * i;
            })
            .attr("width", 0)
            .attr("height", barHeight / 2.5)
            .attr("fill", "#2f72b0")
            .transition()
            .duration(700)
            .attr("width", function(d) {
              return xScale(d.answerVal);
            });
        }

        function resizeAnalyz() {


          var widthHelper = parseInt(d3.select("#chart").style("width"));

          var margin = {
              top: 20,
              right: 45,
              bottom: 40,
              left: widthHelper > 450 ? 310 : 5
            },
            width = widthHelper - margin.left - margin.right;

          d3.select("#chart").select("svg")
            .attr("width", width + margin.left + margin.right)

          d3.select("#chart").select("svg").select("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


          xScale.range([0, width]);

          d3.select("#analyID").selectAll("rect.bars")
            .attr("width", function(d) {
              return xScale(d.answerVal);
            });


          d3.select("#analyID").selectAll(".Answerlabel")
            .attr("x", widthHelper > 450 ? -12 : 0)
            .attr("y", function(d, i) {

              if (widthHelper > 450) {
                return barHeight * i + barHeight / 2.5 - 1;
              } else {
                return barHeight * i + barHeight / 2.5 - 16;
              }
            })
            .style("text-anchor", widthHelper > 450 ? "end" : "start")
            .attr("font-size", widthHelper > 450 ? 14 : 10);

          d3.select("#analyID").selectAll(".valueLabel")
            .attr("x", function(d) {
              if (widthHelper > 450) {
                return xScale(d.answerVal) + 8;
              } else {
                return xScale(d.answerVal) + 4;
              }
            })
            .attr("y", function(d, i) {
              if (widthHelper > 450) {
                return barHeight * i + barHeight / 2.5 - 1;
              } else {
                return barHeight * i + barHeight / 2.5 - 3;
              }
            })
            .attr("font-size", widthHelper > 450 ? 14 : 10);

        }


        window.addEventListener('resize', function() {
          resizeAnalyz()
        });

        $("#question").change(function(e, i) {
          id = $(e.target).val();

          classID = $('select[name="question"] option:selected').attr("class");

          if (classID == "single") {
            calcul(id);
          } else if (classID == "multi") {
            calculMul(id);
          }

          var questionLong = data2.filter(function(d, i) {
            return d.qValue == id;
          });

          questionText = questionLong[0]["qlong"];

          d3.select("#questionlong").html(questionText);
        });

        function calcul(id) {
          var variables = d3.keys(filterData[0]);

          // var variablesSel = variables[id];

          if (checkStartQuest == 0) {
            var variablesSel = "Q20901";
          } else {
            var variablesSel = variables.filter(function(d, i) {
              var singleVar = confirmEnding(d, id);
              return singleVar;
            });
          }

          var results = count(filterData, function(item) {
            return item[variablesSel];
          });

          var arrA = [""];
          shorten(arrA, results);

          var resultsArr = d3.values(results);

          var resultssum = d3.sum(resultsArr);

          var resultsHelp;
          var resultsPer = {};
          for (var answer in results) {
            resultsHelp = results[answer] / resultssum;
            resultsPer[answer] = resultsHelp;
          }

          resultAryObj = [];

          for (var answer in resultsPer) {
            var obj2 = {};

            obj2.answerOpt = answer;
            obj2.answerVal = resultsPer[answer];
            resultAryObj.push(obj2);
          }



          d3.select("#ncount")
            .transition()
            .duration(500)
            .tween("text", function(d) {
              var node = this;
              var currentVal = this.textContent;
              var i = d3.interpolate(currentVal, resultssum);
              return function(t) {
                node.textContent = form1(i(t));
              };
            });

          if (helperIn == 1) {
            updateData(resultAryObj);
          }
          checkStartQuest =1;
          return resultAryObj;
        }

        function calculMul(id) {
          var resultsMulti;
          var resultsMultiAg = {};
          var nMulti;

          var keysHelper = d3.keys(data[0]);

          var multiVars = keysHelper.filter(function(d, i) {
            var multiVar = confirmEnding(d, id);
            return multiVar;
          });
          console.log(keysHelper)
          var multiVarsL = multiVars.length;
          var FilterDataMulti;
          // var resultisMulti2 = {};

          FilterDataMulti = filterData.map(function(d) {
            var ret = {};

            for (var i = 0; i < multiVarsL; i++) {
              var multiVarPlace = multiVars[i];
              var key = multiVarPlace;
              var value = d[multiVarPlace];
              ret[key] = value;
            }

            return ret;
          });

          for (var i = 0; i < multiVarsL; i++) {
            resultsMulti = count(FilterDataMulti, function(item) {
              return item[multiVars[i]];
            });

            var arrA = [""];
            shorten(arrA, resultsMulti);

            for (var prop in resultsMulti) {
              resultsMultiAg[prop] = resultsMulti[prop];
            }
          }

          var FilterDataMultiLeng = FilterDataMulti.length;
          var nMultiLoop;
          var nMultiCountAgg = 0;

          for (var i = 0; i < FilterDataMultiLeng; i++) {
            nMulti = FilterDataMulti[i];
            var nMultiCounter = 0;
            for (var key in nMulti) {
              if (nMulti[key] != "") {
                nMultiCounter = 1;
              }
            }
            nMultiCountAgg = nMultiCountAgg + nMultiCounter;
          }

          var resultsHelp;
          var resultsPer = {};

          for (var answer in resultsMultiAg) {
            resultsHelp = resultsMultiAg[answer] / nMultiCountAgg;
            resultsPer[answer] = resultsHelp;
          }

          var resultAryObj = [];

          for (var answer in resultsPer) {
            var obj2 = {};

            obj2.answerOpt = answer;
            obj2.answerVal = resultsPer[answer];
            resultAryObj.push(obj2);
          }

          d3.select("#ncount")
            .transition()
            .duration(500)
            .tween("text", function(d) {
              var node = this;
              var currentVal = this.textContent;
              var i = d3.interpolate(currentVal, nMultiCountAgg);
              return function(t) {
                node.textContent = form1(i(t));
              };
            });

          if (helperIn == 1) {
            updateData(resultAryObj);
          }
        }

        function filter(template) {

          if (selectedReg == null) {
            selectedRegLength = 0;
          } else {
            selectedRegLength = selectedReg.length;
          }

          for (var i = 0; i < selectedRegLength; i++) {
            var filterData2 = data.filter(function(d) {
              return d[templateReg] == selectedReg[i];
            });
            filterData3 = filterData3.concat(filterData2);
          }

          if (selectedITBU == null) {
            selectedITBULength = 0;
          } else {
            selectedITBULength = selectedITBU.length;
          }

          for (var i = 0; i < selectedITBULength; i++) {
            var filterData4 = filterData3.filter(function(d) {
              return d[templateITBU] == selectedITBU[i];
            });

            filterData5 = filterData5.concat(filterData4);
          }

          if (selectedEmp == null) {
            selectedEmpLength = 0;
          } else {
            selectedEmpLength = selectedEmp.length;
          }

          for (var i = 0; i < selectedEmpLength; i++) {
            var filterData6 = filterData5.filter(function(d) {
              return d[templateEmp] == selectedEmp[i];
            });

            filterData7 = filterData7.concat(filterData6);
          }



          if (selectedCon == null) {
            selectedConLength = 0;

          } else {
            selectedConLength = selectedCon.length;

          }

          for (var i = 0; i < selectedConLength; i++) {
            var filterData10 = filterData7.filter(function(d) {
              return d[templateCon] == selectedCon[i];
            });

            filterData11 = filterData11.concat(filterData10);
          }


          if (selectedProd == null) {
            selectedProdLength = 0;

          } else {
            selectedProdLength = selectedProd.length;

          }

          for (var i = 0; i < selectedProdLength; i++) {
            var filterData12 = filterData11.filter(function(d) {


              return d[templateProd] == selectedProd[i];
            });


            filterData13 = filterData13.concat(filterData12);
          }


          if (selectedInd == null) {
            selectedIndLength = 0;
          } else {
            selectedIndLength = selectedInd.length;
          }

          for (var i = 0; i < selectedIndLength; i++) {
            var filterData2 = filterData13.filter(function(d) {
              return d[templateInd] == selectedInd[i];
            });
            filterData = filterData.concat(filterData2);
          }


          return filterData;
        }

        $("#region").change(function(e) {
          selectedReg = $(e.target).val();

          filterData = [];
          filterData3 = [];
          filterData5 = [];
          filterData7 = [];
          filterData9 = [];
          filterData11 = [];
          filterData13 = [];
          filter();

          if (classID == "single") {
            calcul(id);
          } else if (classID == "multi") {
            calculMul(id);
          }
        });

        $("#employee").change(function(e) {
          selectedEmp = $(e.target).val();

          filterData = [];
          filterData3 = [];
          filterData5 = [];
          filterData7 = [];
          filterData9 = [];
          filterData11 = [];
          filterData13 = [];
          filter();

          if (classID == "single") {
            calcul(id);
          } else if (classID == "multi") {
            calculMul(id);
          }
        });

        $("#industry").change(function(e) {
          selectedInd = $(e.target).val();

          filterData = [];
          filterData3 = [];
          filterData5 = [];
          filterData7 = [];
          filterData9 = [];
          filterData11 = [];
          filterData13 = [];
          filter();
          if (classID == "single") {
            calcul(id);
          } else if (classID == "multi") {
            calculMul(id);
          }
        });

        $("#itbus").change(function(e) {
          selectedITBU = $(e.target).val();

          filterData = [];
          filterData3 = [];
          filterData5 = [];
          filterData7 = [];
          filterData9 = [];
          filterData11 = [];
          filterData13 = [];
          filter();
          if (classID == "single") {
            calcul(id);
          } else if (classID == "multi") {
            calculMul(id);
          }
        });



        $("#country").change(function(e) {
          selectedCon = $(e.target).val();

          filterData = [];
          filterData3 = [];
          filterData5 = [];
          filterData7 = [];
          filterData9 = [];
          filterData11 = [];
          filterData13 = [];
          filter();
          if (classID == "single") {
            calcul(id);
          } else if (classID == "multi") {
            calculMul(id);
          }
        });

        $("#products").change(function(e) {
          selectedProd = $(e.target).val();

          filterData = [];
          filterData3 = [];
          filterData5 = [];
          filterData7 = [];
          filterData9 = [];
          filterData11 = [];
          filterData13 = [];
          filter();
          if (classID == "single") {
            calcul(id);
          } else if (classID == "multi") {
            calculMul(id);
          }
        });

      });
    });
  });

  function confirmEnding(string, target) {
    if (string.substr(-target.length) === target) {
      return string;
    }
  }

  function count(ary, classifier) {
    classifier = classifier || String;
    return ary.reduce(function(counter, item) {
      var p = classifier(item);
      counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
      return counter;
    }, {});
  }

  function shorten(arr, obj) {
    arr.forEach(function(key) {
      delete obj[key];
    });
    return obj;
  }


}
