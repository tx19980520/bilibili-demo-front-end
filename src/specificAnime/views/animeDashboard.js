import React,{Component} from 'react';
import { Jumbotron } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AnimeMedia from "./jumbtron.js";
import {connect} from "react-redux";
import * as funcactions from "../actions";
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim';
import RaisedButton from 'material-ui/RaisedButton';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import Icon from 'antd/lib/icon';
import "./bugumiList.css"

class Episode extends Component
{
    constructor(props,context)
    {
        super(props,context);
        this.bugumiLoad = this.bugumiLoad.bind(this);
        this.state = {
            picOpen: {},
        };
    }
    bugumiLoad = (e) =>
    {
        e.target.style.visibility = "";
    };
    onImgClick = (e, i) => {
        const { picOpen } = this.state;
        Object.keys(picOpen).forEach((key) => {
            if (key !== i && picOpen[key]) {
                picOpen[key] = false;
            }
        });
        picOpen[i] = true;
        this.setState({
            picOpen,
        });
    };

    onClose = (e, i) => {
        const { picOpen } = this.state;
        picOpen[i] = false;
        this.setState({
            picOpen,
        });
    };

    onTweenEnd = (i) => {
        const { picOpen } = this.state;
        delete picOpen[i];
        this.setState({
            picOpen,
        });
    };

    getDelay = (e) => {
        let dataArray = this.props.episodes;
        const i = e.index + dataArray.length % 4;
        return (i % 4) * 100 + Math.floor(i / 4) * 100 + 200;
    };

    getLiChildren = () => {/*
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2}>
      {data.episodes.map((tile,i) => (
        <GridTile
          key={tile.cover}
          title={tile.index_title}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={tile.cover} />
        </GridTile>
      ))}
    </GridList>
  </div>*/
        let dataArray = this.props.episodes;
        const imgWidth = 110;
        const imgHeight = 76;
        const imgBoxWidth = 130;
        const imgBoxHeight = 96;
        const linenum = 4;
        return dataArray.map((item, i) => {
            const content =item.index_title;
            const title = `第${item.index}`;
            const image = '/full/00a99023475d8e885b63dc46d7881ea31c281d2e.jpg';
            const isEnter = typeof this.state.picOpen[i] === 'boolean';
            const isOpen = this.state.picOpen[i];
            const left = isEnter ? 0 : imgBoxWidth * (i % linenum);
            const imgLeft = isEnter ? imgBoxWidth * (i % linenum) : 0;
            const isRight = Math.floor((i % linenum) / (linenum/2));
            const isTop = Math.floor(i / linenum);
            let top = isTop ? (isTop - 1) * imgBoxHeight : 0;
            top = isEnter ? top : imgBoxHeight * isTop;
            let imgTop = isTop ? imgBoxHeight : 0;
            imgTop = isEnter ? imgTop : 0;

            const liStyle = isEnter ? { width: '100%', height: 175, zIndex: 1 } : null;
            const liAnimation = isOpen ?
                ({ boxShadow: '0 2px 8px rgba(140, 140, 140, .35)' }) :
                ({ boxShadow: '0 0px 0px rgba(140, 140, 140, 0)' });
            let aAnimation = isEnter ?
                ({
                    delay: 400,
                    ease: 'easeInOutCubic',
                    width: imgWidth,
                    height: imgHeight,
                    onComplete: this.onTweenEnd.bind(this, i),
                    left: imgBoxWidth * (i % linenum),
                    top: isTop ? imgBoxHeight : 0,
                }) : null;
            aAnimation = isOpen ?
                ({
                    ease: 'easeInOutCubic',
                    left: isRight ? (imgBoxWidth * 2) - 10 : 0,
                    width: '50%',
                    height: 175,
                    top: 0,
                }) : aAnimation;

            // 位置 js 控制；
            return (
                <TweenOne
                    key={i}
                    style={{
                        left,
                        top,
                        ...liStyle,
                    }}
                    component="li"
                    className={isOpen ? 'open' : ''}
                    animation={liAnimation}
                >
                    <TweenOne
                        component="a"
                        onClick={e => this.onImgClick(e, i)}
                        style={{
                            left: imgLeft,
                            top: imgTop,
                            height:imgHeight,
                            width:imgWidth
                        }}
                        animation={aAnimation}
                    >
                        <img src={image} alt="bugumi pic" onLoad={this.bugumiLoad}  width="100%" height="100%" />
                    </TweenOne>
                    <TweenOneGroup
                        enter={[
                            {
                                opacity: 0, duration: 0, type: 'from', delay: 400,
                            },
                            { ease: 'easeOutCubic', type: 'from', left: isRight ? '50%' : '0%' },
                        ]}
                        leave={{ ease: 'easeInOutCubic', left: isRight ? '50%' : '0%' }}
                        component=""
                    >
                        {isOpen && (
                            <div
                                className={`${this.props.classname}-text-wrapper`}
                                key="text"
                                style={{
                                    left: isRight ? '0%' : '50%',
                                }}
                            >
                                <h1>{title}</h1>
                                <Icon type="cross" onClick={e => this.onClose(e, i)} />
                                <em />
                                <p>{content}</p>
                            </div>
                        )}
                    </TweenOneGroup>
                </TweenOne>
            );
        });
    };

