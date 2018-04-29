import React ,{Component}from "react"
import { Pagination } from 'antd';
import {Row,Col} from "react-flexbox-grid"

 class Page extends Component{
    constructor(props,text){
        super(props,text);
        this.onChange = this.onChange.bind(this);
        this.searchChange = this.searchChange.bind(this);
    };
     onChange(pageNumber) {
         console.log(this.props);
         this.props.pageChange(pageNumber);
         window.scrollTo(0,400);
     }
     searchChange(pageNumber) {
         this.props.pageChange(this.props.word,pageNumber);
         window.scrollTo(0,400);
     }
    render(){
        return (
            <Row>
                <Col xs={12}>
                    <Row center="xs">
                        <Col xs={6} >
                            <Pagination showQuickJumper defaultCurrent={1} total={this.props.totalPage} onChange={(typeof(this.props.word) === "undefined")?this.onChange:this.searchChange} />
                        </Col>
                    </Row>
                </Col>
            </Row>
                )
    };
}

export default Page;
