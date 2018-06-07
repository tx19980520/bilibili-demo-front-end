import React, { Component } from 'react'
import { Form, AutoComplete, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux'
import RecommendModal from "./RecommendModal.js"
import *as actions from "./actions.js"
import './recommend.css'
import {createForm, createFormField} from "rc-form";
const FormItem = Form.Item;
let uuid = 0;
class DynamicFieldSet extends Component {

    constructor(props,context)
    {
        super(props,context);
        this.state = {
			modal:false,
            errormMdal: false,
			values:[]
        }
    }
	closeModal = () => {
        // flash the post data
        this.props.flushData()
		this.setState({modal:false})
	}

    remove = (k) => {// k is the array index not value
        const { form } = this.props;
        // can use data-binding to get
        let keys = form.getFieldValue('keys');
        let values = form.getFieldValue('values');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        let nextKeys;
        let nextValues;
        if (k === keys.length) {
            nextKeys = keys.slice(0,-1)
            nextValues = values.slice(0, -1)
        }
        else{
            nextKeys = keys.slice(0, k).concat(keys.slice(k+1))
            nextValues = values.slice(0, k).concat(values.slice(k+1))
        }

        form.setFieldsValue({
            keys: nextKeys,
            values: nextValues
        });
    };

    flushSearch = () => {
        this.props.flushSearch()
    }

    add = () => {
        this.flushSearch()
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const values = form.getFieldValue('values');
        const nextValues = values.concat([""])
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
            values: nextValues
        });
    }

    autoChange = (value) => {
        if (value !== "")
            this.props.getAnimeList(value)
        else{
            this.props.optionMemset();
        }
    }

    handleSubmit = () => {
        let options = {
            first:true
        }
        this.props.form.validateFields(options,(err, values) => {
            console.log("err",err)
            if (!err) {
                this.setState({modal:true})
                this.props.submitData(values.values)
            }
            else{
                alert(err["0"].errors["0"].message)
            }

        });
    }
	checkSame = (rule, value, callback) => {
			let values = this.props.form.getFieldValue("values")
			let count = 0;
			if(value === "")
            {
                callback("请勿留下空白")
                return;
            }
            if(values.length < 2)
            {
                callback("请填写两个以上的番剧，最好超过5个");
                return ;
            }
			for(let i = 0, len = values.length; i < len; ++i)
			{
				if(values[i] === value)
				{
					++count
				}
				if(count === 2)
                {
					callback('含有相同的番剧')
					return;
				}
			}
            callback();
			return;
			/*(err, values) => {
			console.log('Received values of form: ', values);
			if (values.name.indexOf(value) >= 0){
				callback("已有同名番剧，请换一个")
			}
		};
		*/
	}

    render() {
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
        /*const Options = this.props.recommend.animeList.map((anime,i) => {
            return(<AutoOption key={i}>{anime}</AutoOption>)
        })*/

        getFieldDecorator('keys', { initialValue: this.props.recommend.postKeys });
        getFieldDecorator('values',{ initialValue: this.props.recommend.postList })
        const keys = getFieldValue('keys');
        const values = getFieldValue("values")
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '番剧' : ''}
                    required={true}
                    key={k}
                >
                    {getFieldDecorator(`${index}`, {
                        initialValue: values[index],
                        validateTrigger: ['onChange'],
                        rules: [{
                            required: true,
                            whitespace:true,
                            validator: this.checkSame,
                        }],
                    })(
                        <AutoComplete
                            onChange={this.autoChange}
                            dataSource={this.props.recommend.animeList}
                            placeholder="请根据提示输入一个正确的番剧名称"
                            style={{ width: '60%', marginRight: 8 }}
                            filterOption={false/*{(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}*/}
                        >
                            <Input value={values[index]} />
                        </AutoComplete>
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(index)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        return (
			<div>
				<Form>
					{formItems}
					<FormItem {...formItemLayoutWithOutLabel}>
						<Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
							<Icon type="plus" /> Add field
						</Button>
					</FormItem>
					<FormItem {...formItemLayoutWithOutLabel}>
						<Button type="primary" htmlType="submit" onClick={this.handleSubmit}>Submit</Button>
					</FormItem>
				</Form>
				<RecommendModal open={this.state.modal} modalClose={this.closeModal}/>
			</div>
			);
    }
}
const mapStateToProps = (state) => {
    return {recommend: state.recommend}
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAnimeList:(word) => {
            dispatch(actions.fetchAnimeList(word));
        },
        submitData: (data) => {
            dispatch(actions.submitRecommend(data))
        },
        optionMemset: () => {
            dispatch(actions.fetchAnimeStart())
        },
        flushData: () => {
            dispatch(actions.flushData())
        },
        flushSearch: () => {
            dispatch(actions.flushSearch())
        },
        modifyPostList: (array) => {
            dispatch(actions.modifyPostList(array))
        },
        modifyPostKey: (keys) => {
            dispatch(actions.modifyPostKey(keys))
        },
        changePostList: (pos, word) => {
            dispatch(actions.changePostList(pos, word))
        },
    }
}

let WrappedDynamicFieldSet =connect(mapStateToProps, mapDispatchToProps)(createForm({
    mapPropsToFields(props) {
        console.log('mapPropsToFields', props);
        return {
            keys: createFormField(props.recommend.postKeys),
            values: createFormField(props.recommend.postList)
        };
    },
    onFieldsChange(props, fields) {
        console.log('onFieldsChange', fields);
        let fieldkey = Object.keys(fields)
        console.log(fieldkey)
        if (fieldkey.indexOf("keys") !== -1)
            props.modifyPostKey(fields.keys.value) // just cover the array
        if (fieldkey.indexOf("values") !== -1)
        {
            props.modifyPostList(fields.values.value)
         }
        else{
            props.changePostList(parseInt(fieldkey[0],10),fields[fieldkey[0]].value)
        }

    },
})(DynamicFieldSet));
export default WrappedDynamicFieldSet;
