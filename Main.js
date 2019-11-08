import React, { Component } from 'react';
import {View,Text,Image} from 'react-native';

//导入路由相关的组件
// Router:就相当干昨天我们所学的HashRouter
// Stack:这是一个分组的容器,他不表示具体的路由,专门用来给路由分组的 
// Scene:就表示一个具体的路由规则,好比昨天学到的Route
import {Router,Stack,Scene} from 'react-native-router-flux';

//引用页面
import App from './App.js'
import HomeScreen from './src/screens/Home.js'; //首页
// import Shop from './src/screens/demo.js';//商城
import ShopScreen from './src/screens/Shop.js';//商城
import LeaderboardScreen from './src/screens/LeaderBoard.js';//排行榜
import PersonalScreen from './src/screens/Personal.js';//个人中心
import VideoDetailScreen from './src/screens/VideoDetail.js';//视频详情
import VideoPlayScreen from './src/screens/VideoPlayer.js';//视频播放

export default  class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Router sceneStyle={{backgroundColor:'White'}}>
                       {/* key 就是给页面的标签,供Actions使用 */}
                        {/* component 设置关联的页面 */}
                        {/* title 就是给页面标题 */}
                        {/* initial 就是设置默认页面*/}
                <Scene key='root'>
                    <Scene key='app' component={App} hideNavBar={true}></Scene>
                    <Scene key='videodetail' component={VideoDetailScreen} title='VideoDetailScreen组件'></Scene>
                    <Scene key='videoplay' component={VideoPlayScreen} title='VideoPlayScreen组件'></Scene>
                </Scene>
            </Router>
         );
    }
};