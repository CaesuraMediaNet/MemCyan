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
   {id : 0,   icon : faBagShopping,            cardName : "BagShopping",      flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 1,   icon : faSprayCan,               cardName : "SprayCan",         flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 2,   icon : faBuildingColumns,        cardName : "BuildingColumns",  flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 3,   icon : faBath,                   cardName : "Bath",             flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 4,   icon : faCakeCandles,            cardName : "CakeCandles",      flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 5,   icon : faBucket,                 cardName : "Bucket",           flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 6,   icon : faBong,                   cardName : "Bong",             flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 7,   icon : faCarrot,                 cardName : "Carrot",           flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 8,   icon : faCashRegister,           cardName : "CashRegister",     flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 9,   icon : faCat,                    cardName : "Cat",              flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 10,  icon : faChair,                  cardName : "Chair",            flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 11,  icon : faCableCar,               cardName : "CableCar",         flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 12,  icon : faCampground,             cardName : "Campground",       flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 13,  icon : faCandyCane,              cardName : "CandyCane",        flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 14,  icon : faGlassMartini,           cardName : "GlassMartini",     flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 15,  icon : faGraduationCap,          cardName : "GraduationCap",    flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 16,  icon : faHatWizard,              cardName : "HatWizard",        flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 17,  icon : faHorse,                  cardName : "Horse",            flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 18,  icon : faSnowman,                cardName : "Snowman",          flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 19,  icon : faSnowflake,              cardName : "Snowflake",        flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 20,  icon : faSocks,                  cardName : "Socks",            flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 21,  icon : faSpaghettiMonsterFlying, cardName : "SpaghettiMonster", flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 22,  icon : faSpa,                    cardName : "Spa",              flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 23,  icon : faStapler,                cardName : "Stapler",          flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 24,  icon : faSailboat,               cardName : "Sailboat",         flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 25,  icon : faRainbow,                cardName : "Rainbow",          flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 26,  icon : faPallet,                 cardName : "Pallet",           flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
   {id : 27,  icon : faHippo,                  cardName : "Hippo",            flipped : false, won : false, top : 0, left : 0, rotate : 0, singleWon : false},
];

// For the instructions, instead of using screenshots, use the real thing.
// Using slice() to make copies so they don't affect each other.
//
export const startBoard     = shuffleCards(initBoard.slice(), 12, true);
export const wonBoard       = startBoard.slice().map((card) => ({...card, won : true, colour : 'cyan'}));
export const oneFlipped     = startBoard.slice().map((card) => ({...card, flipped : card.id == 1 ? true : false}));
export const twoMatching    = startBoard.slice().map((card) => ({...card, flipped : card.icon === faBucket ? true : false}));
export const twoLost        = startBoard.slice().map((card) => ({...card, flipped : card.icon === faBucket ? true : false, colour :  card.icon === faBucket ? 'red' : 'green'}));
export const twoWon         = startBoard.slice().map((card) => ({...card, flipped : card.icon === faBucket ? true : false, colour :  card.icon === faBucket ? 'green' : 'red'}));
