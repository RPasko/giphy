import React from 'react';
import './LoaderBall.scss';

const LoaderBall = (props) => {
    return (
        <div className={props.btn ? "ball-loader ball-loader-btn" : "ball-loader"}>
            <div className="ball-loader-ball ball1"></div>
            <div className="ball-loader-ball ball2"></div>
            <div className="ball-loader-ball ball3"></div>
        </div>
    );
};

export default LoaderBall;