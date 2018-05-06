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
        if (this.props.allright)
        {
            let data =  this.props.data
            let tags = (data.specific.tags)?data.specific.tags:[];
            let rating = (data.specific.rating)?data.specific.rating:"1000";
            let coins = (data.specific.coins)?data.specific.coins:"0";
            let cover = `/${data.cover}`;
            let actors = data.specific.actor;

            return (
                <Media>
                    <QueueAnim>
                        {
                    [
                        <Media key="one" left className={"media-img"}>
                        <QueueAnim>
                                <Media object src={cover} alt="cover" className={"img-full"}/>
                        </QueueAnim>
                        </Media>,
                    <Media body>
                        <Media heading>
                            <QueueAnim>
                            {[
                                <QueueAnim>
                                <div key="two" className={"media-heading font-color"}>
                                    {data.animeTitle}
                                </div>
                                </QueueAnim>,
                                <QueueAnim>
                                {   tags.map((tag,i) => {
                                    return (<Tag key={i} color="blue">{tag}</Tag>)
                                })
                                }
                                </QueueAnim>,
                                <QueueAnim
                                    component={'div'}
                                    className={'actors'}
                                    style = {wrapper}
                                >
                                        {
                                            actors.map((actor,i) => {
                                                if (actor.actor !== "..." && actor.actor !== '.')
                                                    return(<Chip style={{ margin:4+'px' }} key={i}>{actor.role}:{actor.actor} </Chip>)
                                            })
                                        }
                                </QueueAnim>
                            ]}
                            </QueueAnim>
                        </Media>
                        <QueueAnim>
                        <div key="four" className={"evaluate font-color"}>
                            {data.specific.evaluate}
                        </div>
                        </QueueAnim>
                        <QueueAnim>
                            <div key="five" className={"media-rating"}>
                                <div className={'rating-setting'}>
                                    <i className="material-icons font-color">star</i>
                                    <div className='rating-font font-color'>{rating[0].score}</div>
                                </div>
                                <div className={'rating-setting'}>
                                    <i className="material-icons font-color">attach_money</i>
                                    <div className={'rating-font'}>{coins}</div>
                                </div>
                            </div>
                        </QueueAnim>
                    </Media>
                            ]}
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