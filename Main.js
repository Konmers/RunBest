import React, { Component } from 'react';
import {View,Text,Image} from 'react-native';

//导入路由相关的组件
// Router:就相当干昨天我们所学的HashRouter
// Stack:这是一个分组的容器,他不表示具体的路由,专门用来给路由分组的 
// Scene:就表示一个具体的路由规则,好比昨天学到的Route
import {Router,Stack,Scene} from 'react-native-router-flux'

//引用页面
import App from './App.js'
import HomeScreen from './src/screens/Home/Home.js'; //首页
import LoginScreen from './src/screens/Login/Login.js'; //Login
// import Shop from './src/screens/demo.js';//商城
import RankScreen from './src/screens/Rank/Rank.js';//商城
import TrendScreen from './src/screens/Trend/Trend.js';//排行榜
import PersonalScreen from './src/screens/Personal/Personal.js';//个人中心
import UserinfoScreen from './src/screens/Personal/Userinfo.js';//个人信息
import RadioScreen from './src/screens/Demo/Radio.js';//Radio
import DatetimePickerScreen from './src/middleware/DatetimePicker.js';//DatetimePicker
import MapDemoScreen from './src/screens/Map/MapDemo.js';//MapDemo
import UserinfoEditScreen from './src/screens/Personal/UserinfoEdit.js';//个人信息编辑
import VideoDetailScreen from './src/screens/Video/VideoDetail.js';//视频详情
import VideoPlayScreen from './src/screens/Video/VideoPlayer.js';//视频播放

{/* key 就是给页面的标签,供Actions使用 */}
{/* component 设置关联的页面 */}
{/* title 就是给页面标题 */}
{/* initial 就是设置默认页面*/}

// index.js文件最开始
 
if (!window.navigator.userAgent) {
    window.navigator.userAgent = "react-native";
  }  

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Router>
                <Scene key='root'>
                    <Scene key='app' component={App} hideNavBar={true}></Scene>
                    <Scene key='Login' component={LoginScreen} title='Login' initial={true}></Scene>
                    <Scene key='home' component={HomeScreen} navTransparent={true}></Scene>
                    <Scene key='videodetail' component={VideoDetailScreen} title='VideoDetailScreen组件'></Scene>
                    <Scene key='videoplay' component={VideoPlayScreen} title='VideoPlayScreen组件'></Scene>
                    <Scene key='userinfo' component={UserinfoScreen} title='Userinfo'></Scene>
                    <Scene key='userinfoedit' component={UserinfoEditScreen} title='UserinfoEdit'></Scene>
                    <Scene key='radio' component={RadioScreen} title='radioEdit'></Scene>
                    <Scene key='datetimepicker' component={DatetimePickerScreen} title='datetimepickerEdit'></Scene>
                    <Scene key='map' component={MapDemoScreen} title='mapEdit'></Scene>
                </Scene>
            </Router>
         );
    }
};