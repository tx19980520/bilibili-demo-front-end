import React,{Component} from "react"
import './RecommendItem.css'
import {Card} from 'antd'

export default class RecommendItem extends Component{
	render(){
		<div class="photo-wrap">
            <div class="side-front">
                <Card />{/*something will add*/}
            </div>
            <div class="side-back">
                <img src="./static/sideback.png" />
            </div>
        </div>
	}
	
} 