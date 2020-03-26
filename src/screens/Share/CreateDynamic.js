//走势
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableHighlight,//选中跳转
  TouchableOpacity,
  ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
} from 'react-native'

// Actions表示要进行路由的JS操作了,可以跳特到新路由
import { Actions } from 'react-native-router-flux'

//camera 
import ImagePicker from 'react-native-image-picker'

import Floatball from "../../middleware/Floatball.js"

import Icon from 'react-native-vector-icons/AntDesign';

import { Toast } from 'teaset'

import api from '../../server/api'
import storage from '../../server/storage'

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')

const styles = {
  Title:{
    width,
    height: height*0.06,
    textAlign: 'center',
    lineHeight: height*0.06,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
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
  cont:{
    width,
    height,
    alignContent:'center',
    alignItems:'center',
    backgroundColor: '#f0f0f0'  //底色
  },  
  usershow:{
    width,
    height:height*0.1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    // backgroundColor: 'red',
    backgroundColor: 'white',
    marginHorizontal:15,
    paddingHorizontal:15
  },
  uImage:{
    width: 40,
    height: 40,
    borderRadius:5
  },
  uname:{
    marginLeft:10,
    fontSize:20
  },
  content:{
    width,
    height,
    backgroundColor: 'white',
    // backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  con_cont:{
    width:width*0.9,
    height: height*0.35, 
    fontSize:18,
    paddingVertical: 0, 
    paddingTop: 5, 
    paddingLeft: 5, 
    backgroundColor: '#f0f0f0',
    textAlignVertical: 'top', // 文字居上
    marginTop:15
  },
  actionButtonIcon: {
    fontSize: 30,
    color: '#17C6AC',
  },
  imgArr:{
    width:width*0.9,
    height: height*0.5, 
    flex:1,
    flexDirection: 'row',
    flexWrap:"wrap",
    marginTop:10
    // backgroundColor: 'blue',
    // backgroundColor: 'white',
  },
  Imgadd:{
    width:'20%',
    height:'15%',
    borderRadius:5,
    justifyContent: 'center',
    // alignContent:'center',
    alignItems:'center',
    padding:0,
    backgroundColor: '#f0f0f0',
    marginVertical:10
  },
  chooseView:{
    width:'20%',
    height:'15%',
    marginRight:10,
    marginVertical:10,
    // backgroundColor:'red'
  },
  chooseImage:{
     width:'100%',
     height:'100%',
     borderRadius:5,
  },
  chooseButtonIcon:{
    fontSize: 18,
    color: '#fff',
    backgroundColor: '#DCDCDC',
    position:'absolute',
    top:-5,
    right:0,
    borderRadius:5,
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

var con_title = {
  width:width*0.9,
  height: 30, 
  fontSize:20,
  fontWeight:'bold',
  padding: 0,
  borderBottomColor: '#CCC', 
  borderBottomWidth: 1,
}

var con_titless = {
  width:width*0.9,
  height: 30, 
  fontSize:20,
  fontWeight:'bold',
  padding: 0,
  borderBottomColor: '#17C6AC', 
  borderBottomWidth: 2,
}

export default class CreateDynamic extends Component{
  constructor (props) {
    super(props)
    this.state = {
        title:'',
        content:'',
        avatar:'',
        name:'',
        id:'',
        ImgArrs:[],
        borderStyle: con_title   
    }
  }

  //get userInfo
  componentDidMount = async () =>{
    // console.log('storage key-------  ',await storage.get('key'))
    // console.warn('storage uid-------  ',await storage.get('uid'))
     const user = {uid:await storage.get('uid')}
    api.user.loginInfo(user).then((data) => {
        // console.log('data--------  ',data)
        if(data.type == 'success')
        {
          this.setState({avatar:data.list.avatar,name:data.list.username,id:data.list.uid});
        }
        else
        {
          console.log('2222')
        }
    })  
  }

  render() {
    return (      
      <View style={{flex:1}}>
        <View style={styles.Title}>
          <Text style={styles.Toptext}>Run - Share</Text>
          <TouchableOpacity  style={styles.Share} onPress={this.onPress}> 
            {/* <Image style={{width:30,height: 30}} source={require('../../public/Iamge/Else/share.png')} /> */}
            <Icon name="save" style={styles.actionButtonIcon} onPress={() =>this.save()}/>
          </TouchableOpacity >
        </View>
        <View style={styles.cont}>
            <View style={styles.usershow}>
              <Image style={styles.uImage} source={{uri:this.state.avatar}} />
              <Text style={styles.uname}>{this.state.name}</Text>
            </View>
            <View style={styles.content}>
              <TextInput
                style={this.state.borderStyle}
                placeholder=" Please shu ha the title ~"
                placeholderTextColor='#CCC'
                editable={true} // 是否可编辑，默认为: true
                secureTextEntry={false} // 是否为密码，默认为: false
                keyboardType='default' // 弹出键盘类型
                maxLength={18} // 限制文本框中最多的字符数
                multiline={false} // 是否为多行文本，默认为: false
                onFocus={()=> this.setState({borderStyle:con_titless})}
                onBlur={()=>this.setState({borderStyle:con_title})}
                onChangeText={(text) => this.setState({title:text})}
                // onChangeText={() => this._onChangeTitle}//输入框改变触发的函数
              />
              <TextInput
                  placeholder = {' Please xia ji ba edit ~'} 
                  placeholderTextColor = {'#CCC'}
                  editable={true} // 是否可编辑，默认为: true
                  multiline={true} // 是否为多行文本，默认为: false
                  style = {styles.con_cont}
                  onChangeText={(text) => this.setState({content:text})}
                  // onChangeText={() => this._onChangeCont}//输入框改变触发的函数
              />
              <View style={styles.imgArr}>
                {/* <Image style={styles.chooseImage} source={require('../../public/Iamge/Head/10.jpg')} />  */}
                {
                  this.state.ImgArrs.map((item,i) =>
                  <TouchableOpacity style={styles.chooseView} key={i}>
                    <Image style={styles.chooseImage} source={{uri:item}} />
                    <Icon name="delete" style={styles.chooseButtonIcon} onPress={() =>this._deleteImg(item,i)}/>
                  </TouchableOpacity>
                    // {
                    //   this.state.ImgArrs[0] ? (<Image style={styles.chooseImage} source={{uri:item}} />) : null
                    // }
                  )
                }
                <TouchableOpacity style={styles.Imgadd} onPress={() => this.cameraAction()}>
                  <Image style={styles.uImage} source={require('../../public/Iamge/Else/add.png')} /> 
                </TouchableOpacity>
              </View>
            </View>
        </View>
        <Floatball/> 
      </View>
    );
  }

  onPress = () => {
    console.warn('ddddd') 
    setTimeout(() => {
      Toast.message('Already tu cao ~');
      Actions.homeInfo()// 空传参
    }, 2000);
    // Actions.Webmap()// 空传参

  };

  //camera
  cameraAction = () => {
    ImagePicker.showImagePicker(photoOptions, (response) => {
      if (response.didCancel) {
        return
      }
      // console.warn('ImgArrs----------- ',this.state.ImgArrs)
      const  list = this.state.ImgArrs
      // console.warn('response.uri----------- ',response.uri)
      list.push(response.uri)
      // console.warn('list----------- ',list)

      this.setState({
        ImgArrs:list
      });
      // console.warn('ImgArrs22----------- ',this.state.ImgArrs)

    })
  }

  async save(){
    let Imglist=[]
    for (const item of this.state.ImgArrs) {
      let formData = new FormData()
        var uri =item
        var index = uri.lastIndexOf("\/")
        var name = uri.substring(index + 1 ,uri.length)
        let file = {uri:uri, type:'multipart/form-data',name:name}
        formData.append('file',file)
       await api.Img.uploadImg(formData).then((data) =>{
          // console.log('data-----  ',data)
          if(data.type == 'success' )
          {
            Imglist.push(data.url)
          }
          else
          {
            Toast.message('Img error!!');
          }
        })
    }
    // console.log('Imglist--------  ',Imglist)
    const formData = {
      uid:this.state.id,
      title:this.state.title,
      content:this.state.content,
      ImgArrs:Imglist
    }
    // console.log('formData------  ',formData)

    await api.dynamic.createdynamic(formData).then((Data) => {
      if (Data.type === true) 
      {
          Toast.message('create Successful !!  ^_^');
          console.warn('ddddd') 
          setTimeout(() => {
            Toast.message('Already tu cao ~');
            Actions.homeInfo()// 空传参
          }, 2000);
      } 
      else 
      {
          Toast.message('create Error !! -_-//');
      }
    })
  }

  _deleteImg(value,index){
      // console.warn('value----------- ',value)
      // console.warn('index----------- ',index)
      // console.warn('ImgArrs----------- ',this.state.ImgArrs)
      let Imglist = index > 0 ? this.state.ImgArrs.splice(index, 1) :[]
      // console.warn('Imglist----------- ',Imglist)
      this.setState({
        ImgArrs:Imglist
      });
  }
}