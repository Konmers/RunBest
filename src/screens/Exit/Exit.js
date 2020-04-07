import React, { Component } from 'react';
import {
    Modal,
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
  } from 'react-native'

  //router
  import { Actions } from 'react-native-router-flux'

  //radio
  import RadioModal from 'react-native-radio-master'

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
        paddingHorizontal: 5,
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
    datailsData:{
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

  //dafult gender
  var datas=[
    {
        "selecteId": 0,
        "selected": true
    }
  ]

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
                    data:''
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
                                        item.title != 'Push notification' ?
                                        (
                                            <TouchableOpacity style={styles.datailsTouch} onPress={() => this.updatePass()}>
                                                <Text style={styles.datailsData}>{item.data}</Text>         
                                            </TouchableOpacity>  
                                        ) :
                                        (
                                            <RadioModal
                                                options={{id:'selecteId',value:'content',disabled:'selected'}}
                                                innerStyle={{width:'100%',paddingLeft: 20}} //每个单选按钮的样式
                                                txtColor={'#000'} //每个单选按钮文字的样式
                                                noneColor={'#efefef'} //不点击按钮样式
                                                selectedValue={this.state.isPushnotification}
                                                onValueChange={(id,item) => this.changeMassage(id,item)}
                                                seledImg={require('../../public/Iamge/Check/chooseChange.png')}
                                                selImg={require('../../public/Iamge/Check/choose.png')}
                                                // selnoneImg={require('./imgs/selectnone.png')}
                                                dataOption={datas}
                                                style={{
                                                    justifyContent:'space-around',
                                                    // backgroundColor:'#666',
                                                }} 
                                            />
                                        )
                                    }
                                    <Image style={styles.datailsRight} source={require('../../public/Iamge/Else/rightnavigation.png')} />
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
    changeMassage = (id,item) => {
        console.log('id--------  ',id,'item-------  ',item)
        this.setState({isPushnotification: datas[id].selecteId})
    }

    // click exit   
    WithdrawAccount = async() =>{
        console.log('token 111------------  ',await storage.get('token'))
        storage.delete('token', '')
        console.log('token 222------------  ',await storage.get('token'))
        Actions.Login()
    }

    //pass vlaue web
    updatePass = (title,data,value) =>{
        // Actions.videodetail({id:10}) //传参
        Actions.userinfoedit({title:title,data:data,value:value})// 空传参
    }
 
}

export default Userinfo;

