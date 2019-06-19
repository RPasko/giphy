import React from 'react';
// import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import './TransitionedBlock.scss';

const TransitionedPage = (props) => (
    <ReactCSSTransitionGroup
        transitionName="page-animation"
        component="div"
        transitionAppear={true}
        transitionAppearTimeout={700}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {props.children}
    </ReactCSSTransitionGroup>
);

export default TransitionedPage;