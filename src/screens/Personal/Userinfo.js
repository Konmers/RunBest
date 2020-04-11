import React, { Component,PropTypes } from 'react';
import {
    Modal,
    Text,
    View,
    Image,
    Button,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    DeviceEventEmitter,
    ActivityIndicator,
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

  import { Toast } from 'teaset'


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
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    datail:{
        width:width*0.9,
        height: height*0.1,
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
    exitView:{
        width:width*0.9,
        height: height*0.08,
        alignItems: 'center',
        marginVertical:10,
        justifyContent: 'center',
        backgroundColor:'#17C6AC'
    },
    exitTxt:{
        fontSize:20,
        fontFamily:'MAK Freeset Bold',
        color:"#fff"       
    },
    modal:{
        height: height*0.2,
        width:width*0.7,
        overflow:'hidden',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column'
    },
    modalButtonStyle:{
        height:'30%',
        width:'100%',
        textAlign:'center',
        textAlignVertical: 'center',
        fontSize:20,
        color:'white',
        backgroundColor:'#17C6AC'
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
    },
    titleText:{
        height: '30%',
        width:'100%',
        fontSize: 18,
        textAlign:'center',
        textAlignVertical: 'center',
    },
    TextInputStyle: {
        width:'90%',
        height: 40,
        marginBottom:20,
        padding: 0,
        borderColor: '#17C6AC', 
        borderBottomWidth: 1,
        // borderRadius: 5,
        fontSize: 18,
        color: '#000000',
    }
  })

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
    //初始化
    componentDidMount = async () =>{
        const user = {uid:await storage.get('uid')}
        api.user.loginInfo(user).then((data) => {
            console.log('userinfo msg-----  ',data.msg)
            if(data.type == 'success')
            {
            }
            else
            {
                console.log('2222')
            }
            const dataArr = [...this.state.dataArr] //复制数组--浅拷贝
            
            //demo 1
            //const listdata = data.list
            // for (const key in dataArr) {
            //     console.log(' listData[key]--------  ', dataArr[key].value)
            //     if (listdata.hasOwnProperty(dataArr[key].value)) {
            //         console.log('listdata.hasOwnProperty(dataArr[key].value)--------  ', listdata.hasOwnProperty(dataArr[key].value))
            //         let varss = dataArr[key].value
            //         console.log('listdata--------  ',listdata[varss])
            //         dataArr[key].data = listdata[varss]
            //     }
            // }

            //demo 2
            this.setState({
                imgURL:data.list.avatar,
                language:data.list.sex,
                dataArr:dataArr.map((item,key) => data.list.hasOwnProperty(dataArr[key].value) ?{...item, data: data.list[dataArr[key].value] } : item.data ),
            })

            //在渲染页面前 向子页面DatetimePicker 传参 注册监听事件，时间名称：birthday  传参：data.list.birthday ‘2019-11-12’
            DeviceEventEmitter.emit('birthday',data.list.birthday);
        }) 
    }

    constructor(props) {
        super(props);
        this.state ={
            dataArr : [
                {
                    title:'Avatar',
                    value:'avatar',
                    // data:'https://img3.doubanio.com/view/photo/sqxs/public/p2551857803.webp',
                    data:''
                },
                {
                    title:'Name',
                    value:'username',
                    // data:'Konmer',
                    data:''
                },
                {
                    //1.男 0.女
                    title:'Gender',
                    value:'sex',
                    // data:0,
                    data:''
                },
                {
                    title:'Birthday',
                    value:'birthday',
                    // data:'2019-11-28',
                    data:''
                },
                {
                    title:'City',
                    value:'address',
                    // data:'chongqing',
                    data:''
                },
                {
                    title:'Phone',
                    value:'phone',
                    // data:'17623261139',
                    data:''
                },
                {
                    title:'E-mail',
                    value:'email',
                    // data:'1916794877@qq.com',
                    data:''
                }
            ],
            imgURL: '',
            language:0,
            isDateTimePickerVisible: false,
            dafultTitle:'',
            dafultText:'',
            test:''
        } 
    }

    render() {
        console.log('state----------  ',this.state.dataArr)
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
                                                    {/* <Text>{this.state.dataArr[3].data}</Text> */}
                                                    <DatetimePicker  ref={'datetimePicker'} child = {this.state.dataArr[3].data}/>
                                                </TouchableOpacity>
                                            ):(
                                                // <TouchableOpacity style={styles.datailsTouch} onPress={() => this.editUserinfo(item.title,item.data,item.value)}>
                                                <TouchableOpacity style={styles.datailsTouch} onPress={() => this.openOtherModal(i,item.title,item.data,item.value)}>
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
                <View style={styles.exitView}>
                    <Text style={styles.exitTxt} onPress={()=>this.updateDate()} >Save Ha</Text>
                </View>
               
                {/* choose gender */}
                <ModalBox 
                    style={styles.modal} 
                    ref={"GenderModal"} 
                    position="center"
                    isDisabled={false}
                    backdropPressToClose={false}
                >
                    <RadioModal
                        options={{id:'selecteId',value:'content',disabled:'selected'}}
                        innerStyle={{
                            width:'100%',
                            height:'50%',
                            // marginVertical:3,
                            // backgroundColor:'red'
                        }} //每个单选按钮的样式
                        txtColor={'#000'} //每个单选按钮文字的样式
                        noneColor={'#efefef'} //不点击按钮样式
                        selectedValue={this.state.language}
                        onValueChange={(id,item) => this.changeGender(id,item)}
                        seledImg={require('../../public/Iamge/Check/chooseChange.png')}
                        selImg={require('../../public/Iamge/Check/choose.png')}
                        // selnoneImg={require('./imgs/selectnone.png')}
                        dataOption={datas}
                        style={{
                            width:'100%',
                            height:'70%',
                            justifyContent:'center'

                        }} 
                    />
                    <Text style={styles.modalButtonStyle} onPress={this.closeGenderVisible}>保存</Text>
                </ModalBox>

                {/* choose qita */}
                <ModalBox 
                    style={styles.modal} 
                    ref={"otherModal"} 
                    position="center"
                    isDisabled={false}
                    backdropPressToClose={false}
                >
                    <Text style={styles.titleText}>Please enter  {this.state.dafultTitle}</Text>
                    <TextInput
                        style={styles.TextInputStyle} 
                        // value={} 
                        placeholder={this.state.dafultText}
                        placeholderTextColor='#A4A4A4'
                        editable={true} // 是否可编辑，默认为: true
                        secureTextEntry={false} // 是否为密码，默认为: false
                        keyboardType='default' // 弹出键盘类型
                        maxLength={18} // 限制文本框中最多的字符数
                        multiline={false} // 是否为多行文本，默认为: false
                        // onChangeText={(text) => this.changeOtherval(text)}//输入框改变触发的函数
                        onChangeText={(text) => 
                            this.setState({
                                dataArr:this.state.dataArr.map((item) => item.title === this.state.dafultTitle ?{...item, data:text } : item ),
                            })
                        }//输入框改变触发的函数
                        // onBlur={this.onBlurHandle} // 失去焦点事件
                        // onFocus={this.onFocusHandle} // 得到焦点事件
                        // onSubmitEditing={this.onSubmitEditingHandle} // 提交编辑内容事件
                    />
                    <Text style={styles.modalButtonStyle} onPress={this.closeGenderVisible}>OK</Text>
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
        console.log('id-------------   ',id)
        console.log('item-------------   ',item)
        this.setState({language: id,item:item})
        this.state.dataArr[2].data = id
    }

    //close Gendershow
    closeGenderVisible = () => {
        this.refs.GenderModal.close();//关闭
        this.refs.otherModal.close();//关闭
    }

    //open other
    openOtherModal = (i,title,data,value) =>{
        console.log('i-------   ',i)
        console.log('title-------   ',title)
        console.log('data-------   ',data)
        console.log('value-------   ',value)
        this.setState({ dafultTitle:title,dafultText:data,dafultKey:i })
        this.refs.otherModal.open()//打开
    }

    //change other value 
    changeOtherval= (text)=>{
        let arr = [...this.state.dataArr] 
        this.setState({
            dataArr:arr.map((item) => item.title === this.state.dafultTitle ?{...item, data:text } : item ),
        })
    }

    //updateDate
    updateDate = async() =>{
        console.log('token 111------------  ',await storage.get('token'))
        console.warn('DatetimePicker------- ',this.refs.datetimePicker.state.currentDate)
        this.state.dataArr[3].data = this.refs.datetimePicker.state.currentDate

        console.log('arr--------  ',this.state.dataArr)

        const Data = {
            uid: await storage.get('uid'),
            list:this.state.dataArr
        }
        console.warn('Data----------------',Data)
        api.user.updateUserInfos(Data).then((data) => {
            console.log('data-----  ',data)
            console.log('userinfo msg-----  ',data.msg)
            if(data.type == 'success')
            {
                Toast.show({
                    text:data.msg,
                    icon: <ActivityIndicator/>,
                    position: 'center',
                    duration: 2000,
                })
                this.componentDidMount()
                //console.log('token 222------------  ',await storage.get('token'))           
                // storage.delete('token', '')

            }
            else
            {
                console.log('2222')
            }
        })
        // Actions.Login()
    }

    //pass vlaue web
    editUserinfo = (title,data,value) =>{
        // Actions.videodetail({id:10}) //传参
        Actions.userinfoedit({title:title,data:data,value:value})// 空传参
    }
 
    //camera
    cameraAction = async () => {
        ImagePicker.showImagePicker(photoOptions, async (response) => {
          if (response.didCancel) {
            return
          }
          console.warn('response.uri----------- ',response.uri)
          let formData = new FormData()
          var uri =response.uri
          var index = uri.lastIndexOf("\/")
          var name = uri.substring(index + 1 ,uri.length)
          let file = {uri:uri, type:'multipart/form-data',name:name}
          formData.append('file',file)
          await api.Img.uploadImg(formData).then((data) =>{
            console.log('data url-----  ',data)
            if(data.type == 'success' )
            {
                this.setState({
                    imgURL: data.url,
                    dataArr:this.state.dataArr.map((item) => item.title === 'Avatar' ?{...item, data:data.url } : item ),
                });
                Toast.show({
                    text:data.msg,
                    icon: <ActivityIndicator/>,
                    position: 'center',
                    duration: 3500,
                })
            }
            else
            {
              Toast.message('Img error!!');
            }
          })

        })
    }
}

export default Userinfo;

