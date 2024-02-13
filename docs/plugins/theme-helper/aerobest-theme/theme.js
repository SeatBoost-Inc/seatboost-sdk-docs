import { attributesMap } from './attributes-map.js';
import { findAuctionCoords } from './find-auction.js';
import { payment1Coords } from './payment-1.js';
import { payment2Coords } from './payment-2.js';
import { payment3Coords } from './payment-3.js';
import { payment41Coords } from './payment-4.1.js';
import { payment42Coords } from './payment-4.2.js';
import { selectUpgrade1Coords } from './select-upgrade-1.js';
import { selectUpgrade2Coords } from './select-upgrade-2.js';
import { bidding1Coords } from './bidding-1.js';

export var theme = {
   "auctionDetails":{
      "linkColor":"#88b5ae",
      "progressBar":{
         "futureColor":"#d2d4da",
         "activeColor":"#88b5ae",
         "completedColor":"#88b5ae"
      },
      "disabledButton":{
         "borderColor":"#88b5ae",
         "backgroundColor":"#88b5ae",
         "textColor":"#ffffff"
      },
      "grid":{
         "pColor":"#3c2a22",
         "headingColor":"#3c2a22",
         "radioButton":{
            "selectedColor":"#88b5ae",
            "unselectedColor":"#88b5ae"
         },
         "selectedBackgroundColor":"#fafaf8",
         "separatorColor":"#e3e1de",
         "planeColor":"#1d4650",
         "backgroundColor":"#fafaf8",
         "h1Color":"#1d4650"
      },
      "sectionBarTwo":{
         "backgroundColor":"#666666",
         "textColor":"#ffffff"
      },
      "termsCancelButton":{
         "borderColor":"#b96035",
         "backgroundColor":"#b96035",
         "textColor":"#ffffff"
      },
      "sectionBar":{
         "backgroundColor":"#13505b",
         "textColor":"#ffffff"
      },
      "button":{
         "borderColor":"#88b5ae",
         "backgroundColor":"#88b5ae",
         "textColor":"#ffffff"
      },
      "textField":{
         "borderColor":"#979797",
         "backgroundColor":"#ffffff",
         "textColor":"#3c2a22"
      },
      "logo":"AeroBest-Horizontal-Teal3-LogoM.png",
      "backgroundImage":"AeroBest-FAFAF8-Background.jpg",
      "navigationBar":{
         "foregroundColor":"#000000",
         "backgroundColor":"#ffffff",
         "seatboostLogo":"seatboost-gray.png"
      }
   },
   "endAuction":{
      "bar":{
         "backgroundColor":"#13505b",
         "textColor":"#ffffff"
      },
      "logo":"AeroBest-Horizontal-Teal3-LogoM.png",
      "congratulationsTextColor":"#ffffff",
      "separatorColor":"#ffffff",
      "infoBox":{
         "borderColor":"#3c2a22",
         "secondaryTextColor":"#b96035",
         "backgroundColor":"#ffffff",
         "primaryTextColor":"#3c2a22"
      },
      "winnerBox":{
         "secondaryTextColor":"#ffffff",
         "backgroundColor":"#3c2a22",
         "primaryTextColor":"#fcd100"
      },
      "flightInfo":{
         "primaryTextColor":"#3c2a22",
         "secondaryTextColor":"#3c2a22"
      },
      "backgroundImage":"AeroBest-Teal3-Background.jpg",
      "navigationBar":{
         "foregroundColor":"#ffffff"
      }
   },
   "liveAuction":{
      "bar":{
         "backgroundColor":"#13505b",
         "textColor":"#ffffff"
      },
      "logo":"AeroBest-Horizontal-Teal3-LogoM.png",
      "clock":{
         "alert":{
            "secondaryTextColor":"#ffffff",
            "backgroundColor":"#b02e0c",
            "primaryTextColor":"#ffffff"
         },
         "warning":{
            "secondaryTextColor":"#ffffff",
            "backgroundColor":"#b96035",
            "primaryTextColor":"#ffffff"
         },
         "regular":{
            "secondaryTextColor":"#ffffff",
            "backgroundColor":"#3c2a22",
            "primaryTextColor":"#ffffff"
         }
      },
      "finalRound":{
         "aditionalBidTextField":{
            "borderColor":"#ffffff",
            "backgroundColor":"#ffffff",
            "textColor":"#323237"
         },
         "textColor":"#3c2a22"
      },
      "backgroundImageForBidding":"AeroBest-Teal3-Background.jpg",
      "paddle":{
         "bid":{
            "backgroundColor":"#fcd100",
            "textColor":"#ffffff"
         },
         "golden":{
            "backgroundColor":"#fcd100",
            "textColor":"#ffffff"
         },
         "left":{
            "backgroundColor":"#beb9b1",
            "textColor":"#ffffff"
         },
         "right":{
            "backgroundColor":"#beb9b1",
            "textColor":"#ffffff"
         }
      },
      "messageColor":"#3c2a22",
      "titleTextColor":"#ffffff",
      "helpButtonColor":"#88b5ae",
      "leaderboard":{
         "backgroundGradient":{
            "topColor":"#3c2a22",
            "bottomColor":"#000000"
         },
         "primaryTextColor":"#fcd100",
         "secondaryTextColor":"#ffffff"
      },
      "backgroundImage":"AeroBest-Teal3-Background.jpg"
   }
};

export function getAeroBestScreensData(aerobestThemeBaseUrl) {
  const screensBaseUrl = aerobestThemeBaseUrl + 'screens/';
   return [{
          imageUrl: screensBaseUrl + 'find-auction.jpg',
          imageMap: findAuctionCoords
      },{
          imageUrl: screensBaseUrl + 'select-upgrade-1.jpg',
          imageMap: selectUpgrade1Coords
      },{
          imageUrl: screensBaseUrl + 'select-upgrade-2.jpg',
          imageMap: selectUpgrade2Coords
      },{
          imageUrl: screensBaseUrl + 'payment-1.jpg',
          imageMap: payment1Coords
      },{
          imageUrl: screensBaseUrl + 'payment-2.jpg',
          imageMap: payment2Coords
      },{
          imageUrl: screensBaseUrl + 'payment-3.jpg',
          imageMap: payment3Coords
      },{
          imageUrl: screensBaseUrl + 'payment-4.1.jpg',
          imageMap: payment41Coords
      },{
          imageUrl: screensBaseUrl + 'payment-4.2.jpg',
          imageMap: payment42Coords
      },{
          imageUrl: screensBaseUrl + 'bidding-1.jpg',
          imageMap: bidding1Coords
      }];
}

export function getAeroBestAttributesMap() {
   return attributesMap;
}