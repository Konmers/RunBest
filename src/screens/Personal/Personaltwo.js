// 个人中心
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

//时间
import dayjs from 'dayjs'

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'

//tab component 选项卡
import ScrollableTabView,{DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')
var ScreenWidth = Dimensions.get('window').width;

import Floatball from "../../middleware/Floatball.js"
import api from '../../server/api'
import storage from '../../server/storage'

const styles = StyleSheet.create({
    Title:{
      width,
      height: height*0.08,
      textAlign: 'center',
      lineHeight: height*0.06,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    //   borderBottomStyle: 'solid',
    //   borderBottomWidth: 2,
    //   borderBottomColor: 'red'
    },
    Toptext:{
      textAlign: 'center',
      fontSize: 20,
      color: '#333',
    },
    Share:{
      position:'absolute',
      right: 15
    },
    content:{
        width,
        height,
        backgroundColor: '#f0f0f0'  //底色
    },
    weatherStyle:{
        width,
        height: '8%',
        backgroundColor: 'white'
    },
    weatherView:{
        position:'absolute',
        left: 0,
        width:'30%',
        height: '100%',
        padding:0,
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor:'blue'
    },
    weatherImg:{
        width: 50,
        height: 50,
    },
    avatar:{
       width,
       height: '30%',
       display: 'flex',
       alignItems: 'center',
       backgroundColor: 'white',
    //    backgroundColor: 'red',
    },
    ViewImg:{
        width: 120,
        height: 120,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    ViewText:{
        marginTop:30,
        fontSize: 20,
        color: '#333'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    lineStyle: {
        width: ScreenWidth / 3,
        height: 5,
        backgroundColor:'#17C6AC'
    },
    tabStyle: {
        flex: 1,
        marginVertical: 10,
    },
})

class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            list:{},
        }
        this.nowHour = dayjs().hour() 
    }

    // let nowDate = dayjs().format("YYYY-MM-DD HH:mm:ss")
    weather(){
        // console.warn('nowHour-------- ',this.nowHour)
        if(6 <= this.nowHour&&this.nowHour < 12)
        {
            return (<View style={styles.weatherView}>
                        <Image style={styles.weatherImg} source={require('../../public/Iamge/Else/sun.gif')} />
                        <Text>上午好~</Text>
                    </View>)
        }
        else if(12 <= this.nowHour&&this.nowHour < 19)
        {
            return (<View style={styles.weatherView}>
                        <Image style={styles.weatherImg} source={require('../../public/Iamge/Else/sun.gif')} />
                        <Text>下午好~</Text>
                    </View>)
        }
        else
        {
            return (<View style={styles.weatherView}>
                        <Image style={styles.weatherImg} source={require('../../public/Iamge/Else/moon.gif')} />
                        <Text>晚上好~</Text>
                    </View>)
        }
    }

    //初始化
    componentDidMount = async () =>{
        const user = {uid:await storage.get('uid')}
        api.user.loginInfo(user).then((data) => {
            console.log('data-----  ',data)
            console.log('userinfo msg-----  ',data.msg)
            if(data.type == 'success')
            {
                this.setState({list:data.list});
            }
            else
            {
                console.log('2222')
            }
        }) 
    }

    render() { 
        return ( 
            <View style={{flex:1}}>
                <View style={styles.Title}>
                    {this.weather()}
                    <Text style={styles.Toptext}>Personal</Text>
                    <TouchableOpacity  style={styles.Share} onPress={this.onPress}> 
                        <Image style={{width:30,height: 30}} source={require('../../public/Iamge/Else/seting.png')} />
                    </TouchableOpacity >
                </View>
                <View style={styles.content}>
                    {/* <View style={styles.weatherStyle}>
                    {this.weather()}
                    </View> */}
                    <TouchableOpacity style={styles.avatar}  onPress={() => this.getUserinfo('sdfsd')}>
                        <View style={styles.ViewImg}>
                            <Image style={{width:'100%',height:'100%'}} source={{uri:this.state.list.avatar}} />
                        </View>
                        <Text style={styles.ViewText}>{this.state.list.username} <Image style={{width:20,height: 20}} source={require('../../public/Iamge/Else/edit_1.png')} /> </Text>
                    </TouchableOpacity>
                    <ScrollableTabView
                        style={styles.container}
                        renderTabBar={() => <DefaultTabBar />}
                        tabBarUnderlineStyle={styles.lineStyle}
                        tabBarActiveTextColor='#17C6AC'
                    >
                        <ScrollView style={styles.tabStyle} tabLabel='Like'>
                        </ScrollView>
                        <ScrollView style={styles.tabStyle} tabLabel='Communtlike'>
                        </ScrollView>
                        <ScrollView style={styles.tabStyle} tabLabel='Dynamic'>
                        </ScrollView>
                    </ScrollableTabView>
                </View>
                <Floatball/> 
            </View>
         );
    }

    onPress = () => {
        console.warn('ddddd') 
    };
    getUserinfo = (value) =>{
        // console.warn('wwwwwwwwwww')
        // Actions.videodetail({id:10}) //传参
        Actions.userinfo({id:value})// 空传参
        // Actions.radio() //空传参
        // Actions.datetimepicker() //空传参
    }
}

export default Personal;