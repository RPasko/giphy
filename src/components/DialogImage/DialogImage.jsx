import React, {Component} from 'react';

import DialogComponent from '../HelpersBlocks/DialogComponent/DialogComponent';

class DialogImage extends Component {

    render(){
        const {handleClose, openDialog, dialogImage} = this.props;
        return (
            <DialogComponent
                open={openDialog}
                dialogClose={handleClose}
                closeBtn
            >
                <div className="dialog_component">
                    <div className="text_info">
                        <img src={dialogImage} alt=""/>
                    </div>
                </div>
            </DialogComponent>

        );
    }
}
export default DialogImage;