import React from 'react';
import { Media } from 'reactstrap';
import { Tag } from 'antd';
import Chip from 'material-ui/Chip';
import {Spin} from "antd"
import "./animeMedia.css"
import QueueAnim from 'rc-queue-anim';
class AnimeMedia extends React.Component {
   /* constructor(props,context)
    {
        super(props,context);
    }
    */
    render()
    {
        const wrapper= {
            display: 'flex',
            flexWrap: 'wrap',
        };
        console.log(this.props.allright);
        if (this.props.allright)
        {
            let tags = (this.props.data.specific.tags)?this.props.data.specific.tags:[];
            let rating = (this.props.data.specific.rating)?this.props.data.specific.rating:"1000";
            let coins = (this.props.data.specific.coins)?this.props.data.specific.coins:"0";
            let cover = `/${this.props.data.cover}`;
            let actors = this.props.data.specific.actor;

            return (
                <Media>
                    <QueueAnim>
                        <Media key="one" left className={"media-img"}>
                            <Media object src={cover} alt="cover" className={"img-full"}/>
                        </Media>
                        <Media body>
                            <Media heading>
                                <div key="two" className={"media-heading"}>
                                    {this.props.data.animeTitle}
                                </div>
                                {tags.map((tag,i)=>{
                                    return (<Tag key={i} color="blue">{tag}</Tag>)
                                })
                                }
                                <div key="three" className={"actors"} style={wrapper}>
                                    {actors.map((actor,i)=>{
                                        if(actor.actor !== "...")
                                            return( <Chip style={{margin:4+"px"}} key={i}>{actor.role}:{actor.actor} </Chip>)
                                    })}
                                </div>
                            </Media>
                            <div key="four" className={"evaluate"}>
                                {this.props.data.specific.evaluate}
                            </div>
                            <div key="five" className={"media-rating"}>
                                {rating[0].score}
                                <br />
                                {coins}
                            </div>
                        </Media>
                    </QueueAnim>
                </Media>
            );
        }
        else{
            return <Spin />
        }

    }
}


/*const mapDispatchToProps = (dispatch) => {
    return {
        refreshSearch:(word)=>{
            dispatch(searchInit(word))
        },
        search:(word)=>{
            dispatch(searchWord(word))
        }
    }
};
const mapStateToProps = (state) =>{
    return {searchList:state.search.list}
};
export default connect(mapStateToProps, mapDispatchToProps)(Complete);*/
//暂时想的是这个组件做成一个纯傻瓜组件
export default AnimeMedia;