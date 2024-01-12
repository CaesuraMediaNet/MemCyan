// A Tyle aka Card, an image from FontAwesome
//
import { useState }          from 'react';
import { useEffect }         from 'react';
import { useRef }            from 'react';
import { FontAwesomeIcon }   from '@fortawesome/react-fontawesome'
import { faImage }          from '@fortawesome/free-solid-svg-icons'
import styles                from '../styles/cyandot.module.css';

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
    let wonStyle           = {...iconStyle, opacity : 0.6};

    // Some icons are bigger than others moving the page about.
    //
    let reduceSelectedBigIconStyle = {...selectedStyle, width : "75%"};
    let reduceWonBigIconStyle      = {...wonStyle,      width : "75%"};
    if (!won && cardName.match (/cake|chair|snowflake|bong|bagshopping|bucket/i)) {
        selectedStyle = reduceSelectedBigIconStyle;
        wonStyle      = reduceWonBigIconStyle;
    }
    return (
        <div className={flipped ? styles.cardStyleFlipped : styles.cardStyle} onClick={clicked} >
            {won ?
                <FontAwesomeIcon style={wonStyle}      icon={icon} />
                : flipped ?
                <FontAwesomeIcon style={selectedStyle} icon={icon} />
                :
                <FontAwesomeIcon style={blankStyle}    icon={faImage} />
            }
        </div>
    );
}

