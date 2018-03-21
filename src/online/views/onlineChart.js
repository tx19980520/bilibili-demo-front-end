import { TimelineChart } from 'ant-design-pro/lib/Charts';
import React ,{Component} from "react"
import {connect} from "react-redux";
import {actions as olineActions} from "../actions";
import {Row,Col} from "react-flexbox-grid"
import {onlineInit} from "../actions";

class OnlineChart extends Component{
    constructor(props,context)
    {
        super(props,context);
    }
    componentDidMount(){
        this.props.initOnline()
    }
    render(){
        return(
            <Row>
                <Col xs={12}>
                    <Row center="md">
                        <Col xs={10} >
                            <TimelineChart
                                height={400}
                                data={this.props.chartData}
                                titleMap={{ y1: '在线人数（万/人次）', y2: '观看视频人数（万/人次）' }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initOnline:()=>{
            dispatch(onlineInit())
        }
    }
};
const mapStateToProps = (state) =>{
    console.log(state.online.onlineData.data)
    return {chartData:state.online.onlineData.data}
};
export default connect(mapStateToProps, mapDispatchToProps)(OnlineChart);
