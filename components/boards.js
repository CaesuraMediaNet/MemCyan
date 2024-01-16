// The main board used for the game and more demo/instruction boards.
//
import shuffleCards from '../functions/shuffleCards';
import {
   faBagShopping,
   faSprayCan,
   faBuildingColumns,
   faBath,
   faCakeCandles,
   faBucket,
   faBong,
   faCarrot,
   faCashRegister,
   faCat,
   faChair,
   faCableCar,
   faCampground,
   faCandyCane,
   faGlassMartini,
   faGraduationCap,
   faHatWizard,
   faHorse,
   faSnowman,
   faSnowflake,
   faSocks,
   faSpaghettiMonsterFlying,
   faSpa,
   faStapler,
   faSailboat,
   faRainbow,
   faPallet,
   faHippo,
} from '@fortawesome/free-solid-svg-icons'

export const initBoard = [
   {id : 0,   icon : faBagShopping,            cardName : "BagShopping",      flipped : false, won : false},
   {id : 1,   icon : faSprayCan,               cardName : "SprayCan",         flipped : false, won : false},
   {id : 2,   icon : faBuildingColumns,        cardName : "BuildingColumns",  flipped : false, won : false},
   {id : 3,   icon : faBath,                   cardName : "Bath",             flipped : false, won : false},
   {id : 4,   icon : faCakeCandles,            cardName : "CakeCandles",      flipped : false, won : false},
   {id : 5,   icon : faBucket,                 cardName : "Bucket",           flipped : false, won : false},
   {id : 6,   icon : faBong,                   cardName : "Bong",             flipped : false, won : false},
   {id : 7,   icon : faCarrot,                 cardName : "Carrot",           flipped : false, won : false},
   {id : 8,   icon : faCashRegister,           cardName : "CashRegister",     flipped : false, won : false},
   {id : 9,   icon : faCat,                    cardName : "Cat",              flipped : false, won : false},
   {id : 10,  icon : faChair,                  cardName : "Chair",            flipped : false, won : false},
   {id : 11,  icon : faCableCar,               cardName : "CableCar",         flipped : false, won : false},
   {id : 12,  icon : faCampground,             cardName : "Campground",       flipped : false, won : false},
   {id : 13,  icon : faCandyCane,              cardName : "CandyCane",        flipped : false, won : false},
   {id : 14,  icon : faGlassMartini,           cardName : "GlassMartini",     flipped : false, won : false},
   {id : 15,  icon : faGraduationCap,          cardName : "GraduationCap",    flipped : false, won : false},
   {id : 16,  icon : faHatWizard,              cardName : "HatWizard",        flipped : false, won : false},
   {id : 17,  icon : faHorse,                  cardName : "Horse",            flipped : false, won : false},
   {id : 18,  icon : faSnowman,                cardName : "Snowman",          flipped : false, won : false},
   {id : 19,  icon : faSnowflake,              cardName : "Snowflake",        flipped : false, won : false},
   {id : 20,  icon : faSocks,                  cardName : "Socks",            flipped : false, won : false},
   {id : 21,  icon : faSpaghettiMonsterFlying, cardName : "SpaghettiMonster", flipped : false, won : false},
   {id : 22,  icon : faSpa,                    cardName : "Spa",              flipped : false, won : false},
   {id : 23,  icon : faStapler,                cardName : "Stapler",          flipped : false, won : false},
   {id : 24,  icon : faSailboat,               cardName : "Sailboat",         flipped : false, won : false},
   {id : 25,  icon : faRainbow,                cardName : "Rainbow",          flipped : false, won : false},
   {id : 26,  icon : faPallet,                 cardName : "Pallet",           flipped : false, won : false},
   {id : 27,  icon : faHippo,                  cardName : "Hippo",            flipped : false, won : false},
];

// For the instructions, instead of using screenshots, use the real thing.
// Using slice() to make copies so they don't affect each other.
//
export const startBoard     = shuffleCards(initBoard.slice(), 12, true);
export const wonBoard       = startBoard.slice().map((card) => ({...card, flipped : true}));
export const twoMatching    = startBoard.slice().map((card) => ({...card, flipped : card.icon === faBucket ? true : false}));
export const twoLost        = startBoard.slice().map((card) => ({...card, flipped : card.icon === faBucket ? true : false, colour :  card.icon === faBucket ? 'red' : 'green'}));
export const twoWon         = startBoard.slice().map((card) => ({...card, flipped : card.icon === faBucket ? true : false, colour :  card.icon === faBucket ? 'green' : 'red'}));

// Two mismatching - there are two of each, so we only need to set one of each, faCandyCane and one faSnowman.
//
let seenfaCandyCane   = false;
let seenfaSnowman = false;
export const twoMisMatching = startBoard.slice().map((card, index) => {
   if (
      (seenfaCandyCane && card.icon === faCandyCane)
      ||
      (seenfaSnowman && card.icon === faSnowman)
   ) {
      return {...card};
   } else {
      let newCard = {
         ...card,
         flipped : (card.icon === faCandyCane && !seenfaCandyCane) || (card.icon === faSnowman && !seenfaSnowman) ? true : false
      }
      if (card.icon === faCandyCane  ) seenfaCandyCane  = true;
      if (card.icon === faSnowman) seenfaSnowman = true;
      return newCard;
   }
});

// Just one selected, the first rokcet.
//
let justOneSeen = false;
export const oneSelected    = startBoard.slice().map((card) => {
   if (justOneSeen) {
      return ({...card});
   } else {
      let newCard = {...card, flipped : card.icon === faCandyCane ? true : false};
      justOneSeen = card.icon === faCandyCane;
      return newCard;
   }
   
});

// Two won, two mismatched ones selected
//
let seenHippo    = false;
let seenfaHatWizard = false;
export const twoMatchedNext = twoMatching.slice().map((card) => {
   if (card.icon === faHippo || card.icon === faHatWizard) {
      let newCard = 
      {
            ...card,
            flipped : (!seenHippo && card.icon === faHippo) || (!seenfaHatWizard && card.icon === faHatWizard)
        };
      if (card.icon === faHippo) seenHippo       = true;
      if (card.icon === faHatWizard) seenfaHatWizard = true;
      return newCard;
   } else {
      return ({...card});
   }
});
