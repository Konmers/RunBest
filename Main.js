import React, { Component } from 'react';
import {
    Modal,
    Text,
    View,
    Image,
    Button,
    StyleSheet,
    Dimensions,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
  } from 'react-native'

//导入路由相关的组件
// Router:就相当干昨天我们所学的HashRouter
// Stack:这是一个分组的容器,他不表示具体的路由,专门用来给路由分组的 
// Scene:就表示一个具体的路由规则,好比昨天学到的Route
import {Router,Stack,Scene,Actions} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';

//引用页面
import App from './App.js'

import LoginScreen from './src/screens/Login/Login.js'; //Login 登陆
import RegisterScreen from './src/screens/Login/Register.js'; //Register  注册
import ForgetScreen from './src/screens/Login/Forget.js'; //Forget 忘记密码

import HomeScreen from './src/screens/Home/Home.js'; //主页一
import HomeInfoScreen from './src/screens/Home/HomeInfo.js'; //主页二 


// import Shop from './src/screens/demo.js';//商城
import RankScreen from './src/screens/Rank/Rank.js';//排行榜
import TrendScreen from './src/screens/Trend/Trend.js';//走势图

import PersonalScreen from './src/screens/Personal/Personal.js';//个人中心
import UserinfoScreen from './src/screens/Personal/Userinfo.js';//个人信息
import UserinfoEditScreen from './src/screens/Personal/UserinfoEdit.js';//个人信息编辑

import CreateDynamicScreen from './src/screens/Dynamic/CreateDynamic.js';//创建动态
import DynamicInfoScreen from './src/screens/Dynamic/DynamicInfo.js';//动态详情

import DatetimePickerScreen from './src/middleware/DatetimePicker.js';//DatetimePicker 时间选择器
import MapDemoScreen from './src/screens/Map/MapDemo.js';//MapDemo 地图
import RadioScreen from './src/screens/Demo/Radio.js';//Radio

import VideoDetailScreen from './src/screens/Video/VideoDetail.js';//视频详情
import VideoPlayScreen from './src/screens/Video/VideoPlayer.js';//视频播放

import Demo1 from './src/screens/Demo/Demo1.js'//测试

import storage from './src/server/storage'
// import { transform } from '@babel/core';

{/* key 就是给页面的标签,供Actions使用 */}
{/* component 设置关联的页面 */}
{/* title 就是给页面标题 */}
{/* initial 就是设置默认页面*/}

// index.js文件最开始
 
if (!window.navigator.userAgent) {
    window.navigator.userAgent = "react-native";
  }  

const styles = StyleSheet.create({
    boxIcon: {
        color: '#333',
        marginLeft:15,
        // backgroundColor:'red'
    },
})


export default  class Main extends Component {
    async componentDidMount() {
       const token = await storage.get('token')
       console.log('token main------------  ',token)
       const tokenstate = token ? true : false 
       this.setState({isLogin: tokenstate })
    }

    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,
        }
    }
    render() { 
        return ( 
            <Router>
                <Scene key='root'>
                    <Scene key='app' component={App} hideNavBar={true}></Scene>

                    {/* 登陆 */}
                    <Scene key='Login' component={LoginScreen} initial={true} navTransparent={true} hideNavBar={true} ></Scene>

                    {/* 注册 */}
                    <Scene key='Register' component={RegisterScreen} navTransparent={true} navBarButtonColor="#ffffff" ></Scene>

                    {/* 忘记密码 */}
                    <Scene key='Forget' component={ForgetScreen} navTransparent={true} navBarButtonColor="#ffffff" ></Scene>
                   
                    {/* 主页一 */}
                    <Scene key='home' component={HomeScreen} navTransparent={true}></Scene>

                    {/* 主页二 */}
                    <Scene key='homeInfo' component={HomeInfoScreen}  initial={this.state.isLogin} navTransparent={true} hideNavBar={true} ></Scene>

                    {/* 排行榜 */}
                    <Scene key='rank' component={RankScreen} navTransparent={true} hideNavBar={true}></Scene>

                    {/* 走势图 */}
                    <Scene key='trend' component={TrendScreen} navTransparent={true} hideNavBar={true}></Scene>

                    {/* 个人中心 */}
                    <Scene key='personal' component={PersonalScreen} navTransparent={true} hideNavBar={true}></Scene>

                    {/* 个人信息 */}
                    <Scene key='userinfo' component={UserinfoScreen} title='Userinfo'  
                        leftButtonStyle={{
                            top: 0,
                            height: 50,
                            padding: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        renderLeftButton={() => (
                            <Icon name="arrowleft"
                            size={25}
                            style={styles.boxIcon}
                            onPress={() => Actions.personal()}
                        />
                        )}
                    ></Scene>

                    {/* 个人信息编辑 */}
                    <Scene key='userinfoedit' component={UserinfoEditScreen} title='UserinfoEdit'
                        leftButtonStyle={{
                            top: 0,
                            height: 50,
                            padding: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        renderLeftButton={() => (
                            <Icon name="arrowleft"
                            size={25}
                            style={styles.boxIcon}
                            onPress={() => Actions.userinfo()}
                        />
                        )}
                    ></Scene>

                    {/* 创建动态 */}
                    <Scene key='createdynamic' component={CreateDynamicScreen} navTransparent={true} 
                        leftButtonStyle={{
                            top: 0,
                            height: 50,
                            padding: 0,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        renderLeftButton={() => (
                            <Icon name="arrowleft"
                            size={25}
                            style={styles.boxIcon}
                            onPress={() => Actions.homeInfo()}
                        />
                        )}
                    ></Scene>

                    {/* 动态详情 */}
                    <Scene key='dynamicinfo' component={DynamicInfoScreen} title='Dynamicinfo'
                        leftButtonStyle={{
                            top: 0,
                            height: 50,
                            padding: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        renderLeftButton={() => (
                            <Icon name="arrowleft"
                            size={25}
                            style={styles.boxIcon}
                            onPress={() => Actions.pop("homeInfo")}
                        />
                        )}// style={[styles.boxIcon,{color:'white'}]}
                    ></Scene>

                    {/* 视频详情 */}
                    <Scene key='videodetail' component={VideoDetailScreen} title='VideoDetailScreen组件'></Scene>

                    {/* 视频播放 */}
                    <Scene key='videoplay' component={VideoPlayScreen} title='VideoPlayScreen组件'></Scene>

                    {/* Radio */}
                    <Scene key='radio' component={RadioScreen} title='radioEdit'></Scene>
 
                    {/* 时间选择器 */}
                    <Scene key='datetimepicker' component={DatetimePickerScreen} title='datetimepickerEdit'></Scene>

                    {/* 地图 */}
                    <Scene key='map' component={MapDemoScreen} title='mapEdit'></Scene>

                    {/* demo */}
                    <Scene key='Demo1' component={Demo1} title='测试'></Scene>
                </Scene>
            </Router>
         );
    }
};