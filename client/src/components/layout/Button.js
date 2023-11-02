
import React from 'react';

const Button = ({ children, style, onClick }) => {
    const gradient = 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)';
    const borderRadius = '5px';
    const padding = '10px 20px';
    const color = '#fff';
    const fontWeight = 'bold';
    const border = 'none';
    const background = gradient;
    const cursor = 'pointer';

    const buttonStyle = {
        ...style,
        borderRadius,
        padding,
        color,
        fontWeight,
        border,
        background,
        cursor,
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
