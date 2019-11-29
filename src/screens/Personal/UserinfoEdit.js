import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
  } from 'react-native'
  
  //时间
  import dayjs from 'dayjs'

  import { Actions } from 'react-native-router-flux';

class UserinfoEdit extends Component {
    constructor(props) {
        super(props);
        this.state ={}
    }

    render() {
        //title:title,data:value
        console.warn('this.propstitle----- ',this.props.title)
        console.warn('this.propsdata----- ',this.props.data)
        return (
            <View>
                <Text>{this.props.title}</Text>
                <Text>{this.props.data}</Text> 
            </View>
        )
    }
}

export default UserinfoEdit