//排行榜
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

//swiper banner滚动
import Swiper from 'react-native-swiper'

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')
var ScreenWidth = Dimensions.get('window').width;
import Floatball from "../../middleware/Floatball.js"

const loading = require('../../public/Iamge/Banner/loading.gif')

const styles = {
  Toptext:{
    width,
    height: height*0.06,
    textAlign: 'center',
    lineHeight: height*0.06,
    fontSize: 20,
    color: '#333'
  },
  SwiperView:{
    height: 200,
    width:width
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1,
    backgroundColor: 'transparent'
  },
  loadingView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  loadingImage: {
    width: 60,
    height: 60
  },
  Rank:{
    flex:1,
    flexDirection:'column',
    alignContent:'center',
    marginHorizontal:10,
    marginVertical: 10,
    borderRadius:15,
    shadowColor:'#000000',
    shadowOpacity:0.9,
    shadowRadius:10,
    elevation: 5,//设置此项Android显示阴影，只能是灰色阴影，不支持其他颜色设置（Android） 
    backgroundColor: 'white',
  },
  //marginHorizontal相同于同时设置marginLeft和marginRight
  //marginVertical相同于同时设置marginTop和marginBottom
  RviewTwo:{
    width: '100%',
    flex: 1,
    flexDirection: 'column'
  },
  Rrankdetail:{
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  Rrankdetails:{
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
  Rimage:{
    width:40,
    height:40,
    borderRadius:20,
    marginRight:10
  },
  RtextOne:{
    fontSize: 18
  },
  RtextTwo:{
    fontSize: 15,
    color: '#D6D6D6'
  },
  Rtexts:{
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lineStyle: {
    width: ScreenWidth / 5,
    height: 5,
    backgroundColor:'#17C6AC'
  },
  tabStyle: {
    flex: 1,
     marginVertical: 10,
  },
}

const Slide = props => {
  return (<View style={styles.slide}>
    <Image style={styles.image} source={props.uri} />
  </View>)
}

export default class Rank extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imgList: [
        require('../../public/Iamge/Banner/bannerOne.jpg'),
        require('../../public/Iamge/Banner/banner_5.png'),
        require('../../public/Iamge/Banner/banner_8.jpg'),
        require('../../public/Iamge/Banner/bannerTwo.jpg'),
      ],
      loadQueue: [0, 0, 0, 0],
      rankArr:[
        [
          {
            head: require('../../public/Iamge/Head/10.jpg'),
            name:'张三',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/12.jpg'),
            name:'李四',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/4.jpg'),
            name:'王五',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/8.jpg'),
            name:'赵六',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/11.png'),
            name:'田七',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/13.jpg'),
            name:'陈八',
            sketch:'哒哒哒哒哒哒'
          }
        ],
        [
          {
            head: require('../../public/Iamge/Head/8.jpg'),
            name:'赵六',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/11.png'),
            name:'田七',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/10.jpg'),
            name:'张三',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/13.jpg'),
            name:'陈八',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/12.jpg'),
            name:'李四',
            sketch:'哒哒哒哒哒哒'
          },
          {
            head: require('../../public/Iamge/Head/4.jpg'),
            name:'王五',
            sketch:'哒哒哒哒哒哒'
          }
        ],
      ],
      data:['ToDay','ThisWeek','ThisMonth','ThisYear']
    }
  }
  loadHandle (i) {
    let loadQueue = this.state.loadQueue
    loadQueue[i] = 1
    this.setState({
      loadQueue
    })
  }
  
  render() {
    return (
      <View style={{flex:1}}>
        <Text style={styles.Toptext}>Lazy - Rank</Text>
        <View style={styles.SwiperView}>
          <Swiper style={styles.wrapper}
          dot={<View style={{marginLeft:10,width:10,height:10,borderRadius:50,backgroundColor: '#fff'}} />}
          activeDot={<View style={{marginLeft:10,width:10,height:10,borderRadius:50,backgroundColor: '#17C6AC'}} />}
          autoplay
          >
            {
              this.state.imgList.map((item, i) => <Slide
                loadHandle={this.loadHandle}
                loaded={!!this.state.loadQueue[i]}
                uri={item}
                i={i}
                key={i} />)
            }
          </Swiper>
        </View>
        <ScrollableTabView
          style={styles.container}
          renderTabBar={() => <DefaultTabBar />}
          tabBarUnderlineStyle={styles.lineStyle}
          tabBarActiveTextColor='#17C6AC'
        >
          <ScrollView style={styles.tabStyle} tabLabel='ToDay'>
            <View style={styles.Rank}>
                <View style={styles.RviewTwo}>
                    {
                        this.state.rankArr[0].map((item,i) =>
                          <View style={styles.Rrankdetail} key={i}>
                              <TouchableOpacity style={styles.Rrankdetail} onPress={() => this.getVideoList(i)}>
                                <View style={styles.Rrankdetails}>
                                  <Image style={styles.Rimage} source={item.head}/>
                                  <View>
                                    <Text style={styles.RtextOne}>{item.name}</Text>
                                    <Text style={styles.RtextTwo}>{item.sketch}</Text>
                                  </View>
                                </View>
                                <Text style={styles.Rtexts}>No.{i+1}</Text>
                              </TouchableOpacity>
                          </View> 
                        )
                    } 
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsWeek'>
            <View style={styles.Rank}>
                <View style={styles.RviewTwo}>
                    {
                        this.state.rankArr[1].map((item,i) =>
                          <View style={styles.Rrankdetail} key={i}>
                              <TouchableOpacity style={styles.Rrankdetail} onPress={() => this.getVideoList(i)}>
                                <View style={styles.Rrankdetails}>
                                  <Image style={styles.Rimage} source={item.head}/>
                                  <View>
                                    <Text style={styles.RtextOne}>{item.name}</Text>
                                    <Text style={styles.RtextTwo}>{item.sketch}</Text>
                                  </View>
                                </View>
                                <Text style={styles.Rtexts}>No.{i+1}</Text>
                              </TouchableOpacity>
                          </View> 
                        )
                    } 
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsMonth'>
            <View style={styles.Rank}>
                <View style={styles.RviewTwo}>
                    {
                        this.state.rankArr[1].map((item,i) =>
                          <View style={styles.Rrankdetail} key={i}>
                              <TouchableOpacity style={styles.Rrankdetail} onPress={() => this.getVideoList(i)}>
                                <View style={styles.Rrankdetails}>
                                  <Image style={styles.Rimage} source={item.head}/>
                                  <View>
                                    <Text style={styles.RtextOne}>{item.name}</Text>
                                    <Text style={styles.RtextTwo}>{item.sketch}</Text>
                                  </View>
                                </View>
                                <Text style={styles.Rtexts}>No.{i+1}</Text>
                              </TouchableOpacity>
                          </View> 
                        )
                    } 
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsSeason'>
            <View style={styles.Rank}>
                <View style={styles.RviewTwo}>
                    {
                        this.state.rankArr[1].map((item,i) =>
                          <View style={styles.Rrankdetail} key={i}>
                              <TouchableOpacity style={styles.Rrankdetail} onPress={() => this.getVideoList(i)}>
                                <View style={styles.Rrankdetails}>
                                  <Image style={styles.Rimage} source={item.head}/>
                                  <View>
                                    <Text style={styles.RtextOne}>{item.name}</Text>
                                    <Text style={styles.RtextTwo}>{item.sketch}</Text>
                                  </View>
                                </View>
                                <Text style={styles.Rtexts}>No.{i+1}</Text>
                              </TouchableOpacity>
                          </View> 
                        )
                    } 
                </View>
            </View>
          </ScrollView>
          <ScrollView style={styles.tabStyle} tabLabel='TsYear'>
          <View style={styles.Rank}>
              <View style={styles.RviewTwo}>
                  {
                      this.state.rankArr[1].map((item,i) =>
                        <View style={styles.Rrankdetail} key={i}>
                            <TouchableOpacity style={styles.Rrankdetail} onPress={() => this.getVideoList(i)}>
                              <View style={styles.Rrankdetails}>
                                <Image style={styles.Rimage} source={item.head}/>
                                <View>
                                  <Text style={styles.RtextOne}>{item.name}</Text>
                                  <Text style={styles.RtextTwo}>{item.sketch}</Text>
                                </View>
                              </View>
                              <Text style={styles.Rtexts}>No.{i+1}</Text>
                            </TouchableOpacity>
                        </View> 
                      )
                  } 
              </View>
          </View>
        </ScrollView>
        </ScrollableTabView>
        <Floatball/> 
      </View>
    )
  }
}