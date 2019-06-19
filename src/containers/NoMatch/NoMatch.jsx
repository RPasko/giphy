import React from 'react';
import { Link } from 'react-router-dom';
import './NoMatch.scss';
import Icon_Error from '../../assets/images/404.png';





const NoMatch = ({ location }) => (
    <div className="no_match">

        <div className="no_match_block">
            <div className="error_name">
                <img src={Icon_Error} alt="Icon_Error" />
            </div>
            <div className="info_error">Page not found</div>
            <div className="text_error">It seems like the page you’re looking for <br/>doesn’t exist</div>
            <Link className="btn_no_match" to={`/main`}>back to home</Link>
        </div>

    </div>
);

export default NoMatch;