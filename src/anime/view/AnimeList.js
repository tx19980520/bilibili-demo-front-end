import React,{Component} from "react"
import {connect} from 'react-redux';
import {AnimeItem} from "./AnimeItem.js";
import {AnimeLine} from "./AnimeLine.js";
import {fetchAnime} from "../actions.js";
import { StaggeredMotion, spring, presets } from 'react-motion'
import "./animeItem.css"
import {Row,Col} from "react-flexbox-grid"
class AnimeList extends Component {
    constructor(props,context){
        super(props,context);
        //我们不会在这个层级上定义动作，我们在AnimeItem层级定义动作
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
        }*/let list = this.props.animes['list'];
        if(list)
        {
            let boxes = [];
            for (let i = 0, len = list.length; i < len; i++) {
                boxes.push({
                    scale: 0
                })
            }
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
                                <Row>
                                    {interpolatingStyles.map((item, i) => {
                                        return (
                                            <Col md={3}>
                                            <AnimeItem
                                                key={i}
                                                sessionid={list[i].animeId}
                                                picture={list[i].animePicturePath}
                                                fans={list[i].fans}
                                                title={list[i].animeTitle}
                                                animeFinished = {list.animeFinished}
                                                style={{
                                                    transform: `scale(${item.scale}, ${item.scale})`
                                                }}
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
            return null;
        }
    };
    componentDidMount() {
        this.props.initAnimeData()
    }
}
const mapStateToProps=(state)=>
{
    return {animes:state.animes}
};
const mapDispatchToProps=(dispatch)=>{
    return {
        initAnimeData: () => {
            dispatch(fetchAnime());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AnimeList);
