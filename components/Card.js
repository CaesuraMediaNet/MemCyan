// A Tyle aka Card, an image from FontAwesome
//
import { useState }          from 'react';
import { useEffect }         from 'react';
import { useRef }            from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import { faImage, faSpaghettiMonsterFlying }           from '@fortawesome/free-solid-svg-icons'
import styles                from '../styles/memcyan.module.css';

export default function Card ({id, icon, width, height, clicked, flipped, won, colour, cardName, top, left, rotate}) {

   // Next.js CSS Modules come in as classes, here we want CSS styles, not classNames.
   //
   let iconStyle = {
       color   : colour,
       padding : "5px",
       height  : "75%",
       width   : "75%",
   }
   let blankStyle         = {...iconStyle, color   : "dimgray", opacity : 0.5};
   let selectedStyle      = {...iconStyle};

   let thisCardStyle = {
      position : "relative",
      width    : "100%",
      height   : "100%",
      top      : won ? "0" : top  + "px",
      left     : won ? "0" : left + "px",
      transform: won ? "unset" : "rotate(" + rotate + "deg)",
   };

   // Some icons are bigger than others moving the page about.
   //
   let reduceSelectedBigIconStyle = {...selectedStyle, width : "50%"};
   if (!won && cardName.match (/graduation|cake|chair|sailboat|snowflake|bong|bagshopping|bucket/i)) {
       selectedStyle = reduceSelectedBigIconStyle;
   }
   return (
       <div style={thisCardStyle}  onClick={clicked} >
           {won ?
               <img src="/img/memcyan-logo.png" alt="You won this one!" className={styles.imgFluid} />
               : flipped ?
               <FontAwesomeIcon style={selectedStyle} icon={icon} />
               :
               <FontAwesomeIcon style={blankStyle}    icon={faImage} />
           }
       </div>
   );
}
