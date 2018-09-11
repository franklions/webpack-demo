import React,{PureComponent} from 'react';
import '../../assets/css/globalheader.css';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import {setAuthority} from '../../utils/authority';
class Globalheader extends PureComponent{
    constructor(props){
        super(props);
    }

      toggle (){
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
         
      };

      render() {
        const {
          currentUser = {},
          collapsed,
          onMenuClick,
        } = this.props;
        const menu = (
          <Menu className='menu' selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item disabled>
              <Icon type="user" />个人中心
            </Menu.Item>
            <Menu.Item disabled>
              <Icon type="setting" />设置
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" >
              <Icon type="logout" />退出登录
            </Menu.Item>
          </Menu>
        );
        return (
          <div className='globalHeader'>
            <Icon
              className='trigger'
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle.bind(this)}
            />
            <div className='right'>
              {currentUser.name ? (
                <Dropdown overlay={menu}>
                  <span className='action account'>
                    <Avatar size="small" style={{ backgroundColor: '#87d068',marginRight:5 }} icon='user' />
                    <span className='name'>{currentUser.name}</span>
                  </span>
                </Dropdown>
              ) : (
                <Spin size="small" style={{ marginLeft: 8 }} />
              )}
            </div>
          </div>
        );
      }
}

export default Globalheader;