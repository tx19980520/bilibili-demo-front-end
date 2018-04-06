import React,{Component} from 'react';
import { Jumbotron, Button } from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AnimeMedia from "./jumbtron.js";
import {connect} from "react-redux";
import * as actions from "../actions";


class DashBoard extends Component{
    constructor(props,context)
    {
        super(props,context);
        AddVote = AddVote.bind(this);
        handleDialogOpen = handleDialogOpen.bind(this);
        handleDialogClose = hanleDialogClose.bind(this);
        handleNestedDialogOpen = handleNestedDialogOpen.bind(this);
        handleNestedDialogClose = handleNestedDialogClose.bind(this);
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
                onClick={this.handleClose}
            />,
        ];
        const nestedactions = [
            <FlatButton
                label="退出"
                primary={true}
                onClick={this.handleNestedDialogClose}
            />
        ];
        return (
            <div>
                <Jumbotron>
                    {/*这个地方放我们的Media*/}
                    <AnimeMedia />
                    <p className="lead">
                        <Button color="primary" onClick={this.handleDialogOpen}>投票</Button>{/*这个也要用redux让我觉得很难受*/}
                        <Dialog
                            title="Dialog With Date Picker"
                            actions={actions}
                            modal={false}
                            open={this.props.modalSwtich}
                            onRequestClose={this.handleDialogClose}
                        >
                            {/*这个地方得有一个填入的表单，这个地方需要login*/}
                        </Dialog>
                        <Dialog
                            title="提交结果"
                            actions={nestedactions}
                            modal={false}
                            open={this.props.nestedSwtich}
                            onRequestClose={this.handleDialogClose}
                        >
                            {/*这个地方是给出一个根据现有的填写情况进行的一个推荐的表现*/}
                        </Dialog>
                    </p>
                </Jumbotron>
            </div>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        modalOpen:()=>{
            dispatch(actions.ModalOpen())
        },
        modalClose:()=>{
            dispatch(actions.ModalClose())
        },
        nestedClose:()=>{
            dispatch(actions.NestedClose())
        },
        nestedOpen:()=>{
            dispatch(actions.NestedOpen())
        },
        dataSubmit:(data)=>{
            dispatch(actions.dataSubmit(data))
        }
    }
};
const mapStateToProps = (state) =>{
    return {searchList:state.search.list}
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);