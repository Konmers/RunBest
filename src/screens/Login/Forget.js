/**
  * desc：登录页面
  * author：ph
  * date： 0423
  */

import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  Dimensions,
  ImageBackground, 
  TouchableHighlight,//选中跳转
  TouchableOpacity,
  StatusBar,
  ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
} from 'react-native'
// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')

import SplashScreen from 'react-native-splash-screen' //引导页

//验证码
import CountDownButton from '../../middleware/CountDownButton';

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'

import { Toast } from 'teaset'

import api from '../../server/api'
 
 class Login extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            pwd_value:"",//设置用密码初始值
            email_value:"",
            verification_code:'',
            getverification_code:'',
            img_eye_close:true,//设置默认显示眼睛关闭的图标
            is_show_pwd:true //设置是否明文显示密码
        }
    }
 
     static propTypes = {}
 
     componentDidMount() {
        // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }
 
    render() {
        return (
            <ScrollView 
            contentContainerStyle={{ flex: 1 }} // 非常重要，让ScrollView的子元素占满整个区域
            keyboardDismissMode="on-drag" // 拖动界面输入法退出
            keyboardShouldPersistTaps={true} // 点击输入法以外的区域，输入法退出 不加这两句也可以实现点击空白处收回键盘
            scrollEnabled={false} // 当值为false的时候，内容不能滚动，默认值为true
            >
            {/* <StatusBar barStyle='light-content' backgroundColor='rgba(0.2,0.2,0.2,0.2)' translucent={true}></StatusBar> //状态栏沉浸 */}
            
                <ImageBackground style={[styles.container,{paddingTop:'20%'}]} behavior="padding" source={require('../../public/Iamge/Login/backIamge.jpg')}>
                    <View style={styles.header}>
                        <Text style={styles.headertext}>Forget</Text>
                    </View>
                    <View style={styles.login_view}>
                        <View style={styles.item_texteara}>
                            <Image style={styles.img_user} source={require('../../public/Iamge/Login/e-mail.png')}/>
                            <TextInput
                                value={this.state.email_value}
                                style={styles.textcont}
                                keyboardType='email-address'
                                placeholder=" Email"
                                placeholderTextColor="white"
                                onChangeText={(text) => this.setState({
                                    email_value:text
                                })}
                            />
                            {this.state.email_value===""?(null):<TouchableNativeFeedback onPress={()=>this.setState(
                                {
                                    email_value:""
                                }
                            )}>
                            <Image style={styles.tag_clear} source={require('../../public/Iamge/Login/confirm.png')}  />
                            </TouchableNativeFeedback>}
                        </View>
                        <View style={styles.item_verification}>
                            <View style={[styles.item_texteara,{marginTop:0,height:'100%'}]}>
                                <Image style={styles.img_user} source={require('../../public/Iamge/Login/confirm.png')}/>
                                <TextInput
                                    value={this.state.verification_code}
                                    style={[styles.textcont,{marginRight:5}]}
                                    keyboardType='numeric'
                                    placeholder=" Verification code "
                                    placeholderTextColor="white"
                                    onChangeText={(text) => this.setState({
                                        verification_code:text
                                    })}
                                />
                            </View>
                            {/* <CountDownButton enable={true} timerCount={10} onClick={(_shouldStartCount) => { _shouldStartCount(true)}}/> */}
                            <CountDownButton enable={true} timerCount={10} onClick={(_shouldStartCount) => { _shouldStartCount(true),this.onGetcode()}}/>
                        </View>
                        <View style={styles.item_pwd}>
                            <Image  style={styles.img_pwd} source={require('../../public/Iamge/Login/password.png')}/>
                            <TextInput
                                value={this.state.pwd_value}
                                style={styles.textcont}
                                keyboardType='default'
                                placeholder=" Password"
                                placeholderTextColor="white"
                                onChangeText={(text) => this.setState({
                                    pwd_value:text
                                })}
                                secureTextEntry={this.state.is_show_pwd}
                            />
                            {this.state.pwd_value===""?null:
                                <TouchableNativeFeedback onPress={
                                    ()=>this.setState({
                                        is_show_pwd:!this.state.is_show_pwd,
                                        img_eye_close:!this.state.img_eye_close
                                    })
                                }>
                                {this.state.img_eye_close===true?<Image style={styles.tag_img} source={require('../../public/Iamge/Login/closeeyes.png')}/>:<Image style={styles.tag_img} source={require('../../public/Iamge/Login/openeyes.png')}/>}
                                </TouchableNativeFeedback>
                            }
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onJoin()}
                            >
                                <Text style={styles.buttonText}>Commit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        )
    }

    onJoin() {
        if(this.state.verification_code === this.state.getverification_code)
        {
            const formData = {
                email:this.state.email_value || Toast.message('请填写邮箱'),
                pwd:this.state.pwd_value || Toast.message('请填写密码')
            }
            api.user.updateUser(formData).then((Data) => {
                if (Data.type === true) 
                {
                    Toast.message('Fotget Successful !!  ^_^');
                    const {navigation} = this.props;
                    if (navigation) {
                        Actions.Login()// 空传参
                    } 
                } 
                else 
                {
                    Toast.message('Fotget Error !! -_-//');
                }
            })
        }
        else
        {
            Toast.message('请填写邮箱验证码');
        } 
    }

    onGetcode() {
        console.log('this.state.email_value-------  ',this.state.email_value)
        if(this.state.email_value)
        {
            const email = this.state.email_value 
            const formData = new Object()
            formData['email'] = email
            console.log('formData-------  ',formData)
            api.user.forverificationcode(formData).then((Data) => {
                console.log('Data-------  ',Data)
                if (Data.type === true) 
                {
                    this.setState({getverification_code:Data.verification})
                    Toast.message('请查看邮箱验证码');
                } 
                else 
                {
                    Toast.message(Data.msg);
                }
            })
        }
        else
        {
            Toast.message('请填写邮箱')
        }
    }
}
 
 const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        marginTop:10,
        width:"90%",
        alignSelf:'center',
        flexDirection:'row'
    },
    headertext:{
        fontSize:30,
        fontWeight:'700',
        color:'#17C6AC',
        paddingLeft:10
    },
    login_view:{
        marginTop:10,
        alignSelf:'center',
        // backgroundColor:'red',
        backgroundColor: 'transparent',
        width:"90%",
        height:"60%",
    },
    item_texteara:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center',
        alignItems:'center',
        marginTop:10,
        borderRadius:6,
        borderColor:"#efecea",
        borderBottomWidth:2,
        width:"90%",
        height:'20%'
    },
    item_verification:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center',
        alignItems:'center',
        alignContent:'center',
        marginTop:20,
        height:'20%',
        width:"90%"
    },
    item_pwd:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:6,
        borderColor:"#efecea",
        borderBottomWidth:2,
        width:"90%",
        height:'20%',
        marginTop:10
    },
    img_user:{
        width:20,
        height:20,
        marginLeft:10
    },
    img_pwd:{
        width:20,
        height:20,
        marginLeft:10
    },
    textcont:{
        height: 40,
        flex:1,
        fontSize:18,
        paddingLeft:3,
        color:'white'
    },
    tag_clear:{ 
        width:16,
        height:16,
        right:12
    },
    tag_img:{ 
        width:20,
        height:20,
        right:10
    },
    buttonView: {
        alignItems:'center',
        flex: 3
    },
    button: {
        marginTop: 20,
        width:width*0.8,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#17C6AC',
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
    },
 });
 export default Login;