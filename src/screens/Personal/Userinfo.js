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

  //router
  import { Actions } from 'react-native-router-flux'

  //radio
  import RadioModal from 'react-native-radio-master'

  // date picker
  import DatetimePicker from '../../middleware/DatetimePicker';

  //camera 
  import ImagePicker from 'react-native-image-picker'

  //bounced 
  import ModalBox from 'react-native-modalbox'

  import storage from '../../server/storage'
  
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
    datailsData:{
        color: '#999999' 
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
      modal:{
        height: '30%',
        width,
      },
      text: {
        color: "black",
        fontSize: 22
      },
      btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
      },
      checkBox:{
        backgroundColor:'white',
        height:56,
        marginTop:1,
        justifyContent:'center'
      },
      image:{
        marginLeft:16,
        width:30,
        height:30,
      },
      text: {
        fontSize:18,
        color:'#424242'
      }
  }

  //choose camera
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

  //dafult gender
  var datas=[
    {
        "selecteId": 0,
        "content": "女",
        "selected": false
    },
    {
        "selecteId": 1,
        "content": "男",
        "selected": false
    }
  ]

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
                    //1.男 0.女
                    title:'Gender',
                    data:0
                },
                {
                    title:'Birthday',
                    data:'2019-11-28'
                },
                {
                    title:'Stature',
                    data:'180'
                },
                {
                    title:'Weight',
                    data:'128'
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
            imgURL: 'https://img3.doubanio.com/view/photo/sqxs/public/p2551857803.webp',
            language:'',
            item:'',
            isDateTimePickerVisible: false
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
                                        item.title == 'Gender'?(
                                            <TouchableOpacity style={styles.datailsTouch} onPress={() => this.openGenderVisible(item.data)}>
                                                {
                                                   item.data == 1?(
                                                    <Text style={styles.datailsData}>男</Text>         
                                                   ):(
                                                    <Text style={styles.datailsData}>女</Text>         
                                                   ) 
                                                }
                                            </TouchableOpacity>
                                        ):(
                                            item.title == 'Birthday'?(
                                                <TouchableOpacity style={styles.datailsTouch}>
                                                    <DatetimePicker  ref={'datetimePicker'} child = {this.state.dataArr[3].data}/>
                                                </TouchableOpacity>
                                            ):(
                                                <TouchableOpacity style={styles.datailsTouch} onPress={() => this.editUserinfo(item.title,item.data)}>
                                                    <Text style={styles.datailsData}>{item.data}</Text>         
                                                </TouchableOpacity>
                                            )
                                        )
                                    )
                                }
                                <Image style={styles.datailsRight} source={require('../../public/Iamge/Else/rightnavigation.png')} />
                            </View>
                            </View>
                        )
                    } 
                </View>
                <View >
                   <Button 
                        title='耍得黑粉黛花海见客户' 
                        color="#17C6AC"
                        onPress={() => this.openBirthday()}
                    >
                    </Button>
                </View>
                <ModalBox 
                 style={styles.modal} 
                 ref={"GenderModal"} 
                 position="center"
                 isDisabled={false}
                 backdropPressToClose={false}
                >
                    <View style={styles.modalLayer}>
                        <View style={styles.modalContainer}>
                            <View style={{padding:2,flex:1,flexDirection:'column'}}>
                                <RadioModal
                                options={{id:'selecteId',value:'content',disabled:'selected'}}
                                innerStyle={{width:'100%',paddingLeft: 20}} //每个单选按钮的样式
                                txtColor={'#000'} //每个单选按钮文字的样式
                                noneColor={'#efefef'} //不点击按钮样式
                                selectedValue={this.state.language}
                                onValueChange={(id,item) => this.changeGender(id,item)}
                                seledImg={require('../../public/Iamge/Check/chooseChange.png')}
                                selImg={require('../../public/Iamge/Check/choose.png')}
                                // selnoneImg={require('./imgs/selectnone.png')}
                                dataOption={datas}
                                style={{
                                    justifyContent:'space-around',
                                    // backgroundColor:'#666',
                                }} 
                                />
                            </View>
                            <View style={styles.modalButtonStyle}>
                                <Button 
                                    title='保存' 
                                    color="#17C6AC"
                                    onPress={this.closeGenderVisible}
                                ></Button>
                            </View>
                        </View>
                    </View>
                </ModalBox>
            </View>
        )
    }

    //open Gendershow
    openGenderVisible = (value) => {
        this.refs.GenderModal.open()//打开
        if(value === 0)
        {
            this.setState({language:datas[0].selecteId,item:datas[0].content})
        }
        else if(value === 1)
        {
            this.setState({language:datas[1].selecteId,item:datas[1].content})
        }
    }
    // change gender
    changeGender = (id,item) => {
        this.setState({language: id,item:item})
        this.state.dataArr[2].data = id
    }
    //close Gendershow
    closeGenderVisible = () => {
        this.refs.GenderModal.close();//关闭
    }

    //openBirthday
    openBirthday = async() =>{
        console.log('token 111------------  ',await storage.get('token'))
        storage.delete('token', '')
        console.log('token 222------------  ',await storage.get('token'))
        console.warn('DatetimePicker------- ',this.refs.datetimePicker.state.currentDate)
        this.state.dataArr[3].data = this.refs.datetimePicker.state.currentDate
        Actions.Login()
    }

    //pass vlaue web
    editUserinfo = (title,value) =>{
        // Actions.videodetail({id:10}) //传参
        Actions.userinfoedit({title:title,data:value})// 空传参
    }
 
    //camera
    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
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