 render(){
    let hei = Math.ceil(this.props.episodes.length/4)*130;
    return(
                <div className={`${this.props.classname}-wrapper`}>
                    <div className={this.props.classname}
                         style={{
                             marginBottom:30+'px',
                             height:hei
                    }}>
                    <QueueAnim type="bottom" className={`${this.props.classname}-title`}>
                        <h1 key="h1">番剧列表</h1>
                    </QueueAnim>
                    <div className={"anime-wrap"}>
                        <QueueAnim
                            delay={this.getDelay}
                            component="ul"
                            className={`${this.props.classname}-image-wrapper`}
                            interval={0}
                            type="bottom"
                        >
                            {this.getLiChildren()}
                        </QueueAnim>
                    </div>
                </div>
           </div>
)}}

class DashBoard extends Component{
    constructor(props,context)
    {
        super(props,context);
        this.AddVote = this.AddVote.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleNestedDialogOpen = this.handleNestedDialogOpen.bind(this);
        this.handleNestedDialogClose = this.handleNestedDialogClose.bind(this);
    }
    componentDidMount()
    {
        this.props.initData(this.props.match.params["id"]);
    }
    handleDialogOpen = () =>{
        this.props.modalOpen();
    };
    handleDialogClose = () =>{
        this.props.modalClose();
    };
    handleNestedDialogOpen = () =>{
        this.props.nestedOpen()
    };
    handleNestedDialogClose = () =>{
        this.props.nestedClose()
    };
    AddVote=()=>{
        /*to do the ajax request*/
        let data = {};
        this.props.dataSubmit(data);
        this.handleNestedDialogOpen();

    };
    render() {
        const actions = [
            <FlatButton
                label="为本AI喂口粮食吧"
                primary={true}
                keyboardFocused={true}
                onClick={this.AddVote}//不仅要ajax，并且还要跳出，投票成功
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleDialogClose}
            />,
        ];
        const nestedactions = [
            <FlatButton
                label="退出"
                primary={true}
                onClick={this.handleNestedDialogClose}
            />
        ];
        console.log(this.props.specific);
        return (
            <div>
                <Jumbotron>
                    {/*这个地方放我们的Media*/}
                    <AnimeMedia
						data={this.props.specific.result}
                        allright={this.props.specific.all_ready}
					/>
                    <div className="lead">
                        <div className={"lead-button"}>
                        <RaisedButton label="投票" primary={true}  onClick={this.handleDialogOpen} />
                        </div>
                        {/*这个也要用redux让我觉得很难受*/}
                        <Dialog
                            title="Dialog With Date Picker"
                            actions={actions}
                            modal={false}
                            open={this.props.specific.modalSwitch}
                            onRequestClose={this.handleDialogClose}
                        >
                            {/*这个地方得有一个填入的表单，这个地方需要login*/}
                        </Dialog>
                        <Dialog
                            title="提交结果"
                            actions={nestedactions}
                            modal={false}
                            open={this.props.specific.nestedSwitch}
                            onRequestClose={this.handleDialogClose}
                        >
                            {/*这个地方是给出一个根据现有的填写情况进行的一个推荐的表现*/}
                        </Dialog>
                    </div>
                </Jumbotron>
                <Episode episodes={this.props.specific.result.specific.episodes} classname={"pic-details-demo"}/>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        modalOpen:()=>{
            dispatch(funcactions.ModalOpen())
        },
        modalClose:()=>{
            dispatch(funcactions.ModalClose())
        },
        nestedClose:()=>{
            dispatch(funcactions.NestedClose())
        },
        nestedOpen:()=>{
            dispatch(funcactions.NestedOpen())
        },
        dataSubmit:(data)=>{
            dispatch(funcactions.dataSubmit(data))
        },
        initData:(animeId)=>{
            dispatch(funcactions.specData(animeId))
        }
    }
};
const mapStateToProps = (state) =>{
    return {specific:state.specific}
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashBoard));