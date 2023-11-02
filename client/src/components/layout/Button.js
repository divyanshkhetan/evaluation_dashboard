
import React from 'react';

const Button = ({ children, style, onClick, disabled=false }) => {
    const gradient = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
    const borderRadius = '5px';
    const padding = '10px 20px';
    const color = '#fff';
    const fontWeight = 'bold';
    const border = 'none';
    const background = gradient;
    const cursor = 'pointer';

    const buttonStyle = {
        borderRadius,
        padding,
        color,
        fontWeight,
        border,
        background,
        cursor,
        ...style,
    };

    if(disabled) {
        buttonStyle.background = "#aaaaaa";
    }

    return (
        <button disabled={disabled} style={buttonStyle} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
