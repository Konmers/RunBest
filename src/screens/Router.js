import React, { Component } from 'react';
import {View,Text,} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//页面引用
import HomeScreen from './src/screens/home.js'; //首页
// import Shop from './src/screens/demo.js';//商城
import ShopScreen from './src/screens/shop.js';//商城
import LeaderboardScreen from './src/screens/leaderboard.js';//排行榜
import PersonalScreen from './src/screens/personal.js';//个人中心
import VideoDetailScreen from './src/screens/videodetail.js';//视频详情
import VideoPlayScreen from './src/screens/videoplayer.js';//视频播放

const AppNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Shop: { screen: ShopScreen },
    Leaderboard: { screen: LeaderboardScreen },
    Personal: { screen: PersonalScreen },
    VideoDetail: { screen: VideoDetailScreen },
    VideoPlay: { screen: VideoPlayScreen },
  }, {
    initialRouteName: 'Home',
  });

export default createAppContainer(AppNavigator);
