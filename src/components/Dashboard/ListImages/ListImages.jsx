import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Loader from '../../../components/HelpersBlocks/Loader/Loader';


const ListImages = (props) => {
    let dataProps = props.collection ? props.gifsProps :  props.gifsProps.data;

    let items =  dataProps.map((el, i)=>{
        return (
            <Card className="block-card"  key={"image" + i} style={{width: el.images.fixed_height_downsampled.width + "px"}}>
                <CardActionArea className="card_wrapper">
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height={el.images.fixed_height_downsampled.height}
                        width={el.images.fixed_height_downsampled.width}
                        image={el.images.fixed_height_downsampled.url}
                        title={el.title}
                    />
                    <div className="block_card_action" onClick={()=>props.openImage(el.images.downsized_large.url)}>
                        <p>{el.title}</p>
                        {props.collection ?
                            null :
                            <span className="btn_add" onClick={(e)=>props.addToCollection(e, el.id)} >
                            +
                        </span>
                        }

                    </div>

                </CardActionArea>

            </Card>
        )
    });

    return (
        <div className="block-main-images">
            <InfiniteScroll
                dataLength={items.length} //This is important field to render the next data
                next={props.getMoreGifs}
                hasMore={props.hasMore}
                loader={<div className="loader-in-container-wrapper"><Loader /></div>}
                endMessage={
                    <p style={{textAlign: 'center'}}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }

            >
                {items}
            </InfiniteScroll>
        </div>
    );
};

export default ListImages;