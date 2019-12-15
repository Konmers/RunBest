//走势
import React, {Component} from 'react';
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

//tab component 选项卡
import ScrollableTabView,{DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';

//环形进度条
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'

//Echart
import Echarts from 'native-echarts';

import {dataEcharts} from '../../middleware/until.js'

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')
var ScreenWidth = Dimensions.get('window').width;

  //marginHorizontal相同于同时设置marginLeft和marginRight
  //marginVertical相同于同时设置marginTop和marginBottom
const styles = {
  Title:{
    width,
    height: height*0.06,
    textAlign: 'center',
    lineHeight: height*0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  Toptext:{
    textAlign: 'center',
    fontSize: 20,
    color: '#333'
  },
  Share:{
    position:'absolute',
    right: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  lineStyle: {
    width: ScreenWidth / 5,
    height: 5,
    backgroundColor:'#17C6AC'
  },
  tabStyle: {
    flex: 1,
    marginVertical: 20,
  },
  ProgressView:{
    height:'30%', 
    alignItems: 'center',
    backgroundColor: 'white',
  },
  echartView:{
    flex: 1, 
    marginVertical: 10,
    backgroundColor: 'white'
  },
  echarts:{
    width: '95%',
    backgroundColor: '#17C6AC'
  },
  monyText:{
     color: '#17C6AC',
     fontSize: 40,
     marginTop: -50
  }
}
export default class Trend extends Component{
  constructor (props) {
    super(props)
    this.state = {
      data:['ToDay','ThisWeek','ThisMonth','ThisYear'],
      dataArr:[
        {
          data:[10,20,50,40,10,5,60],
          Xdata:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        {
          data:[10,20,50,40,10,5,60,10,20,50,40,10,5,60,10,20,50,40,10,5,60,5,60,10,20,50,40,10,5,60],
          Xdata:['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日'],
        },
        {
          data:[100,80,600,400],
          Xdata:['第一季度', '第二季度', '第三季度', '第四季度'],
        },
        {
          data:[100,80,200,400,900,800,600,400,80,100,400,100],
          Xdata:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        },
      ]
    }
  }
  render() {
     const MAX_POINTS = 8000;
     const fill = 3000 / MAX_POINTS * 100;
     const weekData = dataEcharts(this.state.dataArr[0].Xdata,this.state.dataArr[0].data)
     const monthData = dataEcharts(this.state.dataArr[1].Xdata,this.state.dataArr[1].data)
     const seasonData = dataEcharts(this.state.dataArr[2].Xdata,this.state.dataArr[2].data)
     const yearData = dataEcharts(this.state.dataArr[3].Xdata,this.state.dataArr[3].data)
    return (      
      <View style={{flex:1}}>
        <View style={styles.Title}>
          <Text style={styles.Toptext}>Run - Trend</Text>
          <TouchableOpacity  style={styles.Share} onPress={this.onPress}> 
            <Image style={{width:30,height: 30}} source={require('../../public/Iamge/Else/share.png')} />
          </TouchableOpacity >
        </View>
        <ScrollableTabView
          style={styles.container}
          renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={styles.lineStyle} 
          tabBarActiveTextColor='#17C6AC'
        >
          <ScrollView style={styles.tabStyle} tabLabel='ToDay'>
            <View style={styles.ProgressView}>
              <AnimatedCircularProgress
                size={270}
                width={28}
                backgroundWidth={30}
                fill={fill}
                tintColor="#17C6AC" //滑动线颜色
                tintColorSecondary="#65E75F"
                rotation='270' //旋转度数
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#dfdfdf" // 默认的背景滑动线颜色
                arcSweepAngle='180' // 半圆 指定弧角
                dashedBackground={{width:2.5}} // 条形背景为虚线类型
              >
                {(fill) => (
                  <Text style={styles.monyText}> {Math.round(MAX_POINTS * fill / 100)}KM</Text>
                )}
              </AnimatedCircularProgress>
             </View>
            <View style={styles.echartView}>
              <Echarts style={styles.echarts} option={weekData} height={300} width={width} />
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsWeek'>
          <View style={styles.ProgressView}>
              <AnimatedCircularProgress
                size={270}
                width={28}
                backgroundWidth={30}
                fill={fill}
                tintColor="#17C6AC" //滑动线颜色
                tintColorSecondary="#65E75F"
                rotation='270' //旋转度数
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#dfdfdf" // 默认的背景滑动线颜色
                arcSweepAngle='180' // 半圆 指定弧角
                dashedBackground={{width:2.5}} // 条形背景为虚线类型
              >
                {(fill) => (
                  <Text style={styles.monyText}> {Math.round(MAX_POINTS * fill / 100)}KM</Text>
                )}
              </AnimatedCircularProgress>
             </View>
            <View style={styles.echartView}>
              <Echarts style={styles.echarts} option={weekData} height={300} width={width} />
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsMonth'>
            <View style={styles.ProgressView}>
              <AnimatedCircularProgress
                size={270}
                width={28}
                backgroundWidth={30}
                fill={fill}
                tintColor="#17C6AC" //滑动线颜色
                tintColorSecondary="#65E75F"
                rotation='270' //旋转度数
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#dfdfdf" // 默认的背景滑动线颜色
                arcSweepAngle='180' // 半圆 指定弧角
                dashedBackground={{width:2.5}} // 条形背景为虚线类型
              >
                {(fill) => (
                  <Text style={styles.monyText}> {Math.round(MAX_POINTS * fill / 100)}KM</Text>
                )}
              </AnimatedCircularProgress>
            </View>
            <View style={styles.echartView}>
              <Echarts style={styles.echarts} option={monthData} height={300} width={width} />
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsSeason'>
            <View style={styles.ProgressView}>
              <AnimatedCircularProgress
                size={270}
                width={28}
                backgroundWidth={30}
                fill={fill}
                tintColor="#17C6AC" //滑动线颜色
                tintColorSecondary="#65E75F"
                rotation='270' //旋转度数
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#dfdfdf" // 默认的背景滑动线颜色
                arcSweepAngle='180' // 半圆 指定弧角
                dashedBackground={{width:2.5}} // 条形背景为虚线类型
              >
                {(fill) => (
                  <Text style={styles.monyText}> {Math.round(MAX_POINTS * fill / 100)}KM</Text>
                )}
              </AnimatedCircularProgress>
            </View>
            <View style={styles.echartView}>
              <Echarts style={styles.echarts} option={seasonData} height={300} width={width} />
            </View>            
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsYear'>
            <View style={styles.ProgressView}>
              <AnimatedCircularProgress
                size={270}
                width={28}
                backgroundWidth={30}
                fill={fill}
                tintColor="#17C6AC" //滑动线颜色
                tintColorSecondary="#65E75F"
                rotation='270' //旋转度数
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#dfdfdf" // 默认的背景滑动线颜色
                arcSweepAngle='180' // 半圆 指定弧角
                dashedBackground={{width:2.5}} // 条形背景为虚线类型
              >
                {(fill) => (
                  <Text style={styles.monyText}> {Math.round(MAX_POINTS * fill / 100)}KM</Text>
                )}
              </AnimatedCircularProgress>
            </View>
            <View style={styles.echartView}>
              <Echarts style={styles.echarts} option={yearData} height={300} width={width} />
            </View>          
        </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }

  onPress = () => {
    console.warn('ddddd') 
    Actions.map()// 空传参

  };

}