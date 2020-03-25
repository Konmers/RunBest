import React, { Component } from 'react'
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

import { baseFormData } from '../../server/formData'
import api from '../../server/api'

// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')

const styles = {
  BigView:{
      width,
      height,
      flex: 1,
      alignItems: 'center',
      backgroundColor:'#000'
  },
  datail:{
      width,
      height,
      display: 'flex',
      flexDirection:'column',
      alignContent: 'center',
      alignItems: 'center'
  },
  datailsImage:{
    width: 40,
    height: 40
  },
    datailsData:{
      width:'90%',
      height: '10%',
      color: "#000" 
  },
}

export default class Demo1 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      code:0,
      type:'',
      list:{}
    }
  }

  //初始化
  componentDidMount = async () =>{
    // const formData = baseFormData()
    const formData = new FormData()
    // formData.append('tid', 1)
    // formData.append('page', 1)
    api.user.login(formData).then(({ code, type, List }) => {
      // "_id": "5e2eb73721b140100cceb4db",
      // "devicesCode": "",
      // "avatar": "http://www.konmer.cn:3000/uploads/0e4c4714dc8f368ade59661f24f1f9c9a64f18c65b862dec718db599b22590ef.png",
      // "username": "konmer",
      // "email": "konmer@foxmail.com",
      // "password": "$2b$10$eyQhgHXugvpd9/uv1wbKfeI41cHcaP6RnI93UObLFzfpltySkjGKy",
      // "time": "2020-01-27"
      console.log('List--------  ',List)
      if(code == 200)
      {
        this.setState({code:code,type:type,list:List});
      }
    })  
  }

  render() {
    return (
      <ScrollView 
      contentContainerStyle={{ flex: 1 }} // 非常重要，让ScrollView的子元素占满整个区域
      keyboardDismissMode="on-drag" // 拖动界面输入法退出
      keyboardShouldPersistTaps={false} // 点击输入法以外的区域，输入法退出 不加这两句也可以实现点击空白处收回键盘
      scrollEnabled={false} // 当值为false的时候，内容不能滚动，默认值为true
      >
        {
            <View style={styles.datail}>
              <Text style={styles.datailsData}>{ this.state.list._id}</Text>
              <Text style={styles.datailsData}>{ this.state.list.devicesCode}</Text>
              <Image style={styles.datailsImage} source={{uri:this.state.list.avatar}} />      
              <Text style={styles.datailsData}>{ this.state.list.username}</Text>
              <Text style={styles.datailsData}>{ this.state.list.email}</Text>
              <Text style={styles.datailsData}>{ this.state.list.password}</Text>
              <Text style={styles.datailsData}>{ this.state.list.time}</Text>
            </View>
        }
      </ScrollView>
    )
  }
}
