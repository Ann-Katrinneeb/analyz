const container = d3.select('#scrolly-side');
const stepSel = container.selectAll('.step');
const imgSel = container.selectAll('.images');
import scrollDataRaw from './data/kpis.csv';
var formScroll = d3.format(".1f")


let KPIselect, updatePeer, scrollData2, scrollData;

export function updateChart(index, vendor) {


  stepSel.classed('is-active', (d, i) => i === index);

  var activeStep = d3.select(".is-active")
  if (index==3) {
    KPIUpdate(KPIselect, updatePeer, vendor);

  } else {

  let updatePeer = activeStep.select("button.active-button").attr('data-peer');
  let KPIselect = activeStep.select("button.active-button").attr('data-kpi');


    KPIUpdate(KPIselect, updatePeer, vendor);
  }
}

export function KPIUpdate(KPIselect, updatePeer, vendor) {

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


    d3.select("#chartScroll").select("svg")
      .attr("width", widthScroll + marginScroll.left + marginScroll.right)
      .attr("height", heightScroll + marginScroll.top + marginScroll.bottom);


        d3.select("#chartScroll").select("svg").select("g").attr("transform", "translate(" + marginScroll.left + "," + marginScroll.top + ")");


  var newPeerDesc = "Peer group: " + updatePeer;

  var oldPeerDesc = d3.select("#peerGroupID").text();

  if (newPeerDesc !== oldPeerDesc) {

    var peerDesc = d3.select("#peerGroupID")
      .transition()
                .delay(100)
      .duration(300)
      .style("opacity", 0)
      .transition()
      .duration(300)
      .text(newPeerDesc)
      .style("opacity", 1);
  }



  let scrollDataVend3 = scrollDataRaw.filter(function(element) {
    return element.Peer == updatePeer
  });

  let scrollDataVend2 = scrollDataVend3.filter(function(element) {
    return element.KPI == KPIselect
  });

  let scrollDataVend = scrollDataVend2.filter(function(element) {
    return element.vendor == vendor
  });

    let posVen = scrollDataVend[0].place;

  var newKPIDesc = KPIselect + " – " + posVen;

  var oldKPIDesc = d3.select("#chartTitle").text();

  if (newKPIDesc !== oldKPIDesc) {

    var peerDesc = d3.select("#chartTitle")
      .transition()
      .duration(300)
      .style("opacity", 0)
      .transition()
      .duration(300)
      .text(newKPIDesc)
      .style("opacity", 1);
  }


  d3.select("#legend1")
    .attr("x", (widthHelperScroll>416) ? marginScroll.left : marginScroll.left)
    .attr("y", (widthHelperScroll>416) ? heightScroll + marginScroll.top + marginScroll.bottom - 33 : heightScroll + marginScroll.top + marginScroll.bottom - 23);


      d3.select("#legend2")
      .attr("x", (widthHelperScroll>416) ? marginScroll.left+120 : marginScroll.left)
      .attr("y", (widthHelperScroll>416) ? heightScroll + marginScroll.top + marginScroll.bottom - 33 : heightScroll + marginScroll.top + marginScroll.bottom - 10);



  var xScaleScroll = d3.scaleLinear()
    .range([0, widthScroll]);

  var maxValScroll = 10;

  xScaleScroll.domain([0, maxValScroll]);


  scrollData2 = scrollDataRaw.filter(function(element) {
    return element.Peer == updatePeer
  });

  scrollData = scrollData2.filter(function(element) {
    return element.KPI == KPIselect
  });

  scrollData.sort(function(a, b) {
    return b.value - a.value
  })



  var yScaleScroll = d3.scaleBand()
    .domain(scrollData.map(function(d) {
      return d.vendor
    }))
    .range([0, heightScroll])
    .paddingInner(0.7)
    .paddingOuter(0);

  var barsupdateKPI = d3.select("#scrollG").selectAll("rect")
    .data(scrollData);

  barsupdateKPI
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
    .transition()
    .duration(700)
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor);
    })
    .attr("width", function(d) {
      return xScaleScroll(d.value);
    })


  barsupdateKPI.enter()
    .append("rect")
    .attr("fill", function(d) {
      if (d.vendor == "Peer Group Average") {
        return "#aaceef";
      } else {
        return "#2f72b0";
      }
    })
    .attr("x", 0)
    .attr("opacity",0)
    .attr("width",function(d){
      return xScaleScroll(0)
    })
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor);
    })
    .attr("height", yScaleScroll.bandwidth())
    .transition()
    .duration(700)
    .attr("width", function(d) {
      return xScaleScroll(d.value);
    })
    .attr("opacity",1);


  barsupdateKPI.exit()
  .attr("opacity",1)
  .transition()
  .duration(350)
  .attr("width",function(d){
    return xScaleScroll(0)
  })
  .attr("opacity", 0)
    .remove();

  var valuesupdate = d3.select("#scrollG").selectAll("text.values")
    .data(scrollData);

  valuesupdate.transition()
    .duration(700)
    .attr("x", function(d) {
      return xScaleScroll(d.value) + 6
    })
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
    })
    .attr("font-size", widthHelperScroll > 280 ? 14 : 10)
    .tween("text", function(d) {
      var node = this;
      var currentVal = this.textContent;
      var i = d3.interpolate(currentVal, d.value);
      return function(t) {
        node.textContent = formScroll(i(t));
      };
    });


  valuesupdate.enter()
    .append("text")
    .attr("opacity", 0)
    .attr("class", "values")
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
    })
    .attr("dy","0.25em")
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "start")
    .attr("font-size", widthHelperScroll > 280 ? 14 : 10)
    .attr("x", function(d) {
      return xScaleScroll(0) + 6
    })
    .transition()
    .duration(700)
    .attr("x", function(d) {
      return xScaleScroll(d.value) + 6
    })
    .attr("opacity", 1)
    .tween("text", function(d) {
      var node = this;
      var currentVal = this.textContent;
      var i = d3.interpolate(currentVal, d.value);
      return function(t) {
        node.textContent = formScroll(i(t));
      };
    });


  valuesupdate.exit()
  .attr("opacity",1)
  .transition()
  .duration(350)
  .attr("x",function(d){
    return xScaleScroll(0)
  })
  .tween("text", function(d) {
    var node = this;
    var currentVal = this.textContent;
    var i = d3.interpolate(currentVal, 0);
    return function(t) {
      node.textContent = formScroll(i(t));
    };
  })
  .attr("opacity", 0)
  .remove();

  var vendorlabelsupdate = d3.select("#scrollG").selectAll("text.labels")
    .data(scrollData);

  vendorlabelsupdate.transition()
    .duration(700)
    .attr("y", function(d, i) {

      if (widthHelperScroll > 280) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
      } else {
        return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) - 9;
      }
    })
    .style("text-anchor", widthHelperScroll > 280 ? "end" : "start")
    .attr("font-size", widthHelperScroll > 280 ? 14 : 10)
        .attr("x", widthHelperScroll > 280 ? -12 : 0)
    .text(function(d) {
      return d.vendor
    });



  vendorlabelsupdate.enter()
    .append("text")
    .attr("class", "labels")
    .attr("x", widthHelperScroll > 280 ? -12 : 0)
    .attr("dy","0.25em")
    .attr("y", function(d, i) {
      if (widthHelperScroll > 280) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
      } else {
        return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) - 10;
      }
    })
    .text(function(d) {
      return d.vendor
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", widthHelperScroll > 280 ? "end" : "start")
    .attr("font-size", widthHelperScroll > 280 ? 14 : 10)
    .attr("opacity", 0)
    .transition()
    .duration(700)
    .attr("opacity", 1);

  vendorlabelsupdate.exit()
  .attr("opacity",1)
  .transition()
  .duration(350)
  .attr("opacity", 0).remove();


}
