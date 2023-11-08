import React from "react";

import './styles.css';

const Button = ({ label, btnClass, iconClass, type, clickFunc }) => {
    return (
        <button type={type} className={`btn ${btnClass}`} onClick={clickFunc}>
            <i className={`${iconClass} action mr-2`} />&nbsp;
            { label}
        </button>
    );
}

export default Button;
