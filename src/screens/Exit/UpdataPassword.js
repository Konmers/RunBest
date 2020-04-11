import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    FlatList,
    Button,
    TextInput,
    BackHandler,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
} from 'react-native'

// Dimensions 用于获取设备宽、高、分辨率
const { width, height } = Dimensions.get('window')
// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'
//防止多次点击
// import { preventDoublePress } from "../../middleware/PreventDoublePress.js"

import api from '../../server/api'

import storage from '../../server/storage'

import { Toast } from 'teaset'

const styles = StyleSheet.create({
    cont:{
        width,
        height,
        alignContent:'center',
        alignItems:'center',
        backgroundColor: '#ddd'  //底色
    }, 
    content:{
        width,
        height:height*0.12,
        // backgroundColor: 'red',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical:10
    },
    contText:{
        width:width*0.9,
        fontSize:18,
        fontFamily:'MAK Freeset Bold',
        textAlign:'left',
        backgroundColor:'#fff',
        marginVertical:4
    },
    exitView:{
        width:width*0.9,
        height: height*0.08,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#17C6AC'
    },
    exitTxt:{
        fontSize:20,
        fontFamily:'MAK Freeset Bold',
        // fontFamily:'Coda-Heavy-webfont',
        // fontFamily:'JockeyOne-Regular-webfont', 
        color:"#fff"       
    }
})

var con_title = {
    width:width*0.9,
    height: 30, 
    fontSize:20,
    fontWeight:'bold',
    padding: 0,
    borderBottomColor: '#CCC', 
    borderBottomWidth: 1,
    marginVertical:8
  }
  
  var con_titless = {
    width:width*0.9,
    height: 30, 
    fontSize:20,
    fontWeight:'bold',
    padding: 0,
    borderBottomColor: '#17C6AC', 
    borderBottomWidth: 2,
    marginVertical:8
  }
  

export class UpdataPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentval:'',
            newval:'',
            confirmval:'',
            currentStyle: con_title,
            newStyle: con_title,
            confirmStyle: con_title
        }
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.content}>
                    <Text style={styles.contText}>Current Password</Text>
                    <TextInput
                        style={this.state.currentStyle}
                        placeholder=" Please shu ha the mima ~"
                        placeholderTextColor='#CCC'
                        editable={true} // 是否可编辑，默认为: true
                        secureTextEntry={true} // 是否为密码，默认为: false
                        keyboardType='default' // 弹出键盘类型
                        maxLength={18} // 限制文本框中最多的字符数
                        multiline={false} // 是否为多行文本，默认为: false
                        onFocus={()=> this.setState({currentStyle:con_titless})}
                        onBlur={()=>this.setState({currentStyle:con_title})}
                        onChangeText={(text) => this.setState({currentval:text })}
                        // onChangeText={() => this._onChangeTitle}//输入框改变触发的函数
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.contText}>New Password</Text>
                    <TextInput
                        style={this.state.newStyle}
                        placeholder=" Please shu ha the xin mima ~"
                        placeholderTextColor='#CCC'
                        editable={true} // 是否可编辑，默认为: true
                        secureTextEntry={true} // 是否为密码，默认为: false
                        keyboardType='default' // 弹出键盘类型
                        maxLength={18} // 限制文本框中最多的字符数
                        multiline={false} // 是否为多行文本，默认为: false
                        onFocus={()=> this.setState({newStyle:con_titless})}
                        onBlur={()=>this.setState({newStyle:con_title})}
                        onChangeText={(text) => this.setState({newval:text})}
                        // onChangeText={() => this._onChangeTitle}//输入框改变触发的函数
                    />
                </View>
                <View style={styles.content}>
                    <Text style={styles.contText}>Confirm Password</Text>
                    <TextInput
                        style={this.state.confirmStyle}
                        placeholder=" Please zai shu ha the xin mima ~"
                        placeholderTextColor='#CCC'
                        editable={true} // 是否可编辑，默认为: true
                        secureTextEntry={true} // 是否为密码，默认为: false
                        keyboardType='default' // 弹出键盘类型
                        maxLength={18} // 限制文本框中最多的字符数
                        multiline={false} // 是否为多行文本，默认为: false
                        onFocus={()=> this.setState({confirmStyle:con_titless})}
                        onBlur={()=>this.setState({confirmStyle:con_title})}
                        onChangeText={(text) => this.setState({confirmval:text})}
                        // onChangeText={() => this._onChangeTitle}//输入框改变触发的函数
                    />
                </View>
                <View style={styles.exitView}>
                    <Text style={styles.exitTxt} onPress={()=>this.UpdataPassButton()} >Save Password</Text>
                </View>
            </View>
        )
    }

    // click exit   
   async UpdataPassButton(){
        let oldpass = this.state.currentval ? this.state.currentval : alert('shu ha dang qian mi ma !!!')
        let newpass = this.state.newval == this.state.confirmval ? this.state.confirmval : alert('zai shu ha dang qian mi ma !!!')

        if(oldpass && newpass && oldpass != newpass)
        {
            const formData = {
                uid:await storage.get('uid'),
                oldpass:oldpass,
                newpass:newpass
            }

            api.user.updatenowpassword(formData).then( async (data) => {
                if (data.type === true) 
                {
                    // Toast.message(data.msg);
                    // console.log('token 111------------  ',await storage.get('token'))
                    storage.delete('token', '')
                    Toast.success('Already xiu gai ok ~',5000)
                    // console.log('token 222------------  ',await storage.get('token'))
                    Actions.Login()
                } 
                else 
                {
                    Toast.message(data.msg);
                }
            })
          
        }
        

    }
}

export default UpdataPassword
