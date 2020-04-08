import React, { Component } from 'react';
import {
    Modal,
    Text,
    View,
    Image,
    Switch,
    StyleSheet,
    Dimensions,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
  } from 'react-native'

  //router
  import { Actions } from 'react-native-router-flux'

  //bounced 
  import ModalBox from 'react-native-modalbox'

  import api from '../../server/api'
  import storage from '../../server/storage'
  
  // Dimensions 用于获取设备宽、高、分辨率
  const { width,height } = Dimensions.get('window')

  const styles = StyleSheet.create({
    BigView:{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        backgroundColor:'#f0f0f0'
    },
    datailView:{
        width,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    datail:{
        width:width*0.9,
        height: height*0.1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingHorizontal: 5,
        borderTopWidth: 0.5,
        borderColor: '#c9c9c9'
    }, 
    datailsTitle:{
    //    fontFamily: 'DIN alternate',
       fontFamily:'MAK Freeset Bold',
       fontSize: 15,
    },
    dataRightView:{
        width: "50%",
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    datailsRight:{
        width:15,
        height:15,
    },
    datailsTouch:{
    },
    datailsData:{
        fontSize:15,
        textAlign:'right',
        color: '#999999' 
    },

    //-----
    modal:{
        height: '30%',
        width,
    },
    modalLayer: {
        flex: 1,
        justifyContent: 'center',
        padding: 32
    },
    modalContainer: {
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    exitView:{
        width:width*0.9,
        height: height*0.1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 0.5,
        borderColor: '#c9c9c9'
        // backgroundColor:'red'
    },
    exitTxt:{
        fontSize:20,
        fontFamily:'MAK Freeset Bold',
        // fontFamily:'Coda-Heavy-webfont',
        // fontFamily:'JockeyOne-Regular-webfont', 
        color:"#17C6AC"       
    }
  })


 class Userinfo extends Component {
    //初始化
    componentDidMount = async () =>{
        const user = {uid:await storage.get('uid')}
    }

    constructor(props) {
        super(props);
        this.state ={
            dataArr : [
                {
                    title:'Change password',
                    data:''  
                },
                {
                    title:'Push notification',
                    data:''
                },
                {
                    title:'Version check',
                    data:'1.20 '
                },
                {
                    title:'Wipe cache',
                    data:''
                }
            ],
            item:'',
            isPushnotification: false
        } 
    }

    render() {
        return (
            <View style={styles.BigView}>
                <View style={styles.datailView}>
                    {
                        this.state.dataArr.map((item,i) =>
                            <View style={styles.datail} key={i}>
                                <Text style={styles.datailsTitle}>{item.title}</Text>
                                <View style={styles.dataRightView}>
                                    {
                                        item.title == 'Change password'?(
                                            <TouchableOpacity style={styles.datailsTouch} onPress={()=> this.updatePass()} >
                                                <Image style={styles.datailsRight} source={require('../../public/Iamge/Else/rightnavigation.png')} />
                                            </TouchableOpacity>
                                        )
                                        :(
                                            item.title == 'Push notification' ?
                                            (
                                                <Switch
                                                    // disabled={true}//是否可以响应,默认为false,true是无法点击
                                                    onTintColor='#17C6AC'  //开关打开时的背景颜色
                                                    thumbTintColor='#17C6AC' //开关上原形按钮的颜色
                                                    tintColor='#c9c9c9' //关闭时背景颜色
                                                    //当状态值发生变化值回调
                                                    // onValueChange={() => this.setState({isOn: !this.state.isOn})} 
                                                    value={this.state.isPushnotification == true}//默认状态
                                                    onValueChange={(e) => this.switchValue(e)} 当状态值发生变化值回调
                                                />                                                
                                            ) 
                                            :(

                                                item.title  == 'Version check' ? (
                                                    <View>
                                                        <TouchableOpacity style={styles.datailsTouch}>
                                                            <Text style={styles.datailsData}>{item.data}</Text>         
                                                        </TouchableOpacity>  
                                                        <Text style={styles.datailsData}>当前版本</Text>  
                                                    </View>
                                                )
                                                :(
                                                    item.title == 'Wipe cache'?(
                                                        <Image style={styles.datailsRight} source={require('../../public/Iamge/Else/rightnavigation.png')}/>
                                                    ):null
                                                )
                                            )
                                        )
                                    }
                                </View>
                            </View>
                        )
                    } 
                    <TouchableOpacity style={styles.exitView}>
                        <Text style={styles.exitTxt} onPress={()=>this.WithdrawAccount()}>Withdraw Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    // change massage
    switchValue =(e) => {
        console.log('e------- ',e);
        this.setState({ isPushnotification: e});
    }

    // click exit   
    WithdrawAccount = async() =>{
        console.log('token 111------------  ',await storage.get('token'))
        storage.delete('token', '')
        console.log('token 222------------  ',await storage.get('token'))
        Actions.Login()
    }

    //pass vlaue web
    updatePass = () =>{
        console.log(1111111)
        // Actions.videodetail({id:10}) //传参
        Actions.updatapassword()// 空传参
    }
 
}

export default Userinfo;

