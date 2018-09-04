import React from "react"
import { connect } from "react-redux"
import FlatButton from 'material-ui/FlatButton'
import * as actions from "./actions.js"
import { Table, Badge } from 'antd';
import {Row, Col} from "react-flexbox-grid"
import "./feedbackController.css"

class FeedBackController  extends React.Component{
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };
    componentDidMount = () => {
        this.props.fetchFeedback(false);
    }

    mergeFeedback = () => {
        alert("功能暂不对外开放")
        //this.props.mergeFeedback(this.props.selectedRowKeys)
    }

    deleteFeedback = () => {
        alert("功能暂不对外开放")
        this.props.deleteFeedback(this.props.selectedRowKeys)
    }

	render(){
        const { selectedRowKeys } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.props.onSelectChange,
            hideDefaultSelections: true,
            selections: [{
                key: 'all-data',
                text: 'Select All Data',
                onSelect: () => {
                    this.setState({
                        selectedRowKeys: [...Array(10).keys()], // 0...10
                    });
                },
            }, {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }, {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    this.setState({ selectedRowKeys: newSelectedRowKeys });
                },
            }],
            onSelection: this.onSelection,
        };
        const expandedRowRender = (record) => {
            const columns = [
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Status', key: 'status', dataIndex: "status" ,
                    render:(status)=>{
                    const pin = (status === "recommend")?<span><Badge status="success" />{status}</span>: <span><Badge status="processing" />{status}</span>
                        return pin
                }
                    },
                { title: 'Score', dataIndex: 'score', key: 'score' },
            ];
            let recommendData = record.recommendList.map((item, i) => {
                return ({
                    key: i*-1,
                    name:item.animeTitle,
                    status:'recommend',
                    score: `${item.score}`,
                });
            });
            let animeData = record.animeList.map((item, i) => {
                return ({
                    key: i+record.recommendList.length,
                    name:item,
                    status:'raw',
                    score: '-',
                });
            });
            let data = animeData.concat(recommendData);
            return (
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            );
        };

        const columns = [
            { title: 'ID', dataIndex: 'ID', key: 'ID' },
            { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
            { title: 'IsMerge', dataIndex:'IsMerge' ,key: 'IsMerge'},
        ];
        const CURDgroups = <Row around="xs" style={{ marginTop:"20" }}>
            <Col xs={3}>
            <FlatButton style={{ width: "100%" }} label = "Merge"  onClick = {this.mergeFeedback}/>
            </Col>
            <Col xs={3}>
            <FlatButton style={{ width: "100%" }} label = "Delete" onClick = {this.deleteFeedback}/>
            </Col>
            </Row>
        // 注意下我们的数据的产生主要是在一次性产生，因而要注意
        const data = this.props.data.map((item) => {
            return {
                key:item._id,
                createdAt: new Date(item.date).toLocaleString(),
                IsMerge: (item.merge)?"是":"否",
                ID: item._id,
                animeList:item.animeList,
                recommendList:item.recommendList
            }
        })

        /*let contain;
        if (this.props.feedbackWord === "waiting")
        {
            contain = <Spin />
        }
        else{
            contain = <div className={"text-center"}>{this.props.feedbackWord}</div>
        }
        */

        return (
            <div>
                <Table
                    rowSelection={rowSelection}
                    className="components-table-demo-nested"
                    columns={columns}
                    expandedRowRender={expandedRowRender}
                    dataSource={data}
                />
                {CURDgroups}
            </div>
        );
	}

}
const mapStateToProps = (state) => {
    let waitOpen = (state.feedback.deleteCode === 303 || state.feedback.postCode === 303 || state.feedback.mergeCode === 303)
    let feedbackOpen = (state.feedback.deleteCode !== 304 || state.feedback.postCode !== 304 || state.feedback.mergeCode === 304)// 304 才不开启
    let errorOpen = (state.feedback.deleteCode === 404 || state.feedback.postCode === 404 || state.feedback.mergeCode === 404)
    let feedbackWord = "真的就没变过";
    if (feedbackOpen) {
        feedbackWord = "操作成功"
    }
    else if (errorOpen) {
        feedbackWord = "出错啦，快去鞭策下程序员"
    }
    else if (waitOpen) {
        feedbackWord = "waiting"
    }

    return {
		feedbackData: state.feedback.data,
        feedbackOpen: feedbackOpen,
        feedbackWord: feedbackWord,
        selectedRowKeys: state.feedback.selectedRowKeys,
        data: state.feedback.feedbackData,
	}
}
const mapDispatchToProps = (dispatch) =>{
	return {
	    feedbackClose: () => {
            dispatch(actions.feedClose())
        },
        fetchFeedback: (model) => {
	        dispatch(actions.fetchFeedback(model))
        },
        mergeFeedback: (selected) => {
	        dispatch(actions.mergeFeedback(selected))
        },
        deleteFeedback: (selected) => {
	        dispatch(actions.deleteFeedback(selected))
        },
        onSelectChange: (selectedRowKeys) => {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            dispatch(actions.selectChange(selectedRowKeys));
        },

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedBackController)