import { createImageMapCarousel, 
  setImageMapCarouselBaseUrl, 
  _imageMapCarouselBaseUrl } from '/plugins/theme-helper/image-map-carousel/image-map-carousel.js';
import { attributesMap } from '/plugins/theme-helper/screens/attributes-map.js';
import { selectUpgrade1Coords } from '/plugins/theme-helper/screens/select-upgrade-1.js';
import { selectUpgrade2Coords } from '/plugins/theme-helper/screens/select-upgrade-2.js';

{
  var screensData = [];

  function resetAttributeList() {
    const attributesList = document.getElementById('theme-helper-attributes-list');

    if(attributesList != null ){
      while( attributesList.firstChild != null ){
        attributesList.removeChild(attributesList.firstChild);
      }
    }
  }

  function themeHelperSelectArea(event) { 
    resetAttributeList();

    const attributesList = document.getElementById('theme-helper-attributes-list');
    const elementName = document.getElementById('theme-helper-element-name');

    elementName.innerHTML = event.detail.attribute;

    for (const [key, value] of Object.entries(attributesMap[event.detail.attribute])) {
      var li = document.createElement('li');
      li.innerHTML = "<b><small>" + key + "</small></b><br><small>" + value + "</small><br><input>";
      attributesList.appendChild(li);
    }
  }

  function themeHelperChangePage(event) { 
    resetAttributeList()
  }

  function themeHelperPlugin(hook, vm) {

    // Invoked one time when docsify script is initialized
    hook.init(() => {
      setImageMapCarouselBaseUrl('/plugins/theme-helper/image-map-carousel');

      screensData = [{
          imageUrl: '/plugins/theme-helper' + '/screens/select-upgrade-1.jpg',
          imageMap: selectUpgrade1Coords
        },{
          imageUrl: '/plugins/theme-helper' + '/screens/select-upgrade-2.jpg',
          imageMap: selectUpgrade2Coords
      }];

    });

    // Invoked on each page load after new markdown has been transformed to HTML.
    hook.afterEach(html => {
      var themeHelperBaseHtml =   
        '<div id="theme-helper">' + 
            '<div id="theme-helper-carousel"></div>' +
            '<div id="theme-helper-attributes">' +
              '<h3 id="theme-helper-element-name"></h3>'+
              '<ul id="theme-helper-attributes-list"></ul>'+
            '</div>' +
        '</div>';

      html = html.replace("<!-- themeHelperPlugin -->", themeHelperBaseHtml);
      return html;
    });

    // Invoked on each page load after new HTML has been appended to the DOM
    hook.doneEach(() => {
      createImageMapCarousel('theme-helper-carousel', screensData);
      const themeHelperDiv = document.getElementById('theme-helper-carousel');
      themeHelperDiv.addEventListener("image-map-carousel-select-area", themeHelperSelectArea);
      themeHelperDiv.addEventListener("image-map-carousel-change-screen", themeHelperChangePage);
    });
  }

  // Add plugin to docsify's plugin array
  window.$docsify = window.$docsify || {};
  $docsify.plugins = [...($docsify.plugins || []), themeHelperPlugin];
}