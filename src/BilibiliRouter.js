import React,{Component}from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Redirect,Switch,Link} from "react-router-dom"
import createBrowserHistory from '../node_modules/history/createBrowserHistory'
import BilibiliHome from "./BilibiliHome.js";
import BilibiliSearch from "./BilibiliSearch.js"
let browserHistory = createBrowserHistory();
export default class BilibiliRouter extends Component{
    render(){
        return(
            <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
                <div>
               <Route exact path='/index' component={BilibiliHome} />
               <Route exact path='/search' component={BilibiliSearch} />
                    <Redirect path="/" to={{pathname: '/index'}} />
                </div>
            </Router>
        )
    }
}