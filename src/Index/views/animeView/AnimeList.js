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
                <Col md={3} key={`col${i}`} >
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
        let QueueList = [];
        for(let i = 0, len = animeMapList.length; i < len; i += 4)
        {
            let lineAnime  = [];
            for(let j = 0, len = animeMapList.length; j + i < len && j < 4; ++j)
            {
                lineAnime.push(animeMapList[i+j]);
            }
            QueueList.push(lineAnime);
        }
        console.log(QueueList)
        let scrollList = []
        for(let i = 0, len  = QueueList.length; i < len ; ++i) {
            let scroll = <ScrollOverPack
                style={{ minHeight: 525}}
                appear={false}
            >
                <QueueAnim
                    key={1}
                    component={Row}
                    around='md'
                    duration={2000}
                    style={{ opacity: [1, 0]}}
                >
                    {QueueList[i]}
                </QueueAnim>

            </ScrollOverPack>
            scrollList.push(scroll)
            console.log(i)
        }
        if(this.props.allright && typeof list !== 'undefined')
        {
            return(scrollList)
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
