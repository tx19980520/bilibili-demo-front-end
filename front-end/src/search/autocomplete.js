import React ,{Component}from "react"
import {connect} from "react-redux"
import { Icon, Button, Input, AutoComplete } from 'antd';
import {Row,Col} from "react-flexbox-grid"
import {actions as animeActions} from "./action.js"
import "./search.css"
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;


const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

class Complete extends Component {

    constructor(context,props)
    {
        super(context,props);


    }
    render(){
        return (
            <Row>
                <Col xs={12}>
                    <Row center="xs">
                        <Col xs={6} ><div className="global-search-wrapper" >
                            <AutoComplete
                                className="global-search"
                                size="large"
                                style={{ width: '100%' }}
                                dataSource={dataSource}
                                placeholder="try to type `b`"
                                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                            >
                                <Input
                                    suffix={(
                                        <Button className="search-btn" size="large" type="primary">
                                            <Icon type="search" />
                                        </Button>
                                    )}
                                />
                            </AutoComplete>
                        </div></Col>
                    </Row>
                </Col>
            </Row>
        );}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPageChange: (page) => {
            //dispatch(animeActions.fetchAnimebyPage(page))
        },
        initPage:()=>{
            //dispatch(fetchPage())
        }
    }
};
const mapStateToProps = (state) =>{
    return {totalPage:state.page.page.pages}
}
export default connect(mapStateToProps, mapDispatchToProps)(Complete);