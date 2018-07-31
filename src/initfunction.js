import Stickyfill from 'stickyfilljs';
import enterView from './third/enter-view.js';
import {
  updateChart
} from './updatechart.js';
import {
  KPIUpdate
} from './updatechart.js';
import {
  updateSelect
} from './updateselect.js';

import {vendor, peerGroupInit, KPIInit} from './index.js';

const container = d3.select('#scrolly-side');
const stepSel = container.selectAll('.step');
const imgSel = container.selectAll('.images');



export function init(indexBlock) {
  Stickyfill.add(d3.select('.sticky').node());

  enterView({
    selector: stepSel.nodes(),
    offset: 0.5,
    enter: el => {


        const index = +d3.select(el).attr('data-index');
        if (index == 3) {

          stepSel.classed('is-active', (d, i) => i === index);
          let kpi = $("#KPIfilter option:selected").attr("data-kpi");

          let peer = d3.select("#buttonKPI4").select(".active-button").attr("data-peer")

          KPIUpdate(kpi, peer, vendor);
        } else {


          updateChart(index, vendor);
        }
      // }
    },
    exit: el => {


        let index = +d3.select(el).attr('data-index');

        index = Math.max(0, index - 1);

        updateChart(index, vendor);

    }
  });
}




d3.selectAll("#buttonKPI1").selectAll("button")
  .on("click", function(d, i) {

    let peer = d3.select(this).attr("data-peer")
    let kpi = d3.select(this).attr("data-kpi")


    let buttonEl = d3.select(this);
    d3.select("#buttonKPI1").selectAll("button").classed("active-button", false);
    d3.select(this).classed("active-button", !buttonEl.classed("active-button"))

    KPIUpdate(kpi, peer, vendor);
  })

d3.selectAll("#buttonKPI2").selectAll("button")
  .on("click", function(d, i) {

    let peer = d3.select(this).attr("data-peer")
    let kpi = d3.select(this).attr("data-kpi")


    let buttonEl = d3.select(this);
    d3.select("#buttonKPI2").selectAll("button").classed("active-button", false);
    d3.select(this).classed("active-button", !buttonEl.classed("active-button"))

    KPIUpdate(kpi, peer, vendor);
  })

d3.selectAll("#buttonKPI3").selectAll("button")
  .on("click", function(d, i) {

    let peer = d3.select(this).attr("data-peer")
    let kpi = d3.select(this).attr("data-kpi")


    let buttonEl = d3.select(this);
    d3.select("#buttonKPI3").selectAll("button").classed("active-button", false);
    d3.select(this).classed("active-button", !buttonEl.classed("active-button"))

    KPIUpdate(kpi, peer, vendor);
  })


$('#KPIfilter').change(function(e, i) {
  let kpi = $("#KPIfilter option:selected").attr("data-kpi");

  let peer = d3.select("#buttonKPI4").select(".active-button").attr("data-peer")

  KPIUpdate(kpi, peer, vendor);
})

d3.selectAll("#buttonKPI4").selectAll("button")
  .on("click", function(d, i) {
    let peer = d3.select(this).attr("data-peer")
    updateSelect(peer, kpi, vendor)
    let kpi = $("#KPIfilter option:selected").attr("data-kpi");



    let buttonEl = d3.select(this);
    d3.select("#buttonKPI4").selectAll("button").classed("active-button", false);
    d3.select(this).classed("active-button", !buttonEl.classed("active-button"))

    KPIUpdate(kpi, peer, vendor);



  })



  window.addEventListener('resize', function() {
    KPIUpdate("Business benefits", "Americas-focused vendors", vendor);
  });
