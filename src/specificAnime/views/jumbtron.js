import React from 'react';
import { Media } from 'reactstrap';
import { Tag } from 'antd';
import Chip from 'material-ui/Chip';
import "./animeMedia.css"
class AnimeMedia extends React.Component {
   /* constructor(props,context)
    {
        super(props,context);
    }
    */
    render()
    {
        const wrapper= {
            display: 'flex',
            flexWrap: 'wrap',
        };
        let tags = (this.props.data.specific.tags)?this.props.data.specific.tags:[];
		let rating = (this.props.data.specific.rating)?this.props.data.specific.rating:"1000";
		let coins = (this.props.data.specific.coins)?this.props.data.specific.coins:"0";
        let cover = `/${this.props.data.cover}`;
        let actors = this.props.data.specific.actor;
        return (
            <Media>
                <Media left href="#">
                    <Media object src={cover} alt="cover" className={"media-img"}/>
                </Media>
                <Media body>
                    <Media heading>
					<div className={"media-heading"}>
						{this.props.data.animeTitle}
					</div>
                        {tags.map((tag,i)=>{
                            return (<Tag key={i} color="blue">{tag}</Tag>)
                        })
                        }
					<div className={"actors"} style={wrapper}>
					{actors.map((actor,i)=>{
					    if(actor.actor !== "...")
                            return( <Chip style={{margin:4+"px"}} key={i}>{actor.role}:{actor.actor} </Chip>)
                    })}
					</div>
                    </Media>
					<div className={"evaluate"}>
                        {this.props.data.specific.evaluate}
					</div>
					<div className={"media-rating"}>
						{rating[0].score}
						<br />
						{coins}
					</div>
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