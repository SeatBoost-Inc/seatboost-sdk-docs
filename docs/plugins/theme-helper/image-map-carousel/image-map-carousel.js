var _imageMapCarouselId = null;
var _screensData = null;
var _currentScreenIndex = 0;
export var _imageMapCarouselBaseUrl = '';

export function setImageMapCarouselBaseUrl(imageMapCarouselBaseUrl) {
  _imageMapCarouselBaseUrl = imageMapCarouselBaseUrl;
}

function resetChildren(element) {
  if(element != null ){
      while( element.firstChild != null ){
        element.removeChild( element.firstChild );
      }
  }
}

function resetHighlight(coords) {
  var coordsArray = coords.split(",");
  const hightlight = document.getElementById(_imageMapCarouselId + '-highlight');
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

  const div = document.getElementById(_imageMapCarouselId);
  let newEvent = new CustomEvent("image-map-carousel-select-area", {bubbles: true, detail: { attribute: attribute }});
  div.dispatchEvent(newEvent);

  return false;
}

function gotoScreen(screenIndex) {
  _currentScreenIndex = screenIndex;
  const screenData = _screensData[_currentScreenIndex];
  const uiMap = screenData.imageMap; 

  const img = document.getElementById(_imageMapCarouselId + '-img');
  img.setAttribute("src", screenData.imageUrl);

  const map = document.getElementById(_imageMapCarouselId + '-map');
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

  const div = document.getElementById(_imageMapCarouselId);
  let newEvent = new CustomEvent("image-map-carousel-change-screen", {bubbles: true, detail: { currentScreenIndex: _currentScreenIndex }});
  div.dispatchEvent(newEvent);
}

function previousScreen() {
  if( _currentScreenIndex > 0 ){
    gotoScreen(_currentScreenIndex - 1);
  }
}

function nextScreen() {
  if( _currentScreenIndex < _screensData.length - 1 ){
    gotoScreen(_currentScreenIndex + 1);
  }
}

export function createImageMapCarousel(imageMapCarouselId, screensData) {

  _imageMapCarouselId = imageMapCarouselId;
  _screensData = screensData;
  
  const div = document.getElementById(_imageMapCarouselId);
  div.innerHTML = 
      '<div class="container">' +
      '<img id="' + _imageMapCarouselId + '-previous" class="previous-arrow" src="' + _imageMapCarouselBaseUrl + '/images/previous.jpg">' +
      '<div id="' + _imageMapCarouselId + '-container" class="image-area">' +
      '<div id="' + _imageMapCarouselId + '-highlight" class="highlight"></div>' +
      '<img id="' + _imageMapCarouselId + '-img" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" usemap="#' + _imageMapCarouselId + '-map">' +
      '<map id="' + _imageMapCarouselId + '-map" name="' + _imageMapCarouselId + '-map" ></map>' +
      '</div>' +
      '<img id="' + _imageMapCarouselId + '-next" class="next-arrow" src="' + _imageMapCarouselBaseUrl + '/images/next.jpg">'+
      '</div>';

  const previous = document.getElementById(_imageMapCarouselId + "-previous");
  previous.addEventListener("click", previousScreen, false);

  const next = document.getElementById(_imageMapCarouselId + "-next");
  next.addEventListener("click", nextScreen, false);

  gotoScreen(0);
}