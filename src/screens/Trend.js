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

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')
var ScreenWidth = Dimensions.get('window').width;

  //marginHorizontal相同于同时设置marginLeft和marginRight
  //marginVertical相同于同时设置marginTop和marginBottom
const styles = {
  Title:{
    flex: 1,
    flexDirection: 'row',
  },
  Toptext:{
    width,
    height: height*0.06,
    textAlign: 'center',
    lineHeight: height*0.06,
    fontSize: 20
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
     marginVertical: 10,
  },
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
    return (
      <View style={{flex:1}}>
        <View style={styles.Title}>
          <Text style={styles.Toptext}>Run - Trend</Text>
          <View> <Image source={require('../public/Iamge/Else')} /></View>
        </View>
        <ScrollableTabView
          style={styles.container}
          renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={styles.lineStyle}
          tabBarActiveTextColor='#FF0000'
        >
          <ScrollView style={styles.tabStyle} tabLabel='ToDay'>
            
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsWeek'>
            
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsMonth'>
            
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsSeason'>
            
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsYear'>
          
        </ScrollView>
        </ScrollableTabView>
      </View>
    );
  }
}