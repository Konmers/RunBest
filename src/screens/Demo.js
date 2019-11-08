/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Video from 'react-native-video';

const screenWidth = Dimensions.get('window').width;
const state = { 
  videoWidth: screenWidth,
  videoHeight: screenWidth * 9/16, // 默认16：9的宽高比
}
 
const App: () => React$Node = () => {

  return (
    <>
    <View>
       <ScrollView style={{width:'100%',marginBottom:20}}>
          <ActivityIndicator style={{margin: 20}} color='red' size='large' animating={true}></ActivityIndicator>
          <ActivityIndicator style={{margin: 20}} color='blue' size='small'></ActivityIndicator>
          <Text style={{fontSize:20,textAlign:"center"}}>
            贼 nice 了
          </Text>
          {/* 网上图片  必须给宽高*/}
          <Image 
            style = {{width: 100,height: 100}}
            source= {{uri:'https://avatars1.githubusercontent.com/u/24784550?s=460&v=4'}}
          />
          {/* 项目图片   不必须给宽高*/}
          <Image 
            style = {{width: 100,height: 100}}
            source= {require('../public/Iamge/Banner/10.jpg')}
          />
          <Image 
            style = {{width: 100,height: 100}}
            source= {require('../public/Iamge/Banner/8.jpg')}
          />
          <Image 
            style = {{width: 100,height: 100}}
            source= {require('../public/Iamge/Banner/7.jpg')}
          />
          <Image 
            style = {{width: 100,height: 100}}
            source= {require('../public/Iamge/Banner/6.jpg')}
          />
          <Video
            source = {require('../public/video/test2.mp4')}
            // ref={(ref) => {
            //   this.player = ref
            // }}                             // Store reference
            rate={1.0}                     // 0 is paused, 1 is normal.
            volume={1.0}                   // 0 is muted, 1 is normal.
            muted={false}                  // Mutes the audio entirely.
            paused={false}                 // Pauses playback entirely.
            resizeMode="contain"             // Fill the whole screen at aspect ratio.
            repeat={false}                  // Repeat forever.
            playInBackground={false}       // Audio continues to play when app entering background.
            playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
            progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
            style={{width: state.videoWidth, height: state.videoHeight,marginTop: 20,marginBottom:20}}
          />
          <TextInput style={{height:40,margin:10,borderColor:'gray',borderWidth:1}} keyboardType='numeric' secureTextEntry={true} >
          </TextInput>
          <Button
          onPress={()=>{
            console.warn('hhhhh')
          }}
            title="点一哈"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
       </ScrollView>
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  loading: {
    margin:20,
  },
})

export default App;
