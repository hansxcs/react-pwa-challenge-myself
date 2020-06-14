import React from 'react'
import "../Scss/circularBar.scss"

// https://codepen.io/naturalclar/pen/GONgVO
function RoundProgressBar(props) {
    const size = props.size;
    const radius = (props.size - props.strokeWidth) / 2;
    const viewBox = `0 0 ${size} ${size}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * props.value / props.max;
    // const percentage = (props.value / props.max * 100).toFixed();
    return (
        <div>
            <svg
                id="circleBar"
                width={props.size}
                height={props.size + 50}
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
                    cx={(props.size / 2)}
                    cy={props.size / 2}
                    r={radius}
                    opacity={0.3}
                />
                <circle
                    className="ripple ripple--2"
                    fill='#40AEA5'
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    cx={(props.size / 2)}
                    cy={props.size / 2}
                    r={radius + 23}
                    opacity={0.2}
                />
                <circle
                    fill={'none'}
                    stroke={'#9BD3AE'}
                    cx={props.size / 2}
                    cy={props.size / 2}
                    r={radius}
                    opacity={0.2}
                    strokeWidth={`${props.strokeWidth}px`} />
                <circle
                    fill={'none'}
                    stroke={props.stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    cx={props.size / 2}
                    cy={props.size / 2}
                    r={radius}
                    strokeWidth={`${props.strokeWidth}px`}
                    transform={`rotate(-90 ${props.size / 2} ${props.size / 2})`}
                />
                <circle
                    className="glow"
                    fill={'none'}
                    stroke={props.stroke}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    cx={props.size / 2}
                    cy={props.size / 2}
                    r={radius}
                    strokeWidth={`${props.strokeWidth}px`}
                    transform={`rotate(-90 ${props.size / 2} ${props.size / 2})`}
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
                    {`${props.max - props.value}`}
                </text>
                <text
                    x="50%"
                    y="50%"
                    dy="2.5rem"
                    textAnchor="middle"
                    fill={props.stroke}
                    style={
                        {
                            fill: "white",
                            fontSize: '1rem',
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 100,
                        }
                    }
                >
                    {props.text}
                </text>
                {/* <text
                    x="50%"
                    y="50%"
                    dy="2.7rem"
                    textAnchor="middle"
                    fill={props.stroke}
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
            </svg>
        </div >
    );
}

export default RoundProgressBar;