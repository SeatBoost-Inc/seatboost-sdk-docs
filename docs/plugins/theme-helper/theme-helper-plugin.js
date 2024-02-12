import { initThemeHelper, createThemeHelperCarousel, getAttributesMap } from './theme-helper.js';

{
  function resetAttributeList() {
    const elementName = document.getElementById('theme-helper-element-name');

    elementName.innerHTML = '';

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

    const attributesMap = getAttributesMap()

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
      const siteBaseUrl = ( window.location.host == 'localhost:3000' ) ? '' : '/seatboost-sdk-docs';
      const themeHelperBaseUrl = siteBaseUrl + '/plugins/theme-helper';
      initThemeHelper(themeHelperBaseUrl);
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
      createThemeHelperCarousel(themeHelperSelectArea, themeHelperChangePage);
    });
  }

  // Add plugin to docsify's plugin array
  window.$docsify = window.$docsify || {};
  $docsify.plugins = [...($docsify.plugins || []), themeHelperPlugin];
}