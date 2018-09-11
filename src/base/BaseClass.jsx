import React from 'react';
import WebConfig from '../config/WebConfig';
import {getAuthority} from '../utils/authority';
class BaseClass extends React.Component {
  constructor(props){
    super(props);
    this.WebConfig = WebConfig;
    this.authorization=getAuthority();
  }
}

export default BaseClass;