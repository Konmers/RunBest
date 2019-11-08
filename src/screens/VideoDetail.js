import React,{Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableHighlight,//选中跳转
  Button,
  ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
} from 'react-native'
import { Actions } from 'react-native-router-flux';
// Dimensions 用于获取设备宽、高、分辨率
const { width,height } = Dimensions.get('window')

class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() { 
    return ( 
      <TouchableHighlight  style={{marginLeft: 30,marginRight: 30,marginTop:10}} onPress={()=>{Actions.videoplay({title:'湖广会馆恢复规划'})}}>
        <View style={{width:'100%',marginBottom:20,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Text>
                啦啦啦啦啦啦啦啦绿
            </Text>
            <View style={{alignItems:'center'}}>
              <Image style={{width:100,height:100}} source={require('../public/Iamge/Banner/8.jpg')}/>
              <Text>Learn more about this purple button</Text>
            </View>
        </View>
      </TouchableHighlight>
     );
  }
}
 
export default VideoDetail;