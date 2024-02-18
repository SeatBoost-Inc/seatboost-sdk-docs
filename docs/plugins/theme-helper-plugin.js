import { initThemeHelper, createThemeHelperCarousel, getAttributesMap, 
  getThemeString, getAllThemeAttributes, isAttributeUsed} from './theme-helper/theme-helper.js';

{
  function debugOnClick(event) {
    resetAttributeList();

    const attributesList = document.getElementById('theme-helper-attributes-list');
    const elementName = document.getElementById('theme-helper-element-name');

    elementName.innerHTML = 'DEBUGGING ATTRIBUTES';

    const allThemeAttributes = getAllThemeAttributes();

    let used = 0;
    let notUsed = 0;

    for (const attribute of allThemeAttributes) {
      const isUsed = isAttributeUsed(attribute);
      if(!isUsed){
        var li = document.createElement('li');
        li.innerHTML =  '<small style="color:red"><b>' + attribute + '</b></small>';
        attributesList.appendChild(li);
        notUsed++;
      } else {
        used++;
      }
    }

    var li = document.createElement('li');
    li.innerHTML =  "<b>" + used + " used," + notUsed + " not used</b>";
    attributesList.appendChild(li);

    attributesList.insertBefore(li, attributesList.firstChild);
  }

  function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

  function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }

    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }

    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
  }

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

    if(event.detail.attribute in attributesMap){
      for (const [key, value] of Object.entries(attributesMap[event.detail.attribute])) {
        var li = document.createElement('li');
        var liHtml = "<small><b>" + key + "</b>: " + value + "</small>";

        let themeValue = getThemeString(key);
        if(themeValue != null){
          var bgColor = '';
          var txtColor = '';
          var text = '';

          if(themeValue.startsWith('#')){
            bgColor = themeValue;
            txtColor = invertColor(themeValue);
            text = themeValue.toUpperCase();
          } else {
            bgColor = 'white';
            txtColor = 'black';
            text = themeValue;
          }

          let style = "border:1px solid black;" + 
            "padding: 2px;" +
            "background-color:" +  bgColor + ";" + 
            "color:" + txtColor + ";"

          liHtml = liHtml + "<div style='" + style + "'>" + text + "</div>";
        }

        li.innerHTML = liHtml;
        attributesList.appendChild(li);
      }
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
        // '<input type="button" id="theme-helper-debug" value="Debug">' +
        '<div id="theme-helper">' + 
            '<div id="theme-helper-carousel">' + 
            '</div>' +
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

      //const debugButton = document.getElementById('theme-helper-debug');
      //debugButton.addEventListener("click", debugOnClick, false);
    });
  }

  // Add plugin to docsify's plugin array
  window.$docsify = window.$docsify || {};
  $docsify.plugins = [...($docsify.plugins || []), themeHelperPlugin];
}