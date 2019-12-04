import React, { Component } from 'react';
import {
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

  //camera 
  import ImagePicker from 'react-native-image-picker'

  //bounced
  import ModalBox from 'react-native-modalbox'

  //radio
  import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
  
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
    },

      modal1: {
        width: 500,
        height: 200,
        backgroundColor: 'red'
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
            imgURL: 'https://img3.doubanio.com/view/photo/sqxs/public/p2551857803.webp',
            text: ''
        } 
        this.onSelect = this.onSelect.bind(this)
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
                <ModalBox  
                    ref={"ThirdProtocolModal"}
                    isDisabled={false}
                    swipeToClose={false}
                    style={{backgroundColor:'transparent',flex:1, justifyContent:'center', alignItems:'center',width: "100%"}}
                    animationDuration={0}
                    backdropPressToClose={false}//在背景处点击是否关闭modal,默认是关闭
                    backdropColor='red'//背景颜色，因为这个背景颜色有默认透明度的，感觉使用很方便，默认black
                 >
                    <Text style={styles.text}>Basic modal</Text>
                    <Button onPress={this.changeText} style={styles.btn} title='Change text'></Button>
                    <Button onPress={this.closeModal1} style={styles.btn} title='Close modal'></Button>
                    <View style={styles.modalLayer}>
                        <View style={styles.modalContainer}>
                            <RadioGroup
                                onSelect = {(index, value) => this.onSelect(index, value)}
                            >
                                <RadioButton value={1} >
                                    <Text>男</Text>
                                </RadioButton>
                                <RadioButton value={0}>
                                    <Text>女</Text>
                                </RadioButton>
                            </RadioGroup>
                            <View style={styles.modalButtonStyle}>
                                <Button 
                                    title='保存' 
                                    color="#17C6AC"
                                    onPress={this._closeGenderVisible}
                                ></Button>
                            </View>
                        </View>
                    </View>
                </ModalBox>
            </View>
        )
    }

    //open modalbox

    //choose radio
    onSelect(index, value){
        console.warn('index------ ',index)
        console.warn('value------ ',value)
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        })
    }

    //open Gendershow
    setGenderVisible(visible) {
        console.warn('visible------ ',visible)
        this.setState({genderVisible: visible });
        this.refs.ThirdProtocolModal.open()//打开
//           if(this.state.genderVisible){
//                 console.log('1111111111111')
//                 this.refs.ThirdProtocolModal.open()//打开
//             }else{
//                 console.log('2222222222222')
//                 this.refs.ThirdProtocolModal.close()//关闭
//             }
    }
    closeModal1() {
        this.refs.modal1.close();
    }
    changeText() {
        this.setState({text:"Hello world!"});
      }

    onClose() {
        console.log('Modal just closed');
    }
    onOpen() {
    console.log('Modal just opened');
    }
    onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
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

