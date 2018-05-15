import React from 'react';
import { connect } from "react-redux"
import Dialog from 'material-ui/Dialog';
import FeedBackForm from "./FeedBackForm.js"
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import RecommendList from './RecommendList.js'
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
	handleClose = () => {
    this.props.modalClose();
	};
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
          actions={actions}
          modal={true}
          open={this.state.feedOpen}
        >
		<FeedBackForm />
        </Dialog>
      </div>
	  
    );
  }
}
const mapStateToProps = (state) => {
	recommendList:state.recommend.recommendList
}
export default connect(mapStateToProps, null)(RecommendModal)