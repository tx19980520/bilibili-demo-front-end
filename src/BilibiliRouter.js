import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React,{Component}from 'react';
import { Router,Route} from "react-router-dom";
import createBrowserHistory from '../node_modules/history/createBrowserHistory'
import BilibiliHome from "./BilibiliHome.js";
import BilibiliSearch from "./BilibiliSearch.js"
import {view as BilibiliSpecific} from "./specificAnime/"
import getMuiTheme from 'material-ui/styles/getMuiTheme';

let browserHistory = createBrowserHistory();
const muiThemebtn = getMuiTheme();
export default class BilibiliRouter extends Component{
    render(){
        return(
            <MuiThemeProvider muiTheme={muiThemebtn}>
            <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
                <div>
               <Route exact path='/' component={BilibiliHome} />
               <Route exact path='/search' component={BilibiliSearch} />
               <Route exact path="/spec/:id" component={BilibiliSpecific}/>
                </div>
            </Router>
            </MuiThemeProvider>
        )
    }
}