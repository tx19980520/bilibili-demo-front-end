import React, {Component} from "react"
import NavLink from '../../../NavLink/NavLink.js'
import "./animeItem.css"
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

export class AnimeItem extends Component{
    constructor(props,context){
        super(props,context);
    };
    handleImageLoad =() => {
        this.props.onLoadControl(this.props.pos);
    }
render(){//pictrue是封面的链接，fans是追番人数
    /*if(this.state.imageStatus == "img-responsive")
    {
        return (
            <Card loading
                cover={<img alt="example" onLoad={this.handleImageLoad} src={this.props.picture} className={this.state.imageStatus} />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description={this.props.fans}
                />
            </Card>
        )
    }*/
	
    let fansNum = "追番人数:"+this.props.fans;
    let status = (this.props.animeFinished === 1)?"未完结":"已完结";
    let path = `/spec/${this.props.sessionId}`;
    return (
        <div className={"item-margin"}>
            <Card
                cover={<img alt="example" onLoad={this.handleImageLoad} src={this.props.picture} className={'img-responsive'} />}
                actions={
                    [
                        <NavLink to={path} onClick={(e) => {window.scrollTo(0,0);}}><Icon type="setting" /></NavLink>,
                        <Icon type="edit" />,
                        <Icon type="ellipsis" />
                    ]
                }
            >
                <Meta
                    title={this.props.title}
                    description= {<div><p>{fansNum}</p><p>是否完结：{status}</p></div>}
                />
            </Card>
        </div>
    )}
}