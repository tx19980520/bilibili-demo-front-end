import React from "react"
import {connect} from 'react-redux'
import "./animeItem.css"
import { Card, Icon, Avatar } from 'antd';
const { Meta } = Card;

export const AnimeItem =({picture,fans,sessionid,title,animeFinished})=>{//pictrue是封面的链接，fans是追番人数
    if(!sessionid)
    {
        return (
            <Card loading
                cover={<img alt="example" src={picture} className={"img-responsive"} />}
                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
            >
                <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description={fans}
                />
            </Card>
        )
    }
    var fansnum = "追番人数:"+fans
    var status = (animeFinished == 1)?"未完结":"已完结"
    return (
    <Card
        cover={<img alt="example" src={picture} className={"img-responsive"} />}
        actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
    >
        <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={title}
            description= {<div><p>{fansnum}</p><p>是否完结：{status}</p></div>}
        />
    </Card>
    )
};