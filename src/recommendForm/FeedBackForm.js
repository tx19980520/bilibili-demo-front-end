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
         let formItemList = [];
         const { getFieldDecorator } = this.props.form;
         for(let i = 0, len = this.props.recommendFeedBack.length; i < len; ++i)
         {
             formItemList.push(<FormItem
                 key={i}
                 label={this.props.recommendFeedBack[i].animeTitle}
             >
                 {getFieldDecorator(this.props.recommendFeedBack[i].animeTitle, {
                     initialValue: 3.0,
                 })(
                     <Rate />
                 )}
             </FormItem>)
         }
	    return (
            <Form >
                {
                    formItemList
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
        // console.log('mapPropsToFields', props);
        return {
            recommendFeedBack: createFormField(props.recommendFeedBack),
        };
    },
    onFieldsChange(props, fields) {
        console.log('onFieldsChange', fields);
        props.dispatch(saveField(fields));
    },
})(FeedBack)); // connect(mapStateToProps, null)(FeedBack)