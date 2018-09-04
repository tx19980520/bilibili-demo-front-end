import React from 'react';
import {view as FeedBackController} from "./FeedBackController"
import {view as Recommend} from './recommendForm/'
import {view as IndexPage} from './Index/'
import {BackToTop} from "./screenup/screenup.js"


import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
// const SubMenu = Menu.SubMenu;

class Container extends React.Component {
    constructor(props,context){
        super(props,context);
        this.state = {
            choose:0,
            collapsed: false,
        };
}
    HomePage = () => {
        this.setState({choose: 0});
    }
    Recommend = () => {
        this.setState({choose: 1});
    }
    FeedBack = () => {
        this.setState({choose: 2})
    }
    File = () => {
        window.location = "https://github.com/tx19980520/bilibiliData"
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    /*
    shouldComponentUpdate(nextProps,nextStates)
    {
        return(this.state === nextStates)
    }
    */
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" >
                            <div onClick={this.HomePage}>
                                <Icon type="pie-chart" />
                                <span>HomePage</span>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="2" >
                            <div onClick={this.Recommend}>
                                <Icon type="desktop" />
                                <span>Recommend</span>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="3" >
                            <div onClick={this.FeedBack}>
                                <Icon type="database" />
                                <span>Controller</span>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <div onClick={this.File}>
                                <Icon type="file" />
                                <span>File</span>
                            </div>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        {/*<Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>*/}
                        <div style={{ padding: 24, background: '#fff'}}>
                            {this.props.children[this.state.choose]}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}





export const BilibiliHome = () =>(
            <div>
                <Container>
                    <IndexPage />
                    <Recommend />
                    <FeedBackController />
                </Container>
                <BackToTop />
            </div>
)

