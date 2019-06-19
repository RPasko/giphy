import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import './DialogComponent.scss';

const DialogComponent = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.dialogClose}
            classes={{root: 'default_dialog_root', paper: 'default_dialog_root_paper' }}
        >
            {props.closeBtn ?
                <span className="close_dialog_btn" alt="IconClose" onClick={props.dialogClose}>&#x292B;</span>
                :
                null
            }

            {props.children}
        </Dialog>
    );
};

export default DialogComponent;