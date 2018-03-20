import React from "react"
import {Row,Col} from 'antd';
import './animeLine.css';
//我们的AnimeLine只做装饰，具体铺数据还是在我们的AnimeList中
export const AnimeLine = ({children}) => {
    return(
        <div>
        <Row type="flex" justify="space-around" className={"row-margin"}>
            {
                children.map(function(item,index){
                    return <Col span={6} key={index}>{item}</Col>
                })
            }
        </Row>
        </div>
    );
};
