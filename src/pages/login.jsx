import React, {Fragment} from 'react';
import BaseClass from '../base/BaseClass.jsx';
import {Icon,Alert} from 'antd';
import '../assets/css/login.css';
import logo from '../assets/images/logo.svg';
import LoginForm  from '../pages/loginForm.jsx';
import {setAuthority} from '../utils/authority';

const links = [
    {
      key: 'help',
      title: '帮助',
      href: '',
    },
    {
      key: 'privacy',
      title: '隐私',
      href: '',
    },
    {
      key: 'terms',
      title: '条款',
      href: '',
    },
  ];

  const copyright = (
    <Fragment>
      Copyright <Icon type="copyright" /> 2018 天津九安医疗有限公司
    </Fragment>
  );

  const client ={
      id:'client_2',
      secret:'123456'
  }

class LoginPage extends BaseClass{
    constructor(props) {
        super(props);
        this.state = {
            type: 'account',
            autoLogin: true,
            login:{status:'',
                    message:''}
          };

    };

    handleSubmit(err, values){
        const _this=this;
        if (!err) {
            let url = 'http://47.94.245.54:8080/v0/oauth/oauth/token?username='+values.userName+'&password='+values.password
                +'&grant_type=password&scope=read&client_id='+client.id+'&client_secret='+client.secret;
            fetch(url).then(response => response.json()).then(function(res) {
                console.log(res)
                if(res.access_token){
                    setAuthority("bearer "+res.access_token)
                    window.location.href="/page/services";
                }
                else{
                    if(res.error_description){
                        console.log(res.error_description);
                        _this.changeLoginStatus('error','login fail:'+res.error_description);

                    }else
                    {
                        _this.changeLoginStatus('error','login fail:');

                    }
                }
            },function(err){
                console.log(err);
                _this.changeLoginStatus('error','login fail:');
            });
        }
      };

      changeAutoLogin(e){
        this.setState({
          autoLogin: e.target.checked,
        });
      };

      changeLoginStatus(us,msg){
          console.log('asdfdf');
          this.setState({
                login:{
                    status:us,
                    message:msg
                }
          })
      };

      renderMessage(content){
          console.log(content);
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
      };

    render(){
        const { type, autoLogin } = this.state;

        return(
            <div className='container'>
                <div className='content'>
                    <div className='top'>
                        <div className='header'>
                            <img alt="logo" className='logo' src={logo} />
                            <span className='title'>DevOps Tools</span>
                        </div>
                        <div className='desc'>DevOps Tools 是运维后台管理工具</div>
                    </div>
                    <div className='login'>
                    {this.state.login.status == 'error' && this.renderMessage(this.state.login.message)}
                        <LoginForm onSubmit={this.handleSubmit.bind(this)} onChangeAutoLogin={this.changeAutoLogin}
                             autoLogin={this.state.autoLogin}></LoginForm>
                    </div>
                </div>
                <div className='globalFooter'>
                    {links && (
                        <div className='links'>
                        {links.map(link => (
                            <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
                            {link.title}
                            </a>
                        ))}
                        </div>
                    )}
                    {copyright && <div className='copyright'>{copyright}</div>}
                </div>
            </div>
        )
    }
}
export default LoginPage;