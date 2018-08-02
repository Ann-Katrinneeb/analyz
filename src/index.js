import 'whatwg-fetch';
import Promise from 'promise-polyfill';
// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}


import 'bootstrap';
import * as d3 from 'd3';
import './styles.scss';

import { initAnaly } from './chart.js';
require('./chart2.js');
require('./chart4.js');
require('./chart3.js');

  import ScrollOut from "scroll-out";



require('./third/TweenMax.min.js');
require('./third/tabsjs');

require('./third/bootstrap-select.min.js');

require('./third/bootstrap.css');
require('./styles.css');


(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);



$(document).ready(function() {

  $('[data-toggle="tooltip"]').tooltip()

  $(window).scroll(function () {
             if ($(this).scrollTop() > 50) {
                 $('#back-to-top').fadeIn();
             } else {
                 $('#back-to-top').fadeOut();
             }
         });

         $('#back-to-top').click(function () {
             $('#back-to-top').tooltip('hide');
             $('body,html').animate({
                 scrollTop: 0
             }, 800);
             return false;
         });



           ScrollOut({ cssProps: true, threshhold: 0.5});

           initAnaly();

});
