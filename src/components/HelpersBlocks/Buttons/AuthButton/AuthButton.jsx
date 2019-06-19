import React from 'react';
import './AuthButton.scss';

const AuthButton = (props) => {
    return (
        <div className={props.type === "button-custom" ? "" : "auth_btn_wrapper"}>
            {props.type === 'link' ?
                <button
                    className="auth_btn"
                    onClick={props.onClick}
                >
                    {props.children}
                </button>
                :
                <button
                    type='submit'
                    className={props.type === "auth_btn_inversion" ? "auth_btn auth_btn_inversion" : "auth_btn"}
                    disabled={props.disabled}
                    onClick={props.onClick}
                >
                    {props.children}
                </button>
            }
        </div>
    );
};

export default AuthButton;