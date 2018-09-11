import React from 'react';
import {Layout, Menu,Icon} from 'antd';
import BaseClass from '../base/BaseClass.jsx';
import '../assets/css/form.css';
import MenuConfig from '../config/menuConfig'
import Footer from './Global/Globalfooter'
import {NavLink,Redirect,Route} from 'react-router-dom'
import GlobalHeader from './Global/Globalheader';
import logo from '../assets/images/logo.svg';
import {setAuthority} from '../utils/authority';
// import Home from './home/index.js';
// import ServiceList from './registerCenter/serviceList.jsx';


const SubMenu = Menu.SubMenu
const {Header, Content, Sider} = Layout;

class IndexPage extends BaseClass {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            crumbs: [],
            collapsed:false,
            isLogin:false,
            authorization:this.authorization
        }
    }
    componentWillMount() {
        let auth = this.authorization;
        if (auth && auth != '') {
            this.state.authorization = this.authorization;
            this.state.isLogin=true;
        } else {
            this.state.isLogin=false;
        }

        this.setState({
            menuTreeNode:MenuConfig
        });
    }

    handleMenuClick ( {key}) {
        if (key === 'logout') {
            setAuthority('');
            window.location.href='/page';
        }
  
      };

      handleOnCollapse(collapsed){
        this.setState({
            collapsed:collapsed
        });
      };

    //菜单渲染
    renderMenu(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <SubMenu title={item.icon?(<span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                      </span>):(item.title)} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}> 
                {item.icon?(<span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
                </span>):(item.title)}
                </NavLink>
            </Menu.Item>
        })
    }


    render() {
        const currentUser = {
            name:'bot',
            avatar:'asdf'
        }
        const collapsed=this.state.collapsed;

        if (!this.state.isLogin) {
            return <Redirect push to="/admins/login" />; //or <Redirect push to="/sample?a=xxx&b=yyy" /> 传递更多参数
          }

        return (
            <div>
                <Layout style={{position: 'absolute', left: 0, top: 0, width: '100%', minHeight: '100%'}}>
                    <Sider
                    collapsed={this.state.collapsed}
                    onCollapse={this.handleOnCollapse}
                    >
                        <div className="headerLogo">
                            <Icon type='appstore' style={{fontSize:20,lineHeight:1.5,color:'#fff',marginRight:5}} />
                           {this.state.collapsed?'':<span className='headerText'>后台管理</span>} 
                        </div>
                        <Menu
                            mode="inline"
                            theme="dark"
                            defaultSelectedKeys={['/page/services']}
                            defaultOpenKeys={['sub1']}
                            inlineCollapsed={this.state.collapsed}
                           
                        >
                            {this.renderMenu(this.state.menuTreeNode)}
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{backgroundColor: 'white',padding:0}}>
                            <GlobalHeader   
                            currentUser ={currentUser}
                            collapsed ={collapsed}
                            isMobile={this.state.isMobile}
                            logo={logo}
                            onCollapse={this.handleOnCollapse.bind(this)}
                            onMenuClick={this.handleMenuClick} 
                            />
                        </Header>
                        <Content style={{background: '#f0f2f5', margin: 0}}>
                            {this.props.children}
                       
                        {/* <Route exact path="/page" component={Home}/>
                        <Route exact path="/page/home" component={Home}/>
                        <Route exact path="/page/services" component={ServiceList}/> */}
                    
                        </Content>
                        <Footer/>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default IndexPage;