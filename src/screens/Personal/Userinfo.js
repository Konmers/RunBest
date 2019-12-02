import React, { Component } from 'react';
import {
    Modal,
    Text,
    View,
    Image,
    Button,
    StyleSheet,
    Dimensions,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
  } from 'react-native'
  
  //时间
  import dayjs from 'dayjs'

  import { Actions } from 'react-native-router-flux';

  import ImagePicker from 'react-native-image-picker'
  
  // Dimensions 用于获取设备宽、高、分辨率
  const { width,height } = Dimensions.get('window')

  const styles = {
    BigView:{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        backgroundColor:'#f0f0f0'
    },
    datailView:{
        width,
        height: '80%',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    datail:{
        width:'90%',
        height: '11%',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        borderTopWidth: 0.5,
        borderColor: '#c9c9c9'
    }, 
    line:{
        borderTopWidth: 0.5,
        borderColor: '#c9c9c9'
    },
    datailsTitle:{
       fontFamily: 'DIN alternate',
       fontSize: 15
    },
    dataRightView:{
        width: "50%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    datailsImage:{
        width: 40,
        height: 40
    },
    datailsRight:{
        width:15,
        height:15,
    },
    modalLayer: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        flex: 1,
        justifyContent: 'center',
        padding: 32
    },
    modalContainer: {
        height: 300,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    modalTitleStyle: {
        textAlign: 'center',
        fontSize: 26
    },
    modalButtonStyle: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 10
    }
  }

  var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }

 class Userinfo extends Component {
    constructor(props) {
        super(props);
        this.state ={
            dataArr : [
                {
                    title:'Avatar',
                    data:'https://github.com/Dliveaman/RunBest/blob/master/src/public/Iamge/Head/14.jpg'
                },
                {
                    title:'Name',
                    data:'Konmer'
                },
                {
                    title:'Gender',
                    data:1   //1.男 0.女
                },
                {
                    title:'Birthday',
                    data:'2019-11-28'
                },
                {
                    title:'Stature',
                    data:180
                },
                {
                    title:'Weight',
                    data:128
                },
                {
                    title:'City',
                    data:'chongqing'
                },
                {
                    title:'Phone',
                    data:'17623261139'
                },
                {
                    title:'E-mail',
                    data:'1916794877@qq.com'
                },
            ],
            genderVisible: false,
            imgURL: 'https://img3.doubanio.com/view/photo/sqxs/public/p2551857803.webp'
        } 
    }

    //1.男 0.女

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
                                    i==0?(
                                        <TouchableOpacity style={styles.datailsTouch} onPress={() => this.cameraAction()}>
                                            <Image style={styles.datailsImage} source={{uri:this.state.imgURL}} />      
                                        </TouchableOpacity>
                                    ):(
                                        item.title == 'Gender'?(
                                            <TouchableOpacity style={styles.datailsTouch} onPress={() => this.setGenderVisible(true)}>
                                                <Text style={styles.datailsData}>{item.data}</Text>         
                                            </TouchableOpacity>
                                        ):(
                                            <TouchableOpacity style={styles.datailsTouch} onPress={() => this.editUserinfo(item.title,item.data)}>
                                                <Text style={styles.datailsData}>{item.data}</Text>         
                                            </TouchableOpacity>
                                        )

                                    )
                                }
                                <Image style={styles.datailsRight} source={require('../../public/Iamge/Else/rightnavigation.png')} />
                            </View>
                            </View>
                        )
                    } 
                </View>
                <Modal
                  animationType='fade' // 指定了 modal 的动画类型。类型：slide 从底部滑入滑出|fade 淡入淡出|none 没有动画
                  transparent={true} // 背景是否透明，默认为白色，当为true时表示背景为透明。
                  visible={this.state.genderVisible} // 是否显示 modal 窗口
                  onRequestClose={() => { this._closeGenderVisible(); }} // 回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。请务必注意本属性在 Android 平台上为必填，且会在 modal 处于开启状态时阻止BackHandler事件
                  onShow={()=>{console.log('modal窗口显示了');}} // 回调函数会在 modal 显示时调用
                >
                    <View style={styles.modalLayer}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitleStyle}>这是个Modal窗口！</Text>
                            <View style={styles.modalButtonStyle}>
                                <Button 
                                    title='取消' 
                                    color="#A4A4A4"
                                    onPress={this._closeGenderVisible}
                                ></Button>
                            </View>
                        </View>
                    </View>
                </Modal>  
            </View>
        )
    }

    //open Gendershow
    setGenderVisible(visible) {
        console.warn('visible------ ',visible)
        this.setState({genderVisible: visible });
    }
 
    //close Gendershow
    _closeGenderVisible = () => {
        this.setState({genderVisible: false});
    }

    //pass vlaue web
    editUserinfo = (title,value) =>{
        console.warn('title------ ',title)
        console.warn('value------ ',value)
        // Actions.videodetail({id:10}) //传参
        Actions.userinfoedit({title:title,data:value})// 空传参
    }
 
    //camera
    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
          console.warn('response' + response);
          if (response.didCancel) {
            return
          }
        //   console.warn('response.uri----------- ',response.uri)
          this.setState({
            imgURL: response.uri
          });
        })
    }
}

export default Userinfo;

