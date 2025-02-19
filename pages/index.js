// # MemCyan Game
// 1. Press Start game button
// 2. An icon appears briefly
// 3. Click on the icon within the time, icon shows in cyan
// 4. Another icon appears, ditto.
// 5. If that icon has already been shown, click on the first matching icon
// 6. If correct, both go to show in cyan
// 7. If not, both go red briefly, then back to the image icon to be shown again, ie you lose those icons.
// 8. Level Two - the icons don't show cyan when clicked upon, meaning you have to remember them!

// React.js and Next.js
// https://memcyan.com

// Copyright (c) 2024 Caesura Media Limited


// Next.js
//
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/memcyan.module.css';
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
   faCircleQuestion,
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
import useWindowSize  from '../functions/useWindowSize';

// Clues : The GameClock sets the timer and when told to stop (in handleTyleClick after calcs have been
// done to see if game is complete) then calls timeGameTook (via it's gameTime prop). timeGameTook
// sets this App gameTime (via setGameTime) state for display and storing in a cookie. Scores (in a cookie)
// and shuffling the pack occur initially in the useEffect hook.
// More clues TBD.

export default function Game () {

   const [board, setBoard]                         = useState (initBoard);
   const [gameLevel, setGameLevel]                 = useState (1);
   const [copyBoard, setCopyBoard]                 = useState (initBoard);
   const [wonAllPlay, setWonAllPlay]               = useState (false);
   const [numCards, setNumCards]                   = useState (12);
   const [numClicks, setNumClicks]                 = useState (0);
   const [lastCardNum, setLastCardNum]             = useState (0);
   const [gameTime,setGameTime]                    = useState (0);
   const [numWon, setNumWon]                       = useState (0);
   const [numLost, setNumLost]                     = useState (0);
   const [timerAction,setTimerAction]              = useState ("");
   const [scores,setScores]                        = useState ([]);
   const [showPrivacyLink, setShowPrivacyLink]     = useState (false);
   const [gameStarted, setGameStarted]             = useState (false);
   const [gamePaused, setGamePaused]               = useState (false);
   const [gameIntervalId, setGameIntervalId]       = useState (0);
   const [lostBoth, setLostBoth]                   = useState (false)
   const [correctMatch, setCorrectMatch]           = useState (false)
   const [highlight,setHighlight]                  = useState ([]);
   const [showGooglePlay,setShowGooglePlay]        = useState (false);

   const numCardsRef                               = useRef ();
   const gameLevelRef                              = useRef ();
   const instructionsRef                           = useRef ();
   const boardRef                                  = useRef (board);
   const { width, height }                         = useWindowSize();

   // When all loaded up, then shuffle the cards to avoid a hydration error.
   // useState (shuffleCards(initBoard.slice()) gave hydration errors.
   // Slice to be safe - copies the array.
   // Do this when numCards changes too.
   //
   useEffect(() => {
      let shuffledBoard = shuffleCards(initBoard.slice(), numCards);
      setBoard        (shuffledBoard);
      setCopyBoard    (shuffledBoard);
      boardRef.current  = shuffledBoard;
      let currentScores = getScores();
      setScores ((scores) => currentScores);
   }, [numCards])


   function clearBoard () {
      let shuffledCards = shuffleCards(initBoard.slice(), numCards);
      setBoard    (shuffledCards);
      setCopyBoard(shuffledCards);
      boardRef.current  = shuffledCards;
      setWonAllPlay   (false);
      setLostBoth     (false);
      setCorrectMatch (false);
      setNumClicks(0);
      setTimerAction ((timerAction) => 'reset');
   }
   function chooseRandomTyle () {
      let thisBoard = JSON.parse(JSON.stringify(boardRef.current));

      // Get non-won tyles to choose a random index from.
      //
      let nonWonArr = [];
      thisBoard.forEach((thisCard, index) => {
         if (!thisCard.won && !thisCard.singleWon && lastCardNum !== index) {
            nonWonArr.push(index);
         }
      });
      let cardNum = nonWonArr[Math.floor(Math.random() * nonWonArr.length)];
      setLastCardNum ((num) => cardNum);

      // Clear all flipped cards/tyles and set the random one to be flipped.
      //
      thisBoard.forEach((thisCard, index) => {
         thisBoard[index].flipped = false;
         thisBoard[index].border  = false; // reset the  border so it only shows for Nms

         // Flip the random card and all other won ones.
         //
         if (index === cardNum || thisCard.won) thisBoard[index].flipped = true;
      });
      boardRef.current = thisBoard;
      setBoard((b) => thisBoard);
   }
   function unFlipAll () {
      let thisBoard = JSON.parse(JSON.stringify(boardRef.current));
      thisBoard.forEach((thisCard, index) => {
         thisBoard[index].flipped = false;
      });
      boardRef.current = thisBoard;
      setBoard((b) => thisBoard);
   }
   function pauseGame () {
      clearInterval (gameIntervalId);
      setTimerAction ((timerAction) => 'pause');
      setGamePaused (true);
   }
   function restartGame () {
      setLostBoth     (false);
      setCorrectMatch (false);
      unFlipAll ();
      setTimerAction ((timerAction) => 'start');
      chooseRandomTyle ();
      let id = setInterval(chooseRandomTyle, 1500);
      setGameIntervalId (id);
      setGamePaused  (false);
   }
   function startStopGame () {
      if (gamePaused) return;
      if (gameStarted) {
         clearInterval (gameIntervalId);
         setGameStarted (false);
         setTimerAction ((timerAction) => 'stop');
      } else {
         clearBoard ();
         chooseRandomTyle ();
         let id = setInterval(chooseRandomTyle, 1500);
         setGameIntervalId (id);
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
            {gameStarted || gamePaused ? 'Stop Game' : 'Start Game'}
         </button>
      );
   }
   function changeGameLevel () {
      setGameLevel (parseInt (gameLevelRef.current.value));
      clearBoard ();
   }
   function SelectGameLevel () {
      return (
         <Form>
            <Form.Label>Select Game Level</Form.Label>
            <Form.Select
               ref={gameLevelRef}
               onChange={() => changeGameLevel ()}
               aria-label="Select Game Level"
               value={gameLevelRef?.current?.value || "1"}
            >
               <option value="1">One</option>
               <option value="2">Two</option>
            </Form.Select>
         </Form>
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
   function calcOverallScore (numWon, numLost, numClicks, gameTime, numCards) {
      return (25 * numCards) - numLost - numClicks - gameTime;
   }
   // When a game is won this is called.
   //
   function timeGameTook ({timeS}) {
      if (!wonAllPlay) return;
      setGameTime ((gameTime) => timeS);
      let thisGame = {
         date         : new Date().toLocaleString(),
         overallScore : calcOverallScore (numWon, numLost, numClicks, timeS, numCards),
         numWon       : numWon,
         numLost      : numLost,
         numCards     : numCards,
         numClicks    : numClicks,
         gameTime     : timeS,
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
                     Date : {score.date};&nbsp;
                     SCORE : {score.overallScore};&nbsp;
                     Won : {score.numWon};&nbsp;
                     Lost : {score.numLost};&nbsp;
                     Tyles : {score.numCards};&nbsp;
                     Clicks : {score.numClicks};&nbsp;
                     Time : {score.gameTime}s
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
      if (!gameStarted) return;

      setNumClicks((nc) => nc + 1);
      let thisBoard               = JSON.parse(JSON.stringify(boardRef.current));

      // If a tyle matches one already won, lose both, but if clicked one
      // matches a won one then set clicked one won.
      //
      let loseBoth  = false;
      let winBoth   = false;
      let highlight = [];

      // First find the cardName for the one we are trying to match.
      // It will be the only one flipped and not won.
      // The clicked card, card.cardName, could be any card.
      //
      let thisCardName = "Not found";
      thisBoard.forEach((thisCard, index) => {
         if (thisCard.flipped && ! thisCard.won) thisCardName = thisCard.cardName;
         if (thisCard.id === card.id) thisBoard[card.id].border = true;
      });

      thisBoard.forEach((thisCard, index) => {

         // Level 1 : Card names match but is not the same card and both cards flipped - one by timer (thisCard), one by
         //           clicking on it (card).
         // Level 2 : Card names match but is not the same card and either card is singleWon.
         //
         if (
            gameLevel === 1 && (
               card.cardName   === thisCard.cardName
               && thisCardName === card.cardName
               && card.id      !== thisCard.id
               && card.flipped
               && thisCard.flipped
            ) || gameLevel === 2 && (
               card.cardName   === thisCard.cardName
               && thisCardName === card.cardName
               && card.id      !== thisCard.id
               && (thisCard.singleWon || card.singleWon)
            )
         ) {

            // Highlight red for lose both, green for win both.
            //
            highlight =  [index, card.id];

            if (gameLevel === 1) {

               // If clicked card matches a won card, then lose both.
               //
               if (thisCard.won) {
                  loseBoth = true;

               // If the clicked card (card) is won then win the matching card.
               //
               } else if (card.won) {
                  winBoth  = true;
               }

            } else if (gameLevel === 2) {

               // If clicked card matches a singleWon card, then lose both.
               //
               if (thisCard.singleWon) {
                  loseBoth = true;

               // If the clicked card (card) is singleWon then win the matching card.
               //
               } else if (card.singleWon) {
                  winBoth  = true;
               }
            }
         }
      });

      // On winning or losing show both icons in red or green for a couple of seconds
      // then set the icons to basic image or cyan.
      //
      if (loseBoth || winBoth) {
         pauseGame();

         // First show original icons in red (lose both) or green (win both).
         //
         thisBoard[highlight[0]].colour    = loseBoth ? 'red' : 'green';
         thisBoard[highlight[0]].won       = false;
         thisBoard[highlight[0]].singleWon = false;
         thisBoard[highlight[0]].border    = false;

         thisBoard[highlight[1]].colour    = loseBoth ? 'red' : 'green';
         thisBoard[highlight[1]].won       = false;
         thisBoard[highlight[1]].singleWon = false;
         thisBoard[highlight[1]].border    = false;

         // Level 2 : Flip both cards so we can see them in red or green.
         //
         if (gameLevel === 2) {
            thisBoard[highlight[0]].flipped = true;
            thisBoard[highlight[1]].flipped = true;
         }

         // Then sometime later show icons that match win or lose. And restart the game.
         //
         setTimeout(function () {
            if (winBoth) {
               thisBoard[highlight[0]].colour = 'cyan';
               thisBoard[highlight[0]].won    = true;
               thisBoard[highlight[1]].colour = 'cyan';
               thisBoard[highlight[1]].won    = true;
            } else {
               thisBoard[highlight[0]].colour = copyBoard[highlight[0]].colour;
               thisBoard[highlight[0]].won    = false;
               thisBoard[highlight[1]].colour = copyBoard[highlight[1]].colour;
               thisBoard[highlight[1]].won    = false;
            }
            // See if this click is the winning click.
            //
            let wonCount = 0;
            thisBoard.forEach((thisCard, index) => {
               if (thisCard.won) wonCount++;
            });
            if (wonCount === thisBoard.length) {
               setTimerAction ((timerAction) => "stop");
               setWonAllPlay  (true);
               setGameStarted (false);
               setGamePaused  (false);
               startStopGame  ();
            } else {
               restartGame();
            }
            boardRef.current = thisBoard;
            setBoard((b) => thisBoard);
         }, 1500);
         if (loseBoth) {
            setLostBoth     (true);
            setNumLost      ((num) => num + 1);
         }
         if (winBoth)  {
            setCorrectMatch (true);
            setNumWon       ((num) => num + 1);
         }

      // First time this card is seen, so set to always show for Level 1 and turn it back over for Level 2 and mark it as singleWon.
      //
      } else if (card.flipped) {
         if (gameLevel === 1) {
            thisBoard[card.id].won       = true;
         } else if (gameLevel === 2) {
            thisBoard[card.id].singleWon = true;
         }
      }
      boardRef.current = thisBoard;
      setBoard((b) => thisBoard);

   }
   function scrollToInstructions () {
      instructionsRef.current.scrollIntoView({ behavior: 'smooth' });
   }
   return (
      <Layout> {/* A Next.js idea */}
         <Container fluid> {/* Bootstrap */}
            <BsCard className={styles.BsCardStyle}> {/* Bootstrap and CML */}
               <h1>MemCyan</h1>
               <h1
                  className={width > 300 ? styles.navIconRight : styles.blank}
                  onClick={() => scrollToInstructions()}
                  title={"Instructions"}
               >
                  <FontAwesomeIcon
                     className={styles.navIconPrivacy}
                     icon={faCircleQuestion}
                  />
               </h1>
               <Row>
                  <Col md={6}>
                     <StartStopButton />
                  </Col>
                  <Col md={6}>
                     <ClearButton />
                  </Col>
                  <Col md={12}>
                     <div className={gameStarted ? styles.hidden : styles.blank}>
                        <SelectGameLevel />
                     </div>
                  </Col>
                  <Col md={12}>
                     {wonAllPlay && <h5>You&#39;ve won the Game!</h5>}
                  </Col>
               </Row>
                  <div className={styles.spacer2}></div>
               <div className={styles.desktopMaxWidth}>
                  <MtRow>
                     <CardTable
                        board={board}
                        Card={Card}
                        handleTyleClick={handleTyleClick}
                        numCards={numCards}
                     />
                  </MtRow>
                  <div className={styles.spacer2}></div>
                  <Row>
                     <Col xs={12} md={6} lg={6} xl={6}>
                        <Progress />
                     </Col>
                     <Col xs={12} md={6} lg={6} xl={6}>
                        <GameClock gameTime={timeGameTook} action={timerAction}  />
                     </Col>
                  </Row>
                  {lostBoth &&
                     <>
                     <p>Already won!</p>
                     <p>Next time click on a flipped Tyle that matches!</p>
                     </>
                  }
                  {correctMatch &&
                     <>
                     <p>Correct match!</p>
                     <p>&nbsp;</p>
                     </>
                  }
                  {!lostBoth && !correctMatch && <><p>&nbsp;</p><p>&nbsp;</p></>}
                  <div className={gameStarted ? styles.hidden : styles.blank}>
                     <SelectNumCards />
                  </div>
               </div>
            </BsCard>
         </Container>
         {scores.length > 0 &&
            <>
            <div style={{marginTop : "25px"}}>
            </div>
            <Container fluid> {/* Bootstrap */}
               <BsCard className={styles.BsCardStyle}>
                  <ScoresTable />
               </BsCard>
            </Container>
            </>
         }
         {wonAllPlay && <WonModal
            numWon={numWon}
            numLost={numLost}
            numClicks={numClicks}
            gameTime={gameTime}
            numTyles={numCards}
            overallScore={calcOverallScore (numWon, numLost, numClicks, gameTime, numCards)}
         />}
         <h5 className={styles.instructionsH} ref={instructionsRef}>Instructions</h5>
         <Instructions />
         <Container fluid> {/* Bootstrap */}
            <footer className={styles.footer}>
               <Row>
                  <Col style={{textAlign : 'left'}}>
                     Copyright &copy; Caesura Media Limited,  {new Date().getFullYear()}. All Rights Reserved.
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
