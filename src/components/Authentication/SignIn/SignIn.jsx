import React, {Component, Fragment} from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../../HelpersBlocks/RenderField/RenderField';
import AuthButton from '../../HelpersBlocks/Buttons/AuthButton/AuthButton';
import {Link, Redirect} from 'react-router-dom';
import IconLogo from "../../../assets/images/logo.png";

class SignIn extends Component {

    SubmitForm=(data)=>{
        let obj = {
            login: data.email,
            password: data.password
        };
        localStorage.auth = JSON.stringify(obj);
    };

    render(){
        const { handleSubmit, submitting, pristine, valid } = this.props;
        if(!!localStorage.auth) return <Redirect to="/main" />;
        return (
            <Fragment>
                <div className="logo">
                    <Link to="/">
                        <img src={IconLogo} alt="IconLogo" />
                    </Link>
                </div>
                <div className="form_wrapper">
                    <h2 className="auth_header">
                        Sign In
                    </h2>
                    <form onSubmit={handleSubmit(this.SubmitForm)}>
                        <Field name="email" type="text" component={RenderField} label="Email"/>
                        <Field name="password" type="password" component={RenderField} label="Password"/>
                        <AuthButton
                            type="button"
                            disabled={submitting || pristine || !valid}
                        >
                            SIGN IN
                        </AuthButton>
                    </form>
                </div>
            </Fragment>

        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length <8 ) {
        errors.password = 'Must be more than 8 characters'
    }

    return errors
};


SignIn = reduxForm({
    form: 'SignIn',
    validate
})(SignIn);

export default SignIn;



