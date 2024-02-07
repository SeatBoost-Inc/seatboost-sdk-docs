var _themeHelperId = null;
var _themeHelperData = null;
var _currentScreenIndex = 0;
export var _themeHelperBaseUrl = '';

export function setThemeHelperBaseUrl(themeHelperBaseUrl) {
  _themeHelperBaseUrl = themeHelperBaseUrl;
}

export function resetChildren(element) {
  while( element.firstChild ){
    element.removeChild( element.firstChild );
  }
}

function resetHighlight(coords) {
  var coordsArray = coords.split(",");
  const hightlight = document.getElementById(_themeHelperId + '-highlight');
  hightlight.style.left = (coordsArray[0]) + 'px';
  hightlight.style.top = (coordsArray[1]) + 'px';
  hightlight.style.width = (coordsArray[2] - coordsArray[0]) + 'px';
  hightlight.style.height = (coordsArray[3] - coordsArray[1]) + 'px';
}

function areaMouseEnter(event) {
  var area = event.target;
  var coords = area.getAttribute("coords");
  resetHighlight(coords);
}

function areaOnClick(event) {
  var area = event.target;
  var attribute = area.getAttribute("alt");

  event.preventDefault();

  const div = document.getElementById(_themeHelperId);
  let newEvent = new CustomEvent("theme-helper-select-area", {bubbles: true, detail: { attribute: attribute }});
  div.dispatchEvent(newEvent);

  return false;
}

function gotoScreen(screenIndex) {
  _currentScreenIndex = screenIndex;
  const screenData = _themeHelperData.screens[_currentScreenIndex];
  const uiMap = screenData.imageMap; 

  const img = document.getElementById(_themeHelperId + '-img');
  img.setAttribute("src", screenData.imageUrl);

  const map = document.getElementById(_themeHelperId + '-map');
  resetChildren(map);

  for (const [key, value] of Object.entries(uiMap)) {
    for (let coords of value) {
      var area = document.createElement('area');
      map.appendChild(area);
      area.setAttribute("coords", coords);
      area.setAttribute("shape", "rect");
      area.setAttribute("alt", key);
      area.setAttribute("href", "#");
      area.addEventListener("mouseover", areaMouseEnter, false);
      area.addEventListener("click", areaOnClick, false);
    }
  }  

  resetHighlight("0,0,0,0");

  const div = document.getElementById(_themeHelperId);
  let newEvent = new CustomEvent("theme-helper-change-screen", {bubbles: true, detail: { currentScreenIndex: _currentScreenIndex }});
  div.dispatchEvent(newEvent);
}

function previousScreen() {
  if( _currentScreenIndex > 0 ){
    gotoScreen(_currentScreenIndex - 1);
  }
}

function nextScreen() {
  if( _currentScreenIndex < _themeHelperData.length - 1 ){
    gotoScreen(_currentScreenIndex + 1);
  }
}

export function createThemeHelper(themeHelperId, themeHelperData) {

  _themeHelperId = themeHelperId;
  _themeHelperData = themeHelperData;
  
  const div = document.getElementById(_themeHelperId);
  div.innerHTML = 
      '<div class="container">' +
      '<img id="' + _themeHelperId + '-previous" src="' + _themeHelperBaseUrl + '/images/previous.jpg" class="arrow">' +
      '<div id="' + _themeHelperId + '-container" class="image-area">' +
      '<div id="' + _themeHelperId + '-highlight" class="highlight"></div>' +
      '<img id="' + _themeHelperId + '-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" usemap="#' + _themeHelperId + '-map">' +
      '<map id="' + _themeHelperId + '-map" name="' + _themeHelperId + '-map" ></map>' +
      '</div>' +
      '<img id="' + _themeHelperId + '-next" src="' + _themeHelperBaseUrl + '/images/next.jpg" class="arrow">'+
      '</div>';

  const previous = document.getElementById(_themeHelperId + "-previous");
  previous.addEventListener("click", previousScreen, false);

  const next = document.getElementById(_themeHelperId + "-next");
  next.addEventListener("click", nextScreen, false);

  gotoScreen(0);
}