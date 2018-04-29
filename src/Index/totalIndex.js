import React,{Component} from "react";
import {connect} from "react-redux";
import Page from './views/page.js';
import AnimeList from './views/animeView/AnimeList'
import Complete from './views/autocomplete.js';
import {view as Online} from "../online/"
import * as actions from "./actions.js"
import {Spin} from 'antd';
import "./totalIndex.css"
class IndexPage extends Component {
    constructor(props)
    {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.wordPageChange = this.wordPageChange.bind(this);
        this.state = {
          "nowword":""
        };
    }
    componentDidMount(){
        this.props.initPage();
        this.props.initAnimeData();
    };
    changePage = (page) => {
        this.props.onPageChange(page)
    };
    wordPageChange = (word) =>{
        console.log("nowword",word);
        this.setState({"nowword":word});
        this.props.wordChange(word);
    };
    render() {
        console.log("searchstart",this.props.index.searchstart);
        console.log("pagessearch",this.props.index.pagesearch);
        console.log("now,word",this.state.word);
        this.page = (this.props.index.pagesearch)?<Page word={this.state.nowword} pageChange={this.props.wordChange} totalPage={this.props.index.page}/>:<Page pageChange={this.changePage} totalPage={this.props.index.page}/>;
        this.animes =(!this.props.index.reload ) ?<AnimeList list={this.props.index.animeslist}/>:<div className={"loading"}><Spin /></div>;
        return (
            <div>
                <Online />
                <Complete searchChange={this.wordPageChange} searchList={this.props.index.searchList} />
                <div className={"animes"}>
                    {this.animes}
                    {this.page}
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onPageChange: (page) => {
            dispatch(actions.fetchAnimebyPage(page))
        },
        initPage: () => {
            dispatch(actions.fetchPage())
        },
        initAnimeData: () => {
            dispatch(actions.fetchAnime());
        },
        wordChange: (word,page=1)=> {
            dispatch(actions.searchWord(word,page));
        },
    }
};
const mapStateToProps = (state) =>{
    return {index:state.index}
};
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);