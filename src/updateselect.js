import scrollDataRaw from './data/kpis.csv';

export function updateSelect(peergroup, kpi, vendor) {


  var selectData = scrollDataRaw.filter(function(element) {
    return element.Peer == peergroup
  });

  var selectValues = d3.set(selectData.map(function (d) { return d.KPI; })).values();


  d3.select("#KPIfilter").selectAll("option").remove();
  d3.select("#KPIfilter").selectAll("option")
    .data(selectValues)
    .enter().append("option")
    .attr("data-kpi", function(d) {
      return d;
    })
    .text(function(d) {
      return d;
    })

$('#KPIfilter').selectpicker('refresh');

$('#KPIfilter').selectpicker('val', kpi);


}
