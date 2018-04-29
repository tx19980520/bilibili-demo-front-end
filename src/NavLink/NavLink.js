import React,{Component} from "react"
import {NavLink as Link} from "react-router-dom"
import "./navlink.css"
export default class NavLink extends Component{
    render()
    {
        return(
            <Link {...this.props} activeClassName="active"/>
        );
    }
}