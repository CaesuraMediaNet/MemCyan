// A Tyle aka Card, an image from FontAwesome
//
import { useState }          from 'react';
import { useEffect }         from 'react';
import { useRef }            from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import { faImage, faSpaghettiMonsterFlying }           from '@fortawesome/free-solid-svg-icons'
import styles                from '../styles/memcyan.module.css';

export default function Card ({id, icon, width, height, clicked, flipped, won, colour, cardName }) {

   // Next.js CSS Modules come in as classes, here we want CSS styles, not classNames.
   //
    let iconStyle = {
        color   : colour,
        padding : "5px",
        height  : "100%",
        width   : "100%",
    }
    let blankStyle         = {...iconStyle, color   : "dimgray", opacity : 0.5};
    let selectedStyle      = {...iconStyle};

    // Move them all over the board. But not in this component.
    //
    let randTop  = Math.floor(Math.random() * 10);
    let randLeft = Math.floor(Math.random() * 10);
    randTop = 0;
    randLeft = 0;

    let thisCardStyle = {
       position : "relative",
       width    : "100%",
       height   : "100%",
       top      : randTop  + "px",
       left     : randLeft + "px",
    };

    // Some icons are bigger than others moving the page about.
    //
    let reduceSelectedBigIconStyle = {...selectedStyle, width : "75%"};
    if (!won && cardName.match (/graduation|cake|chair|snowflake|bong|bagshopping|bucket/i)) {
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
