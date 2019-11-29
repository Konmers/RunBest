import React, { Component } from 'react'
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
  
  //时间
  import dayjs from 'dayjs'

  import { Actions } from 'react-native-router-flux';
  
  // Dimensions 用于获取设备宽、高、分辨率
  const { width,height } = Dimensions.get('window')

    const styles = StyleSheet.create({
        editView:{
            width,
            height,
            backgroundColor:'#f0f0f0'
        },
        titleText:{
            fontSize: 15,
            marginTop:15, 
            marginLeft: 10
        },
        TextInputStyle: {
            margin: 10,
            padding: 0,
            height: 50, 
            borderColor: '#17C6AC', 
            borderBottomWidth: 1,
            borderRadius: 5,
            fontSize: 16,
            color: '#000000',
            paddingLeft: 10
        }
    })

class UserinfoEdit extends Component {
    constructor(props) {
        super(props);
        this.state ={}
    }

    render() {
        //title:title,data:value
        console.warn('this.propstitle----- ',this.props.title)
        console.warn('this.propsdata----- ',this.props.data)
        return (
            <View style={styles.bigView}>
                <View style={styles.editView}> 
                    <Text style={styles.titleText}>Please enter  {this.props.title}</Text>
                    <TextInput
                        style={styles.TextInputStyle} 
                        value={this.props.data} 
                        placeholder="请输入您需要的商品"
                        placeholderTextColor='#A4A4A4'
                        editable={true} // 是否可编辑，默认为: true
                        secureTextEntry={false} // 是否为密码，默认为: false
                        keyboardType='default' // 弹出键盘类型
                        maxLength={10} // 限制文本框中最多的字符数
                        multiline={false} // 是否为多行文本，默认为: false
                        onChangeText={this.onChangeTextHandle} // 文本变化事件
                        onBlur={this.onBlurHandle} // 失去焦点事件
                        onFocus={this.onFocusHandle} // 得到焦点事件
                        onSubmitEditing={this.onSubmitEditingHandle} // 提交编辑内容事件
                    />
                </View>
            </View>
        )
    }
}

export default UserinfoEdit