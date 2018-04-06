import React,{Component} from 'react';
import {Component} from "react";
import { Media } from 'reactstrap';
import {connect} from "react-redux";

class AnimeMedia extends Component {
    constructor(props,context)
    {
        super(props,context);
    }
    render()
    {
        return (
            <Media>
                <Media left href="#">
                    <Media object data-src="holder.js/64x64" alt="Generic placeholder image"/>
                </Media>
                <Media body>
                    <Media heading>
                        Media heading
                    </Media>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo.
                    Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
                    vulputate fringilla. Donec lacinia congue felis in faucibus.
                </Media>
            </Media>
        );
    }
}


/*const mapDispatchToProps = (dispatch) => {
    return {
        refreshSearch:(word)=>{
            dispatch(searchInit(word))
        },
        search:(word)=>{
            dispatch(searchWord(word))
        }
    }
};
const mapStateToProps = (state) =>{
    return {searchList:state.search.list}
};
export default connect(mapStateToProps, mapDispatchToProps)(Complete);*/
//暂时想的是这个组件做成一个纯傻瓜组件
export default AnimeMedia;