import React from 'react';
import { createForm, createFormField } from 'rc-form';
import { connect } from "react-redux"
import {
  Form, Rate,
} from 'antd';
import {saveField} from "./actions.js";
const FormItem = Form.Item;
class FeedBack extends React.Component{
     render(){
	    const { getFieldDecorator } = this.props.form;
	    return (
            <Form >
                {// 这个地方还没有实现双向绑定
                    this.props.recommendList.map( (recommend, i) => {
                        return(
                            <FormItem
                                key={i}
                                label={recommend.animeTitle}
                            >
                                {getFieldDecorator(recommend.animeTitle, {
                                    initialValue: 3.0,
                                })(
                                    <Rate />
                                )}
                            </FormItem>
                        )
                    })
                }
            </Form>
        )
     }
}
const mapStateToProps = (state) => ({
	recommendList: state.recommend.recommendList,
    recommendFeedBack: state.recommend.recommendFeedBack
})

export default connect(mapStateToProps, null)(createForm({
    mapPropsToFields(props) {
        console.log('mapPropsToFields', props);
        return {
            recommendFeedBack: createFormField(props.recommendFeedBack),
        };
    },
    onFieldsChange(props, fields) {
        console.log('onFieldsChange', fields);
        props.dispatch(saveField(fields));
    },
})(FeedBack)); // connect(mapStateToProps, null)(FeedBack)