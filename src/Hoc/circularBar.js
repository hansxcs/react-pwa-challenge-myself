import React from 'react'
import "../Scss/circularBar.scss"

// https://codepen.io/naturalclar/pen/GONgVO
const RoundProgressBar = ({ value, max }) => {
    const stroke = '#6EFAFF';
    const strokeWidth = 15;
    const size = 230;
    const text = 'Days Remaining';
    const radius = (size - strokeWidth) / 2;
    const viewBox = `0 0 ${size} ${size}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * value / max;
    // const percentage = (value / max * 100).toFixed();

    const renderRoundProgressBar = () => {
        let template = null;
        template = (<svg
            id="circleBar"
            width={size}
            height={size + 50}
            viewBox={viewBox}
            preserveAspectRatio="xMidYMin slice"
        >
            <filter id="blur-filter" x="-2" y="-2" width="200" height="200">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
            <circle
                className="ripple ripple--1"
                fill='#40AEA5'
                strokeLinecap="round"
                strokeLinejoin="round"
                cx={(size / 2)}
                cy={size / 2}
                r={radius}
                opacity={0.3}
            />
            <circle
                className="ripple ripple--2"
                fill='#40AEA5'
                strokeLinecap="round"
                strokeLinejoin="round"
                cx={(size / 2)}
                cy={size / 2}
                r={radius + 23}
                opacity={0.2}
            />
            <circle
                fill={'none'}
                stroke={'#9BD3AE'}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                opacity={0.2}
                strokeWidth={`${strokeWidth}px`} />
            <circle
                fill={'none'}
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <circle
                className="glow"
                fill={'none'}
                stroke={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
                x="50%"
                y="50%"
                dy="0.8rem"
                textAnchor="middle"
                style={{
                    fill: "white",
                    fontSize: '5.5rem',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 400,
                }}
            >
                {`${max - value}`}
            </text>
            <text
                x="50%"
                y="50%"
                dy="2.5rem"
                textAnchor="middle"
                fill={stroke}
                style={
                    {
                        fill: "white",
                        fontSize: '1rem',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 100,
                    }
                }
            >
                {text}
            </text>
            {/* <text
                x="50%"
                y="50%"
                dy="2.7rem"
                textAnchor="middle"
                fill={stroke}
                style={
                    {
                        fontSize: '1rem',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 400,
                    }
                }
            >
                {`${percentage}%`}
            </text> */}
        </svg>)
        return template;
    }

    return (
        <div>
            {renderRoundProgressBar()}
        </div >
    );
}

export default RoundProgressBar;