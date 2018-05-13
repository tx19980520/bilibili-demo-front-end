import React from 'react';
import {connect} from "react-redux"
import {
  Form, Icon, Rate,
} from 'antd';
const FormItem = Form.Item;
import {submitFeedBack} from "./actions.js"
class FeedBack extends React.Component{
	handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
		// this.props.feedBackSubmit(values)
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
const mapStateToProps = (state) => {
	recommendList:state.recommend.recommendList
}
const mapDispatchToProps = (dispatch) => {
	return {
		feedBackSubmit: (values) => {
			submitFeedBack(values)
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedBackForm)