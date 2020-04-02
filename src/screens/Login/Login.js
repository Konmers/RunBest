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

import { Toast } from 'teaset'
import api from '../../server/api'
import storage from '../../server/storage'
import { strongFormData } from '../../server/formData'
import DeviceInfo from 'react-native-device-info';

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'
 
 class Login extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            name_value:"",//设置用户名初始值，用了判断清除图标的显隐
            pwd_value:"",//设置用密码初始值
            img_eye_close:true,//设置默认显示眼睛关闭的图标
            is_show_pwd:true //设置是否明文显示密码
        }
    }
 
     static propTypes = {}
 
     /**
      * 初始化了状态之后，在第一次绘制 render() 之前
      * （能够使用setState()来改变属性 有且只有一次）
      */
    //  componentWillMount() {}
 
     /**
      * 这个函数开始，就可以和 JS 其他框架交互了，例如设置计时 setTimeout 或者 setInterval，
      * 或者发起网络请求。这个函数也是只被调用一次
      * （能够使用setState()来改变属性 有且只有一次）
      */
    async componentDidMount() {
       console.log('token login------------  ',await storage.get('token'))

        // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }
 
     /**
      * 输入参数 nextProps 是即将被设置的属性，旧的属性还是可以通过 this.props 来获取。在这个回调函数里面，你可以根据属性的变化，
      * 通过调用 this.setState() 来更新你的组件状态，这里调用更新状态是安全的，并不会触发额外的 render()
      * （能够使用setState()来改变属性 多次调用）
      */
    //  componentWillReceiveProps() {}
 
     /**
      * 当组件接收到新的属性和状态改变的话，都会触发调用 shouldComponentUpdate(...)
      * （不能够使用setState()来改变属性 多次调用）
      */
     shouldComponentUpdate() { return true }
 
     /**
      * 如果组件状态或者属性改变，并且上面的 shouldComponentUpdate(...) 返回为 true，就会开始准更新组件
      * （不能够使用setState()来改变属性 多次调用）
      */
    //  componentWillUpdate() {}
 
    /**
     * 调用了 render() 更新完成界面之后，会调用 componentDidUpdate() 来得到通知
     * （不能够使用setState()来改变属性 多次调用）
     */
    componentDidUpdate() {}
 
    /**
    * 组件要被从界面上移除的时候，就会调用 componentWillUnmount()
    * （不能够使用setState()来改变属性 有且只有一次调用）
    */
    componentWillUnmount() {}
 
    render() {
        return (
            <ScrollView 
            contentContainerStyle={{ flex: 1 }} // 非常重要，让ScrollView的子元素占满整个区域
            keyboardDismissMode="on-drag" // 拖动界面输入法退出
            keyboardShouldPersistTaps={true} // 点击输入法以外的区域，输入法退出 不加这两句也可以实现点击空白处收回键盘
            scrollEnabled={false} // 当值为false的时候，内容不能滚动，默认值为true
            >
            {/* <StatusBar barStyle='light-content' backgroundColor='rgba(0.2,0.2,0.2,0.2)' translucent={true}></StatusBar> //状态栏沉浸 */}
            
                <ImageBackground  style={styles.container} behavior="padding" source={require('../../public/Iamge/Login/backIamge.jpg')}>
                    <View style={styles.header}>
                        <Image style={styles.img_log} source={require('../../public/Iamge/Head/15.jpg')}/>
                    </View>
                    <View style={styles.login_view}>
                        <View style={styles.item_name}>
                            <Image style={styles.img_user} source={require('../../public/Iamge/Login/user.png')}/>
                            <TextInput
                                value={this.state.name_value}
                                style={styles.textcont}
                                keyboardType='default'
                                placeholder=" Username"
                                placeholderTextColor="white"
                                onChangeText={(text) => this.setState({
                                    name_value:text
                                })}
                            />
                            {this.state.name_value===""?(null):<TouchableNativeFeedback onPress={()=>this.setState(
                                {
                                    name_value:""
                                }
                            )}>
                            <Image style={styles.tag_clear} source={require('../../public/Iamge/Login/confirm.png')}  />
                            </TouchableNativeFeedback>}
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
                            {/* {this.state.pwd_value===""?(null):
                            <TouchableNativeFeedback onPress={
                                ()=>this.setState(
                                {
                                    pwd_value:""
                                })
                            }>
                                <Image style={styles.tag_clear} source={require('../../public/Iamge/Login/confirm.png')}  />
                                </TouchableNativeFeedback>} */}
                            {this.state.pwd_value===""?null:
                                <TouchableNativeFeedback onPress={
                                    ()=>this.setState({
                                        is_show_pwd:!this.state.is_show_pwd,
                                        img_eye_close:!this.state.img_eye_close
                                    })
                                }>
                                {this.state.img_eye_close===true?<Image style={styles.tag_img} source={require('../../public/Iamge/Login/closeeyes.png')}/>:<Image style={styles.tag_img} source={require('../../public/Iamge/Login/openeyes.png')}/>}
                                </TouchableNativeFeedback>}
                        </View>
                        <View style={styles.login_forgetpass}>
                            <Text style={[styles.login_forgetpasstxt,{paddingLeft:10,textAlign:'left'}]}
                            onPress={() => this.onLoginregister()}
                            >Sign Up</Text>
                            <Text style={[styles.login_forgetpasstxt,{paddingRight:10,textAlign:'right'}]}
                            onPress={() => this.onForget()}
                            > Forget Password?</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.onPressLogin()}
                            >
                                <Text style={styles.buttonText}>Sign in</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </ScrollView>
        )
    }
    async onPressLogin() {
        // console.log('设备ID:', DeviceInfo.getDeviceId());
        await storage.add('devicesid',DeviceInfo.getDeviceId())
        // FIXME: 发送数据 for android
        const devicesid = await storage.get('devicesid')
        console.log('devicesid-------  ',devicesid)
        const formData = {
            username:this.state.name_value,
            password:this.state.pwd_value,
            devices:devicesid
        }
        api.user.login(formData).then((Data) => {
            console.log('Data-------  ',Data)
            if (Data.type === true) 
            {
                storage.add('token', Data.key)
                storage.add('uid', Data.uid)
                Toast.message('登陆成功');
                const {navigation} = this.props;
                if (navigation) {
                    // Actions.app()// 空传参
                    Actions.homeInfo()
                }  
            } 
            else 
            {
                Toast.message(Data.msg);
            }
        })
    }
    onLoginregister() {
        const {navigation} = this.props;
        if (navigation) {
            // this.props.navigation.navigate('Home');
            Actions.Register()// 空传参
            // Actions.Demo1()// 空传参
        }  
    }
    onForget() {
        const {navigation} = this.props;
        if (navigation) {
            // this.props.navigation.navigate('Home');
            Actions.Forget()// 空传参
            // Actions.Demo1()// 空传参
        }  
    }
}
 
 const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        height:'40%',
        width:"80%",
        alignItems: 'center',
        alignSelf:'center',
        marginVertical:10
    },
    login_view:{
        marginTop:20,
        alignSelf:'center',
        backgroundColor: 'transparent',
        width:"80%",
        height:"40%",
    },
    img_log:{
        marginTop:30,
    },
    item_name:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center',
        alignItems:'center',
        marginTop:10,
        borderRadius:6,
        borderColor:"#efecea",
        borderBottomWidth:1,
        // borderWidth:1,
        width:280
    },
    item_pwd:{
        flexDirection:'row',
        flex:1,
        alignSelf:'center',
        alignItems:'center',
        borderRadius:6,
        borderColor:"#efecea",
        // borderWidth:1,
        borderBottomWidth:1,
        width:280,
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
    login_forgetpass:{
        height:20, 
        width:"100%",
        marginVertical:10,
        display:"flex",
        flexDirection:'row'
    },
    login_forgetpasstxt:{
        width:"50%",
        height:"100%",
        fontSize:16,
        fontWeight:'700',
        color:'#17C6AC',
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