import React, {Component}from 'react'
import { Form, AutoComplete, Icon, Input, Button } from 'antd';
import {connect} from 'react-redux'
import *as actions from "./actions.js"
import './recommend.css'
import Complete from '../Index/views/autocomplete.js'
const FormItem = Form.Item;
const AutoOption = AutoComplete.Option;
let uuid = 0;
class DynamicFieldSet extends Component {
    constructor(props,context)
    {
        super(props,context);
        this.state={
            test:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.autoChange = this.autoChange.bind(this);
    }
    test = ()=>{
        fetch('/api/getAnime').then(response =>{
            response.json().then(
            (rjs) => {this.setState({test:rjs})
            })
        })
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    autoChange = (value) =>{
        if(value !== "")
            this.props.getAnimeList(value)
        else{
            this.props.Optionmemset();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submitData(values.names)
            }
        });
    }

    render() {
        this.test();
        console.log(this.state.test);
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        console.log(this.props.recommend)
        const Options = this.props.recommend.animelist.map((anime,i)=>{
            return(<AutoOption key={i}>{anime}</AutoOption>)
        })

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '番剧' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`names[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入一个正确的番剧名称",

                        }],
                    })(
                        <AutoComplete
                            onChange={this.autoChange}
                            dataSource={Options}
                            placeholder="autocomplete"
                            style={{ width: '60%', marginRight: 8 }} >
                            <Input />
                        </AutoComplete>
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}
const mapStateToProps = (state) => {
    return {recommend:state.recommend}
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAnimeList:(word)=>{
            dispatch(actions.FetchAnimeList(word));
        },
        submitData: (data)=>{
            dispatch(actions.SubmitRecommend(data))
        },
        Optionmemset:()=>{
            dispatch(actions.FetchAnimeStart())
        }
    }
}

let WrappedDynamicFieldSet = Form.create()(connect(mapStateToProps, mapDispatchToProps)(DynamicFieldSet));
export default WrappedDynamicFieldSet;