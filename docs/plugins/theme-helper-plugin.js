import { createThemeHelper, 
  setThemeHelperBaseUrl, 
  resetChildren, 
  _themeHelperBaseUrl } from '/plugins/theme-helper/theme-helper.js';
import { screen1UIMap } from '/plugins/theme-helper/screens/screen-1.js';
import { screen2UIMap } from '/plugins/theme-helper/screens/screen-2.js';

{
  var themeHelperData = [];

  function resetAttributeList() {
    const attributesList = document.getElementById('attributes-list');
    resetChildren(attributesList);
  }

  function themeHelperSelectArea(event) { 

    var screenData = themeHelperData[event.detail.currentScreenIndex];
    var uiMap = screenData.imageMap; 

    resetAttributeList();

    const attributesList = document.getElementById('attributes-list');

    for (const [key, value] of Object.entries(uiMap[event.detail.attribute].attributes)) {
      var li = document.createElement('li');
      li.innerHTML = "<b>" + key + "</b>: " + value + "<br><input>";
      attributesList.appendChild(li);
    }
  }

  function themeHelperChangePage(event) { 
    resetAttributeList()
  }

  function themeHelperPlugin(hook, vm) {

    // Invoked one time when docsify script is initialized
    hook.init(() => {
      setThemeHelperBaseUrl('/plugins/theme-helper');

      themeHelperData = [
        {
          imageUrl: _themeHelperBaseUrl + '/screens/screen-1.png',
          imageMap: screen1UIMap

        },{
          imageUrl: _themeHelperBaseUrl + '/screens/screen-2.png',
          imageMap: screen2UIMap
        }
      ];

    });

    // Invoked on each page load after new markdown has been transformed to HTML.
    hook.afterEach(html => {
      var themeHelperBaseHtml =   
        '<table>' + 
          '<tr valign="top">' + 
            '<td>' + 
              '<div id="theme-helper"/>' +
            '</td>' +
            '<td>' +
              '<ul id="attributes-list"/>' +
            '</td>' +
          '</tr>' +
        '</table>';

      html = html.replace("<!-- themeHelperPlugin -->", themeHelperBaseHtml);
      return html;
    });

    // Invoked on each page load after new HTML has been appended to the DOM
    hook.doneEach(() => {
      createThemeHelper('theme-helper', themeHelperData);
      const themeHelperDiv = document.getElementById('theme-helper');
      themeHelperDiv.addEventListener("theme-helper-select-area", themeHelperSelectArea);
      themeHelperDiv.addEventListener("theme-helper-change-screen", themeHelperChangePage);
    });
  }

  // Add plugin to docsify's plugin array
  window.$docsify = window.$docsify || {};
  $docsify.plugins = [...($docsify.plugins || []), themeHelperPlugin];
}