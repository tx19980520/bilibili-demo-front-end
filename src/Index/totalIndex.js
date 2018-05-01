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
        this.onLoadSystem = this.onLoadSystem.bind(this);
        this.state = {
          "nowword":""
        };
    }
    onLoadSystem(pos) {
        this.props.changeLoad(pos);// 在reducer 那一层去控制总开关
    }
    componentDidMount(){
        this.props.initPage();
        this.props.initAnimeData();
    };
    changePage = (page) => {
        this.props.onPageChange(page)
    };
    wordPageChange = (word) =>{
        this.setState({"nowword":word});
        if(word === "")
        {
            this.props.initAnimeData();
            this.props.initPage();
        }
        else{
            this.props.wordChange(word);
        }
    };
    render() {

        this.page = (this.props.index.pagesearch)?<Page word={this.state.nowword} pageChange={this.props.wordChange} totalPage={this.props.index.page}/>:<Page pageChange={this.changePage} totalPage={this.props.index.page}/>;
        this.animes =(!this.props.index.reload ) ?<AnimeList allright={this.props.index.allright} onLoadSystem={this.props.changeLoad} list={this.props.index.animeslist}/>:<div className={"loading"}><Spin /></div>;
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
        changeLoad: (pos)=> {
            dispatch(actions.LoadChange(pos));
        }
    }
};
const mapStateToProps = (state) =>{
    return {index:state.index}
};
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);