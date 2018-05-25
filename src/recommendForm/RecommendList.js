import React,{Component} from "react"
import {connect} from "react-redux"
import *as actions from "./actions.js"
import RecommendItem from './RecommendItem.js'
import {Row,Col} from "react-flexbox-grid"
import {Spin} from 'antd'
import "./RecommendList.css"

class RecommendList extends Component{
	imgLoad = (pos) => {
		this.props.changeLoadStatus(pos);
	}
	render(){
		if (this.props.loading && this.props.allRight){
			if (this.props.code != 200)
			{
				return (<div className={'text-center'}><h1>Sorry, the server has some problems, pleace call at 54749110</h1></div>)
			}
			else{
				return(
				<div>
					{
						this.props.recommendList.map((anime,i) => {
							return( <Col 
										md={3}
										style={{maxHeight:400,marginBottom:25}}
										key={i}
									>
									<RecommendItem 
										imgLoad={this.imgLoad} 
										anime={anime} 
										key={i}
										pos={i}
									/>
									</Col>)
						})
					}
				</div>
				)	
			}
		}
		else if (!this.props.loading){
		return(
			<div className={"loading"}>
				<Spin />
			</div>)
		}
		else if (this.props.loading && !this.props.allRight) {
			return (
			<div>
				<Row around='md'  style={{display:"none"}}>
				{
					this.props.recommendList.map((anime,i) => {
						return( 
						<Col 
							md={3} 
							key={i}
						>
							<RecommendItem 
								imgLoad={this.imgLoad}
								anime={anime} 
								key={i} 
							/>
						</Col>
						)
					})
				}
				</Row>
				<div className={"loading"}>
					<Spin />
				</div>
			</div>)
		}
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoadStatus: (pos) => {
            dispatch(actions.loadStatus(pos))
        },
        
    }
};
const mapStateToProps = (state) => {
	
    return {allRight:state.recommend.allRight, 
			recommendList:state.recommend.recommendList,
			loading:state.recommend.postover,
			code:state.recommend.postcode}
};
export default connect(mapStateToProps, mapDispatchToProps)(RecommendList); 