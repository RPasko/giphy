import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import TransitionedBlock from '../HelpersBlocks/TransitionedBlock/TransitionedBlock';
import DialogImage from '../DialogImage/DialogImage';
import Loader from '../../components/HelpersBlocks/Loader/Loader';
import ListImages from '../Dashboard/ListImages/ListImages';
import { getOneGiphy } from "../../actions/userActions";

class Collection extends Component {

    state = {
        openDialog: false,
        loader: true,
        collectionState: [],
        dialogImage: null,
    };

    componentDidMount() {
        const {getOneGiphy} = this.props;
        const {collectionState} = this.state;

        const collection = JSON.parse(localStorage.collection);
        if(collection.length === 0) this.setState({ loader: false });
        collection.map((el,i)=>(
            getOneGiphy(el).then(res=>{
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    let temp = collectionState;
                    temp.push(res.payload.data.data);
                    this.setState({ collectionState: temp });
                }
                if (i === collection.length-1) {
                    this.setState({ loader: false });
                }
            })
        ))
    }

    openImage=(el)=>{this.setState({ openDialog: true, dialogImage: el })};

    handleClose = () => {this.setState({ openDialog: false, dialogImage: null }) };

    render(){
        const {loader, openDialog, collectionState, dialogImage} = this.state;

        if (loader) return <div className="loader-in-container-wrapper"><Loader /></div>;
        return (
            <TransitionedBlock>
                <div>
                    <div >
                        {collectionState.length === 0 ?
                            <div className="content_inner">
                                <p className="black_text">No images in collection</p>
                            </div>
                            :
                            <ListImages
                                gifsProps={collectionState}
                                collection
                                openImage={this.openImage}
                            />
                        }
                    </div>

                    <DialogImage
                        openDialog={openDialog}
                        dialogImage={dialogImage}
                        handleClose={this.handleClose}
                    />
                </div>
            </TransitionedBlock>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getOneGiphy
    }, dispatch);
}


export default connect(null, mapDispatchToProps)(Collection);