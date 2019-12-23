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

class Login extends Component {
    constructor(props) {
        super(props);
        this.afterEnd =  this._afterEnd;
        this.navigation = props.navigation;
        this.state = {
          username: '',
          password: '',
          token: '',
          timeLeft:60,
          begin:0,
          isDisable:false
        };
    }
    componentDidMount() {
        // 隐藏启动页，如果不设置消失时间，在组件加载完启动页自动隐藏
        setTimeout(() => {
            SplashScreen.hide();
        }, 3000);
    }

    static navigationOptions = {
        header:null,
    };
    countdownfn(timeLeft, callback, begin) {
        if (timeLeft > 0) {
            this.state.begin = 1;

            let that = this;
            let interval = setInterval(function () {
                if (that.state.timeLeft < 1) {
                    clearInterval(interval);
                    callback(that)
                    that.setState({
                        isDisable:false
                    })
                } else {
                    let totalTime = that.state.timeLeft;
                    that.setState({
                        timeLeft: totalTime - 1,
                        isDisable:true
                    })
                }
            }, 1000)
        }
    }
    _beginCountDown() {
        alert("======>>"+this.state.username)
        if (this.state.begin === 1){
            return;
        }
        let time = this.state.timeLeft;
        let afterEnd = this.afterEnd;
        let begin = this.state.begin;
        this.countdownfn(time, afterEnd, begin)
    }
    _afterEnd(that) {
        that.setState({
            begin : 0,
            timeLeft : 60,

        })
    }
    onPressLogin() {
        const {navigation} = this.props;
        if (navigation) {
            this.props.navigation.navigate('Home');
        }  
    }
    render() {
        const { actions, state, navigation } = this.props;
        return (
            <ScrollView 
                contentContainerStyle={{ flex: 1 }} // 非常重要，让ScrollView的子元素占满整个区域
                keyboardDismissMode="on-drag" // 拖动界面输入法退出
                keyboardShouldPersistTaps={false} // 点击输入法以外的区域，输入法退出 不加这两句也可以实现点击空白处收回键盘
                scrollEnabled={false} // 当值为false的时候，内容不能滚动，默认值为true
            >
                <View style={styles.container}>
                <View style={styles.containers}>
                    <Text style={styles.textStyle}>登录页面</Text>
                </View>
                <View style={{height:height/10}}></View>
                <View style={styles.inputView}>
                    <View style={[styles.view, styles.lineTopBottom]}>
                      <Text style={styles.text}>手机号:</Text>
                      <TextInput
                        style={styles.textInputStyle}
                        placeholder="请输入您的手机号码"
                        clearButtonMode="while-editing"
                        secureTextEntry={false}
                        onChangeText={(text) => {
                          this.setState({
                            username: text
                          });
                        }}
                        value={this.state.username}
                      />
                    </View>
                    <View style={[styles.view, styles.lineTopBottom]}>
                        <Text style={styles.text}>验证码:</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder="请输入验证码"
                            clearButtonMode="while-editing"
                            secureTextEntry
                            onChangeText={(text) => {
                                this.setState({
                                    password: text
                                });
                            }}
                            value={this.state.password}
                        />
                        <TouchableOpacity
                            disabled={this.state.isDisable}
                          onPress={this._beginCountDown.bind(this)}
                        >
                            <Text style={styles.texts} >{ this.state.begin === 0 ? '获取验证码' : this.state.timeLeft+"秒后重试"}</Text>
                        </TouchableOpacity>
                    </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.onPressLogin()}
                >
                  <Text style={styles.buttonText}>登 录</Text>
                </TouchableOpacity>
              </View>
            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    textStyle:{
        fontSize:36,
        textAlign:'center',   
        backgroundColor:'#FFFFFF',
        color:'#1874CD'
    },   
    containers:{
        height:height/4,
        justifyContent: 'flex-end',
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonView: {

        alignItems:'center',
        flex: 3
    },
    inputView: {
        padding: 5,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center',
    },
    lineBottom: {
        borderBottomWidth: 5 / PixelRatio.get(),
        borderColor: 'rgb(208,208,208)'
     },
    button: {
        marginTop: 30,
        width:width*0.8,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#1874CD',
        justifyContent: 'center',
        alignItems:'center'
    },
    buttonText: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',

    },
    text: {
        lineHeight: 44,
        fontSize: 14,
    },
    texts: {
        lineHeight: 44,
        fontSize: 16,
        color:'#1874CD'
    },
    view: {
        flexDirection: 'row',
        height: 44,
        width:width*0.8
    },
    textInputStyle: {
        flex: 5,
        marginRight: 10,
        marginLeft:20,
        fontSize: 16,
        marginTop: 4,
        
    },
    lineTopBottom: {
        borderBottomWidth: 3 / PixelRatio.get(),
        borderColor: 'rgb(208,208,208)',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Login;