import { setImageMapCarouselBaseUrl, createImageMapCarousel } from './image-map-carousel/image-map-carousel.js';
import { theme, getAeroBestScreensData, getAeroBestAttributesMap } from './aerobest-theme/theme.js';

var _themeHelperBaseUrl = '';

const isDict = dict => {
  return typeof dict === "object" && !Array.isArray(dict);
};

function _getThemeString(attributes, index, jsonAttributes) {
   const jsonAttribute = jsonAttributes[attributes[index]]; 
   if(isDict(jsonAttribute)){
      return _getThemeString(attributes, index + 1, jsonAttribute);
   }
   return jsonAttribute;
}

function getScreensData() {
  return getAeroBestScreensData(_themeHelperBaseUrl + '/aerobest-theme/');
}

export function getAttributesMap() {
  return getAeroBestAttributesMap();
}

export function initThemeHelper(themeHelperBaseUrl) {
	_themeHelperBaseUrl = themeHelperBaseUrl;
	setImageMapCarouselBaseUrl(themeHelperBaseUrl + '/image-map-carousel');
}

export function createThemeHelperCarousel(themeHelperSelectArea, themeHelperChangePage) {
	createImageMapCarousel('theme-helper-carousel', getScreensData());
	const themeHelperDiv = document.getElementById('theme-helper-carousel');
	themeHelperDiv.addEventListener("image-map-carousel-select-area", themeHelperSelectArea);
	themeHelperDiv.addEventListener("image-map-carousel-change-screen", themeHelperChangePage);
}

export function getThemeString(attributeName) {
  let attributes = attributeName.split(".");
  if(attributes.length > 0){
    return _getThemeString(attributes, 0, theme);
  }
}
