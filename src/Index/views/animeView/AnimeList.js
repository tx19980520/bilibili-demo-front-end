import React, {Component} from "react"
import AnimeItem from "./AnimeItem.js";
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
import {Spin} from 'antd'
import {Row, Col} from "react-flexbox-grid"
import "./animeItem.css"
const ScrollOverPack = ScrollAnim.OverPack;
class AnimeList extends Component {

    render(){

        let list = this.props.list;
        let animeMapList = list.map((item, i) => {
            return (
                <Col md={3} key={i} >
                    <AnimeItem
                        pos={i}
                        sessionId={item.animeId}
                        picture={item.animePicturePath}
                        fans={item.fans}
                        title={item.animeTitle}
                        animeFinished = {item.animeFinished}
                        onLoadControl = {this.props.onLoadSystem}
                        allright={this.props.right}
                        scale = {item.scale}
                    />
                </Col>);
        })
        if(this.props.allright && typeof list !== 'undefined')
        {
            return(
                    <ScrollOverPack
                        id={"overpack"}
                        style={{ overflow: 'hidden',minHeight:300}}
                    >
                            <QueueAnim
								key={1}
                                component={Row}
                                around='md'
                                duration={1000}
                            >
                                {animeMapList}
                            </QueueAnim>
                    </ScrollOverPack>
            )
        }else{
            return(
                <div>
                    <div className={'before-load'}>
                    {animeMapList}
                    </div>
                    <div className={'loading'}>
                        <Spin />
                    </div>
                </div>
            )
        }
    };
    shouldComponentUpdate(nextProps, nextStates)
    {
        return (nextProps.allright);
    }



}

export default AnimeList;
