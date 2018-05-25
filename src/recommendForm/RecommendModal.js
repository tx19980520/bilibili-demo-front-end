import React from 'react';
import { connect } from "react-redux"
import Dialog from 'material-ui/Dialog';
import FeedBackForm from "./FeedBackForm.js"
import FlatButton from 'material-ui/FlatButton'
import RecommendList from './RecommendList.js'
import {postFeedBack} from "./actions.js"
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

	openFeedBack = () => {
	  this.setState({feedOpen:true})
	}

	closeFeedBack = () => {
	  this.setState({feedOpen:false})
	}

  render() {
    const actions = [
      <FlatButton
        label="转身离开"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton/*for the next */
        label="请填写你的满意程度"
        primary={true}
        onClick={this.openFeedBack}
      />,
    ];
	
	const feedActions = [
      <FlatButton
        label="残忍离开"
        primary={true}
        onClick={this.closeFeedBack}
      />,
       <FlatButton
        label="投喂！"
        primary={true}
        onClick={this.props.postFeedBack}
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
          open={this.state.feedOpen}
          autoScrollBodyContent={true}
        >
		<FeedBackForm submitAjax = {this.submitFeedBack}/>
        </Dialog>
      </div>
	  
    );
  }
}
const mapStateToProps = (state) => ({
	recommendList:state.recommend.recommendList
})

const mapDispatchToProps = (dispatch) => {
    return {
        postFeedBack: (data) => {
            dispatch(postFeedBack(data))
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendModal)