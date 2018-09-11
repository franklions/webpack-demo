import React from 'react';
import './../../assets/css/home.css';
import { Card, Breadcrumb } from 'antd';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className='home'>
            <Card style={{ marginBottom: '10px' }}>
                <div className="headerTitle">
                    首页
                </div>
            </Card>
            <div className='content'>
                <div className="home-wrap">
                    欢迎使用运维管理服务平台
                </div>
            </div>
        </div>

        );
    }
}