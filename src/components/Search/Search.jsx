import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchGiphy } from "../../actions/userActions";


import './Search.scss';

class Search extends Component {

    render(){
        const { value, onChange, onKeyUp } = this.props;

        return (
            <div className="search_product_wrapper">
                <input
                    id="products_input"
                    type="text"
                    value={value}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    placeholder="Search gifs..."
                    autoComplete="off"
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchGiphy
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(Search);