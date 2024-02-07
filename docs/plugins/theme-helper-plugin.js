import { createImageMapCarousel, 
  setImageMapCarouselBaseUrl, 
  resetChildren, 
  _imageMapCarouselBaseUrl } from '/plugins/theme-helper/image-map-carousel.js';
import { attributesMap } from '/plugins/theme-helper/screens/attributes-map.js';
import { selectUpgrade2Coords } from '/plugins/theme-helper/screens/select-upgrade-2.js';

{
  var screensData = [];

  function resetAttributeList() {
    const attributesList = document.getElementById('attributes-list');
    resetChildren(attributesList);
  }

  function themeHelperSelectArea(event) { 
    resetAttributeList();

    const attributesList = document.getElementById('attributes-list');

    var li = document.createElement('li');
    li.innerHTML = "<h3>" + event.detail.attribute + "</h3>";
    attributesList.appendChild(li);

    for (const [key, value] of Object.entries(attributesMap[event.detail.attribute])) {
      li = document.createElement('li');
      li.innerHTML = "<b><small>" + key + "</small></b><br>" + value + "<br><input>";
      attributesList.appendChild(li);
    }
  }

  function themeHelperChangePage(event) { 
    resetAttributeList()
  }

  function themeHelperPlugin(hook, vm) {

    // Invoked one time when docsify script is initialized
    hook.init(() => {
      setImageMapCarouselBaseUrl('/plugins/theme-helper');

      screensData = [
        {
          imageUrl: _imageMapCarouselBaseUrl + '/screens/select-upgrade-2.jpg',
          imageMap: selectUpgrade2Coords
        }
      ];

    });

    // Invoked on each page load after new markdown has been transformed to HTML.
    hook.afterEach(html => {
      var themeHelperBaseHtml =   
        '<table>' + 
          '<tr valign="top">' + 
            '<td width="50%">' + 
              '<div id="theme-helper"/>' +
            '</td>' +
            '<td width="50%">' +
              '<ul id="attributes-list"/>' +
            '</td>' +
          '</tr>' +
        '</table>';

      html = html.replace("<!-- themeHelperPlugin -->", themeHelperBaseHtml);
      return html;
    });

    // Invoked on each page load after new HTML has been appended to the DOM
    hook.doneEach(() => {
      createImageMapCarousel('theme-helper', screensData);
      const themeHelperDiv = document.getElementById('theme-helper');
      themeHelperDiv.addEventListener("image-map-carousel-select-area", themeHelperSelectArea);
      themeHelperDiv.addEventListener("image-map-carousel-change-screen", themeHelperChangePage);
    });
  }

  // Add plugin to docsify's plugin array
  window.$docsify = window.$docsify || {};
  $docsify.plugins = [...($docsify.plugins || []), themeHelperPlugin];
}