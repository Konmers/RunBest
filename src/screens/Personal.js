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
        display: 'flex',
        width,
        height,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'  //底色
    },
    avatar:{
       width,
       height: '40%',
       display: 'flex',
       alignContent: 'center',
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: 'white',
    },
    ViewImg:{
        width: '40%',
        height: '50%',
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        overflow: 'hidden'
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
        marginRight: 5
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
                    img:require('../public/Iamge/Else/accomplish_after.png')
                },
                {
                    title:'步数记录',
                    img:require('../public/Iamge/Else/record_after.png')
                },
                {
                    title:'关于我们',
                    img:require('../public/Iamge/Else/about_after.png')
                },
                {
                    title:'意见反馈',
                    img:require('../public/Iamge/Else/message_after.png')
                }
            ],
            optionDatail:{
                title:'意见反馈',
                img:require('../public/Iamge/Else/feedback_after.png')
            }
        }
    }
    render() { 
        return ( 
            <View style={{flex:1}}>
                <View style={styles.Title}>
                    {/* <Text style={styles.Toptext}>Run - Personal</Text> */}
                    <TouchableOpacity  style={styles.Share} onPress={this.onPress}> 
                        <Image style={{width:30,height: 30}} source={require('../public/Iamge/Else/seting.png')} />
                    </TouchableOpacity >
                </View>
                <View style={styles.content}>
                    <View style={styles.avatar}>
                        <TouchableOpacity style={styles.ViewImg} onPress={() => this.getVideoList()}>
                            <Image style={{width:'100%',height:'100%'}} source={require('../public/Iamge/Head/14.jpg')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.optionArrs}>
                       {
                           this.state.optionArr.map((item,i) =>
                           <View style={styles.options}>
                               {i===0 ?(
                                <TouchableOpacity style={styles.optionsdetail} onPress={() => this.getVideoList(i)}>
                                    <View style={styles.lifeView}>
                                        <Image style={styles.lifeViewimg} source={item.img} />
                                        <Text style={styles.optionsText}>{item.title}</Text>
                                    </View>
                                    <Image style={styles.optionsImg} source={require('../public/Iamge/Else/rightnavigation.png')} />
                                </TouchableOpacity>  
                               ):(
                                <TouchableOpacity style={[styles.optionsdetail,styles.line]} onPress={() => this.getVideoList(i)}>
                                    <View style={styles.lifeView}>
                                        <Image style={styles.lifeViewimg} source={item.img} />
                                        <Text style={styles.optionsText}>{item.title}</Text>
                                    </View>
                                    <Image style={styles.optionsImg} source={require('../public/Iamge/Else/rightnavigation.png')} />
                                </TouchableOpacity> 
                               )}
                            </View>
                           )
                       }
                    </View>
                    <View style={[styles.optionArrss]}>
                        <View style={styles.optionss}>
                            <TouchableOpacity style={[styles.optionsdetail]} onPress={() => this.getVideoList()}>
                                <View style={styles.lifeView}>
                                    <Image style={styles.lifeViewimg} source={this.state.optionDatail.img} />
                                    <Text style={styles.optionsText}>{this.state.optionDatail.title}</Text>
                                </View>
                                <Image style={styles.optionsImg} source={require('../public/Iamge/Else/rightnavigation.png')} />
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
}

export default Personal;