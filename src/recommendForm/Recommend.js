import React, {Component} from 'react'
import { Form, AutoComplete, Icon, Input, Button } from 'antd';
import {connect} from 'react-redux'
import RecommendModal from "./RecommendModal.js"
import *as actions from "./actions.js"
import './recommend.css'
const FormItem = Form.Item;
let uuid = 0;
class DynamicFieldSet extends Component {
    constructor(props,context)
    {
        super(props,context);
        this.state = {
            select:false,
			modal:false,
			values:[]
        }
    }
	closeModal = () => {
		this.setState({modal:false})
	}
	modalOpen = () => {
		this.handleSubmit();
		this.setState({modal:true})
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

    autoChange = (value) => {
        if (value !== "")
            this.props.getAnimeList(value)
        else{
            this.props.optionMemset();
        }
    }

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
				console.log(values.names)
                this.props.submitData(values.names)
            }
        });
    }
	checkSame = (rule, value, callback) => {
		console.log(value)
			let values = this.props.form.getFieldsValue().names
			let count = 0;
			for(let i = 0, len = values.length; i < len; ++i)
			{
				if(values[i] == value)
				{
					++count
				}
				if(count == 2)
				{
					callback("含有相同的番剧");
					break;
				}
			}
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
							validator: this.checkSame,
                        }],
                    })(
                        <AutoComplete
                            onChange={this.autoChange}
                            dataSource={this.props.recommend.animeList}
                            placeholder="autocomplete"
                            style={{ width: '60%', marginRight: 8 }}
                            filterOption={false/*{(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}*/}
                        >
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
			<div>
				<Form>
					{formItems}
					<FormItem {...formItemLayoutWithOutLabel}>
						<Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
							<Icon type="plus" /> Add field
						</Button>
					</FormItem>
					<FormItem {...formItemLayoutWithOutLabel}>
						<Button type="primary" htmlType="submit" onClick={this.modalOpen}>Submit</Button>
					</FormItem>
				</Form>
				<RecommendModal open={this.state.modal} modalClose={this.closeModal}/>
			</div>
			);
    }
}
const mapStateToProps = (state) => {
    return {recommend:state.recommend}
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAnimeList:(word) => {
            dispatch(actions.fetchAnimeList(word));
        },
        submitData: (data) => {
            dispatch(actions.submitRecommend(data))
        },
        optionMemset:() => {
            dispatch(actions.fetchAnimeStart())
        }
    }
}

let WrappedDynamicFieldSet = Form.create()(connect(mapStateToProps, mapDispatchToProps)(DynamicFieldSet));
export default WrappedDynamicFieldSet;
