// The comprehensive instructions which show example boards and a video.
//
import { useRef } from 'react';
import styles from '../styles/memcyan.module.css';
import CardTable from './CardTable';
import Card from './Card';
import MtRow from '../components/MtRow';
import Container from 'react-bootstrap/Container';
import BsCard from 'react-bootstrap/Card';

// https://www.npmjs.com/package/shaka-player-react
// Next.js config.
//
import dynamic from 'next/dynamic';
const ShakaPlayer = dynamic(() => import('shaka-player-react'), { ssr: false });
import 'shaka-player/dist/controls.css';

function handleTyleClick () {
   return null;
}


import {startBoard, wonBoard, twoMatching, twoLost, twoWon} from '../components/boards';

export default function Instructions () {
   return (
      <Container fluid>
         <BsCard className={styles.BsCardStyle}>
            <div className={styles.desktopMaxWidth}>
               <p className={styles.instructionP}>
                  The board is made up of pairs of pictures, or Tyles as we call them, like this :
               </p>
               <MtRow>
                  <CardTable
                     board={wonBoard}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>
               <p className={styles.instructionP}>
                  At the start of the game the board has all Tyles turned over, showing the blank image :
               </p>
               <MtRow>
                  <CardTable
                     board={startBoard}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  The game starts when pressing the Start Game button and the game will show one random Tyle
                  at a time.  You have to click on the Tyle in time, and the Tyle goes to a blue circle.
                  The game is to fill the screen with blue circles.
                  The only thing is - you have to click on a matching image if one is already shown.
                  If you click on one shown that already has a partner blue circled, then you lose them  both:
               </p>
               <MtRow>
                  <CardTable
                     board={twoLost}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  However, if you remember where its maching Tyle is and click on  that then 
                  you win both, and they turn to blue circles, safe.
               </p>
               <MtRow>
                  <CardTable
                     board={twoWon}
                     Card={Card}
                     handleTyleClick={handleTyleClick}
                     numCards={12}
                  />
               </MtRow>

               <p className={styles.instructionP}>
                  You can change the number of Tyles on the board with the selector under the game.  We have
                  started you on 12, but you can select 4 (easy!), 12, 16, 20, 36, 42 or if you are
                  feeling brave, 56.
               </p>

               <p className={styles.instructionP}>
                  You can clear the board in the middle of the game using the Clear Board button at the top :
               </p>
               <img className={styles.imgFluid} src="/img/clearBoardButton.png" />

               <p className={styles.instructionP}>
                  Your scores are in the Past Scores section.  They are saved in Cookies, so no scores are
                  recorded by us.
               </p>
               <p className={styles.instructionP}>
                  Good luck!
               </p>
               {/*
               <p className={styles.instructionP}>
                  Here is a video showing a game being played.
               </p>
               <ShakaPlayer src="/video/DemoVideo.mpd" />
               */}
            </div>
         </BsCard>
      </Container>
   );
}


