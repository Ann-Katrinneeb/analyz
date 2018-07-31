import {
  init
} from '../initfunction.js';
import {
  initialChart
} from '../initialchart.js'
import {
  updateChart
} from '../updatechart.js';
import {
  updateSelect
} from '../updateselect.js';

import {vendor, peerGroupInit} from '../index.js';

import { initAnaly } from '../chart.js';




let triggerHelp = 2, triggerHelp2 = 0;

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelectorAll('.tabContainer').length && document.querySelectorAll('.sectionsContainer').length) {
    var activeTab = document.querySelector('.tabContainer').querySelector('.tabs .tab:first-child');
    var activeSection = document.querySelector('.sectionsContainer').querySelector('.sections .section:first-child');
    activeTab.classList.add('active');
    activeSection.classList.add('active');
  }

  app.tabs.initialize();

}, false);

var app = {
  tabs: {
    initialize: function() {
      if (document.querySelectorAll('.tabContainer').length) {
        var container = document.querySelectorAll('.tabContainer');

        for (var i = 0, l = container.length; i < l; i++) {
          app.tabs.contain.call(null, container[i]);
          app.tabs.setIndicatorWidth.call(null, container[i]);

          var tabs = container[i].querySelectorAll('.tabs .tab');

          for (var ii = 0, ll = tabs.length; ii < ll; ii++) {
            tabs[ii].addEventListener('click', function() {
              app.tabs.setActiveTab.call(this);
            }, false);
          }
        }

        window.addEventListener('resize', function() {
          for (var i = 0, l = container.length; i < l; i++) {
            app.tabs.contain.call(null, container[i]);
            app.tabs.setIndicatorWidth.call(null, container[i]);
          }
        }, false);
      }
    },
    setIndicatorWidth: function(parent) {
      if (parent.querySelectorAll('.tabs div').length === 0) {
        parent.querySelector('.tabs').appendChild(document.createElement('div'));
        parent.querySelector('.tabs div').classList.add('indicator');
      }

      var indicator = parent.querySelector('.tabs .indicator');
      var containerRect = parent.querySelector('.tabs').getBoundingClientRect();
      var curTabRect = parent.querySelector('.tabs .tab.active').getBoundingClientRect();

      // left = left of active element minus left of parent container
      indicator.style.left = (curTabRect.left - containerRect.left) + 'px';
      // right = parent container width minus width of active element plus left of active element
      indicator.style.right = ((containerRect.left + containerRect.width) - (curTabRect.left + curTabRect.width)) + 'px';
    },
    setActiveTab: function() {
      var indicator = this.parentElement.querySelector('.indicator');
      var parent = this;
      var newTab = this;
      var newTabSelector = this.getAttribute('data-tab');
      var newSection = document.querySelector('.sectionsContainer .sections .section[data-section=' + newTabSelector + ']')
      var oldSection = document.querySelector('.sectionsContainer .sections .section.active');

      while (!parent.classList.contains('tabs')) {
        parent = parent.parentElement;
      }

      var oldTab = parent.querySelector('.tab.active');

      var parentRect = parent.getBoundingClientRect();
      var newTabRect = newTab.getBoundingClientRect();
      var indicatorRect = indicator.getBoundingClientRect();

      if (indicatorRect.left < newTabRect.left) {
        TweenMax.to(indicator, .2, {
          right: ((parentRect.left + parentRect.width) - (newTabRect.left + newTabRect.width)) + 'px',
          ease: Power2.easeOut
        });

        TweenMax.to(indicator, .2, {
          left: (newTabRect.left - parentRect.left) + 'px',
          ease: Power2.easeOut,
          delay: .1
        });
      } else {
        TweenMax.to(indicator, .2, {
          left: (newTabRect.left - parentRect.left) + 'px',
          ease: Power2.easeOut
        });

        TweenMax.to(indicator, .2, {
          right: ((parentRect.left + parentRect.width) - (newTabRect.left + newTabRect.width)) + 'px',
          ease: Power2.easeOut,
          delay: .1
        });
      }

      oldTab.classList.remove('active');
      oldSection.classList.remove('active');
      this.classList.add('active');
      newSection.classList.add('active');

      var triggerId = this.id;


      var triggerOff = this.getAttribute("data-trigger");

      if (triggerHelp == 0 & triggerId == "trigger" ) {

        d3.select("#buttonKPI1").selectAll("button").classed("active-button", false);
        d3.select("#buttonKPI1").select("button").classed("active-button", true)


        setTimeout(function(){

          initialChart(vendor)

        },600);
        init();
        updateSelect(peerGroupInit);

        var stepSelect = document.querySelector(".is-active");
        stepSelect.classList.remove("is-active");
        var stepSelectNew = document.querySelector(".step");
        stepSelectNew.classList.add('is-active');

        triggerHelp = 1;
        triggerHelp2 = 0;
      };

      if ( triggerId == "nonproduct" ) {

        setTimeout(function(){

          initAnaly()

        },100);

      };

      if ( triggerId !== "nonproduct" ) {

        document.getElementById("analyID").remove();

      };

      if (triggerOff == "triggeroff" & triggerHelp2 == 0) {
        document.getElementById("scrollsvg").remove();

        triggerHelp = 0;
        triggerHelp2 = 1;


      };


    },
    contain: function(container) {

    }
  }
}
