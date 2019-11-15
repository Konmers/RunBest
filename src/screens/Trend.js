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

//Echart
import Echarts from 'native-echarts';

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
    fontSize: 20
  },
  Share:{
    position:'absolute',
    right: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  lineStyle: {
    width: ScreenWidth / 5,
    height: 2,
    backgroundColor:'red'
  },
  tabStyle: {
    flex: 1,
    marginVertical: 20,
  },
  ProgressView:{
    height:'30%', 
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  monyText:{
     color: '#A8CEA5',
     fontSize: 40,
     marginTop: -50
  }
}

export default class Trend extends Component{
  constructor (props) {
    super(props)
    this.state = {
      rankArr:[
        [
          {
            head: require('../public/Iamge/Head/10.jpg'),
            name:'张三',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/12.jpg'),
            name:'李四',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/4.jpg'),
            name:'王五',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/8.jpg'),
            name:'赵六',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/11.png'),
            name:'田七',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/13.jpg'),
            name:'陈八',
            sketch:'哒哒哒哒哒哒'
          }
        ],
        [
          {
            head: require('../public/Iamge/Head/8.jpg'),
            name:'赵六',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/11.png'),
            name:'田七',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/10.jpg'),
            name:'张三',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/13.jpg'),
            name:'陈八',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/12.jpg'),
            name:'李四',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../public/Iamge/Head/4.jpg'),
            name:'王五',
            sketch:'哒哒哒哒哒哒'
          }
        ],
      ],
      data:['ToDay','ThisWeek','ThisMonth','ThisYear']
    }
  }

  
  render() {
    const option = {
      title: {
        text: 'ECharts demo'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [20, 10, 36, 10, 10, 20]
      }]
     };
     const options = {
      title: {
        text: 'ECharts demo'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'line',
        data: [20,10, 36, 10, 10, 20]
      }]
     };
     const MAX_POINTS = 8000;
     const fill = 3000 / MAX_POINTS * 100;

    return (      
      <View style={{flex:1}}>
        <View style={styles.Title}>
          <Text style={styles.Toptext}>Run - Trend</Text>
          <TouchableOpacity  style={styles.Share} onPress={this.onPress}> 
            <Image style={{width:30,height: 30}} source={require('../public/Iamge/Else/share.png')} />
          </TouchableOpacity >
        </View>
        <ScrollableTabView
          style={styles.container}
          renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={styles.lineStyle}
          tabBarActiveTextColor='#FF0000'
        >
          <ScrollView style={styles.tabStyle} tabLabel='ToDay'>
            <View style={styles.ProgressView}>
              <AnimatedCircularProgress
                size={270}
                width={28}
                backgroundWidth={30}
                fill={fill}
                tintColor="#A2CEA5" //滑动线颜色
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
            <View style={{flex: 1, height:height*0.4, width: width*0.4,}}>
              <Echarts style={{backgroundColor: 'red'}} option={option} height={300} width={width} />
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsWeek'>
            <View style={{flex: 1, height:height*0.4, width: width*0.4}}>
              <Echarts style={{backgroundColor: 'red'}} option={options} height={300} width={width} />
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsMonth'>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={100}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875" 
          />
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsSeason'>
            
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsYear'>
          
        </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }

  onPress = () => {
    console.warn('ddddd') 
  };

}