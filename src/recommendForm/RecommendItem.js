import React,{Component} from "react"
import { withRouter } from "react-router-dom"
import { Card } from 'antd'
import './RecommendItem.css'
const { Meta } = Card

 class RecommendItem extends Component{
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
		let status = (animeFinished === 2)?'是':'否'
		return (
		<div className={"photo-wrap"} style={{WebkitTransform:`rotateY(${this.state._deg}deg)`}} onClick={this.overTurn}>
			<div className={"side-back"}>
                <Card
                cover={<img alt="cover" onLoad = {this.handleLoading}  src={path} className={'img-responsive'} onClick={() => {this.props.history.push(redirect)}} />}
				>
                <Meta
                    title={animeTitle}
                    description= {<div><p>{fans}</p><p>是否完结：{status}</p></div>}
                />
            </Card>
            </div>
            <div className={"side-front"}>
                <img src="./full/sideback.png" alt="sideback" />
            </div>
        </div>
	)}
	
}
export default withRouter(RecommendItem)