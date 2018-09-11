import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Bundle from './Bundle.jsx';
import Home from './pages/home/index.js';
import Index from './pages/index.jsx';

function getCp(file) {
    return function ({match}) {
        return (
            <Bundle load={file}>
                {(Cp) => <Cp match={match}/>}
            </Bundle>
        )
    }
}

var files = {
    login: require('bundle-loader?lazy&name=pages/login!./pages/login.jsx'),
    serviceList: require('bundle-loader?lazy&name=pages/registerCenter/serviceList!./pages/registerCenter/serviceList.jsx'),
}

//获取异步组件
var Login = getCp(files.login);
var ServiceList = getCp(files.serviceList);

var RouterTable = function () {
    return (
        <Router>
            <div id="wrapper">
                <Route  path="/page" render={()=>(
                    <Index>
                        <Route exact path="/page" component={Home}/>
                        <Route exact path="/page/home" component={Home}/>
                        <Route exact path="/page/services" component={ServiceList}/>
                    </Index>
                )}/>
                {/* <Route path="/page" component={Index} /> */}
                <Route exact path="/admins/login" component={Login}/>
                <Route exact path="/" component={Login}  />
            </div>
        </Router>
    )
}

ReactDOM.render(
    <RouterTable/>,
    document.getElementById('root')
); 