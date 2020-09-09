import React from 'react';
import './linked-button.css'

const LinkedButton = (props) => {
    return ( <button {...props} className="linked-button">{props.children}</button> );
}
 
export default LinkedButton;