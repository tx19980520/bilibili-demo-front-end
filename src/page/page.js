import {actions as animeActions} from "../anime/"
import React ,{Component}from "react"
import {connect} from "react-redux"
import { Pagination } from 'antd';
import {Row,Col} from "react-flexbox-grid"
import {fetchPage} from "./actions.js";

 class Page extends Component{
    constructor(props,text){
        super(props,text)
        this.onChange = this.onChange.bind(this)
    };
    componentDidMount(){
        this.props.initPage()
    };
     onChange(pageNumber) {
         this.props.onPageChange(pageNumber);
     }
    render(){
        return (
            <Row>
                <Col xs={12}>
                    <Row center="xs">
                        <Col xs={6} >
                            <Pagination showQuickJumper defaultCurrent={1} total={this.props.totalPage} onChange={this.onChange} />
                            </Col>
                    </Row>
                </Col>
            </Row>
                )
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPageChange: (page) => {
            dispatch(animeActions.fetchAnimebyPage(page))
        },
        initPage:()=>{
            dispatch(fetchPage())
    }
    }
};
 const mapStateToProps = (state) =>{
     return {totalPage:state.page.page.pages}
 }
export default connect(mapStateToProps, mapDispatchToProps)(Page);
