import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import RecommendList from './RecommendList.js'
/*
 * A modal dialog can only be closed by selecting one of the actions.
 */
 const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};
class RecommendModal extends React.Component {
  state = {
	  open:this.props.open
  }
  handleClose = () => {
    this.setState({open: false});
  };

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
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="欧皇来试试你的运气吧！"
          actions={actions}
          modal={true}
		  contentStyle={customContentStyle}
		  autoScrollBodyContent={true}
          open={this.props.open}
        >
          <RecommendList/>
        </Dialog>
      </div>
    );
  }
}
export default RecommendModal