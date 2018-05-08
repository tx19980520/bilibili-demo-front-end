import React ,{Component}from "react"
import { Icon, Button, Input, AutoComplete } from 'antd';
import {Row,Col} from "react-flexbox-grid"
import "./search.css"


class Complete extends Component {

    constructor(context,props)
    {
        super(context,props);
        this.state={
            value:""
        }
    }
    clickSearchButton = () => {
        if(this.state.value !== "")
        {
            this.search(this.state.value)
        }
        else{
            alert("搜索信息不能为空");
        }

    };

    render(){
        return (
            <div style={{display:'block'}}>
                <Row>
                    <Col xs={12}>
                        <Row center="xs">
                            <Col xs={6} ><div className="global-search-wrapper" >
                                <AutoComplete
                                    className="global-search"
                                    size="large"
                                    style={{ width: '100%' }}
                                    onChange={this.props.searchChange}
                                    dataSource={this.props.searchList}
                                    placeholder="请输入你想输入搜索的内容"
                                    filterOption={false/*{(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}*/}
                                >
                                    <Input value={this.state.value}
                                        suffix={(
                                            <Button className="search-btn" size="large" type="primary" onClick={this.clickSearchButton}>
                                                <Icon type="search" />
                                            </Button>
                                        )}
                                    />
                                    </AutoComplete>
                            </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );}
}

export default Complete;