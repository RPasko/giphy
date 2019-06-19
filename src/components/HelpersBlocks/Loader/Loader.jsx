import React from 'react';
import './Loader.scss';

const Loader = ({classes = ''}) => {
    return (
        <div className={`loader ${classes}`}>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
        </div>
    );
};

export default Loader;