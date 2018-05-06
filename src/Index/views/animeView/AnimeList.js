import React,{Component} from "react"
import {AnimeItem} from "./AnimeItem.js";
import { StaggeredMotion, spring, presets } from 'react-motion'
import "./animeItem.css"
import {Row,Col} from "react-flexbox-grid"
class AnimeList extends Component {

    constructor(props,context){
        super(props,context);
        // 我们不会在这个层级上定义动作，我们在AnimeItem层级定义动作
    };


    render(){
        /*var lineSlide = [];
        var currData = [];
        if(this.props.animes['list']) {
            for(var index =0;index<this.props.animes['list'].length;++index)
            {
                //将chartArr[i]添加到子数组
                currData.push(this.props.animes['list'][index]);
                //在这里求4的余数,如果i不等于0,且可以整除 或者考虑到不满4个或等于4个的情况就要加上  i等于当前数组长度-1的时候
                if((index != 0 && (index + 1) % 3 == 0)) {
                    //把currData加到allData里

                    lineSlide.push(currData);
                    //在这里清空currData
                    currData = [];
                }
            }
        }*/let list = this.props.list;
        let len = list.length;
        let boxes = [];
        for (let i = 0; i < len; i++) {
            boxes.push({
                scale: 0
            })
        }
        if(this.props.allright && typeof list !== 'undefined')
        {
            return(
                <ul>
                    {
                        <StaggeredMotion
                            Motion defaultStyles={boxes}
                            styles={prevStyles => prevStyles.map((item, i) => {
                                return i === 0
                                    ? { scale: spring(1, { ...presets.noWobble }) }
                                    : prevStyles[i - 1]
                            })}>
                            {interpolatingStyles =>
                                <Row around="md">
                                    {interpolatingStyles.map((item, i) => {
                                        return (
                                            <Col md={3} key={i}>
												<AnimeItem
                                                pos={i}
                                                sessionId={list[i].animeId}
                                                picture={list[i].animePicturePath}
                                                fans={list[i].fans}
                                                title={list[i].animeTitle}
                                                animeFinished = {list.animeFinished}
                                                onLoadControl = {this.props.onLoadSystem}
                                                allright={this.props.right}
												scale = {item.scale}
												/>
                                            </Col>);
                                    })}
                                </Row>
                            }
                        </StaggeredMotion>
                    }
                </ul>
            )
        }else{
            return(
                <ul>
                    <StaggeredMotion
                        Motion defaultStyles={boxes}
                        styles={prevStyles => prevStyles.map((item, i) => {
                            return i === 0
                                ? { scale: spring(1, { ...presets.noWobble }) }
                                : prevStyles[i - 1]
                        })}>
                    {(interpolatingStyles) =>
                        <Row around="md" className={"before-load"}>
                        {interpolatingStyles.map((item, i) => {
                            return (
                                <Col md={3} key={i}>
                                    <AnimeItem
                                        key={i}
                                        pos={i}
                                        sessionId={list[i].animeId}
                                        picture={list[i].animePicturePath}
                                        fans={list[i].fans}
                                        title={list[i].animeTitle}
                                        animeFinished = {list.animeFinished}
                                        onLoadControl = {this.props.onLoadSystem}
                                        allright={this.props.right}
                                        scale = {item.scale}
                                    />
                                </Col>);
                        })}
                    </Row>
                    }
                    </StaggeredMotion>
                </ul>
            )
        }
    };
    shouldComponentUpdate(nextProps,nextStates)
    {
        return (nextProps.allright);
    }



}

export default AnimeList;
