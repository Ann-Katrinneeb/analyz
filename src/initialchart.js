import scrollDataRaw from './data/kpis.csv';
import {vendor, peerGroupInit, KPIInit} from './index.js';


export function initialChart(vendor) {


  var chartScroll = d3.select("#chartScroll");
  var figure = d3.select("figure.sticky");

  var widthHelperScroll = parseInt(chartScroll.style("width"));

  var heightHelperScroll = parseInt(figure.style("height"));

  var marginScroll = {
      top: widthHelperScroll > 280 ? 20 : 15,
      right: 40,
      bottom: widthHelperScroll > 280 ? 60 : 40,
      left: widthHelperScroll > 280 ? 160 : 5
    },
    widthScroll = widthHelperScroll - marginScroll.left - marginScroll.right,
    heightScroll = heightHelperScroll > 500 ? (500 - marginScroll.top - marginScroll.bottom) : (heightHelperScroll - marginScroll.top - marginScroll.bottom);


  var formScroll = d3.format(".1f")

  var KPI = KPIInit;

  function keys(d) {
    return d.vendor;
  }

  var KPIselect = KPI;
  var peerSelect = peerGroupInit;

  var scrollData2 = scrollDataRaw.filter(function(element) {
    return element.Peer == peerSelect
  });

  var scrollData = scrollData2.filter(function(element) {
    return element.KPI == KPI
  });

  var xScaleScroll = d3.scaleLinear()
    .range([0, widthScroll]);

  var maxValScroll = 10;

  xScaleScroll.domain([0, maxValScroll]);


  var svgScroll = chartScroll.append("svg")
    .attr("width", widthScroll + marginScroll.left + marginScroll.right)
    .attr("height", heightScroll + marginScroll.top + marginScroll.bottom)
    .attr("id", "scrollsvg");

    var title = d3.select("#chartTitle")
                  .text("Business benefits – Top-ranked");


   var responses = d3.select("#peerGroupID")
                  .text("Peer group: Americas-focused vendors");


  var legend = svgScroll.append("text")
    .text("1 = Lowest value")
    .attr("x", (widthHelperScroll>416) ? marginScroll.left : marginScroll.left)
    .attr("y", (widthHelperScroll>416) ? heightScroll + marginScroll.top + marginScroll.bottom - 33 : heightScroll + marginScroll.top + marginScroll.bottom - 23)
    .attr("class", "legend")
    .attr("id", "legend1");


    var legend2 = svgScroll.append("text")
      .text("10 = Highest value")
      .attr("x", (widthHelperScroll>416) ? marginScroll.left+120 : marginScroll.left)
      .attr("y", (widthHelperScroll>416) ? heightScroll + marginScroll.top + marginScroll.bottom - 33 : heightScroll + marginScroll.top + marginScroll.bottom - 10)
      .attr("class", "legend")
      .attr("id", "legend2");


  var svgKPI = svgScroll.append("g")
    .attr("transform", "translate(" + marginScroll.left + "," + marginScroll.top + ")")
    .attr("id", "scrollG");

  var barGroup = svgKPI.append("g")
    .attr("class", "barScroll");

  scrollData.sort(function(a, b) {
    return b.value - a.value
  });

  var yScaleScroll = d3.scaleBand()
    .domain(scrollData.map(function(d) {
      return d.vendor
    }))
    .range([0, heightScroll])
    .paddingInner(0.7)
    .paddingOuter(0);

  var barsScroll = barGroup.selectAll("rect")
    .data(scrollData)
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor);
    })
    .attr("width", function(d) {
      return xScaleScroll(d.value);
    })
    .attr("height", yScaleScroll.bandwidth())
    .attr("fill", function(d) {
      if (d.vendor == "Peer Group Average") {
        return "#aaceef";
      } else if (d.vendor == vendor) {
              return "#ff9800";
            }
      else {
        return "#2f72b0";
      }
    })

    var valuesScroll = barGroup.selectAll("text")
      .data(scrollData)
      .enter().append("text")
      .attr("class", "values")
      .attr("x", function(d) {
        return xScaleScroll(d.value) + 6
      })
      .attr("y", function(d, i) {
        return yScaleScroll(d.vendor) +(yScaleScroll.bandwidth()/2)+1 ;
      })
      .attr("dy","0.25em")
      .text(function(d) {
        return formScroll(d.value)
      })
      .attr("fill", "rgb(102, 102, 102)")
    .attr("font-size", widthHelperScroll > 280 ? 14 : 10);

      var labelsScroll = svgKPI.append("g")
        .selectAll("text")
        .data(scrollData, keys)
        .enter().append("text")
        .attr("class", "labels")
    .attr("x", widthHelperScroll > 280 ? -12 : 0)
    .attr("y", function(d, i) {

      if (widthHelperScroll > 280) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
      } else {
        return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) - 9;
      }
    })
        .text(function(d) {
          return d.vendor
        })
        .attr("dy","0.25em")
        .attr("fill", "rgb(102, 102, 102)")
        .style("text-anchor", widthHelperScroll > 280 ? "end" : "start")
        .attr("font-size", widthHelperScroll > 280 ? 14 : 10);

}
