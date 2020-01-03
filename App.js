/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,//样式相关的组件，专门用来创建样式的
  ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
  Image,//图片
  View,//用来布局，类似div
  Text,//文本节点，所有文本必须放到这个里面
  TextInput,//文本框组件
  Button,//按钮
  ActivityIndicator,//loading 加载动画转圈
  Dimensions,//得到手机屏幕的宽和高
  StatusBar,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

//页面引用
import Home from './src/screens/Home/Home.js'; //首页
// import Shop from './src/screens/Demo.js';//商城
import Rank from './src/screens/Rank/Rank.js';//排行榜
import Trend from './src/screens/Trend/Trend.js';//走势
import Personal from './src/screens/Personal/Personal.js';//个人中心

const dataSource = [
  {icon:require('./src/public/Iamge/Bottom/home.png'),selectedIcon:require('./src/public/Iamge/Bottom/home-after.png'),tabPage:'Home',tabName:'首页',component:Home},
  {icon:require('./src/public/Iamge/Bottom/rank.png'),selectedIcon:require('./src/public/Iamge/Bottom/rank-after.png'),tabPage:'Rank',tabName:'排行榜',component:Rank},
  {icon:require('./src/public/Iamge/Bottom/statistical.png'),selectedIcon:require('./src/public/Iamge/Bottom/statistical-after.png'),tabPage:'Trend',tabName:'走势',component:Trend},
  {icon:require('./src/public/Iamge/Bottom/personal.png'),selectedIcon:require('./src/public/Iamge/Bottom/personal-after.png'),tabPage:'Personal',tabName:'个人中心',component:Personal}
]
var navigation = null;
export default class App extends Component {
  constructor(props) {
    super(props);
    navigation = this.props.navigation;
    this.state = { 
      selectedTab:'Home' //默认选中 home 页面
     }
  }
  //#17C6AC 主题色

  render() {
    let tabViews = dataSource.map((item,i) => {
      return (
        <TabNavigator.Item
          title={item.tabName}
          selected={this.state.selectedTab===item.tabPage}
          titleStyle={{color:'black'}}
          selectedTitleStyle={{color:'#17C6AC'}}
          renderIcon={()=><Image style={styles.icon} source={item.icon}/>}
          renderSelectedIcon = {() => <Image style={styles.icon} source={item.selectedIcon}/>}
          tabStyle={{alignSelf:'center'}}
          onPress = {() => {this.setState({selectedTab:item.tabPage})}}
          key={i}
          >
            <item.component  navigation={navigation}/>
        </TabNavigator.Item>
      );
    })

  return (
    <View style={styles.containner}>
      <TabNavigator  tabBarStyle={{alignItems:'center',height:'8%'}}
        hidesTabTouch={true}
        >
          {tabViews}
      </TabNavigator>
    </View>
  );
  }
} 
const styles =StyleSheet.create({
  containner:{
     flex:1,
  },
  icon:{
    width:30,
    height:30,
  },
  badgeText:{
    width:15,
    color:'#fff',
    fontSize:12,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:18,
    backgroundColor:'red'
  },
})