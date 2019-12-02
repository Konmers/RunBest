import React, { Component } from 'react';
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
            imgURL: 'https://avatars1.githubusercontent.com/u/24784550?s=460&v=4'
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
                                    i==0?(
                                        <TouchableOpacity style={styles.datailsTouch} onPress={() => this.cameraAction()}>
                                            <Image style={styles.datailsImage} source={{uri:this.state.imgURL}} />      
                                        </TouchableOpacity>
                                    ):(
                                        <TouchableOpacity style={styles.datailsTouch} onPress={() => this.editUserinfo(item.title,item.data)}>
                                            <Text style={styles.datailsData}>{item.data}</Text>         
                                        </TouchableOpacity>
                                    )
                                }
                                <Image style={styles.datailsRight} source={require('../../public/Iamge/Else/rightnavigation.png')} />
                            </View>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }

    editUserinfo = (title,value) =>{
        console.warn('wwwwwwwwwww')
        // Actions.videodetail({id:10}) //传参
        Actions.userinfoedit({title:title,data:value})// 空传参
    }
 
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

