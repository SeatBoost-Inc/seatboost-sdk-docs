import { setImageMapCarouselBaseUrl, createImageMapCarousel } from './image-map-carousel/image-map-carousel.js';
import { attributesMap } from './screens/attributes-map.js';
import { payment1Coords } from './screens/payment-1.js';
import { payment2Coords } from './screens/payment-2.js';
import { payment3Coords } from './screens/payment-3.js';
import { payment4Coords } from './screens/payment-4.js';
import { selectUpgrade1Coords } from './screens/select-upgrade-1.js';
import { selectUpgrade2Coords } from './screens/select-upgrade-2.js';

var _themeHelperBaseUrl = '';

function getScreensData() {
	return [{
          imageUrl: _themeHelperBaseUrl + '/screens/select-upgrade-1.jpg',
          imageMap: selectUpgrade1Coords
      },{
          imageUrl: _themeHelperBaseUrl + '/screens/select-upgrade-2.jpg',
          imageMap: selectUpgrade2Coords
      },{
          imageUrl: _themeHelperBaseUrl + '/screens/payment-1.jpg',
          imageMap: payment1Coords
      },{
          imageUrl: _themeHelperBaseUrl + '/screens/payment-2.jpg',
          imageMap: payment2Coords
      },{
          imageUrl: _themeHelperBaseUrl + '/screens/payment-3.jpg',
          imageMap: payment3Coords
      },{
          imageUrl: _themeHelperBaseUrl + '/screens/payment-4.jpg',
          imageMap: payment4Coords
      }];
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

export function getAttributesMap() {
	return attributesMap;
}
