import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import { bindActionCreators } from 'redux';
import Search from '../Search/Search';
import ListImages from './ListImages/ListImages';
import RenderField from '../HelpersBlocks/RenderField/RenderField';
import TransitionedBlock from '../HelpersBlocks/TransitionedBlock/TransitionedBlock';
import DialogComponent from '../HelpersBlocks/DialogComponent/DialogComponent';
import DialogImage from '../DialogImage/DialogImage';
import AuthButton from '../../components/HelpersBlocks/Buttons/AuthButton/AuthButton';
import Loader from '../../components/HelpersBlocks/Loader/Loader';
import LoaderBall from '../../components/HelpersBlocks/LoaderBall/LoaderBall';
import { searchGiphy, searchGiphyNew, randomGiphy, postFile } from "../../actions/userActions";
import { hasExtension } from "../../helpers/functions";
import './Dashboard.scss';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.addToCollection = this.addToCollection.bind(this);
    }

    state = {
        openDialog: false,
        openDialogUpload: false,
        loader: true,
        value: '',
        product: null,
        activePage: 0,
        hasMore: true,
        collection: [],
        dialogImage: null,
        file: null,
        fileError: false,
        loaderBtn: false
    };

    componentDidMount() {
        const {randomGiphy} = this.props;
        randomGiphy(0).then(res=>{
            if(res.payload && res.payload.status && res.payload.status === 200) {
                this.setState({loader: false});
            }
        });
        if (!localStorage.collection) localStorage.collection = JSON.stringify([]);
    }

    getMoreGifs = () => {
        const {randomGiphy, searchGiphy} = this.props;
        const {activePage, value} = this.state;

        if(value.length===0) {
            randomGiphy(activePage + 25).then(res=>{
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    this.setState({activePage: activePage + 25});
                }
            });
        } else {
            searchGiphy(value, activePage + 25).then(res=>{
                if(res.payload && res.payload.status && res.payload.status === 200) {
                    this.setState({activePage: activePage + 25});
                }
            });
        }
    };

    addToCollection=(event, el)=>{
        const collection = JSON.parse(localStorage.collection);
        event.stopPropagation();
        if ((collection.length > 0 && !collection.find(x => x === el)) || collection.length === 0) {
            collection.push(el);
            localStorage.collection = JSON.stringify([...collection]);
        }
    };

    openImage=(el)=>{
        this.setState({ openDialog: true, dialogImage: el })
    };

    handleClose = () => {this.setState({ openDialog: false, dialogImage: null }) };

    onChange = (e) => {
        let value = e.target.value;
        this.setState({value});
    };

    onKeyUp = (e) => {
        const { searchGiphyNew, randomGiphy } = this.props;
        let value = e.target.value.split(' ').join('+');
        if (value.length === 0) {
            randomGiphy(0);
            this.setState({activePage: 0});
        } else {
            searchGiphyNew(value);
            this.setState({activePage: 0});
        }
    };

    // add gif

    handleCloseUpload = () => {this.setState({ openDialogUpload: false, file: null }) };

    selectFile = () => {
        this.setState({fileError: false});
        let el = document.getElementById("file");
        el.click();
    };

    handleImageChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        if(hasExtension(file.name, ['.gif'])) {
            this.setState({file, openDialogUpload: true});
        } else {
            this.setState({fileError: true, file: null});
        }
    }

    SubmitForm = data => {
        const { postFile } = this.props;
        const { file } = this.state;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', 'hapSiD9i0AKmdjreWqGB9m3YThNmQMV8');
        formData.append('tags',  data.tags.split(/[ ,]+/).join(', '));

        this.setState({loaderBtn: true});

        postFile(formData).then(res => {
            if(res.payload && res.payload.status && res.payload.status === 200) {
                const collectionNew = JSON.parse(localStorage.collection);
                collectionNew.push(res.payload.data.data.id);
                localStorage.collection = JSON.stringify([...collectionNew]);
                this.setState({loaderBtn: false});
                this.handleCloseUpload();
            }
        })
    };


    render(){
        const {main: {gifs}, handleSubmit, submitting, pristine, valid  } = this.props;
        const {loader, openDialog, openDialogUpload, activePage, hasMore, dialogImage, fileError, loaderBtn } = this.state;

        if (loader) return <div className="loader-in-container-wrapper"><Loader /></div>;
        return (
            <TransitionedBlock>
                <div className='header_wrapper header_wrapper_second'>
                    <div className="header_user_wrapper">
                        <div className="header_custom_title">
                            <Search
                                onChange={this.onChange}
                                onKeyUp={this.onKeyUp}
                            />
                            <input
                                id="file"
                                type="file"
                                className="input-file"
                                onChange={e => this.handleImageChange(e)}
                            />
                            <div>
                                <div className="download-file_error flex-center">
                                    {fileError ?
                                        <p>Select correct file extension</p>
                                        : ''
                                    }
                                </div>
                                <AuthButton
                                    type="link"
                                    onClick={this.selectFile}
                                >
                                    Add new gif
                                </AuthButton>
                            </div>

                        </div>
                    </div>
                </div>
                {gifs.data &&  gifs.data.length > 0 ?
                    <ListImages
                        gifsProps={gifs}
                        activePage={activePage}
                        getMoreGifs={this.getMoreGifs}
                        hasMore={hasMore}
                        addToCollection={this.addToCollection}
                        openImage={this.openImage}
                    />
                    :
                    <div className="content_inner">
                        <p className="black_text">No results</p>
                    </div>
                }

                <DialogImage
                    openDialog={openDialog}
                    dialogImage={dialogImage}
                    handleClose={this.handleClose}
                />


                <DialogComponent
                    open={openDialogUpload}
                    dialogClose={this.handleCloseUpload}
                    closeBtn
                >
                    <div className="dialog_component dialog_component_dark">
                        <div className="text_info form_wrapper form_wrapper_small_item">
                            <h2 className="auth_header">Add gif</h2>
                            <form onSubmit={handleSubmit(this.SubmitForm)}>
                                <Field name="name" type="text" component={RenderField} label="Username"/>
                                <Field name="tags" type="text" component={RenderField} label="Write the tags separated by a space"/>
                                <AuthButton
                                    type="button"
                                    disabled={submitting || pristine || !valid}
                                >
                                    {!loaderBtn ? 'Upload on server' : <LoaderBall btn />}
                                </AuthButton>
                            </form>
                        </div>
                    </div>
                </DialogComponent>
            </TransitionedBlock>

        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    }
    if (!values.tags) {
        errors.tags = 'Required'
    }
    return errors
};

Dashboard = reduxForm({
    form: 'AddGif',
    validate
})(Dashboard);

Dashboard.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

function mapStateToProps(state) {
    return{
        main: state.main
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchGiphy,
        searchGiphyNew,
        randomGiphy,
        postFile
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);