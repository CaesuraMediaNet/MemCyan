// Cyan Dot Game : 
// 1. Press Start game button
// 2. An icon appears briefly
// 3. Click on the icon within the time, icon goes to a Cyan Dot.
// 4. Another icon appears, ditto.
// 5. If that icon has already been shown, click on that Cyan Dot by memory
// 6. If correct, another Cyan Dot
// 7. If not, both go back to jigsaw, your Cyan Dot is removed.
//
// React.js and Next.js
// cyandotgame.com (TBD)
//
// Copyright (c) 2024 Caesura Media Limited

// Next.js
//
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/memtyles.module.css';
import Layout, { siteTitle } from '../components/layout';

// React.js
//
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

// External React Libraries.
//
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import BsCard from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faUserSecret,
   faQuestion,
   faEnvelope,
   faRocket,
   faHippo,
   faUmbrella,
   faGift,
   faLemon,
   faBrush,
   faMagicWandSparkles,
   faBell,
   faBarcode,
   faKey,
   faPaintRoller,
   faBicycle,
   faFeather,
   faBinoculars,
   faShirt,
   faCarSide,
   faMountainSun,
   faHourglassStart,
   faStore,
   faMoon,
   faHotel,
   faWrench,
   faTrophy,
   faMotorcycle,
   faRadio,
   faDragon,
   faScroll,
   faPuzzlePiece,
   faCircle,
} from '@fortawesome/free-solid-svg-icons'

// Local Components.
//
import Card from '../components/Card';
import GameClock from '../components/scores';
import WonModal from '../components/WonModal';
import MtRow from '../components/MtRow';
import CardTable from '../components/CardTable';
import Instructions from '../components/Instructions';
import {initBoard} from '../components/boards';
import PrivacyPolicy from '../components/PrivacyPolicy';

// Local functions.
//
import shuffleCards from '../functions/shuffleCards';
import flipCard from '../functions/flipCard';
import {addScore, getScores, clearScores} from '../functions/scores';

// Clues : The GameClock sets the timer and when told to stop (in handleTyleClick after calcs have been
// done to see if game is complete) then calls timeGameTook (via it's gameTime prop). timeGameTook
// sets this App gameTime (via setGameTime) state for display and storing in a cookie. Scores (in a cookie)
// and shuffling the pack occur initially in the useEffect hook.
// More clues TBD.

