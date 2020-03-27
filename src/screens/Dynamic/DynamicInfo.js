//排行榜
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
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
const { width , height } = Dimensions.get('window')
import Floatball from "../../middleware/Floatball.js"
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Toast } from 'teaset'

import api from '../../server/api'
import storage from '../../server/storage'

const loading = require('../../public/Iamge/Banner/loading.gif')

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        alignContent: 'center',
    },
    contView: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'white',
        borderBottomWidth:1,
        borderBottomColor:'#c1c1c1',
    },
    contentSwper: {
        width: width,
        height: height * 0.6,
        backgroundColor: 'black',
    },
    Toptext:{
        width: width,
        height: height*0.06,
        textAlign: 'center',
        lineHeight: height*0.06,
        fontSize: 20,
        color: '#333'
    },
    wrapperView: {
        height:  '100%',
    },
    swiperImg: {
        width: '100%',
        height:'100%',
    },
})

export default class DynamicInfo extends Component {

    async componentDidMount() {
        // console.log('this.props uid--------   ',this.props.uid)
        console.log('this.props dynamicId--------   ',this.props.dynamicId)
        // const user = {uid:this.props.uid}
        // await api.user.loginInfo(user).then((data) => {
        //     if(data.type == 'success')
        //     {
        //         console.log('data-----  ',data)
        //     }
        //     else
        //     {
        //         console.log('2222')
        //     }
        // }) 
        const dynamic = {dynamicId:this.props.dynamicId}
        await api.dynamic.dynamicInfo(dynamic).then((data) => {
            // console.log('data--------  ',data)
            if(data.type == 'success')
            {
                console.log('msg-----  ',data.msg)
                this.setState({dynamicInfo:data.list});
                console.log('this.state.dynamicInfo-----  ',this.state.dynamicInfo)

            }
            else
            {
                console.log('2222')
            }
        }) 
    }

    constructor (props) {
        super(props)
        this.state = {
            dynamicInfo:{},

        }
    }

    //设置图片宽高--android、ios有兼容
    //android
    setSize(imgItem) {
        let { imgH } = this.state;
        let showH;
        if (Platform.OS != 'ios') {
            Image.getSize(imgItem, (w, h) => {//多张则循环判断处理
                showH = Math.floor(h / (w / (width - 30)));
                imgH[i] = showH;
                this.setState({ imgH: imgH });
            });
        }
    }
    //ios
    setSizeIos(imgItem) {
      let { imgH } = this.state;
      let showH;
      if (Platform.OS == 'ios') {
        Image.getSize(imgItem, (w, h) => {//同安卓
          showH = Math.floor(h / (w / (width - 30)));
          imgH[i] = showH;
          this.setState({ imgH: imgH });
        })
      }
    }
    
    render() {
        let { imgH,img } = this.state;
        return (
        <View style={styles.cont}>
            <Text style={styles.Toptext}>Lazy - Rank</Text>
            <View style={styles.contView}>
                <View style={styles.contentSwper}>
                    {
                        this.state.dynamicInfo.ImgArr ? (
                            <Swiper style={styles.wrapperView} 
                                // onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                                dot={<View style={{backgroundColor:'rgba(0,0,0,.5)', width: 8, height: 8,borderRadius: 4, marginHorizontal:3,marginVertical:3,}} />}
                                activeDot={<View style={{backgroundColor: '#17C6AC', width: 8, height: 8, borderRadius: 4, marginHorizontal:3,marginVertical:3}} />}
                                paginationStyle={{
                                    bottom: 10,
                                }}
                                autoplay  //bool值  循环属性 
                                autoplayTimeout = {7} //循环时间
                            >
                            {
                                this.state.dynamicInfo.ImgArr.map((items) =>
                                    <Image 
                                        resizeMode='contain' 
                                        // onLoadStart={() => { this.setSize(items) }}//多张可多加该图index参数
                                        // onLayout={() => { this.setSizeIos(items) }}
                                        // style={{width:width-20,height:imgH}}
                                        style={styles.swiperImg} 
                                        source={{uri:items}} 
                                    />
                                )
                            }
                            </Swiper>
                        ) : null
                    }
                </View>
            </View>
            <Floatball/> 
        </View>
        )
    }
}