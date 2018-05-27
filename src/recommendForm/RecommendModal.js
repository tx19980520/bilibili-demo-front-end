import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux"
import Dialog from 'material-ui/Dialog';
import FeedBackForm from "./FeedBackForm.js"
import FlatButton from 'material-ui/FlatButton'
import RecommendList from './RecommendList.js'
import { postFeedBack, feedClose, feedOpen } from "./actions.js"
import "./RecommendModal.css"
/*
 * A modal dialog can only be closed by selecting one of the actions.
 */
 const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

class RecommendModal extends React.Component {
	state = {
		feedOpen:false
	}

    submitFeedBack = (postData) => {

    }

	handleClose = () => {
    this.props.modalClose();
	}


	postFeedBack = () => {
      this.props.postFeedBack(this.props.recommendFeedBack)
	}
	redirectHome = () => {
	    console.log(this.props.history)
        this.props.history.push("/spec/1512")
    }

  render() {
    const actions = [
      <FlatButton
        label="转身离开"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton/*for the next */
        label="请填写你的满意程度"
        primary={true}
        onClick={this.props.openFeedBack}
      />,
    ];
	
	const feedActions = [
      <FlatButton
        label="残忍离开"
        primary={true}
        onClick={this.props.closeFeedBack}
      />,
       <FlatButton
        label="投喂！"
        primary={true}
        onClick={this.postFeedBack}
        />
    ];
      const feedbackActions = [
          <FlatButton
              label="回到主页"
              primary={true}
              onClick={this.redirectHome}
          />
      ];
	
    return (
      <div>
        <Dialog
          title="欧皇来试试你的运气吧！"
          actions={actions}
          modal={true}
		  contentStyle={customContentStyle}
          open={this.props.open}
        >
          <RecommendList />
        </Dialog>
		<Dialog
          title="意见反馈"
          actions={feedActions}
          modal={true}
          open={this.props.feedOpen}
          autoScrollBodyContent={true}
        >
		<FeedBackForm submitAjax = {this.submitFeedBack}/>
        </Dialog>
          <Dialog
              title="感谢投喂"
              actions={feedbackActions}
              modal={true}
              open={this.props.feedbackOpen}
          >
              <h1 className={'text-center'}>感谢您的耐心投喂！</h1>
          </Dialog>
      </div>
	  
    );
  }
}
const mapStateToProps = (state) => ({
	recommendList: state.recommend.recommendList,
    recommendFeedBack: state.recommend.recommendFeedBack,
    feedOpen: state.recommend.feedOpen,
    feedbackOpen: (state.recommend.code===200),
})

const mapDispatchToProps = (dispatch) => {
    return {
        postFeedBack: (data) => {
            dispatch(postFeedBack(data))
        },
        closeFeedBack: () => {
          dispatch(feedClose())
        },
        openFeedBack: () =>{
            dispatch(feedOpen())
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendModal))