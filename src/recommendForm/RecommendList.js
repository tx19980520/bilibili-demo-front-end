import React,{Component} from "react"
import { RecommendItem } from './RecommendItem.js'
import {Row,Col} from "react-flexbox-grid"
import {Spin} from 'antd'

export default RecommendList extends Component{
	
	render(){
		if (this.props.loading){
			return(
			<Row around='md' >
			{
				this.props.recommendlist.map((anime,i) => {
					return <Col md={3} key={i}><RecommendItem anime={anime} key={i} /></Col>
				})
			}
			</Row>
			)
		}
		else{
			return (<Row around='md'  style={{display:"none"}}>
			{
				this.props.recommendlist.map((anime,i) => {
					return <Col md={3} key={i}><RecommendItem anime={anime} key={i} /></Col>
				})
			}
			</Row><div className={"loading"}><Spin /></div>)
		}
	}
}