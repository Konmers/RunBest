
import React, { Component } from 'react'
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
//swiper banner滚动
import Swiper from 'react-native-swiper'

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')

const loading = require('../../public/Iamge/Banner/loading.gif')

const styles = {
  wrapper: {
    height: height*0.3,
  },

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
  Exview:{
    height:height*0.2,
    flex:1,
    flexDirection:'column',
    flexWrap:'wrap',
    alignContent:'center',
    alignItems: 'center',
    margin:10,
   borderRadius:15,
    shadowColor:'#000000',
    shadowOpacity:0.9,
    shadowRadius:10,
    elevation: 5,//设置此项Android显示阴影，只能是灰色阴影，不支持其他颜色设置（Android） 
    backgroundColor: 'white',
  },
  Extext:{
    fontSize: 20,
    marginVertical: 10,
  },
  Extouch:{
    width: width*0.2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:20,
  },
  Eximage:{
    width:60,
    height:60,
    marginBottom: 5
  },
  Rank:{
    flex:1,
    flexDirection:'column',
    alignContent:'center',
    marginHorizontal:10,
    marginBottom:20,
   borderRadius:15,
    shadowColor:'#000000',
    shadowOpacity:0.9,
    shadowRadius:10,
    elevation: 5,//设置此项Android显示阴影，只能是灰色阴影，不支持其他颜色设置（Android） 
    backgroundColor: 'white',
  },
  //marginHorizontal相同于同时设置marginLeft和marginRight
  //marginVertical相同于同时设置marginTop和marginBottom
  Rviewtext:{
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },
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
  }
}

const Slide = props => {
  return (<View style={styles.slide}>
    <Image style={styles.image} source={props.uri} />
  </View>)
}

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imgList: [
        require('../../public/Iamge/Banner/banner_1.jpg'),
        require('../../public/Iamge/Banner/banner_4.jpg'),
        require('../../public/Iamge/Banner/banner_6.jpeg'),
        require('../../public/Iamge/Banner/banner_7.jpg'),
      ],
      loadQueue: [0, 0, 0, 0],
      rankTop:[
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
    }
  }
  loadHandle (i) {
    let loadQueue = this.state.loadQueue
    loadQueue[i] = 1
    this.setState({
      loadQueue
    })
  }
  render () {
    return (
      <ScrollView style={{flex: 1}}>
        <Swiper style={styles.wrapper} autoplay 
        dot={<View style={{marginLeft:10,width:30,height:5,borderRadius:50,backgroundColor: '#fff'}} />}
        activeDot={<View style={{marginLeft:10,width:30,height:5,borderRadius:50,backgroundColor: '#17C6AC'}} />}
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
        <View style={styles.Exview}>
          <Text style={styles.Extext}>R - Hi !</Text>
          <View style={{flex:1,flexDirection:'row',flexWrap:'wrap',alignContent:'center',alignItems: "center",paddingVertical:0}}>
              <TouchableHighlight style={styles.Extouch} onPress={this.getVideoLists}>
                <View >
                  <Image style={styles.Eximage} source={require('../../public/Iamge/Expression/live.png')}/>
                  <Text style={{textAlign: 'center',}}>R - Live</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.Extouch} onPress={this.getVideoLists} underlayColor={true}>
                <View >
                  <Image style={styles.Eximage} source={require('../../public/Iamge/Expression/project.png')}/>
                  <Text style={{textAlign: 'center',}}>R - Project</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight style={styles.Extouch} onPress={this.getVideoLists} underlayColor={true}>
                <View >
                  <Image style={styles.Eximage} source={require('../../public/Iamge/Expression/share.png')}/>
                  <Text style={{textAlign: 'center',}}>R - Share</Text>
                </View>
              </TouchableHighlight>
          </View>
        </View>  
        <View style={styles.Rank}>
              <Text style={styles.Rviewtext}>Lazy - Rank</Text>
           <View style={styles.RviewTwo}>
                 {
                    this.state.rankTop.map((item,i) =>
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
    )
  }

  getVideoLists = () =>{
    // console.warn('wwwwwwwwwww')
    // Actions.videodetail({id:10}) //传参
    Actions.videodetail()// 空传参
  }
  getVideoList = (value) =>{
    // console.warn('wwwwwwwwwww')
    // Actions.videodetail({id:10}) //传参
    Actions.videodetail({id:value})// 空传参
  }
} 


export default Home; 



