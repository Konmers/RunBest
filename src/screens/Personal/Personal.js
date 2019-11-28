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

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')
var ScreenWidth = Dimensions.get('window').width;

const styles = {
    Title:{
      width,
      height: height*0.06,
      textAlign: 'center',
      lineHeight: height*0.06,
      display: 'flex',
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
      color: '#333'
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
        width:'50%',
        height: '100%',
        padding:0,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
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
        width: '35%',
        height: '55%',
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
    optionArrs:{
        display: 'flex',
        width,
        height: '30%',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical:10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#c9c9c9',
    },
    optionArrss:{
        isplay: 'flex',
        width,
        height: '8%',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical:10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#c9c9c9',
    },
    options:{
        width,
        height: '25%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    optionss:{
        width,
        height: '100 %',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    optionsdetail:{
        height: '100%',
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    line:{
        borderTopWidth: 0.5,
        borderColor: '#c9c9c9'
    },
    lifeView:{
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
    },
    lifeViewimg:{
        width: 25,
        height: 25,
        marginRight: 10
    },
    optionsText:{
        fontSize: 18,
        color: '#666'
    },
    optionsImg:{
        width:15,
        height:15,
    },
  }


 class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            optionArr:[
                {
                    title:'我的里程',
                    img:require('../../public/Iamge/Else/accomplish_after.png')
                },
                {
                    title:'步数记录',
                    img:require('../../public/Iamge/Else/record_after.png')
                },
                {
                    title:'关于我们',
                    img:require('../../public/Iamge/Else/about_after.png')
                },
                {
                    title:'意见反馈',
                    img:require('../../public/Iamge/Else/message_after.png')
                }
            ],
            optionDatail:{
                title:'意见反馈',
                img:require('../../public/Iamge/Else/feedback_after.png')
            }
        }
        this.nowHour = dayjs().hour() 
    }
        // let nowDate = dayjs().format("YYYY-MM-DD HH:mm:ss")
    weather(){
        console.warn('nowHour-------- ',this.nowHour)
        if(6 <= this.nowHour&&this.nowHour < 12)
        {
            return (<View style={styles.weatherView}>
                <Image style={styles.weatherImg} source={require('../../public/Iamge/Else/sun.png')} /><Text>上午好~</Text></View>)
        }
        else if(12 <= this.nowHour&&this.nowHour < 18)
        {
            return (<View style={styles.weatherView}><Image style={styles.weatherImg} source={require('../../public/Iamge/Else/sun.png')} /><Text>下午好~</Text></View>)
        }
        else
        {
            return (<View style={styles.weatherView}><Image style={styles.weatherImg} source={require('../../public/Iamge/Else/moon.png')} /><Text>晚上好~</Text></View>)
        }
    }
    render() { 
        return ( 
            <View style={{flex:1}}>
                <View style={styles.Title}>
                    <Text style={styles.Toptext}>Run - Personal</Text>
                    <TouchableOpacity  style={styles.Share} onPress={this.onPress}> 
                        <Image style={{width:30,height: 30}} source={require('../../public/Iamge/Else/seting.png')} />
                    </TouchableOpacity >
                </View>
                <View style={styles.content}>
                    <View style={styles.weatherStyle}>
                    {this.weather()}
                    </View>
                    <TouchableOpacity style={styles.avatar}  onPress={() => this.getUserinfo('sdfsd')}>
                        <View style={styles.ViewImg}>
                            <Image style={{width:'100%',height:'100%'}} source={require('../../public/Iamge/Head/14.jpg')} />
                        </View>
                        <Text style={styles.ViewText}>Konmer <Image style={{width:20,height: 20}} source={require('../../public/Iamge/Else/edit_1.png')} /> </Text>
                    </TouchableOpacity>
                    <View style={styles.optionArrs}>
                       {
                           this.state.optionArr.map((item,i) =>
                           <View style={styles.options} key={i}>
                               {i===0 ?(
                                <TouchableOpacity style={styles.optionsdetail} onPress={() => this.getUserinfo(i)}>
                                    <View style={styles.lifeView}>
                                        <Image style={styles.lifeViewimg} source={item.img} />
                                        <Text style={styles.optionsText}>{item.title}</Text>
                                    </View>
                                    <Image style={styles.optionsImg} source={require('../../public/Iamge/Else/rightnavigation.png')} />
                                </TouchableOpacity>  
                               ):(
                                <TouchableOpacity style={[styles.optionsdetail,styles.line]} onPress={() => this.getUserinfo(i)}>
                                    <View style={styles.lifeView}>
                                        <Image style={styles.lifeViewimg} source={item.img} />
                                        <Text style={styles.optionsText}>{item.title}</Text>
                                    </View>
                                    <Image style={styles.optionsImg} source={require('../../public/Iamge/Else/rightnavigation.png')} />
                                </TouchableOpacity> 
                               )}
                            </View>
                           )
                       }
                    </View>
                    <View style={[styles.optionArrss]}>
                        <View style={styles.optionss}>
                            <TouchableOpacity style={[styles.optionsdetail]} onPress={() => this.getUserinfo()}>
                                <View style={styles.lifeView}>
                                    <Image style={styles.lifeViewimg} source={this.state.optionDatail.img} />
                                    <Text style={styles.optionsText}>{this.state.optionDatail.title}</Text>
                                </View>
                                <Image style={styles.optionsImg} source={require('../../public/Iamge/Else/rightnavigation.png')} />
                            </TouchableOpacity> 
                        </View>
                    </View>
                </View>
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
    }
}

export default Personal;