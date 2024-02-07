import { createThemeHelper, 
  setThemeHelperBaseUrl, 
  resetChildren, 
  _themeHelperBaseUrl } from '/plugins/theme-helper/theme-helper.js';
import { attributesMap } from '/plugins/theme-helper/screens/attributes-map.js';
import { selectUpgrade2Coords } from '/plugins/theme-helper/screens/select-upgrade-2.js';

{
  var themeHelperData = [];

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

    for (const [key, value] of Object.entries(themeHelperData.attributesMap[event.detail.attribute])) {
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
      setThemeHelperBaseUrl('/plugins/theme-helper');

      themeHelperData = {
        attributesMap: attributesMap,
        screens: [
          {
            imageUrl: _themeHelperBaseUrl + '/screens/select-upgrade-2.jpg',
            imageMap: selectUpgrade2Coords
          }
        ]
      };

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