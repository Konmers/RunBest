import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    Dimensions,
    Button,
    ActivityIndicator,
    TouchableHighlight,//选中跳转
    TouchableOpacity,
    ScrollView,//页面滚动组件 （默认 一个页面长度大于手机的长度，使用这个组件）
  } from 'react-native'
  
  import api from '../../server/api'
  import storage from '../../server/storage'
  
  // Dimensions 用于获取设备宽、高、分辨率
  const { width,height } = Dimensions.get('window')

  import { Toast } from 'teaset'

  // Actions表示要进行路由的JS操作了,可以跳特到新路由
  import { Actions } from 'react-native-router-flux'

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
        this._onChangeText = this._onChangeText.bind(this);
        this.state={
            text:'',
            dafultText:this.props.data
        }
    }

    render() {
        return (
            <View style={styles.bigView}>
                <View style={styles.editView}> 
                    <Text style={styles.titleText}>Please enter  {this.props.title}</Text>
                    
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
                        onChangeText={this._onChangeText}//输入框改变触发的函数
                        // onBlur={this.onBlurHandle} // 失去焦点事件
                        // onFocus={this.onFocusHandle} // 得到焦点事件
                        // onSubmitEditing={this.onSubmitEditingHandle} // 提交编辑内容事件
                    />
                    <Button 
                        title='耍得黑粉黛花海见客户' 
                        color="#17C6AC"
                        onPress={() => this.DataVlue(this.state.text)}
                    >
                    </Button>
                </View>
            </View>
        )
    }
    _onChangeText(inputData){
        console.log("输入的内容",inputData);
        //把获取到的内容，设置给showValue
        this.setState({text:inputData});
    }
    async DataVlue(vlaue){
        console.warn('value----------------',this.props.value)
        console.warn('save----------------',vlaue)
        console.warn('this.state.inputData----------------',this.state.inputData)
        const Data = {
            uid: await storage.get('uid'),
            valuename:this.props.value,
            valuetxt:this.state.text
        }
        console.warn('Data----------------',Data)
        api.user.updateUserinfo(Data).then((data) => {
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
                console.log('data-----  ',data.value)
                Actions.userinfo({valuename:this.props.value,valuetxt:this.state.text})// 空传参
            }
            else
            {
                console.log('2222')
            }
        }) 
    }
}

export default UserinfoEdit