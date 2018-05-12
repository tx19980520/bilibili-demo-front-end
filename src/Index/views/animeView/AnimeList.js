import React,{Component} from "react"
import {AnimeItem} from "./AnimeItem.js";
import QueueAnim from 'rc-queue-anim';
import ScrollAnim from 'rc-scroll-anim';
import {Spin} from 'antd'
import "./animeItem.css"
import {Row,Col} from "react-flexbox-grid"
const ScrollOverPack = ScrollAnim.OverPack;
class AnimeList extends Component {

    constructor(props,context){
        super(props,context);
        // 我们不会在这个层级上定义动作，我们在AnimeItem层级定义动作
    };


    render(){

        let list = this.props.list;
        let animein = list.map((item, i) => {
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
                                    {animein}
                            </QueueAnim>
                    </ScrollOverPack>
            )
        }else{
            console.log("here");
            return(
                <div>
                    <div className={'before-load'}>
                    {animein}
                    </div>
                    <div className={'loading'}>
                        <Spin />
                    </div>
                </div>
            )
        }
    };
    shouldComponentUpdate(nextProps,nextStates)
    {
        return (nextProps.allright);
    }



}

export default AnimeList;
