import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
// import TooltipMessage from '../../HelperComponents/TooltipMessage/TooltipMessage';
import IconButton from '@material-ui/core/IconButton';

// import EyeIcon from '../../../assets/image/eye_icon.png';
// import EyeCloseIcon from '../../../assets/image/eye_icon_close.png';
// import ErrorIcon from '@material-ui/icons/Error';

import './RenderField.scss';

class RenderField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        };
    }

    changeType = () => {
        this.setState(({type}) => ({
            type: type === 'password' ? 'text' : 'password'
        }));
    };

    render() {
        const { input, placeholder, label, password, autoFocus, disabled, customValue, placement = 'end', meta: {touched, error} } = this.props;
        const { type } = this.state;

        if(!!customValue) {
            return (
            <TextField
                {...input}
                type={type}
                label={label}
                variant="outlined"
                disabled={disabled}
                error={touched && !!error}
                placeholder={placeholder}
                value={customValue}
                autoComplete="off"
                autoFocus={autoFocus}
                classes={{
                    root: 'custom_input_wrapper'
                }}
                InputProps={{
                    startAdornment: placement === 'forgot2' ?
                        (
                            <InputAdornment position="start">
                                <Link to={'/authentication/password-recovery/first-step'}>Forgot?</Link>
                            </InputAdornment>
                        )
                        : '',
                    endAdornment:
                        (
                            <InputAdornment position="end">
                                {password ?
                                    <IconButton
                                        onClick={this.changeType}
                                        classes={{
                                            root: 'password_type_btn'
                                        }}
                                    >
                                        {/*{type === 'password'*/}
                                        {/*? <img src={EyeIcon} alt="eye icon"/>*/}
                                        {/*: <img src={EyeCloseIcon} alt="eye close icon"/>*/}
                                        {/*}*/}
                                    </IconButton>
                                    : ''
                                }
                                {touched && !!error ?
                                    (
                                        <span>{error}</span>
                                    )
                                    : ''
                                }

                            </InputAdornment>
                        ),
                    classes: {
                        root: 'custom_input',
                        focused: 'custom_input_focused',
                        disabled: 'custom_input_disabled',
                        error: 'custom_input_error',
                        adornedEnd: 'custom_input_adorned_end',
                        adornedStart: 'custom_input_adorned_start',
                        notchedOutline: 'custom_input_outline'
                    }
                }}
                InputLabelProps={{
                    classes: {
                        root: 'custom_input_label',
                        focused: 'custom_input_label_focused',
                        shrink: 'custom_input_label_active',
                        error: 'custom_input_label_error'
                    }
                }}
            />
        );
        } else {
            return (
            <TextField
                {...input}
                type={type}
                label={label}
                variant="outlined"
                disabled={disabled}
                error={touched && !!error}
                placeholder={placeholder}
                autoComplete="off"
                autoFocus={autoFocus}
                classes={{
                    root: 'custom_input_wrapper'
                }}
                InputProps={{
                    startAdornment: placement === 'forgot2' ?
                        (
                            <InputAdornment position="start">
                                <Link to={'/authentication/password-recovery/first-step'}>Forgot?</Link>
                            </InputAdornment>
                        )
                        : '',
                    endAdornment:
                        (
                            <InputAdornment position="end">
                                {password ?
                                    <IconButton
                                        onClick={this.changeType}
                                        classes={{
                                            root: 'password_type_btn'
                                        }}
                                    >
                                        {/*{type === 'password'*/}
                                        {/*? <img src={EyeIcon} alt="eye icon"/>*/}
                                        {/*: <img src={EyeCloseIcon} alt="eye close icon"/>*/}
                                        {/*}*/}
                                    </IconButton>
                                    : ''
                                }
                                {touched && !!error ?
                                    (
                                        <span>{error}</span>
                                    )
                                    : ''
                                }

                            </InputAdornment>
                        ),
                    classes: {
                        root: 'custom_input',
                        focused: 'custom_input_focused',
                        disabled: 'custom_input_disabled',
                        error: 'custom_input_error',
                        adornedEnd: 'custom_input_adorned_end',
                        adornedStart: 'custom_input_adorned_start',
                        notchedOutline: 'custom_input_outline'
                    }
                }}
                InputLabelProps={{
                    classes: {
                        root: 'custom_input_label',
                        focused: 'custom_input_label_focused',
                        shrink: 'custom_input_label_active',
                        error: 'custom_input_label_error'
                    }
                }}
            />
        );
        }


    }
}

export default (RenderField);