import React,{Component} from "react"
import NavLink from '../NavLink/NavLink.js'
import { Card, Icon, Avatar } from 'antd'
import './RecommendItem.css'
const { Meta } = Card

export default class RecommendItem extends Component{
	state={
		_deg:0
	}
	overTurn = () => {
		this.setState({_deg:180})
	}
	handleLoading = () => {
		this.props.imgLoad(this.props.pos);
	}
	render(){
		let {animeFinished, animePicturePath, _id, fans, animeTitle} = this.props.anime
		let path =  `/${animePicturePath}`;
		let redirect = `/spec/${_id}`
		let status = (animeFinished == 2)?'是':'否'
		return (
		<div className={"photo-wrap"} style={{WebkitTransform:`rotateY(${this.state._deg}deg)`}} onClick={this.overTurn}>
			<div className={"side-back"}>
                <Card
                cover={<img alt="cover" onLoad = {this.handleLoading}  src={path} className={'img-responsive'} />}
                actions={
                    [
                        <NavLink 
							to={redirect} 
							onClick={(e) => {window.scrollTo(0,0);}}>
							<Icon type="setting" />
						</NavLink>,
                        <Icon type="edit" />,
                        <Icon type="ellipsis" />
                    ]
                }
				>
                <Meta
                    title={this.props.title}
                    description= {<div><p>{fans}</p><p>是否完结：{status}</p></div>}
                />
            </Card>
            </div>
            <div className={"side-front"}>
                <img src="./static/sideback.png" />
            </div>
        </div>
	)}
	
} 