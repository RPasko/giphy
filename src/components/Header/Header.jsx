import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {activeTab} from "../../actions/updateRedux";
import LoaderBall from '../../components/HelpersBlocks/LoaderBall/LoaderBall';
import IconLogo from '../../assets/images/logo.png';
import './Header.scss';

class Header extends Component {
    state = {
        anchorEl: null,
        activeTab: 0,
        open: false
    };

    componentDidMount() {
        const { activeTab} = this.props;
        if (window.location.href.indexOf('my-collection') !==-1) {
            this.setState({ activeTab: 1 });
            activeTab(1);
        } else {
            activeTab(0);
            this.setState({ activeTab: 0 });
        }
    }

    logOut = () => {
        this.setState({ anchorEl: null });
        localStorage.clear();
        this.props.history.push('/authentication');
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    changeTab = (event, value) => {
        const {activeTab} = this.props;
        this.setState({ activeTab: value, open: false });
        activeTab(value);
        if (value === 0) {
            this.props.history.push('/main/dashboard');
        } else {
            this.props.history.push('/main/my-collection');
        }
    };
      toggleDrawer = () => {
        this.setState(({open}) => ({
            open: !open
        }));
    };

    render(){

        const { anchorEl, activeTab, open } = this.state;

        if(!localStorage.auth) return <Redirect to="/authentication" />;

        const auth = JSON.parse(localStorage.auth)

        return (
            <header className={open ? 'header_wrapper header_wrapper_shadow header_wrapper_open' : 'header_wrapper header_wrapper_shadow' }>
                <div className="header_user_wrapper">
                    <div className="block_wrapper_header logo">
                        <Link to="/">
                            <img src={IconLogo} alt="IconLogo" />
                        </Link>
                    </div>
                    <Tabs value={activeTab} onChange={this.changeTab} classes={{root: 'header_tabs_wrapper', indicator: "header_tabs_indicator" }}>
                        <Tab label="all images" classes={{labelContainer: 'header_tab_inner', root: 'header_tab_wrapper' }} />
                        <Tab label="my collection" classes={{labelContainer: 'header_tab_inner', root: 'header_tab_wrapper' }} />
                    </Tabs>
                    <div>
                        <Button
                            aria-owns={anchorEl ? 'header-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            classes={{root: 'button_header_wrapper button_header_wrapper_mini', label: 'button_header_inner' }}
                        >
                            {!!auth ? auth['login'] : <LoaderBall />}
                            <span className="chevron_down">&#8250;</span>
                        </Button>
                        <Menu
                            id="header-menu"
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            transformOrigin =	{{  vertical: "top", horizontal: "left" }}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            open={Boolean(anchorEl)}
                            autoFocus={false}
                            onClose={this.handleClose}
                            classes={{paper: 'button_header_paper' }}
                        >
                            <MenuItem>{auth['login']}</MenuItem>

                            <Divider />
                            <MenuItem
                                onClick={this.logOut}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className={open ? "burger-button-default burger-button-default_open" : "burger-button-default" } onClick={this.toggleDrawer}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                </div>
            </header>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        activeTab,
    }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(Header));