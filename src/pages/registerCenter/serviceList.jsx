import React from 'react';
import {Input, Card, Icon, Avatar, List, Tooltip, Button, Drawer, message, Modal, Dropdown, Menu,Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import '../../assets/css/cardlist.css';
import BaseClass from '../../base/BaseClass.jsx';

const confirm = Modal.confirm;
const {TextArea} = Input;

class UserCardList extends BaseClass {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            url: 'http://devopstools-dev.united-iot.com/registerCenter/apps',
            authorization: this.authorization,
            selectedItem: '',
            secList: [],
            data: '',
            fatherVisible: false,
            childrenDrawer: false
        };
    }

    componentDidMount() {
        this.requestList();
    }

    handleChange(event) {
        this.setState({data: event.target.value});
    }

    // 修改元数据
    handleConfirm() {
        fetch(this.state.url + '/' + this.state.selectedItem.appName + '/' + this.state.selectedItem.addrs + '/metadata?' + this.state.data.replace(',','&'), {
            method: 'PUT',
            headers: {"x-Authorization": this.state.authorization},

        }).then((res) => {
            if (res.status == 200) {
                this.setState({
                    childrenDrawer: false,
                    data: ''
                });
                message.success('修改成功')
            } else {
                message.error('修改失败')
            }
        });
    }

    //默认请求我们的接口
    requestList() {
        let _this = this
        fetch(_this.state.url, {
            method: 'GET',
            headers: {"x-Authorization": _this.state.authorization},

        }).then((res) => res.json())
            .then(json => {
                let list = json.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    list: list,
                })
            });
    }

    //修改应用实例
    handleFormSubmit(item) {
        let _this = this
        confirm({
            title: '确认修改当前实例吗?',
            content: '确认修改',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                fetch(_this.state.url + '/' + _this.state.selectedItem.appName + '/' + _this.state.selectedItem.addrs + '/status?value=' + item, {
                    method: 'PUT',
                    headers: {"x-Authorization": _this.state.authorization},

                }).then((res) => {
                    if (res.status == 200) {
                        message.success('修改成功')
                    } else {
                        message.error('修改失败')
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    onRefreshDrawer(items){
        this.showDrawer(items);
        message.info("刷新完成");
    }

    //父级菜单
    showDrawer(items) {
        fetch(this.state.url + '/' + items.appName, {
            method: 'GET',
            headers: {"x-Authorization": this.state.authorization},

        }).then((res) => res.json())
            .then(json => {
                let list = json.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    secList: list
                });

            });
        this.setState({
            fatherVisible: true,
            selectedItem: items
        });
        
    };

    onClose() {
        this.setState({
            fatherVisible: false,
        });
    };

    //修改
    showChildrenDrawer(metadata) {
        this.setState({
            childrenDrawer: true,
            data:metadata
        });
    };

    onChildrenDrawerClose() {
        this.setState({
            childrenDrawer: false,
        });
    };

    showDeleteConfirm(state) {
        let _this = this
        confirm({
            title: '确删除改实例状态吗?',
            content: '删除实例状态',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                fetch(_this.state.url + '/' + _this.state.selectedItem.appName + '/' + _this.state.selectedItem.addrs + '/status?value=' + state, {
                    method: 'DELETE',
                    headers: {"x-Authorization": _this.state.authorization},

                }).then((res) => {
                    if (res.status == 200) {
                        message.success("请求成功")
                      
                    } else {
                        message.error("请求失败")
                       
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    showDeleteConfirm1() {
        let _this = this
        confirm({
            title: '确认删除实例吗?',
            content: '删除实例',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                fetch(_this.state.url + '/' + _this.state.selectedItem.appName + '/' + _this.state.selectedItem.addrs, {
                    method: 'DELETE',
                    headers: {"x-Authorization": _this.state.authorization},

                }).then((res) => {
                    if (res.status == 200) {
                       
                        message.success("请求成功")
                    } else {
                    
                        message.error("请求失败")
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const CardInfo = ({upStatus, downStatus, addrs}) => (
            <div className='cardInfo'>
                <div>
                    <p>UP</p>
                    <p>{upStatus}</p>
                </div>
                <div>
                    <p>DOWN</p>
                    <p>{downStatus}</p>
                </div>
                <div style={{
                    fontSize: '14px',
                    height: '80px',
                    width: '100%',
                    paddingTop: '5px',
                    wordWrap: "break-word",
                    overflowY: "auto"
                }}>
                    <p>Instances:</p>
                    <span><b><i>{addrs}</i></b></span>
                </div>
            </div>
        );

        const CardList = ({instanceId, hostName, ipAddr, status, overriddenStatus, metadata, lastUpdatedTS}) => (
            <div className='cardList'>
                <p>InstanceID：<b><i>{instanceId}</i></b></p>
                <p>IPAddr：<b><i>{ipAddr}</i></b></p>
                <p>Status：<b><i>{status}</i></b></p>
                <p>Overridden：<b><i>{overriddenStatus}</i></b></p>
                <p>Metadata：<b><i>{metadata}</i></b></p>
                <p>Timespan：<b><i>{lastUpdatedTS}</i></b></p>
            </div>
        );

        const itemMenu = (
            <Menu className='cardToolsMenuItem'>
                <Menu.Item>
                    <p onClick={this.handleFormSubmit.bind(this, 'UP')}>UP</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={this.handleFormSubmit.bind(this, 'DOWN')}>DOWN</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={this.handleFormSubmit.bind(this, 'STARTING')}>STARTING</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={this.handleFormSubmit.bind(this, 'OUT_OF_SERVICE')}>OUT_OF_SERVICE</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={this.handleFormSubmit.bind(this, 'UNKNOWN')}>UNKNOWN</p>
                </Menu.Item>
            </Menu>
        );

        //删除实力状态列表
        const itemMenu1 = (
            <Menu className='cardToolsMenuItem'>
                <Menu.Item>
                    <p onClick={this.showDeleteConfirm.bind(this, 'UP')}>UP</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={this.showDeleteConfirm.bind(this, 'DOWN')}>DOWN</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={this.showDeleteConfirm.bind(this, 'STARTING')}>STARTING</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={this.showDeleteConfirm.bind(this, 'OUT_OF_SERVICE')}>OUT_OF_SERVICE</p>
                </Menu.Item>
                <Menu.Item>
                    <p onClick={this.showDeleteConfirm.bind(this, 'UNKNOWN')}>UNKNOWN</p>
                </Menu.Item>
            </Menu>
        );
        return (
                <div>
                    <Card style={{marginBottom: '10px'}}>
                            <Breadcrumb>
                                <Breadcrumb.Item>
                                    <Link  to='/page' >首页</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    服务管理
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="headerTitle">
                                服务管理
                            </div>
                        </Card>
                    <div className='filterCardList'>
                    <List
                        rowKey="id"
                        grid={{gutter: 34, xl: 4, lg: 3, md: 3, sm: 2, xs: 1}}
                        dataSource={this.state.list}
                        renderItem={item => (
                            <List.Item key={item.appName}>
                                <Card className='card'
                                      hoverable
                                      bodyStyle={{paddingBottom: 20}}
                                      actions={[
                                          <Tooltip title="查看">
                                              <Icon type="credit-card" onClick={this.showDrawer.bind(this, item)}/>
                                          </Tooltip>,
                                      ]}

                                >
                                    <Card.Meta avatar={<Avatar size="small"
                                                               src='https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'/>}
                                               title={item.appName}/>
                                    <div className='cardItemContent'>
                                        <CardInfo
                                            upStatus={item.upStatus}
                                            downStatus={item.downStatus}
                                            addrs={item.addrs}
                                        />
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />

                    <Drawer
                        title={<span><Avatar size="small"
                        src='https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png'/><span style={{marginLeft:10}}>{this.state.selectedItem.appName}</span></span>}
                        width={680}
                        closable={false}
                        onClose={this.onClose.bind(this)}
                        visible={this.state.fatherVisible}
                    >

                        <List
                            rowKey="father"
                            style={{marginTop: 12}}
                            grid={{gutter: 12, xl: 2, lg: 32, md: 24, sm: 16, xs: 8}}
                            dataSource={this.state.secList}
                            renderItem={item => (
                                <List.Item key={item}>
                                    <Card
                                        hoverable
                                        bodyStyle={{paddingBottom: 20}}
                                        actions={[

                                            <Tooltip title="修改元数据">
                                                <Icon type="tool" onClick={this.showChildrenDrawer.bind(this,item.metadata)}/>
                                            </Tooltip>
                                            ,
                                            <Tooltip title="删除实例状态">
                                                <Dropdown overlay={itemMenu1} trigger={['click']} placement="topCenter">
                                                    <Icon type="bars"/>
                                                </Dropdown>
                                            </Tooltip>
                                            ,
                                            <Tooltip title="删除实例">
                                                <Icon type="delete" onClick={this.showDeleteConfirm1.bind(this)}/>
                                            </Tooltip>
                                            ,
                                            <Tooltip title="修改实例状态">
                                                <Dropdown overlay={itemMenu} trigger={['click']} placement="topCenter">
                                                    <Icon type="ellipsis"/>
                                                </Dropdown>
                                            </Tooltip>,
                                        ]}

                                    >
                                        <Card.Meta avatar={<Avatar size="small"
                                                                   src='https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png'/>}
                                                   title={item.hostName}/>
                                        <div className='cardItemContent1'>
                                            <CardList
                                                instanceId={item.instanceId}
                                                hostName={item.hostName}
                                                ipAddr={item.ipAddr}
                                                status={item.status}
                                                overriddenStatus={item.overriddenStatus}
                                                metadata={item.metadata}
                                                lastUpdatedTS={item.lastUpdatedTS}
                                            />
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                        <Drawer
                            title={<span><Icon type="tool" /><span style={{marginLeft:10}}>修改元数据</span></span>}
                            width={700}
                            closable={false}
                            onClose={this.onChildrenDrawerClose.bind(this)}
                            visible={this.state.childrenDrawer}
                        >
                            <TextArea rows={7} value={this.state.data.replace('{','').replace("}","")} onChange={this.handleChange.bind(this)}/>
                            <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e8e8e8',
                                padding: '10px 16px',
                                textAlign: 'right',
                                left: 0,
                                background: '#fff',
                                borderRadius: '0 0 4px 4px',
                            }}
                        >
                            <Button
                                style={{
                                    marginRight: 8,
                                }}
                                onClick={this.onChildrenDrawerClose.bind(this)}
                            >
                                关闭
                            </Button>
                            <Button type="primary" onClick={this.handleConfirm.bind(this)}>保存</Button>
                            
                        </div>
                            
                        </Drawer>

                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                borderTop: '1px solid #e8e8e8',
                                padding: '10px 16px',
                                textAlign: 'right',
                                left: 0,
                                background: '#fff',
                                borderRadius: '0 0 4px 4px',
                            }}
                        >

                            <Button
                                style={{
                                    marginRight: 8,
                                }}
                                onClick={this.onClose.bind(this)}
                            >
                                关闭
                            </Button>
                            <Button type="primary" onClick={this.onRefreshDrawer.bind(this, this.state.selectedItem)} style={{paddingRight:'10px'}}>刷新</Button>
                        </div>
                    </Drawer>
                </div>
                </div>
        );
    };
}


export default UserCardList;