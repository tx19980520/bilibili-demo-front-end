import React from "react"
import { BackTop } from 'antd';
import "./screenup.css";

export const BackToTop=() => {
    return (
        <div>
        <BackTop>
            <div className="ant-back-top-inner">UP</div>
        </BackTop>
    </div>
    );
};