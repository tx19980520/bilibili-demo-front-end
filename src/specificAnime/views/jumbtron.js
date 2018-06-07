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
                    <QueueAnim duration={2000}>
                        {
                    [
                        <Media key="one" left className={"media-img"}>
                        <QueueAnim>
                                <Media object src={cover} alt="cover" className={"media-img img-full"}/>
                        </QueueAnim>
                        </Media>,
                    <Media body key={"body"}>
                        <Media heading>
                            <QueueAnim>
                            {[
                                <QueueAnim key={"special"}>
                                <div key="two" className={"media-heading font-color"}>
                                    {data.animeTitle}
                                </div>
                                </QueueAnim>,
                                <QueueAnim key={"hard"}>
                                {   tags.map((tag,i) => {
                                    return (<Tag key={i} color="blue">{tag}</Tag>)
                                })
                                }
                                </QueueAnim>,
                                <QueueAnim
                                    key={"wrapper"}
                                    component={'div'}
                                    className={'actors'}
                                    style = {wrapper}
                                >
                                        {
                                            actors.forEach((actor,i) => {
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

export default AnimeMedia;