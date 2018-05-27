import React from 'react';
import { createForm, createFormField } from 'rc-form';
import {connect} from "react-redux"
import {
  Form, Rate,
} from 'antd';
import {saveField} from "./actions.js";
const FormItem = Form.Item;
class FeedBack extends React.Component{
	handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
		 this.props.submitAjax(values)
      }
    });
  }

	render(){
		const { getFieldDecorator } = this.props.form;
		return (
		<Form onSubmit={this.handleSubmit}>
		{
			this.props.recommendList.map( (recommend, i) => {
				return(	
					<FormItem
					  label={recommend.animeTitle}
					>
					  {getFieldDecorator(recommend.animeTitle, {
						initialValue: 3.5,
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

export default connect(mapStateToProps,null)(createForm({
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