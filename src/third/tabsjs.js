
import { initAnaly } from '../chart.js';
import { initKPIDash } from '../chart2.js';
import { initProdKPI } from '../chart3.js';
import { initProdComp } from '../chart4.js';
var triggerOnce = 0, triggerKPIDash=1, triggerProdComp=1, triggerProdKPI=1;



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

      if ( triggerId == "nonproduct" ) {
        triggerOnce = 0;
        setTimeout(function(){

          initAnaly()

        },100);

      };

      if ( triggerId !== "nonproduct" ) {
        if (triggerOnce == 0) {

          document.getElementById("analyID").remove();
          triggerOnce =1;
        }

      };

      if ( triggerId == "KPIDash2" ) {
        triggerKPIDash = 0;
        setTimeout(function(){

          initKPIDash()

        },100);

      };

      if ( triggerId !== "KPIDash2" ) {
        if (triggerKPIDash == 0) {

          document.getElementById("KPIDashID").remove();
          triggerKPIDash =1;
        }

      };


      if ( triggerId == "prodComp" ) {
        triggerProdComp = 0;
        setTimeout(function(){

          initProdComp()

        },100);

      };

      if ( triggerId !== "prodComp" ) {
        if (triggerProdComp == 0) {

          document.getElementById("proddiv").remove();
          triggerProdComp =1;
        }

      };

      if ( triggerId == "prodKPI" ) {
        triggerProdKPI = 0;

        setTimeout(function(){

          initProdKPI()

        },100);

      };

      if ( triggerId !== "prodKPI" ) {
        if (triggerProdKPI == 0) {

          var index, index2;
          document.getElementById("ProdKPI2").remove();

          var element = document.getElementById("Productfilter").getElementsByTagName("*");
          for (index = element.length - 1; index >= 0; index--) {
    element[index].parentNode.removeChild(element[index]);
  };

  var element2 = document.getElementById("pgfilter").getElementsByTagName("*");
  for (index2 = element2.length - 1; index2 >= 0; index2--) {
element2[index2].parentNode.removeChild(element2[index2]);
};
          triggerProdKPI =1;
        }

      };



    },
    contain: function(container) {

    }
  }
}