export default function Game () {

   const [board, setBoard]                         = useState (initBoard);
   const [wonPlay, setWonPlay]                     = useState (false);
   const [wonAllPlay, setWonAllPlay]               = useState (false);
   const [numCards, setNumCards]                   = useState (12);
   const [numClicks, setNumClicks]                 = useState (0);
   const [gameTime,setGameTime]                    = useState(0);
   const [timerAction,setTimerAction]              = useState("stop");
   const [scores,setScores]                        = useState ([]);
   const [showPrivacyLink, setShowPrivacyLink]     = useState (false);
   const [gameStarted, setGameStarted]             = useState (false);
   const [gameIntervalId, setGameIntervalId]       = useState (0);

   const numCardsRef                               = useRef();
   const instructionsRef                           = useRef();
   const boardRef                                  = useRef(board);

   // When all loaded up, then shuffle the cards to avoid a hydration error.
   // useState (shuffleCards(initBoard.slice()) gave hydration errors.
   // Slice to be safe - copies the array.
   // Do this when numCards changes too.
   //
   useEffect(() => {
      let shuffledBoard = shuffleCards(initBoard.slice(), numCards);
      setBoard        (shuffledBoard);
      boardRef.current  = shuffledBoard;
      let currentScores = getScores();
      setScores ((scores) => currentScores);
   }, [numCards])


   function clearBoard () {
      let shuffledCards = shuffleCards(initBoard.slice(), numCards);
      setBoard(shuffledCards);
      boardRef.current  = shuffledCards;
      setWonPlay(false);
      setWonAllPlay(false);
      setNumClicks(0);
      setTimerAction ((timerAction) => 'reset');
   }
   function chooseRandomTyle () {
      let thisBoard = JSON.parse(JSON.stringify(boardRef.current));

      // Get non-won tyles to choose a random index from.
      //
      let nonWonArr = [];
      thisBoard.forEach((thisCard, index) => {
         if (!thisCard.won) {
            nonWonArr.push(index);
         }
      });
      let cardNum = nonWonArr[Math.floor(Math.random() * nonWonArr.length)];

      // Clear all flipped cards/tyles and set the random one to be flipped.
      //
      thisBoard.forEach((thisCard, index) => {
         thisBoard[index].flipped = false;
         if (index === cardNum || thisCard.won) thisBoard[index].flipped = true;
      });
      boardRef.current = thisBoard;
      setBoard((b) => thisBoard);
   }
   function startStopGame () {
      if (gameStarted) {
         clearInterval (gameIntervalId);
         setGameStarted (false);
         setTimerAction ((timerAction) => 'stop');
      } else {
         clearBoard ();
         setGameIntervalId (setInterval(chooseRandomTyle, 1000));
         setGameStarted (true);
         setTimerAction ((timerAction) => 'restart');
      }
   }
   function ClearButton () {
      return (
         <button
            className={styles.button}
            onClick={clearBoard}
         >
            Clear Board
         </button>
      );
   }
   function StartStopButton () {
      return (
         <button
            className={styles.button}
            onClick={startStopGame}
         >
            {gameStarted ? 'Stop Game' : 'Start Game'}
         </button>
      );
   }
   function changeNumCards () {
      setNumCards  (numCardsRef.current.value);
      clearBoard ();
   }
   function SelectNumCards () {
      return (
         <Form>
            <Form.Label>Select Number of Tyles</Form.Label>
            <Form.Select
               ref={numCardsRef}
               onChange={() => changeNumCards ()}
               aria-label="Select number of Tyles"
               value={numCardsRef?.current?.value || "12"}
            >
               <option value="4">4</option>
               <option value="12">12</option>
               <option value="16">16</option>
               <option value="20">20</option>
               <option value="36">36</option>
               <option value="42">42</option>
               <option value="56">56</option>
            </Form.Select>
         </Form>
      );
   }
   function clearScoresScreen () {
      clearScores ();
      setScores (scores => []);
   }
   // When a game is won this is called.
   //
   function timeGameTook ({timeS}) {
      setGameTime ((gameTime) => timeS);
      let thisGame = {
         numCards  : numCards,
         numClicks : numClicks,
         gameTime  : timeS,
      }
      let allScores = addScore (thisGame);
      setScores (allScores);
   }
   function Progress () {
      if (wonAllPlay) {
         return (
            <p>You did {numCards} Tyles in {numClicks} goes and {gameTime} seconds</p>
         );
      } else {
         return (
            <p>Goes : {numClicks}</p>
         );
      }
   }
   function ScoresTable () {
      return (
         <>
            <ul className={styles.scoresTableUL}>
               <h5>Past Scores</h5>
               {scores.map ((score, index) => 
                  <li key={index}>
                     Cards : {score.numCards} Clicks : {score.numClicks} Time : {score.gameTime}
                  </li>
               )}
               <button
                  className={styles.button}
                   onClick={clearScoresScreen}
               >
                  Clear Scores
               </button>
            </ul>
         </>
      );
   }
   // Flip the card, if possible and set some state.
   //
   function handleTyleClick (card) {
      setNumClicks((nc) => nc + 1);
      if (card.flipped) {
         let thisBoard               = JSON.parse(JSON.stringify(boardRef.current));
         thisBoard[card.id].icon     = faCircle;
         thisBoard[card.id].won      = true;
         thisBoard[card.id].colour   = 'cyan';
         thisBoard[card.id].cardName = 'faCircle';

         boardRef.current = thisBoard;
         setBoard((b) => thisBoard);

         // See if this click is the winning click.
         //
         let wonCount = 0;
         thisBoard.forEach((card, index) => {
            if (card.won) wonCount++;
         });
         if (wonCount === thisBoard.length) {
            setWonPlay    (true);
            setTimerAction ((timerAction) => "stop");
            setWonAllPlay (true);
            setGameStarted(false);
            startStopGame();
         }
      }
   }
   function scrollToInstructions () {
      instructionsRef.current.scrollIntoView({ behavior: 'smooth' });
   }
   return (
      <Layout> {/* A Next.js idea */}
         <Container fluid> {/* Bootstrap */}
            <BsCard className={styles.BsCardStyle}> {/* Bootstrap and CML */}
               <h1>Cyan Dot</h1>
               <h1
                  className={styles.navIconRight}
                  onClick={() => scrollToInstructions()}
                  title={"Instructions"}
               >
                  ?
               </h1>
               <Row>
                  <Col md={12}>
                     <StartStopButton />
                  </Col>
                  <Col md={12}>
                     <ClearButton />
                  </Col>
                  <Col md={12}>
                     {wonAllPlay && <h5>You&#39;ve won the Game!</h5>}
                  </Col>
               </Row>
               <div className={styles.desktopMaxWidth}>
                  <MtRow>
                     <CardTable
                        board={board}
                        Card={Card}
                        handleTyleClick={handleTyleClick}
                        numCards={numCards}
                     />
                  </MtRow>
                  <Row>
                     <Col xs={12} md={6} lg={6} xl={6}>
                        <Progress />
                     </Col>
                     <Col xs={12} md={6} lg={6} xl={6}>
                        <GameClock gameTime={timeGameTook} action={timerAction}  />
                     </Col>
                  </Row>
                  {gameStarted || <SelectNumCards />}
               </div>
            </BsCard>
         </Container>
         {scores.length > 0 && <ScoresTable />}
         {wonAllPlay && <WonModal numClicks={numClicks} gameTime={gameTime} numTyles={numCards} />}
         <h5 className={styles.instructionsH} ref={instructionsRef}>Instructions</h5>


         <Instructions />
         {/*showPrivacyLink && <PrivacyPolicy setShowPrivacyLink={setShowPrivacyLink} />*/}
         <Container fluid> {/* Bootstrap */}
            <footer className={styles.footer}>
               <Row>
                  <Col style={{textAlign : 'left'}}>
                     Copyright &copy; Caesura Media Limited,  {new Date().getFullYear()}. All Rights Reserved.
                  </Col>
                  <Col>
                     <div className={styles.googlePlayIcon}>
                        <a target="_blank" href='https://play.google.com/store/apps/details?id=com.memtyles&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
                     </div>
                  </Col>
                  <Col>
                     <a
                        href="/privacy_policy/index.html"
                        title={"Privacy Policy"}
                        rel="nofolow"
                        target="_blank"
                        style={{float : 'right', color : "cyan"}}
                     >
                        <FontAwesomeIcon
                           className={styles.navIconPrivacy}
                           icon={faUserSecret}
                        />
                     </a>
                  </Col>
               </Row>
            </footer>
            <hr />
         </Container>
         <br />
         <iframe
            style={{border:"unset", height:"100vw", width:"95vw"}}
            src="https://caesuramedia.com/ads"
            loading="lazy"
            width="95%"
            height="100%"
            title="Adverts by me"
         ></iframe>
      </Layout>
   );
}
