import React from "react";

export function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style, borderRadius: '50%', display: 'block',
                background: 'cornflowerblue', right: -33, width: 23, height: 20, paddingTop: 2.5
            }}
            onClick={onClick}

        />
    );
}

export function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style, left: -7, borderRadius: '50%', display: 'block',
                background: 'cornflowerblue', right: -40, width: 23, height: 20, paddingTop: 2.5
            }}
            onClick={onClick}
        >
        </div>
    );
}